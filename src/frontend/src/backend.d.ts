import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface PremiumNote {
    id: bigint;
    title: string;
    content: string;
    subject: string;
    createdAt: Time;
}
export type Time = bigint;
export interface QuizQuestion {
    id: bigint;
    topic: string;
    question: string;
    isAdminAdded: boolean;
    correctIndex: bigint;
    explanation: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
}
export interface NoteAccessRequest {
    id: bigint;
    status: string;
    userName: string;
    userId: Principal;
    message: string;
    requestedAt: Time;
}
export interface Problem {
    id: ProblemId;
    type: ProblemType;
    jsonInput: string;
    solution: string;
    timestamp: Time;
}
export interface QuizResult {
    id: bigint;
    topic: string;
    total: bigint;
    wrongQuestionIds: Array<bigint>;
    score: bigint;
    timestamp: Time;
}
export type ProblemId = bigint;
export interface LoginRecord {
    principal: Principal;
    name: string;
    loginAt: bigint;
}
export interface CustomerMessageWithReply {
    id: bigint;
    adminReply?: string;
    sender: Principal;
    message: string;
    timestamp: Time;
    senderName: string;
}
export interface UserProfile {
    studentId?: string;
    institution?: string;
    name: string;
}
export enum ProblemType {
    trialBalance = "trialBalance",
    cashFlowStatement = "cashFlowStatement",
    balanceSheet = "balanceSheet",
    journalEntry = "journalEntry",
    incomeStatement = "incomeStatement",
    ledgerPostings = "ledgerPostings"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addAdminQuestion(question: string, optionA: string, optionB: string, optionC: string, optionD: string, correctIndex: bigint, topic: string, explanation: string): Promise<void>;
    addPremiumNote(title: string, subject: string, content: string): Promise<bigint>;
    approveAccessRequest(userId: Principal): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteCustomerMessage(messageId: bigint): Promise<void>;
    deletePremiumNote(id: bigint): Promise<void>;
    deleteProblem(problemId: ProblemId): Promise<void>;
    deleteQuizQuestion(id: bigint): Promise<void>;
    editPremiumNote(id: bigint, title: string, subject: string, content: string): Promise<void>;
    findProblemsByKeyword(keyword: string): Promise<Array<Problem>>;
    findProblemsByType(type: ProblemType): Promise<Array<Problem>>;
    forceClaimAdmin(): Promise<boolean>;
    getAllAccessRequests(): Promise<Array<NoteAccessRequest>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCustomerMessages(): Promise<Array<CustomerMessageWithReply>>;
    getIsAdmin(): Promise<boolean>;
    getLoginHistory(): Promise<Array<LoginRecord>>;
    getMyAccessStatus(): Promise<string>;
    getMyCustomerMessages(): Promise<Array<CustomerMessageWithReply>>;
    getPremiumNotesList(): Promise<Array<PremiumNote>>;
    getPremiumNotesWithContent(): Promise<Array<PremiumNote>>;
    getProblem(problemId: ProblemId): Promise<Array<Problem>>;
    getProblemHistory(): Promise<Array<Problem>>;
    getQuizHistory(): Promise<Array<QuizResult>>;
    getQuizQuestions(topic: string | null): Promise<Array<QuizQuestion>>;
    getUserCount(): Promise<bigint>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    listProblemTypes(): Promise<Array<string>>;
    recordLogin(name: string): Promise<void>;
    registerUser(): Promise<void>;
    rejectAccessRequest(userId: Principal): Promise<void>;
    replyToCustomerMessage(messageId: bigint, replyText: string): Promise<void>;
    requestNotesAccess(message: string): Promise<bigint>;
    revokeAccess(userId: Principal): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    saveProblem(type: ProblemType, jsonInput: string, solution: string): Promise<void>;
    saveQuizResult(topic: string, score: bigint, total: bigint, wrongQuestionIds: Array<bigint>): Promise<void>;
    submitCustomerMessage(senderName: string, message: string): Promise<void>;
}
