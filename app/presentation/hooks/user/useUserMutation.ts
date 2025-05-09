import * as UsesCases from "domain/use-cases/user";

import { apiFetcher } from "config/adapters";

import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";

export const useUserMutation = () => {
  const navigate = useNavigate();

  const createUser = useMutation({
    mutationFn: (body: UsesCases.UserBody) => {
      return UsesCases.createUserUseCase(apiFetcher, body);
    },
    onSuccess: (data) => {
      console.log("data", data);

     
      navigate("/usuarios");
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  return {
    createUser,
  };
};
