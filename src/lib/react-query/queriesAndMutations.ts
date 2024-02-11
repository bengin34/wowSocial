import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { createUserAccount, login, logout } from "../appwrite/api";
import { INewUser } from "@/types";

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });
};
export const useLoginAccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      login(user),
  });
};
export const useLogoutAccount = () => {
  return useMutation({
    mutationFn: () =>
      logout(),
  });
};
