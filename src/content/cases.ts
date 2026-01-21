export type CaseStudy = {
  title: string;
  industry: string;
  outcome: string;
  highlights: string[];
};

export const cases: CaseStudy[] = [
  {
    title: "Caso A",
    industry: "Servicios profesionales",
    outcome: "Reducción de tareas manuales y mejor trazabilidad comercial.",
    highlights: [
      "Automatización de contacto inicial y seguimiento",
      "Dashboard de pipeline en tiempo real",
      "Mejora en tiempos de respuesta"
    ]
  },
  {
    title: "Caso B",
    industry: "Retail y ecommerce",
    outcome: "Mejor medición de campañas y decisiones de pauta más claras.",
    highlights: [
      "Tracking completo con GA4 y CAPI",
      "Segmentación de audiencias con datos propios",
      "Reportes ejecutivos semanales"
    ]
  },
  {
    title: "Caso C",
    industry: "Salud y bienestar",
    outcome: "Procesos internos más ordenados y mejor visibilidad de demanda.",
    highlights: [
      "Integración con CRM y WhatsApp",
      "Predicción de demanda por sucursal",
      "Notificaciones automáticas"
    ]
  }
];
