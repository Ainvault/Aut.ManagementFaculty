import Image from "next/image";
import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { MetamorphField } from "@/components/atoms/MetamorphField";

export function PageHero({
  title,
  intro,
  eyebrow,
  imageUrl,
}: {
  title: string;
  intro?: string;
  eyebrow?: string;
  imageUrl?: string;
}) {
  return (
    <header className="page-hero relative isolate overflow-hidden bg-chart-3 py-16 text-background sm:py-24">
      {imageUrl ? (
        <>
          <Image
            src={imageUrl}
            alt=""
            fill
            priority
            className="object-cover opacity-25"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-chart-3 via-chart-3/90 to-chart-3/60" />
        </>
      ) : (
        <>
          <Image
            src="/brand/campus-collaboration-v1.png"
            alt=""
            fill
            priority
            className="object-cover opacity-15 grayscale"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-chart-3 via-chart-3/95 to-chart-3/75" />
        </>
      )}
      <MetamorphField
        tone="dark"
        density="normal"
        className="end-0 start-auto w-[min(75vw,42rem)] opacity-45"
      />
      <div className="absolute end-0 top-0 h-px w-1/3 bg-gradient-to-l from-accent to-transparent" />
      <Container className="relative z-[2] min-w-0">
        <div className="page-hero__content w-full min-w-0 max-w-4xl text-start">
          {eyebrow ? (
            <p className="mb-4 inline-flex rounded-full border border-background/15 bg-background/5 px-3 py-1.5 text-xs font-semibold text-accent backdrop-blur-sm">
              {eyebrow}
            </p>
          ) : null}
          <Heading
            as="h1"
            level={1}
            className="max-w-4xl text-[1.65rem] leading-[1.45] text-pretty text-background sm:text-4xl lg:text-[2.75rem] lg:leading-[1.4]"
          >
            {title}
          </Heading>
          {intro ? (
            <p className="mt-5 max-w-2xl border-t border-accent/60 pt-5 text-base leading-8 text-pretty text-background/70 sm:text-lg sm:leading-8">
              {intro}
            </p>
          ) : null}
        </div>
      </Container>
    </header>
  );
}
