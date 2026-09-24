import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { Section } from "@/components/atoms/Section";
import { PageHero } from "@/components/molecules/PageHero";
import { ContactInterestForm } from "@/components/organisms/ContactInterestForm";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { siteAddress } from "@/lib/site-config";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages");
  return { title: t("contactTitle"), description: t("contactIntro") };
}

export default async function ContactPage() {
  const t = await getTranslations("pages");

  return (
    <main id="main-content">
      <PageHero title={t("contactTitle")} intro={t("contactIntro")} />
      <Section className="bg-gradient-to-b from-background to-muted/40">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-5 lg:pt-4">
            <Heading level={2}>اطلاعات تماس</Heading>
            <div className="space-y-3 text-sm leading-7 text-muted-foreground">
              <p>
                <span className="font-semibold text-foreground">آدرس: </span>
                {siteAddress.line}
              </p>
              <p dir="ltr">
                <span className="font-semibold text-foreground">تلفن: </span>
                {siteAddress.phone}
              </p>
              <p>
                <span className="font-semibold text-foreground">ایمیل: </span>
                <a
                  href={`mailto:${siteAddress.email}`}
                  className="text-primary hover:underline"
                >
                  {siteAddress.email}
                </a>
              </p>
              <a
                href={siteAddress.mapUrl}
                className="inline-block text-primary hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                مشاهده روی نقشه
              </a>
            </div>
          </div>
          <Card className="rounded-2xl border-border/70 shadow-lg">
            <CardHeader>
              <CardTitle>ارسال پیام</CardTitle>
            </CardHeader>
            <CardContent>
              <ContactInterestForm
                submitLabel={t("submit")}
                successLabel={t("registerSuccess")}
              />
            </CardContent>
          </Card>
        </Container>
      </Section>
    </main>
  );
}
