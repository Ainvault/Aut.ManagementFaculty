"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ContactInterestForm } from "@/components/organisms/ContactInterestForm";

type CourseRegisterGateProps = {
  courseSlug: string;
  submitLabel: string;
  successLabel: string;
  ctaLabel: string;
  formTitle: string;
  formDescription: string;
  hint: string;
  cancelLabel: string;
};

export function CourseRegisterGate({
  courseSlug,
  submitLabel,
  successLabel,
  ctaLabel,
  formTitle,
  formDescription,
  hint,
  cancelLabel,
}: CourseRegisterGateProps) {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <div className="space-y-4 rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border">
        <div className="space-y-2">
          <h2 className="text-lg font-bold tracking-tight">{formTitle}</h2>
          <p className="text-sm leading-7 text-muted-foreground">{hint}</p>
        </div>
        <Button
          type="button"
          size="lg"
          className="w-full font-bold"
          onClick={() => setOpen(true)}
        >
          {ctaLabel}
        </Button>
      </div>
    );
  }

  return (
    <Card className="rounded-2xl border-border/70 shadow-lg" id="register-form">
      <CardHeader className="space-y-1">
        <CardTitle>{formTitle}</CardTitle>
        <CardDescription>{formDescription}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ContactInterestForm
          courseSlug={courseSlug}
          submitLabel={submitLabel}
          successLabel={successLabel}
        />
        <Button
          type="button"
          variant="ghost"
          className="w-full"
          onClick={() => setOpen(false)}
        >
          {cancelLabel}
        </Button>
      </CardContent>
    </Card>
  );
}
