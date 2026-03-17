import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ProblemType } from "../backend.d";
import { useActor } from "./useActor";
import { useInternetIdentity } from "./useInternetIdentity";

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
    queryFn: async () => {
      if (!actor || !identity) return undefined;
      return (actor as any).getUserCount() as Promise<bigint>;
    },
    enabled: !!actor && !isFetching && !!identity,
  });
}

export function useGetCustomerMessages() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();
  return useQuery({
    queryKey: ["customerMessages"],
    queryFn: async () => {
      if (!actor || !identity) return [];
      return (actor as any).getCustomerMessages() as Promise<
        Array<{
          id: bigint;
          sender: unknown;
          senderName: string;
          message: string;
          timestamp: bigint;
        }>
      >;
    },
    enabled: !!actor && !isFetching && !!identity,
  });
}
