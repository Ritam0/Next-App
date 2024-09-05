
import Coming_soon from "@/components/coming_soon";
import Herosection from "@/components/Herosection";
import Preloader from "@/components/Preloader";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-black antialiased  ">
      <Preloader/>
      <Herosection/>
    </div>
    
  );
}
