export type Service = {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  idealFor: string[];
  scope: string[];
  deliverables: string[];
  typicalTimeline: string;
  modalCtaLabel: string;
};

export const services: Service[] = [
  {
    id: "data-ml",
    order: 1,
    title: "Data & Machine Learning",
    subtitle: "Analítica y machine learning para decisiones con datos",
    description:
      "Aplicamos analítica y machine learning para que tu empresa tome mejores decisiones basadas en datos reales, no suposiciones.",
    icon: "data",
    idealFor: [
      "Empresas con datos dispersos",
      "Negocios que quieren predecir demanda, comportamiento o riesgo",
      "Equipos que necesitan dashboards accionables"
    ],
    scope: [
      "Análisis de fuentes de datos existentes",
      "Diseño de modelos analíticos o predictivos",
      "Limpieza, transformación y validación de datos",
      "Visualización clara de métricas clave"
    ],
    deliverables: [
      "Dashboard funcional",
      "Modelo analítico o predictivo documentado",
      "Repositorio con código y README",
      "Documentación técnica y de negocio"
    ],
    typicalTimeline: "2 a 4 semanas",
    modalCtaLabel: "Quiero este servicio"
  },
  {
    id: "marketing",
    order: 2,
    title: "Marketing Digital & Redes",
    subtitle: "Estrategia medible alineada a objetivos de negocio",
    description:
      "Diseñamos estrategias de marketing medibles, orientadas a resultados y alineadas con objetivos reales de negocio.",
    icon: "marketing",
    idealFor: [
      "Empresas que invierten en marketing pero no miden resultados",
      "Marcas que quieren mejorar su presencia digital",
      "Negocios que buscan leads cualificados"
    ],
    scope: [
      "Diagnóstico de canales digitales",
      "Definición de estrategia y mensajes",
      "Creación y optimización de contenido",
      "Implementación de tracking y medición"
    ],
    deliverables: [
      "Plan de marketing digital",
      "Configuración de GA4 y tracking",
      "Contenido base para campañas",
      "Reporte de métricas y recomendaciones"
    ],
    typicalTimeline: "2 a 3 semanas",
    modalCtaLabel: "Quiero este servicio"
  },
  {
    id: "automation",
    order: 3,
    title: "Automatización de Procesos",
    subtitle: "Flujos operativos más rápidos y sin errores",
    description:
      "Automatizamos tareas repetitivas y flujos operativos para reducir errores, tiempos y costos internos.",
    icon: "automation",
    idealFor: [
      "Procesos manuales (pagos, mensajes, validaciones)",
      "Equipos operativos sobrecargados",
      "Empresas que usan múltiples herramientas desconectadas"
    ],
    scope: [
      "Mapeo del proceso actual",
      "Diseño de flujos automatizados",
      "Integración entre sistemas (CRM, pagos, mensajería)",
      "Pruebas y ajustes finales"
    ],
    deliverables: [
      "Flujos de automatización implementados",
      "Scripts o servicios backend",
      "Documentación de uso y mantenimiento",
      "Soporte inicial post-entrega"
    ],
    typicalTimeline: "2 a 4 semanas",
    modalCtaLabel: "Quiero este servicio"
  },
  {
    id: "custom-dev",
    order: 4,
    title: "Desarrollo de Software a Medida",
    subtitle: "Producto escalable y alineado a tu operación",
    description:
      "Creamos software a medida, escalable y mantenible, alineado con tus procesos y necesidades reales.",
    icon: "dev",
    idealFor: [
      "Empresas con necesidades específicas",
      "Productos internos o MVPs",
      "Integraciones complejas"
    ],
    scope: [
      "Levantamiento de requerimientos",
      "Diseño de arquitectura",
      "Desarrollo frontend y backend",
      "Pruebas y despliegue"
    ],
    deliverables: [
      "Aplicación web/API funcional",
      "Código fuente documentado",
      "Arquitectura técnica",
      "Guía de despliegue y mantenimiento"
    ],
    typicalTimeline: "3 a 6 semanas",
    modalCtaLabel: "Quiero este servicio"
  },
  {
    id: "ai-creative",
    order: 5,
    title: "IA para Video e Imagen",
    subtitle: "Contenido visual rápido y consistente",
    description:
      "Utilizamos IA para optimizar y automatizar la creación de contenido visual, reduciendo tiempos de producción.",
    icon: "ai",
    idealFor: [
      "Marketing de contenidos",
      "Redes sociales",
      "Equipos creativos con alta demanda"
    ],
    scope: [
      "Definición del flujo creativo",
      "Generación o edición asistida por IA",
      "Automatización de piezas visuales",
      "Optimización para plataformas digitales"
    ],
    deliverables: [
      "Piezas de video e imagen listas para uso",
      "Flujos automatizados de contenido",
      "Guía de uso y ajustes",
      "Recomendaciones de escalabilidad"
    ],
    typicalTimeline: "1 a 3 semanas",
    modalCtaLabel: "Quiero este servicio"
  }
];
