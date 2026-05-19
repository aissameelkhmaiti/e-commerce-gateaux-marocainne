
import Hero from "./components/Hero";
import DragWrapper from "./components/DragWrapper";
import ServicesSection from "./components/Services";
 import CustomerReviews from "./components/CustomerReviews"
export default function Home() {
  return (
    <div>
      
      <Hero />
      <ServicesSection />
      <DragWrapper />
      <CustomerReviews />

    </div>
  );
}