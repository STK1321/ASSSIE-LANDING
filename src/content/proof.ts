export type Proof = { name: string; sector: string; detail: string; outcome: string; url?: string };

export const proof: Proof[] = [
  { name: "Proactive Watch", sector: "Monitoreo de seguridad remoto, Florida",
    detail: "La plataforma que sostiene la operación: casos, historial de incidentes, usuarios y reportes.",
    outcome: "Una operación que atiende propiedades en varios estados desde un solo panel.",
    url: "https://proactive-watch.com" },
  { name: "Chico Corp", sector: "Importación y exportación entre América Latina y Asia",
    detail: "Una app multi-tenant para sus inspecciones de producto, de fábrica y de otros casos: cada cliente con sus inspecciones y sus informes en un solo lugar.",
    outcome: "Los informes de inspección se arman en la app, con cada cliente separado del resto.",
    url: "https://chico-corp.com" },
];
