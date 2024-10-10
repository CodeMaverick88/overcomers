import ChurchExperienceTimeline from "@/components/ChurchExperience";
import EFamilyJoin from "@/components/EFam";
import EventList from "@/components/Events";
import ChurchHero from "@/components/HeroSection";
import ChurchServicePlayer from "@/components/LatestVideo";
import OrderOfServices from "@/components/OrderOfService";
import { TimelineDemo } from "@/components/OurLeaders";
import { div } from "framer-motion/client";
import Image from "next/image";

export default function Home() {
  return (
    <div className="mt-20">
      {/* hero section */}
      <ChurchHero />

      {/* church experience */}

      <div className="w-full bg-gray-100">
        <div className="w-full md:px-10 py-20">
          <ChurchExperienceTimeline />
        </div>
      </div>

      {/* events */}
      <div className="bg-gradient-to-tr from-primary900 via-primary500 to-primary100 md:p-20 py-20">
        <EventList />
      </div>


{/* e fam */}
      <div className="md:px-20 px-0 bg-gray-100">
        <EFamilyJoin />
      </div>


      {/* video */}
      <div className="bg-gradient-to-tl from-gray-900 via-gray-800 to-gray-100px-0 py-8 md:px-20">
        <ChurchServicePlayer />
      </div>

      {/* our leadership */}
      <div className="w-full">
        <TimelineDemo />
      </div>


      {/* order of services */}
      <div className="p-20 bg-gradient-to-tr from-primary300 via-primary200 to-primary50">
        <OrderOfServices/>
      </div>

    </div>
  );
}
