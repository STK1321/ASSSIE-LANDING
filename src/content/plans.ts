export type Plan = {
  name: string;
  tagline: string;
  price: string;
  includes: string[];
  excludes: string[];
  cta: string;
  highlighted?: boolean;
};

export const plans: Plan[] = [
  {
    name: "Starter",
    tagline: "Marketing + medición básica",
    price: "Plan mensual",
    includes: [
      "Estrategia de marketing digital",
      "Calendario de contenido y campañas",
      "Configuración de GA4 y Tag Manager",
      "Reporte mensual con aprendizajes"
    ],
    excludes: [
      "Automatizaciones avanzadas",
      "Dashboards a medida",
      "Desarrollo de producto"
    ],
    cta: "Quiero Starter"
  },
  {
    name: "Growth",
    tagline: "Automatización + data",
    price: "Plan mensual",
    includes: [
      "Todo lo de Starter",
      "Automatización de procesos clave",
      "Dashboards accionables",
      "Optimización continua"
    ],
    excludes: [
      "IA creativa a escala",
      "Desarrollo de producto completo"
    ],
    cta: "Quiero Growth",
    highlighted: true
  },
  {
    name: "Custom",
    tagline: "Desarrollo + IA + integraciones",
    price: "A medida",
    includes: [
      "Producto digital a medida",
      "Integraciones con sistemas y datos",
      "IA aplicada a procesos y contenido",
      "Soporte y evolución continua"
    ],
    excludes: [
      "Paquetes cerrados"
    ],
    cta: "Agendar llamada"
  }
];

