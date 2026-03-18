import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CustomerMessage, ProblemType } from "../backend.d";
import { useActor } from "./useActor";
import { useInternetIdentity } from "./useInternetIdentity";

// Extended type returned by the updated backend — CustomerMessage + adminReply (Candid optional)
export interface CustomerMessageWithReply extends CustomerMessage {
  adminReply: [] | [string];
}

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
      return actor.getUserCount();
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
      // Backend now returns CustomerMessageWithReply[]; cast since d.ts not yet regenerated
      return (actor as any).getCustomerMessages() as Promise<
        CustomerMessageWithReply[]
      >;
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
      return (actor as any).getMyCustomerMessages() as Promise<
        CustomerMessageWithReply[]
      >;
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
      return (actor as any).replyToCustomerMessage(id, replyText);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customerMessages"] });
      queryClient.invalidateQueries({ queryKey: ["myCustomerMessages"] });
    },
  });
}
