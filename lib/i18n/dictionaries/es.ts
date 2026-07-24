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
    bookButton: "Consigue tu checklist gratis",
  },
  heroTrustBadges: ["100% gratis", "15 minutos", "Por teléfono", "Sin compromiso"],
  pains: {
    deposit: {
      eyebrow: "Revisión gratuita de tu fianza · Barcelona",
      h1: "No pierdas tu fianza al dejar el piso",
      subheading:
        "Consigue una llamada gratuita de 15 minutos con un especialista en mudanzas. Conoce tus derechos, evita errores costosos y aumenta tus posibilidades de recuperar toda tu fianza.",
      heroCta: "Consigue tu checklist gratis",
      shortLabel: "Fianza",
    },
    admin: {
      eyebrow: "Revisión gratuita de trámites de mudanza · Barcelona",
      h1: "Mudarte no debería significar una montaña de papeleo",
      subheading:
        "Internet, cambio de dirección, bancos, suscripciones — consigue una llamada gratuita de 15 minutos para que nada se te escape al mudarte.",
      heroCta: "Consigue tu checklist gratis",
      shortLabel: "Trámites de mudanza",
    },
    belongings: {
      eyebrow: "Revisión gratuita de mudanza · Barcelona",
      h1: "Que tus muebles no se conviertan en un problema",
      subheading:
        "¿Sin tiempo para vender, donar o guardar lo que dejas atrás? Consigue una llamada gratuita de 15 minutos y un plan claro para todo ello.",
      heroCta: "Consigue tu checklist gratis",
      shortLabel: "Muebles y pertenencias",
    },
    urgent: {
      eyebrow: "Revisión gratuita de mudanza urgente · Barcelona",
      h1: "¿Te mudas antes de lo previsto? Hazlo bien.",
      subheading:
        "Contrato, fianza, plazo de preaviso — consigue una llamada gratuita de 15 minutos para conocer tus opciones antes de cometer un error costoso.",
      heroCta: "Consigue tu checklist gratis",
      shortLabel: "Mudanza urgente",
    },
  },
  whatYouGet: {
    heading: "Qué veremos en 15 minutos",
    subheading: "No es un checklist genérico. Una llamada breve centrada en tu situación concreta.",
    items: [
      {
        badge: "Deducciones",
        title: "Qué puede descontar legalmente el propietario de tu fianza",
        pains: ["deposit"],
      },
      {
        badge: "Informe fotográfico",
        title: "Cómo preparar un informe fotográfico para la entrega",
        pains: ["deposit", "urgent", "belongings"],
      },
      {
        badge: "Suministros",
        title: "Cómo dar de baja o traspasar internet, luz y gas",
        pains: ["admin"],
      },
      {
        badge: "Cambio de dirección",
        title: "Cómo actualizar tu dirección en bancos, suscripciones y registros oficiales",
        pains: ["admin"],
      },
      {
        badge: "Pertenencias",
        title: "Qué hacer con los muebles y pertenencias que no te llevas",
        pains: ["belongings"],
      },
      {
        badge: "Salida anticipada",
        title: "Cómo gestionar el plazo de preaviso y las cláusulas de resolución anticipada",
        pains: ["urgent"],
      },
      {
        badge: "Documentos",
        title: "Qué documentos reunir antes de entregar las llaves",
        pains: ["deposit", "admin", "urgent"],
      },
    ],
    resultLabel: "El resultado",
    resultText: "Vete con todo resuelto: fianza, trámites y pertenencias.",
  },
  whyTrustUs: {
    heading: "Consejos adaptados a tu situación",
    p1: "Mudarte no es igual para todos. Tu contrato de alquiler, tu propietario, el estado del piso y tus plazos importan.",
    p2: "Por eso no usamos checklists genéricos. Durante la llamada, revisamos tu situación concreta y te explicamos qué importa antes de entregar las llaves.",
    cards: [
      {
        emoji: "📄",
        title: "Tu contrato",
        body: "Cada contrato de alquiler es distinto. Revisamos las cláusulas que importan para tu salida.",
      },
      {
        emoji: "⚖️",
        title: "Tus derechos",
        body: "Te explicamos qué puede y qué no puede descontar legalmente el propietario.",
      },
      {
        emoji: "🏠",
        title: "Tu situación",
        body: "Nada de consejos genéricos. Recomendaciones según tu piso, tus documentos y tus plazos.",
        span: true,
        featured: true,
      },
      {
        emoji: "🎁",
        title: "Gratis y sin compromiso",
        body: "Recibe orientación práctica sin coste y sin presión.",
        span: true,
      },
    ],
  },
  didYouKnow: {
    heading: "¿Sabías que…?",
    subheading: "Cosas que la mayoría de inquilinos descubre cuando ya es tarde.",
    facts: [
      {
        q: "Puede que tu fianza ni siquiera esté en manos de tu propietario.",
        a: "En la mayoría de alquileres de vivienda en Cataluña, la fianza obligatoria se deposita en el INCASÒL, no se queda en la cuenta personal del propietario.",
      },
      {
        q: "No todas las cláusulas de un contrato de alquiler son válidas.",
        a: "Algunos contratos incluyen cláusulas que contradicen las protecciones obligatorias para inquilinos según la ley española o catalana. Que aparezca en el contrato no la hace automáticamente válida.",
      },
      {
        q: "La mayoría de disputas por la fianza se pueden evitar.",
        a: "La mejor protección no es un abogado, es una buena preparación antes de la entrega. Una buena documentación suele marcar la diferencia.",
      },
      {
        q: "Irte antes de lo previsto no siempre significa perder la fianza.",
        a: "Los plazos de preaviso y las condiciones de resolución anticipada varían según el contrato. Entender los tuyos antes de avisar puede ahorrarte dinero y estrés.",
      },
    ],
  },
  ourPromise: {
    h2: "No te daremos consejos genéricos.",
    p1: "Revisamos tu situación concreta y te decimos exactamente qué hacer antes de entregar las llaves.",
    p2: "Nuestra promesa: ayudarte a irte con la fianza, los trámites y tus pertenencias resueltos.",
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
      namePlaceholder: "Tu nombre (opcional)",
      phonePlaceholder: "Tu número de teléfono",
      consent: "Acepto que MoveOS me contacte. Consulta nuestra Política de privacidad.",
      submitButton: "Quiero mi checklist",
      submitting: "Enviando…",
      error: "Algo salió mal. Inténtalo de nuevo en un momento.",
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
