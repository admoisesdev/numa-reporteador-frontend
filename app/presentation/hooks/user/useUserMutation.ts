
import * as UsesCases from "domain/use-cases/user";

import { apiFetcher } from "config/adapters";

import { useMutation } from "@tanstack/react-query";

export const useUserMutation = () => {
  const createUser = useMutation({
    mutationFn: (body: UsesCases.UserBody) => {
      return UsesCases.createUserUseCase(apiFetcher, body);
    },
    onSuccess: (data, variables) => {
    }
  });

  return {
    createUser,
  };
};
