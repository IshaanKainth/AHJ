import type { GetPermitInfoOutput } from "@/ai/flows/get-permit-info";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Building, MapPin, Phone, Mail, CheckCircle2, XCircle, ExternalLink, FileText, DollarSign, Clock, BatteryCharging } from 'lucide-react';

type SolarInsightsResultsProps = {
  data: GetPermitInfoOutput;
};

const InfoRow = ({ icon, label, children }: { icon: React.ElementType, label: string, children: React.ReactNode }) => {
  const Icon = icon;
  return (
    <div className="flex items-start gap-4">
      <Icon className="h-5 w-5 text-muted-foreground mt-1 flex-shrink-0" />
      <div className="flex-1">
        <p className="font-medium text-foreground">{label}</p>
        <div className="text-muted-foreground">{children}</div>
      </div>
    </div>
  );
};


export function SolarInsightsResults({ data }: SolarInsightsResultsProps) {
  const { ahjAgency, contactInformation, solarAppPlusSupport, permitInformation } = data;

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Building className="h-6 w-6 text-primary" />
            Authority Having Jurisdiction (AHJ)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-xl font-semibold">{ahjAgency}</p>
          <Separator />
          <div className="space-y-4">
            <InfoRow icon={MapPin} label="Address">
              {contactInformation.address}
            </InfoRow>
            <InfoRow icon={Phone} label="Phone">
              <a href={`tel:${contactInformation.phone}`} className="hover:underline">{contactInformation.phone}</a>
            </InfoRow>
            <InfoRow icon={Mail} label="Email">
              <a href={`mailto:${contactInformation.email}`} className="hover:underline">{contactInformation.email}</a>
            </InfoRow>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <p className="font-medium">Supports SolarAPP+?</p>
            <Badge variant={solarAppPlusSupport ? "default" : "secondary"}>
              {solarAppPlusSupport ? <CheckCircle2 className="mr-2 h-4 w-4" /> : <XCircle className="mr-2 h-4 w-4" />}
              {solarAppPlusSupport ? "Yes" : "No"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <FileText className="h-6 w-6 text-primary" />
            Permit Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <Button asChild variant="outline" className="w-full">
              <a href={permitInformation.permitPortalURL} target="_blank" rel="noopener noreferrer">
                Visit Permit Portal
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          <Separator />
          <div className="space-y-4">
            <InfoRow icon={FileText} label="Required Documents">
              <ul className="list-disc list-inside space-y-1">
                {permitInformation.requiredDocuments.map((doc, index) => <li key={index}>{doc}</li>)}
              </ul>
            </InfoRow>
            <InfoRow icon={DollarSign} label="Permit Fee">
              {permitInformation.permitFee}
            </InfoRow>
            <InfoRow icon={Clock} label="Turnaround Time">
              {permitInformation.turnaroundTime}
            </InfoRow>
            <InfoRow icon={BatteryCharging} label="Battery Permit Required">
              {permitInformation.batteryPermitRequired ? "Yes" : "No"}
            </InfoRow>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
