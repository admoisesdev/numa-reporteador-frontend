
import * as UsesCases from "domain/use-cases/user";

import { apiFetcher } from "config/adapters";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UserCompany } from "domain/entities";

export const useUserMutation = () => {
  const queryClient = useQueryClient();

  const createUser = useMutation({
    mutationFn: (body: UsesCases.UserBody) => {
      return UsesCases.createUserUseCase(apiFetcher, body);
    },
    onSuccess: (data) => {
      console.log("data", data);
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  return {
    createUser,
  };
};
