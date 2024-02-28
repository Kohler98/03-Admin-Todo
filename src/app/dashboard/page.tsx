import { WidgetItem } from "@/components";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {

  const session = await getServerSession(authOptions)

  if(!session){
    redirect('/api/auth/signin')
  }
  return (
    <div className="grid gap-6 grid-cols1 sm:grid-cols-2 ">
            
    {/* TODO: src/components <WidgetItem /> */}
        <WidgetItem title="Usuario conectado server S-side">
          <div className="flex flex-col">
            <span>{session.user?.name}</span>
            <span>{session.user?.image}</span>
            <span>{session.user?.email}</span>
          </div>
        </WidgetItem>
    {/* TODO: Fin <WidgetItem /> */}

  </div>  
  );
}