export type ProcessStep = {
  title: string;
  detail: string;
};

export const processSteps: ProcessStep[] = [
  {
    title: "Hablamos y miramos tu operación",
    detail: "Nos cuentas cómo trabajas hoy y vemos dónde se pierde el tiempo."
  },
  {
    title: "Construimos lo más pequeño que sirve",
    detail: "Una primera versión que ya resuelve algo real, sin esperar al sistema completo."
  },
  {
    title: "Te entregamos el código y la documentación",
    detail: "Queda tuyo: lo puedes leer, correr y cambiar sin depender de nosotros."
  }
];
