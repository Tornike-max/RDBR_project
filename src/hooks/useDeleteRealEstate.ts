import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRealEstate as deleteRealEstateApi } from "../api/api";
import toast from "react-hot-toast";

export const useDeleteRealEstate = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteRealEstate, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => deleteRealEstateApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["real-estates"] });
      toast.success("The listing has been successfully deleted.");
    },
    onError: () => {
      toast.error("Failed to delete the listing");
    },
  });

  return { deleteRealEstate, isDeleting };
};
