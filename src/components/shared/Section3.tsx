"use client";

import Image from "next/image";
import ServicesButtons from "../ui/ServicesButtons";

export default function Section3() {
  return (
    <section className="w-full  text-black">
      <div className="mx-auto px-4 md:px-7 py-14  ">
        <div className=" flex items-start md:items-center flex-col-reverse md:flex-row justify-between md:gap-12 lg:gap-22 ">
          {/* LEFT TEXT */}
          <div className=" flex  md:w-1/2 w-85 mt-4 md:mt-0 ">
            <p className="  text-[16px] leading-[1.05] tracking-[-0.03em] md:text-xl font-medium md:w-150">
              A global team of search-first content marketers engineering
              semantic relevancy & category signals for both the internet and
              people
            </p>
          </div>

          {/* RIGHT CONTENT */}
          <div className=" w-full md:w-1/2 mt-4 ">
            <div>
              <h1 className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-medium  leading-[0.9] tracking-[-0.06em] ">
                Driving Demand &
                <br />
                Discovery
                {/* INLINE IMAGE */}
                <span className="ml-3 inline-flex h-17 w-17 overflow-hidden rounded-[22px] align-middle md:rounded-xl">
                  <Image
                    src="/banner_image1.jpg"
                    alt="hero"
                    width={400}
                    height={300}
                    className="h-full w-full object-cover"
                  />
                </span>
              </h1>
            </div>
          </div>
        </div>

        {/* Button section */}
        <div className="flex items-start md:items-center flex-col md:flex-row justify-between  md:gap-22  ">
          <div className="flex  md:w-1/2 w-85"></div>

          <div className="w-full md:w-1/2 ">
            <div className="mt-4 md:mt-4 ">
              <ServicesButtons />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
