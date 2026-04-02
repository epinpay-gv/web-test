"use client";

import ApplicationHero from "@/features/streamers/components/Application/ApplicationHero";
import PerformanceCriteriaSection from "@/features/streamers/components/Application/PerformanceCriteriaSection";
import StreamerApplicationForm from "@/features/streamers/components/Application/StreamerApplicationForm";

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