"use client";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const getUser = (slug) => {
  const { data, error, isLoading } = useSWR(`/api/user/${slug}`, fetcher);

  return {
    user: data,
    isLoading,
  };
};

export const getAllUsers = () => {
  const { data, mutate, error, isLoading } = useSWR(
    "/api/user/allusers",
    fetcher
  );

  return {
    allUsers: data,
    isLoading,
    mutate,
  };
};
