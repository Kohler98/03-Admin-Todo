import { Todo } from "@prisma/client";
import { Body } from "../interface";
// 
export const updateTodo = async(id:string, body:Body): Promise<Todo> =>{
 
 
    const dbTodo = await fetch(`/api/todos/${id}`,{
        method:'PUT',
        body:JSON.stringify(body),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(res=>res.json())

    return dbTodo
}
export const createTodo = async(description:string): Promise<Todo> =>{
    const body = {description}
 
    const dbTodo = await fetch(`/api/todos`,{
        method:'POST',
        body:JSON.stringify(body),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(res=>res.json())

    return dbTodo
}
export const deleteTodo = async(id:string): Promise<Todo> =>{
 
    const dbTodo = await fetch(`/api/todos/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(res=>res.json())

    return dbTodo
}