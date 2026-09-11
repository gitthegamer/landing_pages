import { Page } from "framework7-react";
import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/home/HeroSection";
import SolutionsSection from "../components/home/SolutionsSection";
import CreditSection from "../components/home/CreditSection";
import MigrationSection from "../components/home/MigrationSection";
import ReadySection from "../components/home/ReadySection";
import ContactCta from "../components/home/ContactCta";
import SiteFooter from "../components/home/SiteFooter";

export default function Home() {
  return (
    <Page className="np-page" pageContent={false}>
      <div className="np-site">
        <Header />
        <main>
          <HeroSection />
          <SolutionsSection />
          <CreditSection />
          <MigrationSection />
          <ReadySection />
          <ContactCta />
        </main>
        <SiteFooter />
      </div>
    </Page>
  );
}
