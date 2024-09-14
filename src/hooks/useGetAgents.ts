import { useQuery } from "@tanstack/react-query";
import { getAgents } from "../api/api";

export const useGetAgents = () => {
  const { data: agents, isPending: isAgentsPending } = useQuery({
    queryKey: ["agents"],
    queryFn: () => getAgents(),
  });

  return { agents, isAgentsPending };
};
