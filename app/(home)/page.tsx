import Navbar from "@/components/home/headers/Navbar";
import Herosection from "@/components/home/Hero-section/Herosection";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Navbar />
     <Herosection />
    </div>
  );
}
