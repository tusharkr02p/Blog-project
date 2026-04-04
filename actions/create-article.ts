"use server"

import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { z } from "zod"
import {v2 as cloudinary ,UploadApiResponse} from "cloudinary" 
import { error } from "console"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,

    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

// 1. Zod Schema
const createArticleSchema = z.object({
    title: z.string().min(3, "Title at least 3 characters").max(100),
    category: z.string().min(3, "Please select a category"),
    content: z.string().min(10, "Content must be at least 10 characters")
})

// 2. State Type Definition
export type createArticleFormState = {
    errors: {
        title?: string[],
        category?: string[],
        featuredImage?: string[],
        content?: string[],
        formErrors?: string[]
    }
}

export const createArticle = async (
    prevState: createArticleFormState, 
    formData: FormData
): Promise<createArticleFormState> => {
    
    // 3. Validation Logic
    const result = createArticleSchema.safeParse({
        title: formData.get("title"),
        category: formData.get("category"),
        content: formData.get("content")
    })

    // Agar validation fail hui to yahi se errors return honge
    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    // 4. Auth Check
    const { userId } = await auth();
    if (!userId) {
        return {
            errors: {
                formErrors: ['You must be logged in to create an article']
            }
        }
    }

    const exisitingUser = await prisma.user.findUnique({
        where:{
            clerkUserId:userId
        }
    })

    if(!exisitingUser){
        return {
            errors:{
                formErrors:["user not found. please registered before creating a articles"]
            }
        }
    }


    const imageFile = formData.get('featuredImage') as File || null;
    if(!imageFile || imageFile.name === "undefined"){
        return {
            errors:{
                featuredImage:[
                    "image file is required"
                ]
            }
        }

    } 

    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);


    const uploadApiResponse : UploadApiResponse | undefined = await new Promise((resolve, reject) =>{
        const uploadStream = cloudinary.uploader.upload_stream(
            {resource_type:'auto'},(error, result) =>{
                    if(error){
                        reject(error)
                    }else{
                        resolve(result)
                    }
            }
        )
        uploadStream.end(buffer)
    })

    const imageUrl = uploadApiResponse?.secure_url;
    if(!imageUrl){
        return{
            errors:{
                featuredImage :['failed to upload image .please try again']
            }
        }
    }

    try {
        await prisma.articles.create({
            data:{
                title:result.data.title,
                category:result.data.category,
                content:result.data.content,
                featuredImage:imageUrl,
                authorId:exisitingUser.id
            }
        })
    } catch (error:unknown) {
        if(error instanceof Error){
            return {
                errors:{
                    formErrors:[error.message]
                }
            }
        }else{
            return{
                errors:{
                    formErrors:["some internal server errors"]
                }
            }
        }
        
    }

    // 5. Database Logic (Yahan aap apna Database create logic likh sakte hain)
    // try {
    //    await db.article.create({ data: { ...result.data, userId } })
    // } catch (e) {
    //    return { errors: { formErrors: ["Database Error"] } }
    // }

    // 6. Redirect
    // IMPORTANT: Redirect hamesha function ke end mein hona chahiye 
    // aur try-catch ke bahar hona chahiye.
    revalidatePath("/dashboard")
    redirect("/dashboard");
    
    // TypeScript ko khush rakhne ke liye empty object return (halanki yahan tak code pahuchega nahi)
    return { errors: {} };
}