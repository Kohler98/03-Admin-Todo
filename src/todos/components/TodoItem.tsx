'use client'
import { Todo } from "@prisma/client";
import React, { startTransition, useOptimistic } from "react";
import style from "./TodoItem.module.css";
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";
import { Body } from "../interface";
interface Props {
  todo: Todo;
  toggleTodo:(id:string,body:Body) => Promise<Todo|void>
}

export const TodoItem: React.FC<Props> = ({ todo ,toggleTodo}) => {
  
  const body = {
      ...todo,
      complete:!todo.complete,
      description:todo.description
  }
 
    const [todoOptimistic,toggleTodoOptimistic] = useOptimistic(
      body,
      (state,newCompleteValue:Body) =>({...state,newCompleteValue})
    )

    const onToggleTodo = async()=>{
      try {
        startTransition(()=> toggleTodoOptimistic(todoOptimistic))

        await  toggleTodo(todoOptimistic.id,todoOptimistic)
      } catch (error) {
        // toggleTodoOptimistic(todo)
      }
    }
  return (
    <div className={`${todoOptimistic.complete ? style.todoDone : style.todoPending}`}>
      <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
        <div
            // onClick={()=>toggleTodo(todoOptimistic.id,body)}
            onClick={onToggleTodo}
          className={`flex p-2 rounded-md cursor-pointer hover:bg-opacity-60
                ${todoOptimistic.complete ? "bg-blue-100" : "bg-red-100"}
                `}
        >
          {todoOptimistic.complete ? (
            <IoCheckboxOutline size={30} />
          ) : (
            <IoSquareOutline size={30} />
          )}
        </div>
        <div className="text-center sm:text-left">{todoOptimistic.description}</div>
      </div>
    </div>
  );
};
