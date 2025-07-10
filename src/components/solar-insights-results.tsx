import type { GetPermitInfoOutput } from "@/ai/flows/get-permit-info";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Building, MapPin, Phone, Mail, CheckCircle2, XCircle, ExternalLink, FileText, DollarSign, Clock, BatteryCharging, ShieldCheck } from 'lucide-react';

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
  const { jurisdiction_type, city, county, solar_permitting_authority } = data;
  const { 
    agency_name, 
    address, 
    phone, 
    email, 
    website,
    solarapp_plus_supported, 
    solar_permit_required,
    solar_battery_permit_required,
    inspection_required,
    turnaround_time,
    permit_fee,
    documents_required
  } = solar_permitting_authority;

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Building className="h-6 w-6 text-primary" />
            Authority Having Jurisdiction (AHJ)
          </CardTitle>
          <p className="text-sm text-muted-foreground pt-1">{city}, {county} ({jurisdiction_type})</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-xl font-semibold">{agency_name}</p>
          <Separator />
          <div className="space-y-4">
            <InfoRow icon={MapPin} label="Address">
              {address}
            </InfoRow>
            <InfoRow icon={Phone} label="Phone">
              <a href={`tel:${phone}`} className="hover:underline">{phone}</a>
            </InfoRow>
            <InfoRow icon={Mail} label="Email">
              <a href={`mailto:${email}`} className="hover:underline">{email}</a>
            </InfoRow>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <p className="font-medium">Supports SolarAPP+?</p>
            <Badge variant={solarapp_plus_supported ? "default" : "secondary"}>
              {solarapp_plus_supported ? <CheckCircle2 className="mr-2 h-4 w-4" /> : <XCircle className="mr-2 h-4 w-4" />}
              {solarapp_plus_supported ? "Yes" : "No"}
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
              <a href={website} target="_blank" rel="noopener noreferrer">
                Visit Website
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          <Separator />
          <div className="space-y-4">
            <InfoRow icon={FileText} label="Required Documents">
              <ul className="list-disc list-inside space-y-1">
                {documents_required.map((doc, index) => <li key={index}>{doc}</li>)}
              </ul>
            </InfoRow>
            <InfoRow icon={DollarSign} label="Permit Fee">
              {permit_fee}
            </InfoRow>
            <InfoRow icon={Clock} label="Turnaround Time">
              {turnaround_time}
            </InfoRow>
            <InfoRow icon={CheckCircle2} label="Solar Permit Required">
              {solar_permit_required ? "Yes" : "No"}
            </InfoRow>
            <InfoRow icon={BatteryCharging} label="Battery Permit Required">
              {solar_battery_permit_required ? "Yes" : "No"}
            </InfoRow>
            <InfoRow icon={ShieldCheck} label="Inspection Required">
              {inspection_required ? "Yes" : "No"}
            </InfoRow>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
