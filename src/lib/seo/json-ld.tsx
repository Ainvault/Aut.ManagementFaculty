import { siteName, siteShortName, siteAddress } from "@/lib/site-config";
import type { Course } from "@/lib/types";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: siteName,
    alternateName: siteShortName,
    url: "https://aut.ac.ir",
    address: {
      "@type": "PostalAddress",
      addressLocality: "تهران",
      addressCountry: "IR",
      streetAddress: siteAddress.line,
    },
    telephone: siteAddress.phone,
  };
}

export function courseJsonLd(course: Course) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.seoDescription,
    provider: {
      "@type": "EducationalOrganization",
      name: siteName,
    },
    url: course.registrationUrl,
    image: course.posterImageUrl,
    educationalCredentialAwarded: "گواهی دانشکده مدیریت علم و فناوری",
  };
  if (course.price != null && Number.isFinite(course.price) && course.price >= 0) {
    data.offers = {
      "@type": "Offer",
      price: course.price,
      priceCurrency: "IRR",
      availability: "https://schema.org/InStock",
    };
  }
  return data;
}

export function JsonLd({ data }: { data: Record<string, unknown> | object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
