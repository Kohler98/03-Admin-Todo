"use client";
import * as api from "@/todos/helpers/todos";
import { Todo } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { IoTrashOutline } from "react-icons/io5";
interface Props {
    todos?: Todo[];
  }

export const NewTodo:React.FC<Props> = ({todos=[]}) => {
  const router = useRouter();
  const [todo, setTodo] = useState({
    description: "",
  });
  const handleChange = (e: any) => {
    setTodo({
      ...todo,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    toggleCreateTodo(todo.description);
  };

  const toggleCreateTodo = async (description: string) => {
    await api.createTodo(description);

    router.refresh();
  };
  const toggleDeleteTodo = async (id: string) => {
    await api.deleteTodo(id);
    router.refresh();
    
  };

  const handleDelete = () =>{
    const completed = todos.filter(todo=>todo.complete)
    completed.forEach(comp =>(
        toggleDeleteTodo(comp.id)
    ))

  }
  return (
    <form className="flex w-full" onSubmit={handleSubmit}>
      <input
        type="text"
        className="w-6/12 -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
        placeholder="¿Qué necesita ser hecho?"
        name="description"
        onChange={handleChange}
        value={todo.description}
      />

      <button
        type="submit"
        className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all"
      >
        Crear
      </button>

      <span className="flex flex-1"></span>

      <button
        onClick={ handleDelete}
        type="button"
        className="flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all"
      >
        <IoTrashOutline />
        Delete
      </button>
    </form>
  );
};
