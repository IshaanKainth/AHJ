'use server';

/**
 * @fileOverview Retrieves and summarizes solar permitting information for a given ZIP code.
 *
 * - getPermitInfo - A function that takes a ZIP code and returns solar permitting information.
 * - GetPermitInfoInput - The input type for the getPermitInfo function (ZIP code).
 * - GetPermitInfoOutput - The return type for the getPermitInfo function (permit information).
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetPermitInfoInputSchema = z.object({
  zipCode: z.string().describe('The ZIP code to retrieve solar permitting information for.'),
});
export type GetPermitInfoInput = z.infer<typeof GetPermitInfoInputSchema>;

const GetPermitInfoOutputSchema = z.object({
  jurisdiction_type: z.enum(['city', 'county']).describe('The type of jurisdiction.'),
  city: z.string().describe('The city name.'),
  county: z.string().describe('The county name.'),
  solar_permitting_authority: z.object({
    agency_name: z.string().describe('The agency that issues solar permits.'),
    address: z.string().describe('The full address of the permit office.'),
    phone: z.string().describe('The public phone number for permitting help.'),
    email: z.string().describe('The public-facing email for solar permits.'),
    website: z.string().describe('URL to solar permit rules or info.'),
    permit_portal_url: z.string().describe('URL to the permit application portal.'),
    solarapp_plus_supported: z.boolean().describe('Indicates if SolarAPP+ is supported.'),
    solar_permit_required: z.boolean().describe('Indicates if a solar permit is required.'),
    solar_battery_permit_required: z.boolean().describe('Indicates if a solar battery permit is required.'),
    inspection_required: z.boolean().describe('Indicates if an inspection is required.'),
    turnaround_time: z.string().describe("Typical approval timeline (e.g., '1–3 business days')."),
    permit_fee: z.string().describe('Fee range or flat fee for standard PV system.'),
    documents_required: z.array(z.string()).describe('List of common required documents.'),
  }),
});
export type GetPermitInfoOutput = z.infer<typeof GetPermitInfoOutputSchema>;

export async function getPermitInfo(input: GetPermitInfoInput): Promise<GetPermitInfoOutput> {
  return getPermitInfoFlow(input);
}

const getPermitInfoPrompt = ai.definePrompt({
  name: 'getPermitInfoPrompt',
  input: {schema: GetPermitInfoInputSchema},
  output: {schema: GetPermitInfoOutputSchema},
  prompt: `You are a solar permitting assistant.

Your job is to take a valid U.S. ZIP code as input and return all the structured solar permitting details related to that location. Focus only on official building/planning departments that issue **solar permits**, and exclude unrelated AHJs.
Make sure to return links that are publicly known or confirmed official domains like '.gov', '.org', or official '.us' portals. 
- If the real solar permit webpage or permit portal is **not publicly listed**, DO NOT generate a fake link.
Use the following JSON format for output:
{
  "zip_code": "<5-digit ZIP code>",
  "jurisdiction_type": "city" or "county",
  "city": "<City Name>",
  "county": "<County Name>",
  "solar_permitting_authority": {
    "agency_name": "<Agency that issues solar permits>",
    "address": "<Full address of the permit office>",
    "phone": "<Public phone number for permitting help>",
    "email": "<Public-facing email for solar permits>",
    "website": "<URL to solar permit rules or info>",
    "permit_portal_url": "<URL to the permit application portal>",
    "solarapp_plus_supported": true or false,
    "solar_permit_required": true or false,
    "solar_battery_permit_required": true or false,
    "inspection_required": true or false,
    "turnaround_time": "<Typical approval timeline (e.g., '1–3 business days')>",
    "permit_fee": "<Fee range or flat fee for standard PV system>",
    "documents_required": [
      "<Common required document #1>",
      "<Common required document #2>",
      "<Common required document #3>"
    ]
  }
}

Always ensure:
- All information is accurate, sourced from official city/county portals.
- The data is focused on solar permits, especially for residential rooftop PV.
- If the location uses SolarAPP+, mark 'solarapp_plus_supported: true'.
- If info is unavailable, mark the field as \`null\` or \`"Not publicly listed"\` instead of guessing.
- DO NOT guess or invent permit or city website URLs.
Input ZIP code: {{{zipCode}}}

Return only the valid JSON output without any extra text.
`,
});

const getPermitInfoFlow = ai.defineFlow(
  {
    name: 'getPermitInfoFlow',
    inputSchema: GetPermitInfoInputSchema,
    outputSchema: GetPermitInfoOutputSchema,
  },
  async input => {
    const {output} = await getPermitInfoPrompt(input);
    return output!;
  }
);
