import Layout from "@/components/Layout";
import HeroSection from "@/components/home/HeroSection";
import InfoCards from "@/components/home/InfoCards";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import PrivacySection from "@/components/home/PrivacySection";
import BlogPreview from "@/components/home/BlogPreview";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <InfoCards />
      <FeaturedProducts />
      <PrivacySection />
      <BlogPreview />
      <FAQSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
