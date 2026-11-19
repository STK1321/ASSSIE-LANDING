export type QrLibreStep = {
  title: string;
  detail: string;
};

export type QrLibreFaqItem = {
  question: string;
  answer: string;
};

export type QrLibreContent = {
  name: string;
  tagline: string;
  status: string;
  updated: string;
  what: string[];
  notWhat: string[];
  how: QrLibreStep[];
  faq: QrLibreFaqItem[];
  repo: string;
};

// The app does not exist yet. Copy stays in the design-commitment tense
// ("va a…") and never claims behavior that a real build performs today.
export const qrlibre: QrLibreContent = {
  name: "QR Libre",
  tagline: "Tu pago suena. Tu negocio sigue.",
  status: "En construcción",
  updated: "2026-11-19",
  what: [
    "Va a avisar en voz alta cuando entre un pago, sin que tengas que mirar la pantalla.",
    "Va a leer solo los avisos de pago de las apps que tú decidas activar.",
    "Va a funcionar sin cuenta, sin anuncios y sin mensualidad."
  ],
  notWhat: [
    "El aviso sirve para que te enteres, pero no confirma pagos: esa confirmación la da el banco.",
    "No se conecta a ninguna cuenta bancaria ni consulta tus movimientos.",
    "No reemplaza el comprobante del banco."
  ],
  how: [
    {
      title: "Activas los avisos que te importan",
      detail:
        "Cuando la instales, vas a darle acceso a las notificaciones y a elegir las apps de pago que usas. Nada más."
    },
    {
      title: "El banco avisa y la app lo entiende",
      detail:
        "El aviso de pago llega al teléfono como siempre. QR Libre lo va a leer y a resumir: cuánto entró y de dónde."
    },
    {
      title: "El teléfono lo dice en voz alta",
      detail:
        "La app va a sonar y a decir el monto. Tú sigues atendiendo, sin abrir otra pantalla."
    }
  ],
  faq: [
    {
      question: "¿QR Libre ya se puede descargar?",
      answer:
        "Todavía no. La app está en construcción: no hay una versión instalable ni un repositorio público. Esta página muestra la fecha del último cambio."
    },
    {
      question: "¿Necesito una cuenta o pagar una mensualidad?",
      answer:
        "No. El diseño no pide cuenta, no muestra anuncios y no cobra mensualidad. Es software abierto: el código va a quedar a la vista."
    },
    {
      question: "¿Se conecta a mi cuenta bancaria?",
      answer:
        "No. No se conecta a ninguna cuenta bancaria ni consulta movimientos. Solo va a leer los avisos de pago que ya llegan al teléfono, de las apps que tú actives."
    },
    {
      question: "¿Reemplaza el comprobante del banco?",
      answer:
        "No. El comprobante del banco sigue siendo el documento que vale. QR Libre solo avisa que el pago entró."
    },
    {
      question: "¿Qué pasa con mis datos?",
      answer:
        "Quedan en tu teléfono. La app no envía el contenido de los mensajes a ningún servidor y no pide cuenta."
    }
  ],
  repo: ""
};
