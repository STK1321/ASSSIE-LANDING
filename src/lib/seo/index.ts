import { site } from "@/content/site";

export type SeoProps = {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  noindex?: boolean;
};

export const buildSeo = (props: SeoProps) => {
  const title = props.title ?? `${site.name} | ${site.slogan}`;
  const description =
    props.description ??
    "Automatizaci?n de procesos, marketing digital, anal?tica de datos y desarrollo a medida para empresas en crecimiento.";
  const canonical = props.canonical ?? site.url;
  const image = props.image ?? `${site.url}/og-image.svg`;

  return { title, description, canonical, image, noindex: props.noindex ?? false };
};
