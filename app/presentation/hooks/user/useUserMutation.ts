import { useState } from "react";
import * as UsesCases from "domain/use-cases/user";

import { apiFetcher } from "config/adapters";

import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import type { MsgResponse } from "infrastructure/interfaces";

export const useUserMutation = () => {
  const [errorMsg, setErrorMsg] = useState<MsgResponse | null>(null);
  const navigate = useNavigate();

  const createUser = useMutation({
    mutationFn: (body: UsesCases.UserBody) => {
      return UsesCases.createUserUseCase(apiFetcher, body);
    },
    onSuccess: (data) => {

      if ("statusCode" in data) {
        setErrorMsg(data);
        return;
      }

      navigate("/usuarios");
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  return {
    createUser,
    errorMsg,
  };
};
