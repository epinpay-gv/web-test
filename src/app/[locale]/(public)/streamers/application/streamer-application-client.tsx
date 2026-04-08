"use client";

import ApplicationHero from "@/features/application/components/ApplicationHero";
import PerformanceCriteriaSection from "@/features/application/components/PerformanceCriteriaSection";
import StreamerApplicationForm from "@/features/application/components/StreamerApplicationForm";

export default function StreamerApplicationClientPage() {
  return (
    <>
      <ApplicationHero />
      <div className="max-w-5xl mx-auto">
        <PerformanceCriteriaSection  />
        <StreamerApplicationForm />
      </div>
    </>
  );
}