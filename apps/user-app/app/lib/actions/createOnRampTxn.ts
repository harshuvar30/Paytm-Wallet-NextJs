"use server";
import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client"

export const createOnRampTxn = async(amount:number,provider:string) =>{
     const session = await getServerSession(authOptions)
     const userId = session?.user?.id
     const token = Math.random().toString() //simulating banking api for fetching a token
     if(!userId){
        return {
            message :'User not logged in!'
        }
     }

     await prisma.onRampTransaction.create({
        data:{
            status:'Processing',
            provider:provider,
            amount:Number(amount),
            startTime:new Date(),
            userId:Number(userId),
            token:token

        }
     })

     return {
        message:"On ramp transaction added!"
     }
}