import Image from "next/image";
import { Clock, Layers, Tag, Wallet } from "lucide-react";
import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { TextLink } from "@/components/atoms/TextLink";
import { PageHero } from "@/components/molecules/PageHero";
import { CourseRegisterGate } from "@/components/organisms/CourseRegisterGate";
import { Separator } from "@/components/ui/separator";
import type { Course } from "@/lib/types";
import {
  categoryLabel,
  formatCoursePrice,
  formatLabel,
} from "@/lib/labels";
import { JsonLd, courseJsonLd } from "@/lib/seo/json-ld";

export type CourseDetailLabels = {
  submit: string;
  success: string;
  cta: string;
  formTitle: string;
  formDescription: string;
  hint: string;
  cancel: string;
  backToCatalog: string;
  detailsTitle: string;
  aboutTitle: string;
  duration: string;
  format: string;
  category: string;
  price: string;
  priceUnset: string;
};

export function CourseDetailTemplate({
  course,
  labels,
}: {
  course: Course;
  labels: CourseDetailLabels;
}) {
  const priceLabel = formatCoursePrice(course.price);
  const specs = [
    {
      icon: Tag,
      label: labels.category,
      value: categoryLabel(course.category),
    },
    {
      icon: Layers,
      label: labels.format,
      value: formatLabel(course.format),
    },
    ...(course.durationHours
      ? [
          {
            icon: Clock,
            label: labels.duration,
            value: `${course.durationHours} ساعت`,
          },
        ]
      : []),
    ...(priceLabel
      ? [
          {
            icon: Wallet,
            label: labels.price,
            value: priceLabel,
          },
        ]
      : []),
  ];

  return (
    <main id="main-content">
      <JsonLd data={courseJsonLd(course)} />
      <PageHero
        title={course.title}
        intro={course.summary}
        eyebrow={categoryLabel(course.category)}
        imageUrl={course.posterImageUrl}
      />

      <Section className="bg-gradient-to-b from-background to-muted/40">
        <Container className="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,22rem)] lg:items-start lg:gap-12">
          <div className="space-y-8">
            <div className="overflow-hidden rounded-2xl ring-1 ring-border">
              <div className="relative aspect-[16/9] bg-muted">
                <Image
                  src={course.brochureImageUrl}
                  alt={course.title}
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 60vw"
                  priority
                />
              </div>
            </div>

            <section className="space-y-4">
              <h2 className="text-xl font-bold tracking-tight">
                {labels.aboutTitle}
              </h2>
              <p className="text-base leading-8 text-foreground/90">
                {course.summary}
              </p>
              {course.seoDescription &&
              course.seoDescription !== course.summary ? (
                <p className="text-base leading-8 text-muted-foreground">
                  {course.seoDescription}
                </p>
              ) : null}
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold tracking-tight">
                {labels.detailsTitle}
              </h2>
              <dl className="grid overflow-hidden rounded-2xl bg-card ring-1 ring-border sm:grid-cols-2 sm:divide-x sm:divide-x-reverse sm:divide-border">
                {specs.map((item) => (
                  <div
                    key={item.label}
                    className="flex gap-3 border-b border-border p-5 last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0"
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <item.icon className="size-4" />
                    </div>
                    <div className="min-w-0">
                      <dt className="text-xs font-medium text-muted-foreground">
                        {item.label}
                      </dt>
                      <dd className="mt-1 text-sm font-semibold text-foreground">
                        {item.value}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </section>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28">
            <div className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border">
              <p className="text-sm font-semibold text-foreground">{course.title}</p>
              <Separator className="my-4" />
              <ul className="space-y-3 text-sm text-muted-foreground">
                {course.durationHours ? (
                  <li className="flex justify-between gap-3">
                    <span>{labels.duration}</span>
                    <span className="font-medium text-foreground">
                      {course.durationHours} ساعت
                    </span>
                  </li>
                ) : null}
                <li className="flex justify-between gap-3">
                  <span>{labels.format}</span>
                  <span className="font-medium text-foreground text-end">
                    {formatLabel(course.format)}
                  </span>
                </li>
                {priceLabel ? (
                  <li className="flex justify-between gap-3">
                    <span>{labels.price}</span>
                    <span className="font-bold text-primary">{priceLabel}</span>
                  </li>
                ) : null}
              </ul>
            </div>

            <CourseRegisterGate
              courseSlug={course.slug}
              submitLabel={labels.submit}
              successLabel={labels.success}
              ctaLabel={labels.cta}
              formTitle={labels.formTitle}
              formDescription={labels.formDescription}
              hint={labels.hint}
              cancelLabel={labels.cancel}
            />

            <TextLink href="/professional" className="block text-sm">
              {labels.backToCatalog}
            </TextLink>
          </aside>
        </Container>
      </Section>
    </main>
  );
}
