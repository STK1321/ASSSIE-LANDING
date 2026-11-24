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
    "Software propio y trabajo a medida para el comercio que cobra por QR y la empresa chica que vive en tres Excel. Código abierto, sin cuenta y sin anuncios.";
  const canonical = props.canonical ?? `${site.url}/`;
  const image = props.image ?? `${site.url}/og-image.jpg`;

  return { title, description, canonical, image, noindex: props.noindex ?? false };
};
