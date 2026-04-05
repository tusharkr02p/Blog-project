"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { error } from "console";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,

  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 1. Zod Schema
const createArticleSchema = z.object({
  title: z.string().min(3, "Title at least 3 characters").max(100),
  category: z.string().min(3, "Please select a category"),
  content: z.string().min(10, "Content must be at least 10 characters"),
});

// 2. State Type Definition
export type createArticleFormState = {
  errors: {
    title?: string[];
    category?: string[];
    featuredImage?: string[];
    content?: string[];
    formErrors?: string[];
  };
};

export const EeditArticle = async (
  articleId: string,
  prevState: createArticleFormState,
  formData: FormData,
): Promise<createArticleFormState> => {
  // 3. Validation Logic
  const result = createArticleSchema.safeParse({
    title: formData.get("title"),
    category: formData.get("category"),
    content: formData.get("content"),
  });

  // Agar validation fail hui to yahi se errors return honge
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  // 4. Auth Check
  const { userId } = await auth();
  if (!userId) {
    return {
      errors: {
        formErrors: ["You must be logged in to create an article"],
      },
    };
  }

  const Exitingarticle = await prisma.articles.findUnique({
    where: { id: articleId },
  });
  if (!Exitingarticle) {
    return {
      errors: { formErrors: ["Article not found"] },
    };
  }

  const exisitingUser = await prisma.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!exisitingUser || Exitingarticle.authorId !== exisitingUser.id) {
    return {
      errors: {
        formErrors: [
          "user not found. please registered before creating a articles",
        ],
      },
    };
  }

  let imageUrl = Exitingarticle.featuredImage;


  const imageFile = (formData.get("featuredImage") as File) || null;
  if (imageFile && imageFile.name !== "undefined") {
    try {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadApiResponse: UploadApiResponse | undefined =
        await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: "auto" },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            },
          );
          uploadStream.end(buffer);
        });
        if (uploadApiResponse?.secure_url) {
    imageUrl = uploadApiResponse.secure_url;
  }else{
    return{
        errors:{
            featuredImage:['failed to upload image. please try again']
        }
    }
  }
    } catch (error) {
        return{
            errors:{
                formErrors:['error uploading image']
            }
        }
    }
  }

  

  if (!imageUrl) {
    return {
      errors: {
        featuredImage: ["failed to upload image .please try again"],
      },
    };
  }

  try {
    await prisma.articles.update({
      where: { id: articleId },
      data: {
        title: result.data.title,
        category: result.data.category,
        content: result.data.content,
        featuredImage: imageUrl,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          formErrors: [error.message],
        },
      };
    } else {
      return {
        errors: {
          formErrors: ["some internal server errors"],
        },
      };
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
  revalidatePath("/dashboard");
  redirect("/dashboard");

  // TypeScript ko khush rakhne ke liye empty object return (halanki yahan tak code pahuchega nahi)
  return { errors: {} };
};
