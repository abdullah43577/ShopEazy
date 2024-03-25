"use client";

import { handleAxiosErrors } from "@/components/utils/handleAxiosErrors";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface useFetchProps {
  endpoint: string;
  key: string;
}

export default function useFetch({ endpoint, key }: useFetchProps) {
  const { isPending, error, data } = useQuery({
    queryKey: [endpoint, key],
    queryFn: async () => {
      const response = await axios.get(endpoint);
      return response.data;
    },
    // refetchInterval: 1000,
  });

  if (isPending) {
    return { isPending };
  } else if (error) {
    handleAxiosErrors(error);
  }

  return { data };
}
