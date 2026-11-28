export type Proof = { name: string; sector: string; detail: string; outcome: string; url?: string };

export const proof: Proof[] = [
  { name: "Proactive Watch", sector: "Monitoreo de seguridad remoto, Florida",
    detail: "La plataforma que sostiene la operación: casos, historial de incidentes, usuarios y reportes.",
    outcome: "Una operación que atiende propiedades en varios estados desde un solo panel.",
    url: "https://proactive-watch.com" },
  { name: "Chico Corp", sector: "Importación y exportación entre América Latina y Asia",
    detail: "Una app de gestión para su operación: inventario, ventas y lo que antes vivía en hojas sueltas.",
    outcome: "El día de trabajo en un solo lugar, sin depender de una persona que se acuerde de todo.",
    url: "https://chico-corp.com" },
];
