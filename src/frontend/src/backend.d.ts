import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Problem {
    id: ProblemId;
    type: ProblemType;
    jsonInput: string;
    solution: string;
    timestamp: Time;
}
export type Time = bigint;
export type ProblemId = bigint;
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
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteProblem(problemId: ProblemId): Promise<void>;
    findProblemsByKeyword(keyword: string): Promise<Array<Problem>>;
    findProblemsByType(type: ProblemType): Promise<Array<Problem>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getProblem(problemId: ProblemId): Promise<Array<Problem>>;
    getProblemHistory(): Promise<Array<Problem>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    listProblemTypes(): Promise<Array<string>>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    saveProblem(type: ProblemType, jsonInput: string, solution: string): Promise<void>;
}
