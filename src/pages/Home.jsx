import { Page } from "framework7-react";
import React from "react";
import Header from "../components/Header";
import HeroSlider from "../components/home/HeroSlider";
import AboutSection from "../components/home/AboutSection";
import StatsBar from "../components/home/StatsBar";
import PartsSection from "../components/home/PartsSection";
import ServicesSection from "../components/home/ServicesSection";
import WhyUsSection from "../components/home/WhyUsSection";
import GallerySection from "../components/home/GallerySection";
import ContactSection from "../components/home/ContactSection";
import SiteFooter from "../components/home/SiteFooter";
import WhatsAppFloat from "../components/ednex/WhatsAppFloat";

export default function Home() {
  return (
    <Page className="ednex-page" pageContent={false}>
      <div className="ednex-site">
        <Header />
        <HeroSlider />
        <AboutSection />
        <StatsBar />
        <PartsSection />
        <ServicesSection />
        <WhyUsSection />
        <GallerySection />
        <ContactSection />
        <SiteFooter />
        <WhatsAppFloat />
      </div>
    </Page>
  );
}
