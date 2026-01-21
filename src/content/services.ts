export type Service = {
  title: string;
  description: string;
  icon: string;
  bullets: string[];
  cta: string;
};

export const services: Service[] = [
  {
    title: "Data & ML",
    description: "Analítica de datos accionable para equipos que necesitan decidir rápido.",
    icon: "data",
    bullets: [
      "Dashboards y KPIs que entienden negocio",
      "Modelos de predicción (churn, demanda, LTV)",
      "Medición confiable con datos listos para decisión"
    ],
    cta: "Ver alcance"
  },
  {
    title: "Marketing 360",
    description: "Estrategia, contenido y medición integral para crecer con claridad.",
    icon: "marketing",
    bullets: [
      "Plan de contenidos y pauta multicanal",
      "Tracking que atribuye canales y ventas reales",
      "SEO técnico que mejora visibilidad y conversión"
    ],
    cta: "Ver alcance"
  },
  {
    title: "Automatización de procesos",
    description: "Flujos conectados que reducen tareas manuales y errores.",
    icon: "automation",
    bullets: [
      "Integraciones WhatsApp/CRM y pagos",
      "Bots y notificaciones inteligentes",
      "Procesos con menos errores y trazabilidad clara"
    ],
    cta: "Ver alcance"
  },
  {
    title: "Desarrollo a medida",
    description: "Soluciones digitales hechas para tu operación real.",
    icon: "dev",
    bullets: [
      "Web apps, APIs y mobile",
      "Arquitectura escalable sin rework",
      "Performance y seguridad desde el inicio"
    ],
    cta: "Ver alcance"
  },
  {
    title: "IA Creativa",
    description: "Contenido audiovisual con IA para acelerar producción.",
    icon: "ai",
    bullets: [
      "Guiones, reels y piezas publicitarias",
      "Edición y variaciones en volumen",
      "Contenido más rápido sin perder calidad"
    ],
    cta: "Ver alcance"
  }
];
