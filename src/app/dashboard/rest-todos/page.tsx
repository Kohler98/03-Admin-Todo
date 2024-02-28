import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUserSessionServer } from "@/auth/actions/auth-actions";
import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Rest todo api",
  description: "Rest todo api",
};
export default async function RestTodoPage() {
  const session = await getServerSession(authOptions);
 
  if(!session?.user) redirect('/api/auth/signin')
  const todos = await prisma.todo.findMany({ 
    where:{userId:session?.user.id},
    orderBy: { description: "asc" } ,
  });
  return (
    <div>
      <div className="w-full px-3 mx-5 mb-5">

      <NewTodo todos={todos}/>
      </div>
      <TodosGrid todos={todos} />
    </div>
  );
}
