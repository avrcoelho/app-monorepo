"use client";

import { useEffect, useRef } from "react";
import {
  getGetItemsQueryKey,
  useDeleteItemsItemId,
  useGetItems,
  usePostItems,
} from "../src/item/item";
import { PostItemsBody } from "../src/model";
import { useQueryClient } from "@tanstack/react-query";

export default function Home() {
  const formRef = useRef<HTMLFormElement>(null);
  const { mutate, isPending, isSuccess } = usePostItems();
  const { mutate: mutateDelete, isSuccess: isSuccessDelete } =
    useDeleteItemsItemId();
  const { data } = useGetItems();
  const queryClient = useQueryClient();

  useEffect(() => {
    const canRefetchQuery = isSuccess || isSuccessDelete;
    if (canRefetchQuery) {
      queryClient.refetchQueries({
        queryKey: getGetItemsQueryKey(),
      });
    }
  }, [isSuccess, isSuccessDelete, queryClient]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const formDataObject = Object.fromEntries(formData);
    const data: PostItemsBody = { ...formDataObject, id: Date.now() };
    mutate({ data });
    formRef.current?.reset();
  };

  return (
    <main className="flex flex-1 justify-center flex-col items-center p-5">
      <h1 className="text-6xl text-blue-500">Todo List</h1>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-md p-5 rounded-lg shadow-lg"
      >
        <input
          type="text"
          className="p-2 border border-gray-600 rounded-lg text-white"
          placeholder="Add a new todo"
          name="name"
        />
        <button
          type="submit"
          className="p-2 mt-2 bg-blue-500 text-gray-900 rounded-lg cursor-pointer"
        >
          {isPending ? "Adding..." : "Add"}
        </button>
      </form>

      <ul className="flex flex-col w-full max-w-md p-5 rounded-lg shadow-lg mt-5">
        {data?.data?.map((item) => (
          <li
            key={item.id}
            className="p-2 border-b border-gray-600 text-white flex justify-between items-center"
          >
            {item.name}

            <button
              onClick={() => mutateDelete({ itemId: String(item.id) })}
              className="bg-red-500 px-2 text-white rounded-lg flex justify-center items-center cursor-pointer"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
