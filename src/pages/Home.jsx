import { Page } from "framework7-react";
import React from "react";
import Header from "../components/Header";
import HeroSlider from "../components/home/HeroSlider";
import RankingsSection from "../components/home/RankingsSection";
import FeatureSection from "../components/home/FeatureSection";
import MethodologySection from "../components/home/MethodologySection";
import SiteFooter from "../components/home/SiteFooter";

export default function Home() {
  return (
    <Page className="tps-page" pageContent={false}>
      <div className="tps-site">
        <Header />
        <main>
          <HeroSlider />
          <RankingsSection />
          <FeatureSection />
          <MethodologySection />
        </main>
        <SiteFooter />
      </div>
    </Page>
  );
}
