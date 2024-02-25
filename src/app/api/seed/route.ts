import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server'

export async function POST(request: Request) { 
    await prisma.todo.deleteMany()

    await prisma.todo.createMany({
        data:[
            {description:'Piedra del alma',complete:true},
            {description:'Piedra del tiempo'},
            {description:'Piedra del mente'},
            {description:'Piedra del realidad'},
            {description:'Piedra del poder'},
            {description:'Piedra del espacio'},
        ]
    })
 
    return NextResponse.json({message:"Seed execute"});
}