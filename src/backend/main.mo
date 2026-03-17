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

  // User Profile Management Functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not isAdminSafe(caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
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

  // Persistent storage for user problems
  type ProblemHistory = {
    problemsEntries : [(ProblemId, Problem)];
    nextId : ProblemId;
  };

  let emptyProblems : [(ProblemId, Problem)] = [];

  let persistentProblemStorage = Map.empty<Principal, ProblemHistory>();

  // ── User Registration ──────────────────────────────────────
  // Registers the caller as a user.
  // If the caller already has admin permission (via MixinAuthorization token),
  // we do NOT downgrade them. If no admin exists yet and none is set via token,
  // the first caller becomes admin.
  public shared ({ caller }) func registerUser() : async () {
    if (caller.isAnonymous()) { return };
    switch (accessControlState.userRoles.get(caller)) {
      case (?_) { /* already registered, do nothing */ };
      case (null) {
        // If caller is already admin via MixinAuthorization token, preserve that role
        if (AccessControl.hasPermission(accessControlState, caller, #admin)) {
          // Already admin via token-based initialization, ensure adminAssigned is true
          accessControlState.adminAssigned := true;
        } else if (not accessControlState.adminAssigned) {
          // No admin yet — first caller becomes admin
          accessControlState.userRoles.add(caller, #admin);
          accessControlState.adminAssigned := true;
        } else {
          // Regular user
          accessControlState.userRoles.add(caller, #user);
        };
      };
    };
  };

  // Allows the current user to claim admin if:
  // 1. No admin is assigned yet, OR
  // 2. They already have admin permission via MixinAuthorization
  public shared ({ caller }) func forceClaimAdmin() : async Bool {
    if (caller.isAnonymous()) { return false };
    if (AccessControl.hasPermission(accessControlState, caller, #admin)) {
      // Already admin
      accessControlState.adminAssigned := true;
      return true;
    };
    if (not accessControlState.adminAssigned) {
      accessControlState.userRoles.add(caller, #admin);
      accessControlState.adminAssigned := true;
      return true;
    };
    false;
  };

  public shared ({ caller }) func saveProblem(type_ : ProblemType, jsonInput : Text, solution : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save problems");
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
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their history");
    };
    let history = getOrCreateProblemHistory(caller);
    history.problemsEntries.map(func(entry : (ProblemId, Problem)) : Problem { entry.1 });
  };

  public shared ({ caller }) func deleteProblem(problemId : ProblemId) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can delete problems");
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
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access problems");
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
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can see problem types");
    };
    [ "Journal Entry", "Trial Balance", "Balance Sheet", "Income Statement", "Cash Flow Statement", "Ledger Postings" ];
  };

  public query ({ caller }) func findProblemsByType(type_ : ProblemType) : async [Problem] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can search problems");
    };

    let history = getOrCreateProblemHistory(caller);
    let currentProblems = history.problemsEntries.map(func(entry : (ProblemId, Problem)) : Problem { entry.1 });

    currentProblems.filter(
      func(p : Problem) : Bool { type_ == p.type_ },
    );
  };

  public query ({ caller }) func findProblemsByKeyword(keyword : Text) : async [Problem] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can search problems");
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

  public type CustomerMessage = {
    id : Nat;
    sender : Principal;
    senderName : Text;
    message : Text;
    timestamp : Time.Time;
  };

  let customerMessages = List.empty<CustomerMessage>();
  var nextMessageId : Nat = 1;

  public shared ({ caller }) func submitCustomerMessage(senderName : Text, message : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Please login to send a message");
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

  public query ({ caller }) func getCustomerMessages() : async [CustomerMessage] {
    if (not isAdminSafe(caller)) {
      Runtime.trap("Unauthorized: Admin only");
    };
    customerMessages.toArray();
  };

  // ── User Statistics ────────────────────────────────────────

  public query ({ caller }) func getUserCount() : async Nat {
    if (not isAdminSafe(caller)) {
      Runtime.trap("Unauthorized: Admin only");
    };
    userProfiles.size();
  };

  // Safe admin check — uses AccessControl.hasPermission for consistent results
  public query ({ caller }) func getIsAdmin() : async Bool {
    isAdminSafe(caller);
  };

  func isAdminSafe(caller : Principal) : Bool {
    if (caller.isAnonymous()) { return false };
    // Use AccessControl.hasPermission for consistent check across MixinAuthorization
    AccessControl.hasPermission(accessControlState, caller, #admin);
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
};
