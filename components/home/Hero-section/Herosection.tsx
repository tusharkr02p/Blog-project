import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

const Herosection = () => {
  return (
    <section className="realtive  min-h-[600px] w-full overflow-hidden bg-linear-to-br from bg-purple-600  via-indigo-950 to-indigo-950 ">
      {/* gradient overlay */}

      <div className="absolute inset-0 before:absolute before:left-1/4 before:top-0 before:h-[500px] before:w-[500px] before:rounded-full before:bg-linear-to-r before:from-violet-600/20 before:to-indigo-600/20 before:blur-3xl"></div>

      <div className=" container relative mx-auto flex h-full flex-col items-center justify-center px-4 py-24 md:flex-row md:py-32">
        <div className="flex-1 space-y-8 text-center md:text-left">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:  ">
            The Future Isn't Coming.{" "}
            <span className="bg-linear-to-r from-violet-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent">
              {" "}
              It's Already Here.
            </span>
          </h1>

          <p className=" max-w-3xl text-lg text-gray-300 md:text-xl  ">
            A space where ideas, technology, and creativity come together to
            shape the world we live in.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center md:justify-start">
            <Button className="rounded-full">Start Reading </Button>
            <Button className="rounded-full" variant={"outline"}>Explore topics </Button>
          </div>

          <div className="grid  grid-cols-3 gap-4 pt-8 text-white md:max-w-md">
            <div className=" space-y-2">
              <div className="text-2xl font-bold text-white">1k+</div>
              <div className="text-sm text-gray-400">Published articles</div>
            </div>

            <div className=" space-y-2">
              <div className="text-2xl font-bold  text-white">50+</div>
              <div className="text-sm text-gray-400">Expert Writers</div>
            </div>

            <div className=" space-y-2">
              <div className="text-2xl font-bold text-white">1M</div>
              <div className="text-sm text-gray-400">Monthly Readers</div>
            </div>


          </div>
          </div>

          {/* image frame  */}

          <div className="mt-12 flex-1 md:mt-0">
            <div className={cn("relative mx-auto w-80 h-80 rounded-2xl overflow-hidden", " bg-linear-to-br from-white/5  to-transparent", "border border-w/20 bachitekdrop:blur-lg"," shadow-2xl shadow-indigo-500/")}>

          <Image src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8QkxvZ3xlbnwwfHwwfHx8MA%3D%3D" fill className="object-cover" alt="normal image" />


            </div>
          
        </div>
      </div>
    </section>
  );
};

export default Herosection;
