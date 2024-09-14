import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CreateListingInterface } from "../types/types";
import { createRealEstate } from "../api/api";

export const useStoreRealEstate = () => {
  const queryClient = useQueryClient();
  const { mutate: storeRealEstate, isPending: isCreating } = useMutation({
    mutationFn: (data: CreateListingInterface) => createRealEstate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["real-estates"] });
      toast.success("Real estate created successfully!");
    },
    onError: () => {
      toast.error("Error while creating");
    },
  });

  return { storeRealEstate, isCreating };
};
