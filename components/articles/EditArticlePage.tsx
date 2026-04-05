"use client";

import React, { useState, useActionState, startTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import dynamic from "next/dynamic";
import { Button } from "../ui/button";
import "react-quill-new/dist/quill.snow.css";
import { createArticle } from "@/actions/create-article";
import type { Articles } from "@/app/generated/prisma/client";
import Image from "next/image";
import { EeditArticle } from "@/actions/editArticle";

// Client-side editor load karne ke liye
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

type EditArticleProps = {
  article: Articles;
};

const EditArticlePage: React.FC<EditArticleProps> = ({ article }) => {
  const [content, setContent] = useState(article.content);

  // useActionState ka use: 'action' function ko direct form ya manual handler mein use kar sakte hain
  const [formState, action, isPending] = useActionState(EeditArticle.bind(null, article.id), {
    errors: {},
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Content append karo
    formData.append("content", content);

    // Isko wapas le aao, iske bina error aayega hi aayega
    startTransition(() => {
      action(formData);
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Article</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title Field */}
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                name="title"
                defaultValue={article.title}
                placeholder="Enter your Article Title"
              />
              {formState.errors?.title && (
                <p className="text-red-600 text-sm font-medium">
                  {formState.errors.title[0]}
                </p>
              )}
            </div>

            {/* Category Field */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                name="category"
                defaultValue={article.category}
                className="flex h-10 w-full rounded-xl bg-background px-3 py-2 text-sm border ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select Category</option>
                <option value="Technology">Technology</option>
                <option value="Programming">Programming</option>
                <option value="Web Development">Web Development</option>
              </select>
              {formState.errors?.category && (
                <p className="text-red-600 text-sm font-medium">
                  {formState.errors.category[0]}
                </p>
              )}
            </div>

            {/* Image Field */}
            <div className="space-y-2">
              <Label htmlFor="featuredImage">Featured Image</Label>
              <Input
                type="file"
                id="featuredImage"
                name="featuredImage"
                accept="image/*"
              />

              <div className="mb-4">
                {article.featuredImage && (
                  <img
                    src={article.featuredImage}
                    alt="Featured image"
                    className="w-48 h-32 object-cover rounded-md"
                  />
                )}
              </div>
            </div>

            {/* Content Field (React Quill) */}
            <div className="space-y-2">
              <Label>Content</Label>
              <div className=" mb-12">
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  className="h-full"
                />
              </div>
              {formState.errors?.content && (
                <p className="text-red-600 text-sm font-medium mt-1">
                  {formState.errors.content[0]}
                </p>
              )}
            </div>

            {/* Global Errors (e.g., Auth Error) */}
            {formState.errors?.formErrors && (
              <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                {formState.errors.formErrors[0]}
              </div>
            )}

            <div className="flex justify-end gap-4 pt-4">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Publishing..." : "Edit articles"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditArticlePage;
