export type DirectionStep = { title: string; detail: string };

export const direction: { intro: string; steps: DirectionStep[]; closing: string } = {
  intro:
    "Un comerciante en Colombia hace tres cosas todos los días: cobra, cuenta y cierra. Cada una vive en un lugar distinto —el QR del banco, el cuaderno, el WhatsApp— y ninguna le habla a la otra.",
  steps: [
    {
      title: "QR Libre",
      detail:
        "Empezamos por lo primero: avisa en voz alta cuando entra un pago, sin comprar equipos y sin mensualidad."
    },
    {
      title: "Conciliación",
      detail:
        "Sigue la conciliación: que la plata que entró coincida con lo que se vendió, sin abrir tres aplicaciones."
    },
    {
      title: "Cierre",
      detail:
        "Y el cierre: cuánto entró, cuánto salió, cuánto quedó, en una pantalla que se entiende sin ser contador."
    }
  ],
  closing:
    "Nada de esto pide cuenta, anuncios ni depender de nosotros. El código es abierto; si un día no estamos, sigue funcionando."
};
