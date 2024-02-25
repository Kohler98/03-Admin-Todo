import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'
import { boolean, object, string } from 'yup'

interface Segments{
    params:{
        id:string
    }
}

export async function GET(request: Request,segments:Segments) { 
   const {id} = segments.params
   const todo = await prisma.todo.findFirst({
    where:{id:id}
   })
   if(!todo) return NextResponse.json({message:'Todo no encontrado'},{status:400})
 
    return NextResponse.json(todo)
}

const postSchema = object({
    description:string().required(),
    complete:boolean().optional().default(false),
})

export async function PUT(request: Request,segments:Segments) { 
    const {id} = segments.params
    const todo = await prisma.todo.findFirst({
        where:{id:id}
       })
       if(!todo) return NextResponse.json({message:'Todo no encontrado'},{status:400})
    try {
        const body = await postSchema.validate(await request.json())
        
        const updateTodo = await prisma.todo.update({
            where:{id:id},
            data:{...body}
        })
        return NextResponse.json({message:'se actualizo con exito',updateTodo})
        
    } catch (error) {
        return NextResponse.json({message:'Error al actualizar todo'},{status:400})
    }
}
export async function DELETE(request: Request,segments:Segments) { 
    const {id} = segments.params
    const todo = await prisma.todo.findFirst({
        where:{id:id}
       })
    if(!todo) return NextResponse.json({message:'Toodo que intenta eliminar no encontado'},{status:400}) 
    try {
        await prisma.todo.delete({
            where:{id:id}
        })
        return NextResponse.json({message:'Se ha borrado con exito'})
        
    } catch (error) {
        return NextResponse.json({message:'Error al intentar borrar'})
        
    }
}