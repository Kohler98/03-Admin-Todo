import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";

export const metadata = {
  title: "Rest todo api",
  description: "Rest todo api",
};
export default async function RestTodoPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: "asc" } });
  return (
    <div>
      <div className="w-full px-3 mx-5 mb-5">

      <NewTodo todos={todos}/>
      </div>
      <TodosGrid todos={todos} />
    </div>
  );
}
