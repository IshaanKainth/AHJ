"use server";

import { getPermitInfo, GetPermitInfoOutput } from "@/ai/flows/get-permit-info";
import { z } from "zod";

const zipCodeSchema = z.string().regex(/^\d{5}$/, "Please enter a valid 5-digit ZIP code.");

export async function fetchPermitInfo(zipCode: string): Promise<{
  success: boolean;
  data?: GetPermitInfoOutput;
  error?: string;
}> {
  const validation = zipCodeSchema.safeParse(zipCode);
  if (!validation.success) {
    return { success: false, error: validation.error.errors[0].message };
  }

  try {
    const permitInfo = await getPermitInfo({ zipCode });
    return { success: true, data: permitInfo };
  } catch (error) {
    console.error("Error fetching permit info:", error);
    return { success: false, error: "Failed to retrieve permit information from the AI. Please try again." };
  }
}
