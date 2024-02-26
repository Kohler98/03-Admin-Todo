"use client";
import { Todo } from "@prisma/client";

import { TodoItem } from "..";
import * as api from "@/todos/helpers/todos";
import { Body } from "../interface";
import { useRouter } from "next/navigation";

interface Props {
  todos?: Todo[];
}
export const TodosGrid: React.FC<Props> = ({ todos = [] }) => {
  const router = useRouter();
  const toggleTodo = async (id: string, body: Body) => {
    await api.updateTodo(id, body);

    router.refresh();
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
      ))}
    </div>
  );
};
