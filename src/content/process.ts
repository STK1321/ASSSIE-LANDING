export type ProcessStep = {
  title: string;
  detail: string;
};

export const processSteps: ProcessStep[] = [
  {
    title: "Diagnóstico",
    detail: "Levantamos datos, objetivos y restricciones para priorizar rápido."
  },
  {
    title: "Diseño",
    detail: "Definimos arquitectura, roadmap y entregables claros."
  },
  {
    title: "Implementación",
    detail: "Construimos y conectamos sistemas con entregas iterativas."
  },
  {
    title: "Medición",
    detail: "Configuramos KPIs, dashboards y seguimiento continuo."
  },
  {
    title: "Optimización",
    detail: "Ajustamos y escalamos con base en resultados reales."
  }
];
