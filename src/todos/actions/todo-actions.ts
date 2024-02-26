'use server'

import prisma from "@/lib/prisma";
import { Body } from "../interface";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const sleep = async(seconds:number = 0) =>{
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve(true)
        },seconds*1000)
    })
}
export const toggleTodo = async(id:string, body:Body): Promise<Todo> =>{
    await sleep(3)
    const todo = await prisma.todo.findFirst({where:{id}})

    if(!todo){
        throw `Todo con id ${id} no encontrado`
    }

    const updateTodo = await prisma.todo.update({
        where:{id},
        data:body
    });

    revalidatePath('/dashboard/server-todos')
    return updateTodo;
}

export const addTodo = async (description:string): Promise<Todo|{}> =>{
    try {
        
 
        const todo = await prisma.todo.create({data:{description}})
        
        revalidatePath('/dashboard/server-todos')
        return todo
    } catch (error) {
        
        return {
            message:'Error al crear el todo'
        }
    } 
}
export const removeTodo = async(id:string): Promise<Todo> =>{
    const todo = await prisma.todo.findFirst({where:{id}})

    if(!todo){
        throw `Todo con id ${id} no encontrado`
    }

    const deleteTodo = await prisma.todo.delete({
        where:{id},
 
    });

    revalidatePath('/dashboard/server-todos')
    return deleteTodo;
}