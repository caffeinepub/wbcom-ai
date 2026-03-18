import Map "mo:core/Map";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import List "mo:core/List";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Int "mo:core/Int";
import Iter "mo:core/Iter";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Authorization state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Type
  public type UserProfile = {
    name : Text;
    studentId : ?Text;
    institution : ?Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

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

  // Problem Types
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

  module Problem {
    public func compare(problem1 : Problem, problem2 : Problem) : Order.Order {
      Int.compare(problem1.id, problem2.id);
    };
  };

  type ProblemHistory = {
    problemsEntries : [(ProblemId, Problem)];
    nextId : ProblemId;
  };

  let emptyProblems : [(ProblemId, Problem)] = [];

  let persistentProblemStorage = Map.empty<Principal, ProblemHistory>();

  // ── User Registration ──────────────────────────────────────
  public shared ({ caller }) func registerUser() : async () {
    if (caller.isAnonymous()) { return };
    switch (accessControlState.userRoles.get(caller)) {
      case (?_) { /* already registered */ };
      case (null) {
        if (AccessControl.hasPermission(accessControlState, caller, #admin)) {
        } else if (not anyAdminExists()) {
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
    if (caller.isAnonymous()) { return false };
    if (AccessControl.hasPermission(accessControlState, caller, #admin)) {
      return true;
    };
    if (not anyAdminExists()) {
      accessControlState.userRoles.add(caller, #admin);
      return true;
    };
    false;
  };

  public shared ({ caller }) func saveProblem(type_ : ProblemType, jsonInput : Text, solution : Text) : async () {
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

  public query ({ caller }) func findProblemsByKeyword(keyword : Text) : async [Problem] {
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

  // ── Customer Support Messages ──────────────────────────────
  //
  // IMPORTANT: CustomerMessage type is kept WITHOUT adminReply to stay
  // compatible with existing stable storage. Admin replies are stored
  // separately in `messageReplies` map keyed by message id.

  public type CustomerMessage = {
    id : Nat;
    sender : Principal;
    senderName : Text;
    message : Text;
    timestamp : Time.Time;
  };

  // The public-facing type that includes the reply field
  public type CustomerMessageWithReply = {
    id : Nat;
    sender : Principal;
    senderName : Text;
    message : Text;
    timestamp : Time.Time;
    adminReply : ?Text;
  };

  let customerMessages = List.empty<CustomerMessage>();
  var nextMessageId : Nat = 1;

  // Separate stable map for admin replies (avoids migration issue)
  let messageReplies = Map.empty<Nat, Text>();

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

  public shared ({ caller }) func submitCustomerMessage(senderName : Text, message : Text) : async () {
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

  public shared ({ caller }) func replyToCustomerMessage(messageId : Nat, replyText : Text) : async () {
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

  public shared ({ caller }) func deleteCustomerMessage(messageId : Nat) : async () {
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

  // ── User Statistics ────────────────────────────────────────

  public query ({ caller }) func getUserCount() : async Nat {
    if (not isAdmin(caller)) {
      Runtime.trap("Unauthorized: Admin only");
    };
    accessControlState.userRoles.size();
  };

  public query ({ caller }) func getIsAdmin() : async Bool {
    isAdmin(caller);
  };

  // ── Private helpers ────────────────────────────────────────

  func persistProblem(user : Principal, problem : Problem, operation : { #persistNew; #persistEdit; #persistDelete }) {
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
        let (updatedProblems, hasChanges) = updateProblemById(persistentProblems, problem.id, func(p : Problem) : Problem { problem });
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

  func persistProblemHistory(user : Principal, problems : [Problem], nextId : ProblemId) {
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

  func updateProblemById(problems : [Problem], problemId : ProblemId, updateFunction : Problem -> Problem) : ([Problem], Bool) {
    var hasChanges = false;
    let updatedProblems = problems.map(func(p : Problem) : Problem { if (p.id == problemId) { hasChanges := true; updateFunction(p) } else { p } });
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

  let quizQuestions = Map.empty<Nat, QuizQuestion>();
  var nextQuizQuestionId : Nat = 1;

  let userQuizResults = Map.empty<Principal, [QuizResult]>();

  // Initialize predefined questions at actor startup
  let predefinedQuestions : [QuizQuestion] = [
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
};
