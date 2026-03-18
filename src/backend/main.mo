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

  public query ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
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
};
