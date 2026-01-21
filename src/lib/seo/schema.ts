import { site } from "@/content/site";
import type { FaqItem } from "@/content/faq";

export const buildOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  email: site.email,
  sameAs: Object.values(site.social),
  description: site.slogan
});

export const buildProfessionalServiceSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  url: site.url,
  email: site.email,
  areaServed: "Latam",
  description:
    "Agencia de automatizaci?n, marketing digital, anal?tica de datos y desarrollo a medida.",
  serviceType: [
    "automatizaci?n de procesos",
    "marketing digital",
    "anal?tica de datos",
    "desarrollo a medida",
    "IA para contenido"
  ]
});

export const buildFaqSchema = (faq: FaqItem[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer
    }
  }))
});
