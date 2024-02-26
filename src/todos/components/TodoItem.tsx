'use client'
import { Todo } from "@prisma/client";
import React from "react";
import style from "./TodoItem.module.css";
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";
import { Body } from "../interface";
interface Props {
  todo: Todo;
  toggleTodo:(id:string,body:Body) => Promise<Todo|void>
}

export const TodoItem: React.FC<Props> = ({ todo ,toggleTodo}) => {
    const body = {
        complete:!todo.complete,
        description:todo.description
    }
  return (
    <div className={`${todo.complete ? style.todoDone : style.todoPending}`}>
      <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
        <div
            onClick={()=>toggleTodo(todo.id,body)}
          className={`flex p-2 rounded-md cursor-pointer hover:bg-opacity-60
                ${todo.complete ? "bg-blue-100" : "bg-red-100"}
                `}
        >
          {todo.complete ? (
            <IoCheckboxOutline size={30} />
          ) : (
            <IoSquareOutline size={30} />
          )}
        </div>
        <div className="text-center sm:text-left">{todo.description}</div>
      </div>
    </div>
  );
};
