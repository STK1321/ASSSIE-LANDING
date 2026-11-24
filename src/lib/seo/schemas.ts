import { site } from "@/content/site";
import { qrlibre } from "@/content/qrlibre";
import { capabilities } from "@/content/capabilities";

export type FaqSchemaItem = {
  question: string;
  answer: string;
};

const CONTEXT = "https://schema.org";

export const buildOrganizationSchema = () => ({
  "@context": CONTEXT,
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: `${site.url}/logo.png`,
  description: site.slogan,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    addressCountry: site.address.country
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: site.whatsapp,
    contactType: "sales"
  },
  // No profile URL means no sameAs key: an empty list is worse than none.
  ...(site.github ? { sameAs: [site.github] } : {})
});

export const buildWebSiteSchema = () => ({
  "@context": CONTEXT,
  "@type": "WebSite",
  name: site.name,
  url: site.url
});

// Each capability is a service the organization offers. The provider names and
// links the same Organization published on the home, without a nested copy of
// the address block.
export const buildServiceSchema = () =>
  capabilities.map((capability) => ({
    "@context": CONTEXT,
    "@type": "Service",
    name: capability.problem,
    description: capability.detail,
    provider: {
      "@type": "Organization",
      name: site.name,
      url: site.url
    }
  }));

export const buildSoftwareApplicationSchema = () => ({
  "@context": CONTEXT,
  "@type": "SoftwareApplication",
  name: qrlibre.name,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Android",
  isAccessibleForFree: true,
  license: "https://opensource.org/licenses/MIT",
  url: `${site.url}/qr-libre`,
  // The repo is still private; never publish a placeholder code repository.
  ...(qrlibre.repo ? { codeRepository: qrlibre.repo } : {})
});

export const buildFaqSchema = (items: FaqSchemaItem[]) => ({
  "@context": CONTEXT,
  "@type": "FAQPage",
  mainEntity: items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer
    }
  }))
});

export const buildBreadcrumbSchema = (path: string, name: string) => ({
  "@context": CONTEXT,
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Inicio",
      item: `${site.url}/`
    },
    {
      "@type": "ListItem",
      position: 2,
      name,
      item: `${site.url}${path}`
    }
  ]
});
