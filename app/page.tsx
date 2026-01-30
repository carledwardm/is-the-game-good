"use client";
import styles from "./page.module.css";
import { useAuth } from "@/context/AuthContext"; 
import HeroSection from "@/components/HomePage/HeroSection";
import FeatureSection from "@/components/HomePage/FeatureSection";
import SiteStats from "@/components/HomePage/SiteStats";

export default function Home() {

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <HeroSection />
        <FeatureSection />
        <SiteStats />
      </main>
    </div>
  );
}
