



import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Top_articles = () => {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      <Card
        className={cn(
          "group relative overflow-hidden transition-all hover:scale-[1.02]",
          "border border-gray-200/50 dark:border-white/10",
          "bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg",
        )}
      >
        <div className="p-6">
          <Link href={`/articles/${1234}`}>
            <div className="relative mb-4 h-48 w-full overflow-hidden rounded-xl">

              <Image
                src="https://images.unsplash.com/photo-1640161339501-760e73bc2a9c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                fill
                alt="basic photo"
                className="object-cover"
                
                />
                </div>
                
              <div className="flex  items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" />
                  <AvatarFallback>TS</AvatarFallback>
                </Avatar>
                <span className=" text-gray-700 dark:text-white text-lg" > Tushar Mernstack</span>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">How to become a frontend web developer</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300" >Web Development</p>

              <div className="mt-6 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>31 March 2026</span>
                <span>{12} min to read</span>
              </div>

            {/* relative mb-4 h-48 w-full overflow-hidden rounded-xl */}
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Top_articles;
