"use client";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function useSession() {
  const { data: session, isLoading } = useSWR("/api/session", fetcher);

  return { session, isLoading };
}
