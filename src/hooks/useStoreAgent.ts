import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAgent } from "../api/api";
import { CreateAgentInterface } from "../types/types";
import toast from "react-hot-toast";

export const useStoreAgent = () => {
  const queryClient = useQueryClient();
  const { mutate: storeAgent, isPending } = useMutation({
    mutationFn: (data: CreateAgentInterface) => createAgent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["agents"] });
      toast.success("agent created successfully");
    },
    onError: () => {
      toast.error("Error while creating");
    },
  });

  return { storeAgent, isPending };
};
