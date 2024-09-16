import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createRealEstate } from "../api/api";
import { CreateRealEstateInterface } from "../types/types";

export const useStoreRealEstate = () => {
  const queryClient = useQueryClient();
  const { mutate: storeRealEstate, isPending: isCreating } = useMutation({
    mutationFn: (data: CreateRealEstateInterface) => createRealEstate(data),
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
