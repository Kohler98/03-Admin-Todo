import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server'
import bcrypt from 'bcryptjs';

export async function POST(request: Request) { 
    await prisma.todo.deleteMany()
    await prisma.user.deleteMany()
    const user = await prisma.user.create({
        data:{
            email:'test1@user.com',
            password: bcrypt.hashSync('123456'),
            role: ['admin','client','super-user'],
            todos: {
                create: [
                    {description:'Piedra del alma',complete:true},
                    {description:'Piedra del tiempo'},
                    {description:'Piedra del mente'},
                    {description:'Piedra del realidad'},
                    {description:'Piedra del poder'},
                    {description:'Piedra del espacio'},
                ]
            }
        }
    })
    // await prisma.todo.createMany({
    //     data:[
    //         {description:'Piedra del alma',complete:true},
    //         {description:'Piedra del tiempo'},
    //         {description:'Piedra del mente'},
    //         {description:'Piedra del realidad'},
    //         {description:'Piedra del poder'},
    //         {description:'Piedra del espacio'},
    //     ]
    // })
 
    return NextResponse.json({message:"Seed execute"});
}