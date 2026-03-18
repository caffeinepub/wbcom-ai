import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  CustomerMessageWithReply,
  ProblemType,
  QuizQuestion,
  QuizResult,
} from "../backend.d";
import { useActor } from "./useActor";
import { useInternetIdentity } from "./useInternetIdentity";

export type { CustomerMessageWithReply, QuizQuestion, QuizResult };

export function useProblemHistory() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();
  return useQuery({
    queryKey: ["problemHistory"],
    queryFn: async () => {
      if (!actor || !identity) return [];
      return actor.getProblemHistory();
    },
    enabled: !!actor && !isFetching && !!identity,
  });
}

export function useSaveProblem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      type,
      jsonInput,
      solution,
    }: {
      type: ProblemType;
      jsonInput: string;
      solution: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.saveProblem(type, jsonInput, solution);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["problemHistory"] });
    },
  });
}

export function useGetUserCount() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();
  return useQuery({
    queryKey: ["userCount"],
    queryFn: async (): Promise<bigint | undefined> => {
      if (!actor || !identity) return undefined;
      try {
        return await actor.getUserCount();
      } catch {
        return undefined;
      }
    },
    enabled: !!actor && !isFetching && !!identity,
  });
}

export function useGetCustomerMessages() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();
  return useQuery({
    queryKey: ["customerMessages"],
    queryFn: async (): Promise<CustomerMessageWithReply[]> => {
      if (!actor || !identity) return [];
      try {
        return await actor.getCustomerMessages();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!identity,
  });
}

export function useGetMyCustomerMessages() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();
  return useQuery({
    queryKey: ["myCustomerMessages"],
    queryFn: async (): Promise<CustomerMessageWithReply[]> => {
      if (!actor || !identity) return [];
      try {
        return await actor.getMyCustomerMessages();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!identity,
  });
}

export function useReplyToCustomerMessage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      replyText,
    }: {
      id: bigint;
      replyText: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.replyToCustomerMessage(id, replyText);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customerMessages"] });
      queryClient.invalidateQueries({ queryKey: ["myCustomerMessages"] });
    },
  });
}

export function useQuizQuestions(topic: string | null, enabled: boolean) {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();
  return useQuery({
    queryKey: ["quizQuestions", topic],
    queryFn: async (): Promise<QuizQuestion[]> => {
      if (!actor || !identity) return [];
      try {
        return await actor.getQuizQuestions(topic);
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!identity && enabled,
  });
}

export function useQuizHistory() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();
  return useQuery({
    queryKey: ["quizHistory"],
    queryFn: async (): Promise<QuizResult[]> => {
      if (!actor || !identity) return [];
      try {
        return await actor.getQuizHistory();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!identity,
  });
}

export function useSaveQuizResult() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      topic,
      score,
      total,
      wrongQuestionIds,
    }: {
      topic: string;
      score: bigint;
      total: bigint;
      wrongQuestionIds: bigint[];
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.saveQuizResult(topic, score, total, wrongQuestionIds);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizHistory"] });
    },
  });
}

export function useAddAdminQuestion() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (q: {
      question: string;
      optionA: string;
      optionB: string;
      optionC: string;
      optionD: string;
      correctIndex: bigint;
      topic: string;
      explanation: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addAdminQuestion(
        q.question,
        q.optionA,
        q.optionB,
        q.optionC,
        q.optionD,
        q.correctIndex,
        q.topic,
        q.explanation,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizQuestions"] });
      queryClient.invalidateQueries({ queryKey: ["adminQuizQuestions"] });
    },
  });
}

export function useAdminQuizQuestions() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();
  return useQuery({
    queryKey: ["adminQuizQuestions"],
    queryFn: async (): Promise<QuizQuestion[]> => {
      if (!actor || !identity) return [];
      try {
        return await actor.getQuizQuestions(null);
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!identity,
  });
}

export function useDeleteQuizQuestion() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteQuizQuestion(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizQuestions"] });
      queryClient.invalidateQueries({ queryKey: ["adminQuizQuestions"] });
    },
  });
}
