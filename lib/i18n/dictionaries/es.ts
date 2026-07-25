import type { Dictionary } from "../types";

const es: Dictionary = {
  meta: {
    titleSuffix: " | MoveOS Barcelona",
  },
  languageNames: {
    en: "English",
    es: "Español",
    ru: "Русский",
  },
  nav: {
    bookButton: "Revisión gratuita de tu mudanza",
  },
  heroTrustBadges: ["100% gratis", "15 minutos", "Personalizado", "Sin compromiso"],
  pains: {
    deposit: {
      eyebrow: "Revisión gratuita de tu fianza · Barcelona",
      h1: "No pierdas tu fianza al dejar el piso",
      subheading:
        "La mayoría de inquilinos pierde parte de su fianza simplemente por no conocer sus derechos. Consigue una revisión gratuita de tu fianza y descubre qué hacer antes de entregar las llaves para recuperarla entera.",
      heroCta: "Consigue tu revisión de fianza",
      shortLabel: "Fianza",
    },
    admin: {
      eyebrow: "Revisión gratuita de trámites de mudanza · Barcelona",
      h1: "Mudarte no debería significar una montaña de papeleo",
      subheading:
        "Una suscripción olvidada o una factura sin pagar suele aparecer meses después de la mudanza. Consigue una revisión gratuita de tus trámites para que nada se te escape.",
      heroCta: "Consigue tu revisión de trámites",
      shortLabel: "Trámites de mudanza",
    },
    belongings: {
      eyebrow: "Revisión gratuita de mudanza · Barcelona",
      h1: "Que tus muebles no se conviertan en un problema",
      subheading:
        "Los muebles y pertenencias que no te llevas son una fuente habitual de estrés y gastos de última hora. Consigue una revisión gratuita y un plan claro para qué hacer con ellos.",
      heroCta: "Consigue tu revisión de pertenencias",
      shortLabel: "Muebles y pertenencias",
    },
    urgent: {
      eyebrow: "Revisión gratuita de mudanza urgente · Barcelona",
      h1: "¿Te mudas antes de lo previsto? Hazlo bien.",
      subheading:
        "Mudarte antes de lo previsto suele costar más de lo que crees, entre penalizaciones y fianza perdida. Consigue una revisión gratuita de tu mudanza urgente antes de avisar al propietario.",
      heroCta: "Consigue tu revisión de mudanza urgente",
      shortLabel: "Mudanza urgente",
    },
  },
  whatYouGet: {
    heading: "Errores que le cuestan caro a los inquilinos al mudarse",
    subheading: "Lo que la mayoría descubre demasiado tarde — lo repasamos para tu situación concreta.",
    items: [
      {
        badge: "Deducciones",
        title: "Las deducciones ilegales son la causa nº1 de perder la fianza",
        pains: ["deposit"],
      },
      {
        badge: "Informe fotográfico",
        title: "Sin fotos ni acta firmada, no puedes demostrar tu versión",
        pains: ["deposit", "urgent", "belongings"],
      },
      {
        badge: "Suministros",
        title: "Un contador sin cerrar puede pasarte factura meses después",
        pains: ["admin"],
      },
      {
        badge: "Cambio de dirección",
        title: "Olvidar actualizar tu dirección te complica las cosas más tarde",
        pains: ["admin"],
      },
      {
        badge: "Pertenencias",
        title: "Los muebles sin destino generan estrés y gastos de última hora",
        pains: ["belongings"],
      },
      {
        badge: "Salida anticipada",
        title: "Irte antes de tiempo suele traer penalización y menos fianza",
        pains: ["urgent"],
      },
      {
        badge: "Documentos",
        title: "Un solo documento que falte puede retrasar tu fianza",
        pains: ["deposit", "admin", "urgent"],
      },
    ],
    resultLabel: "El resultado",
    resultText: "Vete con todo resuelto: fianza, trámites y pertenencias.",
  },
  didYouKnow: {
    heading: "¿Sabías que…?",
    subheading: "Cosas que la mayoría de inquilinos descubre cuando ya es tarde.",
    facts: {
      deposit: [
        {
          q: "Tu fianza puede estar en manos del Estado, no de tu propietario.",
          a: "En Cataluña, la fianza obligatoria se deposita en el INCASÒL, no en la cuenta personal del propietario — y se puede comprobar.",
        },
        {
          q: "Tu propietario tiene exactamente un mes para devolver la fianza.",
          a: "Por ley, la fianza debe devolverse en el plazo de un mes tras entregar las llaves. El silencio después de ese plazo no es normal — es un incumplimiento.",
        },
        {
          q: "El desgaste normal no es motivo de descuento.",
          a: "Una pintura descolorida o un suelo desgastado por los años son desgaste normal, no daño. Distinguir uno de otro es toda la disputa.",
        },
        {
          q: "La mayoría de disputas las gana una foto, no un abogado.",
          a: "Un buen informe del estado del piso a la entrada y a la salida cierra el tema antes de que empiece.",
        },
      ],
      admin: [
        {
          q: "Una suscripción olvidada te sigue cobrando después de mudarte.",
          a: "Streaming, gimnasio, repartos — las suscripciones no se cancelan solas. Revisar la lista lleva 10 minutos y ahorra meses de cargos.",
        },
        {
          q: "Las compañías de internet rara vez van más rápido de 2 semanas.",
          a: "Incluso una baja o traspaso urgente de internet en España suele tardar de 1 a 2 semanas — planifícalo con tiempo.",
        },
        {
          q: "Un empadronamiento olvidado puede complicarte las cosas en el peor momento.",
          a: "Tu dirección registrada afecta a citas médicas, matrícula escolar y algunos trámites de extranjería.",
        },
        {
          q: "El correo a tu antigua dirección puede seguir llegando meses después.",
          a: "Banco, Hacienda, seguro — la lista de sitios con tu dirección suele ser más larga de lo que parece.",
        },
      ],
      belongings: [
        {
          q: "Los muebles que dejas atrás suelen convertirse en problema del propietario — y tuyo también.",
          a: "Si el propietario encuentra objetos después de que te vayas, puede retrasar tu fianza o sumar gastos de retirada.",
        },
        {
          q: "Vender muebles la última semana es casi imposible.",
          a: "Los buenos anuncios de muebles de segunda mano tardan entre 2 y 4 semanas en venderse — no te dará tiempo en los últimos días.",
        },
        {
          q: "Guardar tus cosas es más barato de lo que crees — si reservas con antelación.",
          a: "Los precios de trasteros a corto plazo en Barcelona suben en temporada alta de mudanzas (verano, fin de curso).",
        },
        {
          q: "No todo lo que parece basura es fácil de tirar.",
          a: "Los muebles y colchones no se pueden dejar sin más en la calle — Barcelona tiene normas y calendarios específicos para objetos voluminosos (trastos).",
        },
      ],
      urgent: [
        {
          q: "Irte antes de tiempo no siempre implica una penalización.",
          a: "Muchos contratos permiten la resolución anticipada con una compensación de como máximo una mensualidad — no perder toda la fianza, como muchos temen.",
        },
        {
          q: "Tu plazo de preaviso cuenta desde el aviso por escrito, no desde la conversación.",
          a: "Avisar de palabra no cuenta — la mayoría de contratos exigen un aviso por escrito (email o burofax).",
        },
        {
          q: "Irte «mañana mismo» casi nunca es gratis, legalmente hablando.",
          a: "Incluso en casos urgentes, los contratos suelen exigir un preaviso mínimo — saltárselo puede significar pagar meses que no vivirás allí.",
        },
        {
          q: "El pánico es el peor consejero cuando necesitas irte rápido.",
          a: "La mayoría de errores costosos en una salida urgente ocurren en las primeras 24 horas, antes de leer bien el contrato.",
        },
      ],
    },
  },
  whyUs: {
    eyebrow: "Por qué MoveOS",
    heading: "Cada mudanza es distinta",
    intro: "Tu contrato, tu propietario, el estado del piso y tus plazos importan. Nuestro único trabajo es que te mudes sin estrés.",
    body: {
      deposit: "Así te ayudamos: revisamos el acta y las fotos de la salida y te decimos cómo recuperar tu fianza completa.",
      admin: "Así te ayudamos: revisamos tus documentos y los errores, para que no pagues de más ni te culpen injustamente.",
      belongings: "Así te ayudamos: hacemos un inventario y organizamos la mudanza, para que nada se pierda ni se rompa.",
      urgent: "Así te ayudamos: te decimos qué hacer primero, paso a paso — sin pánico.",
    },
  },
  quizIntro: {
    heading: "¿Listo para mudarte con confianza?",
    subheading: "Responde unas preguntas rápidas — te llevará menos de un minuto.",
  },
  footer: {
    tagline: "MoveOS — mudanzas tranquilas e informadas en Barcelona.",
    privacy: "Política de privacidad",
  },
  quiz: {
    progressLabel: "Paso {n} de {total}",
    backButton: "Atrás",
    city: {
      question: "¿En qué ciudad alquilas?",
      barcelona: "Barcelona",
      other: "Otra ciudad",
    },
    timeframe: {
      question: "¿Cuándo te mudas?",
      already: "Ya me mudé",
      lt1m: "En menos de 1 mes",
      m1to3: "En 1–3 meses",
      later: "Más de 3 meses / aún no lo sé",
    },
    pain: {
      question: "¿Qué es lo más importante para ti ahora?",
      deposit: "Recuperar mi fianza",
      admin: "Gestionar suministros y cambio de dirección",
      belongings: "Muebles y pertenencias que dejo atrás",
      urgent: "Mudarme antes de lo previsto",
      other: "Solo estoy investigando",
    },
    contact: {
      heading: "Casi listo — ¿dónde te enviamos tu checklist?",
      secondaryHeading: "Deja también tu número — te enviamos el checklist y la confirmación",
      namePlaceholder: "Tu nombre (opcional)",
      phonePlaceholder: "Tu número de teléfono",
      consent: "Acepto que MoveOS me contacte. Consulta nuestra Política de privacidad.",
      submitButton: "Quiero mi checklist",
      submitting: "Enviando…",
      error: "Algo salió mal. Inténtalo de nuevo en un momento.",
      bookingHeading: "Hablemos de tu situación en concreto",
      bookingBody: "Una llamada gratuita de 15 minutos — elige el horario que mejor te venga, sin compromiso.",
      bookingButton: "Reservar llamada",
    },
  },
  results: {
    qualified: {
      badge: "Encajas perfecto ✅",
      heading: "Vamos a que te mudes sin estrés",
      body: "Reserva tu llamada gratuita de 15 minutos abajo, y aprovecha para descargar tu checklist completo.",
      bookingHeading: "Reserva tu llamada gratuita de 15 minutos",
      bookingBody: "Elige el horario que mejor te venga — sin compromiso, sin ventas.",
      bookingButton: "Elegir horario",
      checklistHeading: "Tu checklist completo de mudanza",
    },
    notQualified: {
      badge: "Gracias por contarnos",
      heading: "Esto es lo que todo inquilino debería saber",
      body: "Ahora mismo nos centramos en inquilinos de Barcelona que se mudan en los próximos meses — pero aquí tienes un checklist gratuito con lo esencial para cualquiera que deje un alquiler en España.",
      checklistHeading: "Lo que debes saber antes de mudarte en España",
    },
    downloadPdf: "Descargar en PDF",
    restartButton: "Empezar de nuevo",
  },
  checklist: {
    generic: {
      title: "Mudarte en España: lo que todo inquilino debería saber",
      intro:
        "Información general para cualquiera que deje un alquiler en España — no es asesoría legal, son las bases que la mayoría de inquilinos aprende demasiado tarde.",
      sections: [
        {
          heading: "Plazo de preaviso",
          items: [
            "Revisa el plazo de preaviso de tu contrato (normalmente 30 días si te vas después del periodo mínimo).",
            "Notifica siempre por escrito (email o burofax) y guarda constancia de haberlo enviado.",
            "Confirma con el propietario la fecha exacta en que se considera finalizado el contrato.",
          ],
        },
        {
          heading: "Tu fianza",
          items: [
            "Tu fianza suele equivaler a una mensualidad y puede estar depositada en un organismo autonómico (por ejemplo, el INCASÒL en Cataluña), no solo en manos del propietario.",
            "El propietario solo puede descontar por daños que superen el desgaste normal, impagos de renta o de suministros — no por el simple paso del tiempo.",
            "Por ley, la fianza debería devolverse en el plazo de un mes tras la entrega de llaves, una vez acordadas las posibles deducciones.",
          ],
        },
        {
          heading: "La entrega del piso (check-in/check-out)",
          items: [
            "Haz fotos con fecha y, si puedes, vídeo de cada habitación antes de irte.",
            "Pide un acta de salida firmada (o redáctala tú y consigue que el propietario la firme) comparando el estado con el de entrada.",
            "Anota las lecturas de los contadores de luz, agua y gas el día de la entrega.",
          ],
        },
        {
          heading: "Suministros y suscripciones",
          items: [
            "Contacta con tus proveedores para programar el traspaso o la baja justo en tu fecha de salida.",
            "Da de alta el suministro en tu nueva dirección con antelación para evitar cortes.",
            "Actualiza tu dirección en el banco, el seguro y cualquier suscripción o envío.",
          ],
        },
        {
          heading: "Trámites oficiales",
          items: [
            "Actualiza tu empadronamiento en la nueva dirección.",
            "Actualiza tu dirección ante extranjería (TIE) o la DGT si tienes vehículo, si corresponde.",
          ],
        },
        {
          heading: "Si hay conflicto",
          items: [
            "Deja todo por escrito — los conflictos se ganan con documentación, no con opiniones.",
            "En reclamaciones de menor cuantía, en muchos casos puedes actuar sin abogado.",
            "Las asociaciones de inquilinos y las OMIC (oficinas de consumidor) ofrecen orientación gratuita.",
          ],
        },
      ],
      disclaimer:
        "Esto es información general, no asesoría legal. Las normas varían según la comunidad autónoma y el contrato — consulta tu caso concreto.",
    },
    qualified: {
      title: "Tu checklist de mudanza — Barcelona",
      intro:
        "Como te mudas pronto en Barcelona, aquí tienes el panorama completo — fianza, trámites, pertenencias y plazos — y lo que veremos juntos en tu llamada gratuita.",
      sections: [
        {
          heading: "Proteger tu fianza",
          items: [
            "Documenta el estado del piso antes de empezar a hacer las maletas, no la noche antes de la entrega.",
            "Aprende a distinguir el desgaste normal de los daños que sí se pueden descontar.",
            "Consigue un acta de salida firmada — es el factor que más pesa en cualquier disputa por la fianza.",
          ],
        },
        {
          heading: "Trámites de la mudanza, bajo control",
          items: [
            "Programa la baja o el traspaso de tu internet con al menos 2 semanas de antelación — las compañías van más lentas de lo que parece.",
            "Haz una lista de todos los sitios donde figura tu dirección actual: banco, seguro, Seguridad Social, suscripciones, envíos.",
            "Redirige o actualiza tu correspondencia antes de perder acceso a tu antiguo buzón.",
          ],
        },
        {
          heading: "Muebles y pertenencias",
          items: [
            "Decide pronto qué te llevas, qué vendes, donas o guardas — dejarlo para la última semana es el error más habitual.",
            "Si necesitas almacenamiento temporal o vender rápido, podemos ponerte en contacto con socios de confianza.",
          ],
        },
        {
          heading: "Si te vas antes de lo previsto",
          items: [
            "Revisa las cláusulas de resolución anticipada de tu contrato y posibles penalizaciones.",
            "Entiende qué pasa con tu fianza si rompes el periodo mínimo.",
            "Una llamada corta puede evitarte un error costoso aquí.",
          ],
        },
        {
          heading: "En tu llamada gratuita de 15 minutos",
          items: [
            "Revisamos tu contrato y tu situación real, no un guion genérico.",
            "Repasamos qué preparar antes de la fecha de entrega.",
            "Te damos un plan de acción claro y personal.",
          ],
        },
      ],
      disclaimer:
        "Esto es información general, no asesoría legal. Las normas varían según la comunidad autónoma y el contrato — consulta tu caso concreto.",
    },
  },
  privacy: {
    title: "Política de privacidad",
    intro:
      "Esta es una política de privacidad provisional para el MVP de MoveOS. Sustitúyela por una política revisada por un profesional cualificado antes de enviar tráfico de pago aquí. Como mínimo debería cubrir:",
    items: [
      "Qué datos se recogen (nombre, teléfono, respuestas del cuestionario) y para qué (contactarte sobre tu revisión gratuita y enviarte tu checklist).",
      "Cuánto tiempo se conservan los datos.",
      "Con qué terceros se comparten (por ejemplo, tu CRM, webhook o proveedor de agenda).",
      "Cómo pueden los usuarios solicitar acceso o eliminación de sus datos, según el RGPD.",
      "Datos de contacto para solicitudes relacionadas con privacidad.",
    ],
  },
};

export default es;
