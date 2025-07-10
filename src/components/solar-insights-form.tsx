"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Loader2, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  zipCode: z.string().regex(/^\d{5}$/, {
    message: "Must be a 5-digit ZIP code.",
  }),
});

type SolarInsightsFormProps = {
  onSearch: (zipCode: string) => void;
  loading: boolean;
};

export function SolarInsightsForm({ onSearch, loading }: SolarInsightsFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      zipCode: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSearch(values.zipCode);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="group flex items-center justify-between w-full rounded-full border bg-card shadow-sm transition-shadow hover:shadow-md focus-within:shadow-md focus-within:ring-2 focus-within:ring-primary/50">
          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem className="relative flex-1 py-2 pl-6">
                <label className="text-xs font-bold block" htmlFor={field.name}>
                  ZIP Code
                </label>
                <FormControl>
                  <Input
                    id={field.name}
                    placeholder="Enter your zip code"
                    {...field}
                    className="border-0 h-auto p-0 text-sm text-muted-foreground bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </FormControl>
                <div className="absolute top-full pt-1">
                   <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <div className="p-2">
            <Button
              type="submit"
              disabled={loading}
              className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full w-12 h-12"
              size="icon"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Search className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
