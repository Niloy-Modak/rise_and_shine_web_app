import Banner from "@/components/shared/Banner";
import Section3 from '../components/shared/Section3';
import SlidingSection from "@/components/shared/SlidingSection";
import FeaturedWork from "@/components/shared/FeaturedWork";
import PrimeButton from "@/components/ui/PrimeButton";
import ServicesSection from "@/components/shared/ServicesSection";
import CustomersHeadlineSection from "@/components/shared/CustomersHeadlineSection";
import WhatsNewSection from "@/components/shared/WhatsNewSection";
import ScrollingTextSection from "@/components/shared/ScrollingTextSection";
import StackedSection from "@/components/shared/StackedSection";

export default function Home() {
  return <div className="">
    <Banner/>
    <SlidingSection/>
    <Section3/>
    <FeaturedWork/>
    
    <div className="flex justify-center items-center mb-7 px-4 md:px-7">
      <PrimeButton text="Explore Our Work"/>
    </div>
 
    <ServicesSection/>
    
    <CustomersHeadlineSection/>
    <StackedSection/>
    <WhatsNewSection/>

    <ScrollingTextSection/>
  </div>;
}
