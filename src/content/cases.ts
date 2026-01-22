export type CaseStudy = {
  title: string;
  industry: string;
  outcome: string;
  highlights: string[];
};

export const cases: CaseStudy[] = [
  {
    title: "Caso A: Automatización operativa",
    industry: "Servicios profesionales",
    outcome: "Procesos internos más ordenados y equipos con foco en tareas de valor.",
    highlights: [
      "Flujos automatizados para solicitudes y seguimiento",
      "Visibilidad de estados en un solo dashboard",
      "Menos fricción entre ventas y operaciones"
    ]
  },
  {
    title: "Caso B: Marketing con medición real",
    industry: "Retail y ecommerce",
    outcome: "Decisiones de pauta basadas en datos confiables y atribución clara.",
    highlights: [
      "Tracking completo con GA4 y Meta",
      "Tablero de rendimiento por canal",
      "Aprendizajes accionables para iterar campañas"
    ]
  },
  {
    title: "Caso C: Desarrollo a medida",
    industry: "Salud y bienestar",
    outcome: "Producto digital alineado con procesos reales y listo para escalar.",
    highlights: [
      "Aplicaciones conectadas a sistemas existentes",
      "Automatización de reportes y alertas",
      "Arquitectura preparada para crecimiento"
    ]
  }
];

