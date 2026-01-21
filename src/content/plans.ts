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
    tagline: "Marketing y medición para empezar con foco.",
    price: "Desde USD 690/mes",
    includes: [
      "Estrategia de marketing digital",
      "Plan de contenidos mensual",
      "Configuración de GA4 y Tag Manager",
      "Reporte básico de performance"
    ],
    excludes: [
      "Automatizaciones avanzadas",
      "Modelos de machine learning",
      "Desarrollo a medida"
    ],
    cta: "Quiero Starter"
  },
  {
    name: "Growth",
    tagline: "Automatización + data para escalar con orden.",
    price: "Desde USD 1.490/mes",
    includes: [
      "Todo lo de Starter",
      "Automatización de procesos clave",
      "Dashboards y analítica avanzada",
      "Optimización de campañas"
    ],
    excludes: [
      "Desarrollo de producto completo",
      "IA creativa a escala"
    ],
    cta: "Quiero Growth",
    highlighted: true
  },
  {
    name: "Custom",
    tagline: "Soluciones a medida con IA e integraciones complejas.",
    price: "Hablemos",
    includes: [
      "Desarrollo a medida",
      "Integraciones y arquitectura cloud",
      "IA para contenido y procesos",
      "Soporte dedicado"
    ],
    excludes: [
      "Paquetes cerrados"
    ],
    cta: "Agendar reunión"
  }
];
