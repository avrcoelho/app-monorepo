"use client";

import { useGetItems, usePostItems } from "../src/item/item";
import { PostItemsBody } from "../src/model";

export default function Home() {
  const { mutate, isPending } = usePostItems();
  const { data } = useGetItems();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const formDataObject = Object.fromEntries(formData);
    const data: PostItemsBody = { ...formDataObject, id: Date.now() };
    mutate({ data });
  };

  return (
    <main className="flex flex-1 justify-center flex-col items-center p-5">
      <h1 className="text-6xl text-blue-500">Todo List</h1>

      <form
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
          className="p-2 mt-2 bg-blue-500 text-gray-900 rounded-lg"
        >
          {isPending ? "Adding..." : "Add"}
        </button>
      </form>

      <ul className="flex flex-col w-full max-w-md p-5 rounded-lg shadow-lg mt-5">
        {data?.map((item) => (
          <li key={item.id} className="p-2 border-b border-gray-600">
            {item.name}
          </li>
        ))}
      </ul>
    </main>
  );
}
