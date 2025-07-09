// 'use server';

/**
 * @fileOverview Retrieves and summarizes solar permitting information for a given ZIP code.
 *
 * - getPermitInfo - A function that takes a ZIP code and returns solar permitting information.
 * - GetPermitInfoInput - The input type for the getPermitInfo function (ZIP code).
 * - GetPermitInfoOutput - The return type for the getPermitInfo function (permit information).
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetPermitInfoInputSchema = z.object({
  zipCode: z.string().describe('The ZIP code to retrieve solar permitting information for.'),
});
export type GetPermitInfoInput = z.infer<typeof GetPermitInfoInputSchema>;

const GetPermitInfoOutputSchema = z.object({
  ahjAgency: z.string().describe('The AHJ (Authority Having Jurisdiction) agency name.'),
  contactInformation: z
    .object({
      address: z.string().describe('The address of the AHJ agency.'),
      phone: z.string().describe('The phone number of the AHJ agency.'),
      email: z.string().describe('The email address of the AHJ agency.'),
    })
    .describe('AHJ contact information.'),
  solarAppPlusSupport: z.boolean().describe('Indicates SolarAPP+ support (yes/no).'),
  permitInformation: z
    .object({
      permitPortalURL: z.string().describe('URL to the permit portal.'),
      requiredDocuments: z.array(z.string()).describe('List of required documents.'),
      permitFee: z.string().describe('Permit fee.'),
      turnaroundTime: z.string().describe('Permit turnaround time.'),
      batteryPermitRequired: z.boolean().describe('Whether a battery permit is required.'),
    })
    .describe('Detailed permit information.'),
});
export type GetPermitInfoOutput = z.infer<typeof GetPermitInfoOutputSchema>;

export async function getPermitInfo(input: GetPermitInfoInput): Promise<GetPermitInfoOutput> {
  return getPermitInfoFlow(input);
}

const getPermitInfoPrompt = ai.definePrompt({
  name: 'getPermitInfoPrompt',
  input: {schema: GetPermitInfoInputSchema},
  output: {schema: GetPermitInfoOutputSchema},
  prompt: `You are an expert on solar permitting requirements in the United States.
  Given a ZIP code, you will retrieve and summarize the solar permitting information for that area.

  ZIP Code: {{{zipCode}}}
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
