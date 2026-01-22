export type Service = {
  title: string;
  subtitle: string;
  icon: string;
  bullets: string[];
};

export const services: Service[] = [
  {
    title: "Data & Machine Learning",
    subtitle: "Predicción de demanda y churn",
    icon: "data",
    bullets: [
      "Dashboards accionables para equipos directivos",
      "Modelos predictivos conectados a tu operación",
      "Integración con datos existentes"
    ]
  },
  {
    title: "Marketing Digital & Redes",
    subtitle: "Estrategia, contenido y campañas medibles",
    icon: "marketing",
    bullets: [
      "Planeación de contenido y ejecución multicanal",
      "Medición real con GA4, Meta y tracking",
      "Optimización continua de conversión"
    ]
  },
  {
    title: "Automatización de Procesos",
    subtitle: "Bots, flujos y notificaciones",
    icon: "automation",
    bullets: [
      "Integraciones con CRM, pagos y mensajería",
      "Reducción de tareas manuales y errores",
      "Visibilidad operativa en tiempo real"
    ]
  },
  {
    title: "Desarrollo a Medida",
    subtitle: "Web apps, APIs y mobile",
    icon: "dev",
    bullets: [
      "Arquitectura escalable y mantenible",
      "Integraciones con sistemas internos",
      "Código limpio con foco en performance"
    ]
  },
  {
    title: "IA para Video e Imagen",
    subtitle: "Contenido automatizado para redes",
    icon: "ai",
    bullets: [
      "Creativos listos para pauta y redes",
      "Flujos de producción más rápidos",
      "Versiones y formatos a escala"
    ]
  }
];

