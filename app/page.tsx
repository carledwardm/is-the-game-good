"use client";
import styles from "./page.module.css";
import HeroSection from "@/components/HomePage/HeroSection";
import FeatureSection from "@/components/HomePage/FeatureSection";
import SiteStats from "@/components/HomePage/SiteStats";
import TopGames from "@/components/HomePage/TopGames";
import QandA from "@/components/HomePage/QandA";

export default function Home() {

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <HeroSection />
        <FeatureSection />
        <SiteStats />
        <TopGames />
        <QandA />
      </main>
    </div>
  );
}
