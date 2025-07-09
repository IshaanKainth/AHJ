"use client";

import { useState } from "react";
import type { GetPermitInfoOutput } from "@/ai/flows/get-permit-info";
import { fetchPermitInfo } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { SolarInsightsForm } from "@/components/solar-insights-form";
import { SolarInsightsResults } from "@/components/solar-insights-results";
import { SolarInsightsSkeleton } from "@/components/solar-insights-skeleton";
import { Sun } from 'lucide-react';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [permitData, setPermitData] = useState<GetPermitInfoOutput | null>(null);
  const { toast } = useToast();

  const handleSearch = async (zipCode: string) => {
    setLoading(true);
    setPermitData(null);

    try {
      const result = await fetchPermitInfo(zipCode);
      if (result.success && result.data) {
        setPermitData(result.data);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "An unexpected error occurred",
        description: "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto max-w-2xl px-4 py-8 md:py-16">
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4">
            <Sun className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground font-headline">
          Solar Insights
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Enter your ZIP code to get instant solar permitting information.
        </p>
      </div>

      <div className="mt-8">
        <SolarInsightsForm onSearch={handleSearch} loading={loading} />
      </div>

      <div className="mt-8 space-y-6">
        {loading && <SolarInsightsSkeleton />}
        {permitData && !loading && <SolarInsightsResults data={permitData} />}
      </div>
    </main>
  );
}
