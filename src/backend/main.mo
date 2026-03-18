import Map "mo:core/Map";
import Set "mo:core/Set";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Int "mo:core/Int";
import Runtime "mo:core/Runtime";
import List "mo:core/List";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Iter "mo:core/Iter";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";



actor {
  ///////////////////
  // Stable Storage//
  ///////////////////
  stable var _stableUserRoles : [(Principal, {#admin; #user; #guest})] = [];
  stable var _stableAdminAssigned : Bool = false;
  stable var _stableUserProfiles : [(Principal, { name : Text; studentId : ?Text; institution : ?Text })] = [];
  stable var _stableCustomerMessages : [{ id : Nat; sender : Principal; senderName : Text; message : Text; timestamp : Int }] = [];
  stable var _stableMessageReplies : [(Nat, Text)] = [];
  stable var _stableNextMessageId : Nat = 1;
  stable var _stablePremiumNotes : [(Nat, { id : Nat; title : Text; subject : Text; content : Text; createdAt : Int })] = [];
  stable var _stableNextNoteId : Nat = 1;
  stable var _stableNoteAccessRequests : [(Nat, { id : Nat; userId : Principal; userName : Text; message : Text; requestedAt : Int; status : Text })] = [];
  stable var _stableNextRequestId : Nat = 1;
  stable var _stableApprovedNoteUsers : [Principal] = [];
  stable var _stableQuizQuestions : [(Nat, { id : Nat; question : Text; optionA : Text; optionB : Text; optionC : Text; optionD : Text; correctIndex : Nat; topic : Text; explanation : Text; isAdminAdded : Bool })] = [];
  stable var _stableNextQuizQuestionId : Nat = 1;
  stable var _stableUserQuizResults : [(Principal, [{ id : Nat; topic : Text; score : Nat; total : Nat; timestamp : Int; wrongQuestionIds : [Nat] }])] = [];

  ///////////////////
  // Authorization //
  ///////////////////
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  ////////////////////
  // User Profiles  //
  ////////////////////
  public type UserProfile = {
    name : Text;
    studentId : ?Text;
    institution : ?Text;
  };

  var userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not isUserOrAdmin(caller)) {
      Runtime.trap("Unauthorized: Must be user or admin");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not isAdmin(caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not isUserOrAdmin(caller)) {
      Runtime.trap("Unauthorized: Must be user or admin");
    };
    userProfiles.add(caller, profile);
  };

  //////////////////
  // Problem Types//
  //////////////////
  type ProblemType = {
    #journalEntry;
    #trialBalance;
    #balanceSheet;
    #incomeStatement;
    #cashFlowStatement;
    #ledgerPostings;
  };

  module ProblemType {
    public func compare(type1 : ProblemType, type2 : ProblemType) : Order.Order {
      switch (type1, type2) {
        case (#journalEntry, #journalEntry) { #equal };
        case (#journalEntry, _) { #less };
        case (#trialBalance, #journalEntry) { #greater };
        case (#trialBalance, #trialBalance) { #equal };
        case (#trialBalance, _) { #less };
        case (#balanceSheet, #journalEntry) { #greater };
        case (#balanceSheet, #trialBalance) { #greater };
        case (#balanceSheet, #balanceSheet) { #equal };
        case (#balanceSheet, _) { #less };
        case (#incomeStatement, #journalEntry) { #greater };
        case (#incomeStatement, #trialBalance) { #greater };
        case (#incomeStatement, #balanceSheet) { #greater };
        case (#incomeStatement, #incomeStatement) { #equal };
        case (#incomeStatement, _) { #less };
        case (#cashFlowStatement, #journalEntry) { #greater };
        case (#cashFlowStatement, #trialBalance) { #greater };
        case (#cashFlowStatement, #balanceSheet) { #greater };
        case (#cashFlowStatement, #incomeStatement) { #greater };
        case (#cashFlowStatement, #cashFlowStatement) { #equal };
        case (#cashFlowStatement, _) { #less };
        case (#ledgerPostings, #journalEntry) { #greater };
        case (#ledgerPostings, #trialBalance) { #greater };
        case (#ledgerPostings, #balanceSheet) { #greater };
        case (#ledgerPostings, #incomeStatement) { #greater };
        case (#ledgerPostings, #cashFlowStatement) { #greater };
        case (#ledgerPostings, #ledgerPostings) { #equal };
      };
    };

    public func toText(problemType : ProblemType) : Text {
      switch (problemType) {
        case (#journalEntry) { "journalEntry" };
        case (#trialBalance) { "trialBalance" };
        case (#balanceSheet) { "balanceSheet" };
        case (#incomeStatement) { "incomeStatement" };
        case (#cashFlowStatement) { "cashFlowStatement" };
        case (#ledgerPostings) { "ledgerPostings" };
      };
    };
  };

  type ProblemId = Nat;

  type Problem = {
    id : ProblemId;
    type_ : ProblemType;
    jsonInput : Text;
    solution : Text;
    timestamp : Time.Time;
  };

  type ProblemHistory = {
    problemsEntries : [(ProblemId, Problem)];
    nextId : ProblemId;
  };

  module Problem {
    public func compare(problem1 : Problem, problem2 : Problem) : Order.Order {
      Int.compare(problem1.id, problem2.id);
    };
  };

  let emptyProblems : [(ProblemId, Problem)] = [];

  var persistentProblemStorage = Map.empty<Principal, ProblemHistory>();

  // ── User Registration ──────────────────────────────────────
  public shared ({ caller }) func registerUser() : async () {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous users cannot register");
    };
    switch (accessControlState.userRoles.get(caller)) {
      case (?_) { /* already registered */ };
      case (null) {
        if (AccessControl.hasPermission(accessControlState, caller, #admin)) {} else if (not anyAdminExists()) {
          accessControlState.userRoles.add(caller, #admin);
        } else {
          accessControlState.userRoles.add(caller, #user);
        };
      };
    };
  };

  func anyAdminExists() : Bool {
    let rolesIter = accessControlState.userRoles.values();
    rolesIter.any(func(role) { role == #admin });
  };

  public shared ({ caller }) func forceClaimAdmin() : async Bool {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous users cannot claim admin");
    };
    if (AccessControl.hasPermission(accessControlState, caller, #admin)) {
      return true;
    };
    if (not anyAdminExists()) {
      accessControlState.userRoles.add(caller, #admin);
      return true;
    };
    false;
  };

  public shared ({ caller }) func saveProblem(
    type_ : ProblemType,
    jsonInput : Text,
    solution : Text,
  ) : async () {
    if (not isUserOrAdmin(caller)) {
      Runtime.trap("Unauthorized: Must be user or admin");
    };
    let newProblem : Problem = {
      id = 0;
      type_;
      jsonInput;
      solution;
      timestamp = Time.now();
    };
    persistProblem(caller, newProblem, #persistNew);
  };

  public query ({ caller }) func getProblemHistory() : async [Problem] {
    if (not isUserOrAdmin(caller)) {
      Runtime.trap("Unauthorized: Must be user or admin");
    };
    let history = getOrCreateProblemHistory(caller);
    history.problemsEntries.map(func(entry : (ProblemId, Problem)) : Problem { entry.1 });
  };

  public shared ({ caller }) func deleteProblem(problemId : ProblemId) : async () {
    if (not isUserOrAdmin(caller)) {
      Runtime.trap("Unauthorized: Must be user or admin");
    };
    let problem = {
      id = problemId;
      type_ = #trialBalance;
      jsonInput = "";
      solution = "";
      timestamp = 0;
    };
    persistProblem(caller, problem, #persistDelete);
  };

  public query ({ caller }) func getProblem(problemId : ProblemId) : async [Problem] {
    if (not isUserOrAdmin(caller)) {
      Runtime.trap("Unauthorized: Must be user or admin");
    };
    let history = getOrCreateProblemHistory(caller);
    let currentProblems = history.problemsEntries.map(func(entry : (ProblemId, Problem)) : Problem { entry.1 });
    let matchingProblems = currentProblems.filter(func(p : Problem) : Bool { p.id == problemId });
    if (matchingProblems.isEmpty()) {
      Runtime.trap("Problem not found");
    };
    matchingProblems;
  };

  public query ({ caller }) func listProblemTypes() : async [Text] {
    if (not isUserOrAdmin(caller)) {
      Runtime.trap("Unauthorized: Must be user or admin");
    };
    [ "Journal Entry", "Trial Balance", "Balance Sheet", "Income Statement", "Cash Flow Statement", "Ledger Postings" ];
  };

  public query ({ caller }) func findProblemsByType(type_ : ProblemType) : async [Problem] {
    if (not isUserOrAdmin(caller)) {
      Runtime.trap("Unauthorized: Must be user or admin");
    };
    let history = getOrCreateProblemHistory(caller);
    let currentProblems = history.problemsEntries.map(func(entry : (ProblemId, Problem)) : Problem { entry.1 });
    currentProblems.filter(func(p : Problem) : Bool { type_ == p.type_ });
  };

  public query ({ caller }) func findProblemsByKeyword(
    keyword : Text,
  ) : async [Problem] {
    if (not isUserOrAdmin(caller)) {
      Runtime.trap("Unauthorized: Must be user or admin");
    };
    let history = getOrCreateProblemHistory(caller);
    let currentProblems = history.problemsEntries.map(func(entry : (ProblemId, Problem)) : Problem { entry.1 });
    let lowerKeyword = keyword.toLower();
    currentProblems.filter(
      func(p : Problem) : Bool {
        let interInput = p.jsonInput.toLower().contains(#text(lowerKeyword));
        let interSol = p.solution.toLower().contains(#text(lowerKeyword));
        interInput or interSol;
      }
    );
  };

  ////////////////////////
  // Customer Support   //
  ////////////////////////
  public type CustomerMessage = {
    id : Nat;
    sender : Principal;
    senderName : Text;
    message : Text;
    timestamp : Time.Time;
  };

  public type CustomerMessageWithReply = {
    id : Nat;
    sender : Principal;
    senderName : Text;
    message : Text;
    timestamp : Time.Time;
    adminReply : ?Text;
  };

  var customerMessages = List.empty<CustomerMessage>();
  var nextMessageId : Nat = 1;

  var messageReplies = Map.empty<Nat, Text>();

  func attachReply(m : CustomerMessage) : CustomerMessageWithReply {
    {
      id = m.id;
      sender = m.sender;
      senderName = m.senderName;
      message = m.message;
      timestamp = m.timestamp;
      adminReply = messageReplies.get(m.id);
    };
  };

  public shared ({ caller }) func submitCustomerMessage(
    senderName : Text,
    message : Text,
  ) : async () {
    if (not isUserOrAdmin(caller)) {
      Runtime.trap("Unauthorized: Must be user or admin");
    };
    let msg : CustomerMessage = {
      id = nextMessageId;
      sender = caller;
      senderName;
      message;
      timestamp = Time.now();
    };
    nextMessageId += 1;
    customerMessages.add(msg);
  };

  public query ({ caller }) func getCustomerMessages() : async [CustomerMessageWithReply] {
    if (not isAdmin(caller)) {
      Runtime.trap("Unauthorized: Admin only");
    };
    customerMessages.toArray().map(attachReply);
  };

  public shared ({ caller }) func replyToCustomerMessage(
    messageId : Nat,
    replyText : Text,
  ) : async () {
    if (not isAdmin(caller)) {
      Runtime.trap("Unauthorized: Admin only");
    };
    messageReplies.add(messageId, replyText);
  };

  public query ({ caller }) func getMyCustomerMessages() : async [CustomerMessageWithReply] {
    if (not isUserOrAdmin(caller)) {
      Runtime.trap("Unauthorized: Must be user or admin");
    };
    customerMessages.toArray()
      .filter(func(m : CustomerMessage) : Bool { m.sender == caller })
      .map(attachReply);
  };

  public shared ({ caller }) func deleteCustomerMessage(
    messageId : Nat,
  ) : async () {
    if (not isAdmin(caller)) {
      Runtime.trap("Unauthorized: Admin only");
    };
    let arr = customerMessages.toArray();
    let filtered = arr.filter(func(m : CustomerMessage) : Bool { m.id != messageId });
    customerMessages.clear();
    for (m in filtered.values()) {
      customerMessages.add(m);
    };
  };

  ////////////////////////
  // User Statistics    //
  ////////////////////////
  public query ({ caller }) func getUserCount() : async Nat {
    if (not isAdmin(caller)) {
      Runtime.trap("Unauthorized: Admin only");
    };
    accessControlState.userRoles.size();
  };

  public query ({ caller }) func getIsAdmin() : async Bool {
    isAdmin(caller);
  };

  ////////////////////////
  // Private helpers    //
  ////////////////////////
  func persistProblem(
    user : Principal,
    problem : Problem,
    operation : { #persistNew; #persistEdit; #persistDelete },
  ) {
    let currentHistory = getOrCreateProblemHistory(user);
    let persistentProblems = currentHistory.problemsEntries.map(func(entry : (ProblemId, Problem)) : Problem { entry.1 });
    switch (operation) {
      case (#persistNew) {
        let id = currentHistory.nextId;
        let newProblemWithId = { problem with id };
        let finalProblems = persistentProblems.concat([newProblemWithId]);
        persistProblemHistory(user, finalProblems, id + 1);
      };
      case (#persistEdit) {
        let (updatedProblems, hasChanges) = updateProblemById(
          persistentProblems,
          problem.id,
          func(p : Problem) : Problem { problem },
        );
        if (not hasChanges) { Runtime.trap("Problem not found") };
        persistProblemHistory(user, updatedProblems, currentHistory.nextId);
      };
      case (#persistDelete) {
        let (filteredProblems, removedCount) = filterWithCount(
          persistentProblems,
          func(p : Problem) : Bool { p.id != problem.id },
        );
        if (removedCount == 0) { Runtime.trap("Problem not found") };
        persistProblemHistory(user, filteredProblems, currentHistory.nextId);
      };
    };
  };

  func filterWithCount(array : [Problem], predicate : Problem -> Bool) : ([Problem], Nat) {
    let filteredArray = array.filter(predicate);
    let originalLength = array.size();
    let filteredLength = filteredArray.size();
    let removedCount = if (filteredLength <= originalLength) { originalLength - filteredLength } else { 0 };
    (filteredArray, removedCount);
  };

  func persistProblemHistory(
    user : Principal,
    problems : [Problem],
    nextId : ProblemId,
  ) {
    persistentProblemStorage.add(
      user,
      {
        problemsEntries = toPersistentProblems(problems);
        nextId;
      },
    );
  };

  func toPersistentProblems(problems : [Problem]) : [(ProblemId, Problem)] {
    let persistentProblems = List.empty<(ProblemId, Problem)>();
    for (problem in problems.values()) {
      persistentProblems.add((problem.id, problem));
    };
    persistentProblems.toArray();
  };

  func updateProblemById(
    problems : [Problem],
    problemId : ProblemId,
    updateFunction : Problem -> Problem,
  ) : ([Problem], Bool) {
    var hasChanges = false;
    let updatedProblems = problems.map(
      func(p : Problem) : Problem {
        if (p.id == problemId) {
          hasChanges := true;
          updateFunction(p);
        } else { p };
      }
    );
    (updatedProblems, hasChanges);
  };

  func getOrCreateProblemHistory(user : Principal) : ProblemHistory {
    switch (persistentProblemStorage.get(user)) {
      case (null) { { problemsEntries = emptyProblems; nextId = 1 } };
      case (?problems) { problems };
    };
  };

  func isUserOrAdmin(caller : Principal) : Bool {
    if (caller.isAnonymous()) { return false };
    isUser(caller) or isAdmin(caller);
  };

  func isUser(caller : Principal) : Bool {
    if (caller.isAnonymous()) { return false };
    AccessControl.hasPermission(accessControlState, caller, #user);
  };

  func isAdmin(caller : Principal) : Bool {
    if (caller.isAnonymous()) { return false };
    AccessControl.hasPermission(accessControlState, caller, #admin);
  };

  // ── Quiz Mode ────────────────────────────────────────────────
  public type QuizQuestion = {
    id : Nat;
    question : Text;
    optionA : Text;
    optionB : Text;
    optionC : Text;
    optionD : Text;
    correctIndex : Nat;
    topic : Text;
    explanation : Text;
    isAdminAdded : Bool;
  };

  public type QuizResult = {
    id : Nat;
    topic : Text;
    score : Nat;
    total : Nat;
    timestamp : Time.Time;
    wrongQuestionIds : [Nat];
  };

  var quizQuestions = Map.empty<Nat, QuizQuestion>();
  var nextQuizQuestionId : Nat = 1;
  var userQuizResults = Map.empty<Principal, [QuizResult]>();

  // Predefined quiz questions
  let predefinedQuestions : [QuizQuestion] = [
    // Accountancy (20)
    {
      id = 0;
      question = "What is the primary objective of financial accounting?";
      optionA = "To maximize profits";
      optionB = "To provide information to stakeholders";
      optionC = "To manage cash flow";
      optionD = "To reduce taxes";
      correctIndex = 1;
      topic = "journal";
      explanation = "Financial accounting aims to provide useful information to various stakeholders.";
      isAdminAdded = false;
    },
    {
      id = 0;
      question = "Which of the following is NOT a type of partnership?";
      optionA = "General partnership";
      optionB = "Limited partnership";
      optionC = "Joint stock partnership";
      optionD = "Sleeping partnership";
      correctIndex = 2;
      topic = "partnership";
      explanation = "Joint stock partnership is not a recognized form of partnership.";
      isAdminAdded = false;
    },
    {
      id = 0;
      question = "Depreciation is related to which type of asset?";
      optionA = "Current assets";
      optionB = "Fixed assets";
      optionC = "Intangible assets";
      optionD = "Liabilities";
      correctIndex = 1;
      topic = "depreciation";
      explanation = "Depreciation applies to fixed assets like machinery, buildings, etc.";
      isAdminAdded = false;
    },
    {
      id = 0;
      question = "What does NPO stand for?";
      optionA = "National Profit Organization";
      optionB = "Non-Profit Organization";
      optionC = "New Partner Organization";
      optionD = "None of the above";
      correctIndex = 1;
      topic = "npo";
      explanation = "NPO stands for Non-Profit Organization.";
      isAdminAdded = false;
    },
    {
      id = 0;
      question = "Which financial statement shows a company's financial position at a specific point in time?";
      optionA = "Income Statement";
      optionB = "Cash Flow Statement";
      optionC = "Balance Sheet";
      optionD = "Profit & Loss Account";
      correctIndex = 2;
      topic = "company";
      explanation = "Balance Sheet provides a snapshot of a company's financial position.";
      isAdminAdded = false;
    },
    {
      id = 0;
      question = "Cash flow statement is primarily prepared for which purpose?";
      optionA = "To calculate profits";
      optionB = "To track cash inflows and outflows";
      optionC = "To calculate depreciation";
      optionD = "To analyze equity";
      correctIndex = 1;
      topic = "cashflow";
      explanation = "Cash flow statement tracks the movement of cash in and out of business.";
      isAdminAdded = false;
    },
    {
      id = 0;
      question = "In a balance sheet, assets are equal to:";
      optionA = "Liabilities minus owner's equity";
      optionB = "Income plus expenses";
      optionC = "Liabilities plus owner's equity";
      optionD = "Cash flow plus liabilities";
      correctIndex = 2;
      topic = "balance";
      explanation = "Assets = Liabilities + Owner's Equity is the basic accounting equation.";
      isAdminAdded = false;
    },
    {
      id = 0;
      question = "Ledger is:";
      optionA = "A book of original entry";
      optionB = "A book of final entry";
      optionC = "A balance sheet";
      optionD = "A trial balance";
      correctIndex = 1;
      topic = "ledger";
      explanation = "Ledger is a book of final entry where accounts are maintained.";
      isAdminAdded = false;
    },
    {
      id = 0;
      question = "Appropriation account is prepared in case of:";
      optionA = "Sole proprietorship";
      optionB = "Non-profit organization";
      optionC = "Partnership firm";
      optionD = "Government companies";
      correctIndex = 2;
      topic = "appropriation";
      explanation = "Appropriation account is prepared to distribute profits among partners.";
      isAdminAdded = false;
    },
    {
      id = 0;
      question = "Which account is debited when goods are sold for cash?";
      optionA = "Sales Account";
      optionB = "Cash Account";
      optionC = "Capital Account";
      optionD = "Purchases Account";
      correctIndex = 1;
      topic = "journal";
      explanation = "Cash account is debited because cash is coming in.";
      isAdminAdded = false;
    },
    {
      id = 0;
      question = "Goodwill is classified as:";
      optionA = "Current asset";
      optionB = "Intangible asset";
      optionC = "Liability";
      optionD = "Equity";
      correctIndex = 1;
      topic = "partnership";
      explanation = "Goodwill is an intangible asset.";
      isAdminAdded = false;
    },
    {
      id = 0;
      question = "Straight-line method of depreciation is also known as:";
      optionA = "Written-down value method";
      optionB = "Reducing balance method";
      optionC = "Fixed installment method";
      optionD = "Depletion method";
      correctIndex = 2;
      topic = "depreciation";
      explanation = "Straight-line method = Fixed installment method.";
      isAdminAdded = false;
    },
    {
      id = 0;
      question = "Which of the following is a source of income for NPO?";
      optionA = "Dividends";
      optionB = "Subscription";
      optionC = "Interest income";
      optionD = "Rental income";
      correctIndex = 1;
      topic = "npo";
      explanation = "Subscription fees collected from members are primary source for NPOs.";
      isAdminAdded = false;
    },
    {
      id = 0;
      question = "Equity share capital appears on which side of balance sheet?";
      optionA = "Assets";
      optionB = "Liability";
      optionC = "Both";
      optionD = "None";
      correctIndex = 1;
      topic = "company";
      explanation = "Equity share capital is a liability for company.";
      isAdminAdded = false;
    },
    {
      id = 0;
      question = "Cash flow from investing activities includes:";
      optionA = "Issuing shares";
      optionB = "Purchasing machinery";
      optionC = "Repayment of loan";
      optionD = "Payment of wages";
      correctIndex = 1;
      topic = "cashflow";
      explanation = "Investing activities include purchase or sale of assets like machinery, land, etc.";
      isAdminAdded = false;
    },
    {
      id = 0;
      question = "Trial balance is prepared to:";
      optionA = "Check arithmetical accuracy";
      optionB = "Calculate profit";
      optionC = "Prepare cash book";
      optionD = "Analyze ratio";
      correctIndex = 1;
      topic = "balance";
      explanation = "Trial balance is used to ensure correct totals of debits and credits.";
      isAdminAdded = false;
    },
    {
      id = 0;
      question = "Which account records all daily monetary transactions permanently?";
      optionA = "Ledger";
      optionB = "Cash book";
      optionC = "Trial balance";
      optionD = "Balance sheet";
      correctIndex = 0;
      topic = "ledger";
      explanation = "Ledger keeps permanent records after entering in cash book.";
      isAdminAdded = false;
    },
    {
      id = 0;
      question = "Profit appropriation takes place after:";
      optionA = "Distribution of shares";
      optionB = "Preparation of income statement";
      optionC = "Calculation of cash flow";
      optionD = "Adjustment entries";
      correctIndex = 1;
      topic = "appropriation";
      explanation = "After preparing income statement, profits are appropriated.";
      isAdminAdded = false;
    },
    {
      id = 0;
      question = "Debit entry in cash book means:";
      optionA = "Cash coming in";
      optionB = "Cash going out";
      optionC = "Issue of shares";
      optionD = "Loss incurred";
      correctIndex = 0;
      topic = "journal";
      explanation = "Debit entries show increase in assets or expense.";
      isAdminAdded = false;
    },
    {
      id = 0;
      question = "Revaluation account is prepared during:";
      optionA = "Formation of company";
      optionB = "Change in partnership";
      optionC = "Admission of new member in NPO";
      optionD = "Issuing shares";
      correctIndex = 1;
      topic = "partnership";
      explanation = "Revaluation account is used during changes in partnership structure.";
      isAdminAdded = false;
    },
    {
      id = 0;
      question = "Depreciation arises due to:";
      optionA = "Obsolescence";
      optionB = "Working conditions";
      optionC = "Economic factors";
      optionD = "All of above";
      correctIndex = 3;
      topic = "depreciation";
      explanation = "Depreciation is caused by all given factors.";
      isAdminAdded = false;
    },
    // Physics 11+12 (5)
    {
      id = 0;
      question = "Newton's first law is also known as:";
      optionA = "Law of acceleration";
      optionB = "Law of action-reaction";
      optionC = "Law of inertia";
      optionD = "Law of gravity";
      correctIndex = 2;
      topic = "physics_11";
      explanation = "Newton's first law describes inertia.";
      isAdminAdded = false;
    },
    {
      id = 0;
      question = "Optical lenses work based on:";
      optionA = "Diffraction";
      optionB = "Refraction";
      optionC = "Reflection";
      optionD = "Polarization";
      correctIndex = 1;
      topic = "physics_12";
      explanation = "Lenses refract light.";
      isAdminAdded = false;
    },
    {
      id = 0;
      question = "What is the SI unit of pressure?";
      optionA = "Joule";
      optionB = "Watt";
      optionC = "Newton";
      optionD = "Pascal";
      correctIndex = 3;
      topic = "physics_11";
      explanation = "Pressure is measured in Pascals.";
      isAdminAdded = false;
    },
    {
      id = 0;
      question = "Wave frequency is measured in:";
      optionA = "Newtons";
      optionB = "Hertz";
      optionC = "Joules";
      optionD = "Volts";
      correctIndex = 1;
      topic = "physics_11";
      explanation = "Frequency is measured in Hertz (Hz).";
      isAdminAdded = false;
    },
    {
      id = 0;
      question = "Which is a form of electromagnetic wave?";
      optionA = "Water wave";
      optionB = "Sound wave";
      optionC = "Light wave";
      optionD = "Seismic wave";
      correctIndex = 2;
      topic = "physics_12";
      explanation = "Light is an electromagnetic wave.";
      isAdminAdded = false;
    },
    // Chemistry 11+12 (5)
    {
      id = 0;
      question = "The atomic number represents the number of:";
      optionA = "Protons";
      optionB = "Electrons";
      optionC = "Neutrons";
      optionD = "Isotopes";
      correctIndex = 0;
      topic = "chemistry_11";
      explanation = "Atomic number = protons.";
      isAdminAdded = false;
    },
    {
      id = 0;
      question = "What type of bond is found in table salt (NaCl)?";
      optionA = "Covalent bond";
      optionB = "Ionic bond";
      optionC = "Metallic bond";
      optionD = "Hydrogen bond";
      correctIndex = 1;
      topic = "chemistry_12";
      explanation = "NaCl is an example of ionic bonding.";
      isAdminAdded = false;
    },
    {
      id = 0;
      question = "Organic chemistry mainly deals with:";
      optionA = "Metals";
      optionB = "Hydrocarbons";
      optionC = "Salts";
      optionD = "Ions";
      correctIndex = 1;
      topic = "chemistry_12";
      explanation = "Organic chemistry studies carbon compounds.";
      isAdminAdded = false;
    },
    {
      id = 0;
      question = "Which is a strong acid?";
      optionA = "HCl";
      optionB = "NaOH";
      optionC = "KOH";
      optionD = "NaCl";
      correctIndex = 0;
      topic = "chemistry_11";
      explanation = "HCl (hydrochloric acid) is a strong acid.";
      isAdminAdded = false;
    },
    {
      id = 0;
      question = "Universal solvent is:";
      optionA = "Ethanol";
      optionB = "Ammonia";
      optionC = "Water";
      optionD = "Benzene";
      correctIndex = 2;
      topic = "chemistry_11";
      explanation = "Water is called the universal solvent.";
      isAdminAdded = false;
    },
    // Biology 11+12 (5)
    {
      id = 0;
      question = "Smallest living unit in body is:";
      optionA = "Tissue";
      optionB = "Cell";
      optionC = "Organ";
      optionD = "Nucleus";
      correctIndex = 1;
      topic = "biology_11";
      explanation = "Cell is the smallest unit of life.";
      isAdminAdded = false;
    },
    {
      id = 0;
      question = "Transfer of genetic information involves:";
      optionA = "Proteins";
      optionB = "Carbohydrates";
      optionC = "DNA";
      optionD = "Lipids";
      correctIndex = 2;
      topic = "biology_12";
      explanation = "DNA carries genetic information.";
      isAdminAdded = false;
    },
    {
      id = 0;
      question = "Study of ecosystems is called:";
      optionA = "Botany";
      optionB = "Physiology";
      optionC = "Ecology";
      optionD = "Zoology";
      correctIndex = 2;
      topic = "biology_11";
      explanation = "Ecosystem study = ecology.";
      isAdminAdded = false;
    },
    {
      id = 0;
      question = "Photosynthesis produces:";
      optionA = "Glucose";
      optionB = "Oxygen";
      optionC = "Carbon dioxide";
      optionD = "Water";
      correctIndex = 0;
      topic = "biology_11";
      explanation = "Photosynthesis mainly creates glucose.";
      isAdminAdded = false;
    },
    {
      id = 0;
      question = "Basis of classification is known as:";
      optionA = "Taxonomy";
      optionB = "Anatomy";
      optionC = "Morphology";
      optionD = "Genotype";
      correctIndex = 0;
      topic = "biology_12";
      explanation = "Basis of classification is taxonomy.";
      isAdminAdded = false;
    },
    // Math 11+12 (5)
    {
      id = 0;
      question = "Study of sets is called:";
      optionA = "Algebra";
      optionB = "Geometry";
      optionC = "Set theory";
      optionD = "Matrix algebra";
      correctIndex = 2;
      topic = "math_11";
      explanation = "Study of sets is set theory.";
      isAdminAdded = false;
    },
    {
      id = 0;
      question = "What is the value of sin(90 degrees)?";
      optionA = "0";
      optionB = "1";
      optionC = "Infinity";
      optionD = "-1";
      correctIndex = 1;
      topic = "math_11";
      explanation = "Sin(90 degrees) = 1.";
      isAdminAdded = false;
    },
    {
      id = 0;
      question = "Derivative represents:";
      optionA = "Area";
      optionB = "Slope";
      optionC = "Volume";
      optionD = "Angle";
      correctIndex = 1;
      topic = "math_12";
      explanation = "Derivative = slope of curve.";
      isAdminAdded = false;
    },
    {
      id = 0;
      question = "Which is a quadratic equation?";
      optionA = "ax + b = 0";
      optionB = "ax^2 + bx + c = 0";
      optionC = "ax^3 + bx^2 + c = 0";
      optionD = "ax^4 + bx^2 = 0";
      correctIndex = 1;
      topic = "math_11";
      explanation = "Quadratic means x squared.";
      isAdminAdded = false;
    },
    {
      id = 0;
      question = "Numerator of a fraction is divided by:";
      optionA = "Array";
      optionB = "Numerator";
      optionC = "Denominator";
      optionD = "Factor";
      correctIndex = 2;
      topic = "math_12";
      explanation = "Numerator/denominator makes a fraction.";
      isAdminAdded = false;
    },
  ];

  // Initialize questions on first deployment
  for (q in predefinedQuestions.values()) {
    let newQuestion = { q with id = nextQuizQuestionId };
    quizQuestions.add(nextQuizQuestionId, newQuestion);
    nextQuizQuestionId += 1;
  };

  public shared ({ caller }) func addAdminQuestion(
    question : Text,
    optionA : Text,
    optionB : Text,
    optionC : Text,
    optionD : Text,
    correctIndex : Nat,
    topic : Text,
    explanation : Text,
  ) : async () {
    if (not isAdmin(caller)) {
      Runtime.trap("Unauthorized: Admin only");
    };

    let newQuestion : QuizQuestion = {
      id = nextQuizQuestionId;
      question;
      optionA;
      optionB;
      optionC;
      optionD;
      correctIndex;
      topic;
      explanation;
      isAdminAdded = true;
    };

    quizQuestions.add(nextQuizQuestionId, newQuestion);
    nextQuizQuestionId += 1;
  };

  public query ({ caller }) func getQuizQuestions(topic : ?Text) : async [QuizQuestion] {
    if (not isUserOrAdmin(caller)) {
      Runtime.trap("Unauthorized: Must be user or admin");
    };

    switch (topic) {
      case (null) {
        quizQuestions.values().toArray();
      };
      case (?topicText) {
        quizQuestions.values().toArray().filter(
          func(q) {
            q.topic.toLower().contains(#text(topicText.toLower()));
          }
        );
      };
    };
  };

  public shared ({ caller }) func deleteQuizQuestion(id : Nat) : async () {
    if (not isAdmin(caller)) {
      Runtime.trap("Unauthorized: Admin only");
    };
    if (not quizQuestions.containsKey(id)) {
      Runtime.trap("Question not found");
    };
    quizQuestions.remove(id);
  };

  public shared ({ caller }) func saveQuizResult(
    topic : Text,
    score : Nat,
    total : Nat,
    wrongQuestionIds : [Nat],
  ) : async () {
    if (not isUserOrAdmin(caller)) {
      Runtime.trap("Unauthorized: Must be user or admin");
    };

    let userResults = switch (userQuizResults.get(caller)) {
      case (null) { [] };
      case (?results) { results };
    };

    let newResult : QuizResult = {
      id = userResults.size() + 1;
      topic;
      score;
      total;
      timestamp = Time.now();
      wrongQuestionIds;
    };

    let updatedResults = [newResult].concat(userResults);
    userQuizResults.add(caller, updatedResults);
  };

  public query ({ caller }) func getQuizHistory() : async [QuizResult] {
    if (not isUserOrAdmin(caller)) {
      Runtime.trap("Unauthorized: Must be user or admin");
    };

    switch (userQuizResults.get(caller)) {
      case (null) { [] };
      case (?results) { results };
    };
  };

  /// PREMIUM NOTES SYSTEM ///
  public type PremiumNote = {
    id : Nat;
    title : Text;
    subject : Text;
    content : Text;
    createdAt : Time.Time;
  };

  public type NoteAccessRequest = {
    id : Nat;
    userId : Principal;
    userName : Text;
    message : Text;
    requestedAt : Time.Time;
    status : Text; // "pending" | "approved" | "rejected"
  };

  var premiumNotes = Map.empty<Nat, PremiumNote>();
  var nextNoteId = 1;
  var nextRequestId = 1;
  var noteAccessRequests = Map.empty<Nat, NoteAccessRequest>();
  var approvedNoteUsers = Set.empty<Principal>();

  public shared ({ caller }) func addPremiumNote(
    title : Text,
    subject : Text,
    content : Text,
  ) : async Nat {
    if (not isAdmin(caller)) {
      Runtime.trap("Unauthorized: Admin only");
    };
    let note : PremiumNote = {
      id = nextNoteId;
      title;
      subject;
      content;
      createdAt = Time.now();
    };
    premiumNotes.add(nextNoteId, note);
    nextNoteId += 1;
    note.id;
  };

  public shared ({ caller }) func editPremiumNote(
    id : Nat,
    title : Text,
    subject : Text,
    content : Text,
  ) : async () {
    if (not isAdmin(caller)) {
      Runtime.trap("Unauthorized: Admin only");
    };
    switch (premiumNotes.get(id)) {
      case (null) { Runtime.trap("Premium note not found") };
      case (?oldNote) {
        let updatedNote : PremiumNote = {
          id;
          title;
          subject;
          content;
          createdAt = oldNote.createdAt;
        };
        premiumNotes.add(id, updatedNote);
      };
    };
  };

  public shared ({ caller }) func deletePremiumNote(id : Nat) : async () {
    if (not isAdmin(caller)) {
      Runtime.trap("Unauthorized: Admin only");
    };
    if (not premiumNotes.containsKey(id)) {
      Runtime.trap("Premium note not found");
    };
    premiumNotes.remove(id);
  };

  public query ({ caller }) func getPremiumNotesList() : async [PremiumNote] {
    if (not isUserOrAdmin(caller)) {
      Runtime.trap("Unauthorized: Must be user or admin");
    };
    let notes = premiumNotes.values().toArray();
    notes.map(
      func(note) {
        {
          note with content = "";
        };
      }
    );
  };

  public query ({ caller }) func getPremiumNotesWithContent() : async [PremiumNote] {
    if (not hasPremiumAccess(caller)) {
      Runtime.trap("Unauthorized: Premium notes access only");
    };
    premiumNotes.values().toArray();
  };

  public shared ({ caller }) func requestNotesAccess(message : Text) : async Nat {
    if (not isUserOrAdmin(caller)) {
      Runtime.trap("Unauthorized: Must be user or admin");
    };
    if (hasPremiumAccess(caller)) {
      Runtime.trap("User already has premium notes access");
    };

    let userName = switch (userProfiles.get(caller)) {
      case (null) { "User" };
      case (?profile) { profile.name };
    };

    let accessRequest : NoteAccessRequest = {
      id = nextRequestId;
      userId = caller;
      userName;
      message;
      requestedAt = Time.now();
      status = "pending";
    };

    noteAccessRequests.add(nextRequestId, accessRequest);
    nextRequestId += 1;
    accessRequest.id;
  };

  public query ({ caller }) func getMyAccessStatus() : async Text {
    if (not isUserOrAdmin(caller)) {
      Runtime.trap("Unauthorized: Must be user or admin");
    };
    if (hasPremiumAccess(caller)) {
      return "approved";
    };

    let requests = noteAccessRequests.values().toArray().filter(func(r) { r.userId == caller });
    if (requests.isEmpty()) {
      return "none";
    };

    let latestRequest = findMaxRequestByRequestedAt(requests);
    latestRequest.status;
  };

  public query ({ caller }) func getAllAccessRequests() : async [NoteAccessRequest] {
    if (not isAdmin(caller)) {
      Runtime.trap("Unauthorized: Admin only");
    };
    noteAccessRequests.values().toArray();
  };

  public shared ({ caller }) func approveAccessRequest(userId : Principal) : async () {
    if (not isAdmin(caller)) {
      Runtime.trap("Unauthorized: Admin only");
    };

    let requests = noteAccessRequests.values().toArray().filter(func(r) { r.userId == userId });
    if (requests.isEmpty()) {
      Runtime.trap("Access request not found for user " # debug_show (userId));
    };

    let latestRequest = findMaxRequestByRequestedAt(requests);
    updateRequestStatus(latestRequest, "approved");
    approvedNoteUsers.add(userId);
  };

  public shared ({ caller }) func rejectAccessRequest(userId : Principal) : async () {
    if (not isAdmin(caller)) {
      Runtime.trap("Unauthorized: Admin only");
    };

    let requests = noteAccessRequests.values().toArray().filter(func(r) { r.userId == userId });
    if (requests.isEmpty()) {
      Runtime.trap("Access request not found for user " # debug_show (userId));
    };

    let latestRequest = findMaxRequestByRequestedAt(requests);
    updateRequestStatus(latestRequest, "rejected");
  };

  public shared ({ caller }) func revokeAccess(userId : Principal) : async () {
    if (not isAdmin(caller)) {
      Runtime.trap("Unauthorized: Admin only");
    };

    if (not approvedNoteUsers.contains(userId)) {
      Runtime.trap("User does not have premium notes access");
    };

    approvedNoteUsers.remove(userId);
  };

  func hasPremiumAccess(userId : Principal) : Bool {
    approvedNoteUsers.contains(userId);
  };

  func updateRequestStatus(request : NoteAccessRequest, newStatus : Text) {
    let updatedRequest : NoteAccessRequest = {
      request with status = newStatus;
    };
    noteAccessRequests.add(request.id, updatedRequest);
  };

  func findMaxRequestByRequestedAt(requests : [NoteAccessRequest]) : NoteAccessRequest {
    if (requests.isEmpty()) {
      Runtime.trap("No requests found");
    };
    var maxRequest = requests[0];
    var maxRequestedAt = requests[0].requestedAt;
    let size = requests.size();
    var i = 1;
    while (i < size) {
      let current = requests[i];
      if (current.requestedAt > maxRequestedAt) {
        maxRequest := current;
        maxRequestedAt := current.requestedAt;
      };
      i += 1;
    };
    maxRequest;
  };

  system func preupgrade() {
    _stableUserRoles := accessControlState.userRoles.entries().toArray();
    _stableAdminAssigned := accessControlState.adminAssigned;
    _stableUserProfiles := userProfiles.entries().toArray();
    _stableCustomerMessages := customerMessages.toArray();
    _stableMessageReplies := messageReplies.entries().toArray();
    _stableNextMessageId := nextMessageId;
    _stablePremiumNotes := premiumNotes.entries().toArray();
    _stableNextNoteId := nextNoteId;
    _stableNoteAccessRequests := noteAccessRequests.entries().toArray();
    _stableNextRequestId := nextRequestId;
    _stableApprovedNoteUsers := approvedNoteUsers.toArray();
    _stableQuizQuestions := quizQuestions.entries().toArray();
    _stableNextQuizQuestionId := nextQuizQuestionId;
    _stableUserQuizResults := userQuizResults.entries().toArray();
  };

  system func postupgrade() {
    for ((k, v) in _stableUserRoles.vals()) {
      accessControlState.userRoles.add(k, v);
    };
    accessControlState.adminAssigned := _stableAdminAssigned;
    for ((k, v) in _stableUserProfiles.vals()) {
      userProfiles.add(k, v);
    };
    for (m in _stableCustomerMessages.vals()) {
      customerMessages.add(m);
    };
    for ((k, v) in _stableMessageReplies.vals()) {
      messageReplies.add(k, v);
    };
    nextMessageId := _stableNextMessageId;
    for ((k, v) in _stablePremiumNotes.vals()) {
      premiumNotes.add(k, v);
    };
    nextNoteId := _stableNextNoteId;
    for ((k, v) in _stableNoteAccessRequests.vals()) {
      noteAccessRequests.add(k, v);
    };
    nextRequestId := _stableNextRequestId;
    for (p in _stableApprovedNoteUsers.vals()) {
      approvedNoteUsers.add(p);
    };
    for ((k, v) in _stableQuizQuestions.vals()) {
      quizQuestions.add(k, v);
    };
    nextQuizQuestionId := _stableNextQuizQuestionId;
    for ((k, v) in _stableUserQuizResults.vals()) {
      userQuizResults.add(k, v);
    };
  };
};
