import type { Locale } from "./types";

/**
 * Copy for /[locale]/host/first-time — a second landlord-facing landing
 * page, sibling to /[locale]/host (see ./host.ts) but for a different
 * hypothesis: an owner renting out their apartment long-term for the very
 * first time, not an existing short-term-rental prospect. Different
 * audience question ("am I about to make an expensive first-timer
 * mistake?"), different single ask (a free consultation + tenant
 * screening, not an income estimate) — kept in its own dictionary and its
 * own route rather than folded into HostCopy, same reasoning documented
 * there for why /host doesn't share the tenant `pains` Dictionary shape.
 *
 * All three locales are populated (same gating convention as HOST_LOCALES
 * in ./host.ts: a locale without an entry here 404s instead of silently
 * falling back to Russian — there just isn't one missing right now).
 */
export interface HostFirstTimeCopy {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    h1: string;
    subheading: string;
    cta: string;
    ctaMobile?: string;
    freebieHeading: string;
    freebieItems: string[];
    freebieNote: string;
  };
  services: {
    heading: string;
    intro: string;
    items: { title: string; body: string }[];
    cta: string;
  };
  trust: {
    heading: string;
    paragraphs: string[];
    calloutTag: string;
    calloutText: string;
  };
  faq: {
    heading: string;
    items: { q: string; a: string }[];
  };
  howItWorks: {
    heading: string;
    steps: { title: string; body: string }[];
    cta: string;
  };
  /** Illustrative placeholder quotes — same convention as HostCopy.testimonials
   * (see ./host.ts): a design stand-in until real reviews exist. */
  testimonials: {
    heading: string;
    items: { hook: string; quote: string; name: string }[];
  };
  closingCta: {
    heading: string;
    body: string;
    cta: string;
  };
}

export const HOST_FIRST_TIME_LOCALES: Locale[] = ["ru", "en", "es"];

export const HOST_FIRST_TIME_COPY: Partial<Record<Locale, HostFirstTimeCopy>> = {
  en: {
    meta: {
      title: "First-Time Landlord? No Risk, No Mistakes — MoveOS",
      description:
        "Renting out for the first time? We screen your tenant's income and employment contract, register the deposit on time, and help protect you from illegal occupation — a free consultation before you list.",
    },
    hero: {
      eyebrow: "For Property Owners · Barcelona · First-Time Landlords",
      h1: "First time renting out?\nWe'll check everything before you list.",
      subheading:
        "Preparing the apartment, the contract, registering the deposit, screening a tenant — the first time, it's easy to miss the thing that costs you later.",
      cta: "Get a Free Consultation",
      ctaMobile: "Free Consultation",
      freebieHeading: "You'll get for free:",
      freebieItems: [
        "a consultation on what to do before renting out",
        "an income and employment contract check on your tenant",
        "a reminder for the legal deposit registration deadline",
        "a risk assessment for your specific situation",
      ],
      freebieNote: "The consultation is free and doesn't commit you to anything.",
    },
    services: {
      heading: "What We Take Off Your Plate",
      intro:
        "From your first consultation to a signed contract — we're there for the step that usually feels the scariest.",
      items: [
        {
          title: "Tenant Screening",
          body: "We check your future tenant's income, reputation and ability to pay before you sign anything.",
        },
        {
          title: "Employment Contract Check",
          body: "We check the tenant's employment contract separately — without it, there's no way to be sure their income is stable and documented.",
        },
        {
          title: "Contract Consultation",
          body: "We explain what your lease should include and what to watch for in your specific situation.",
        },
        {
          title: "Deposit Registration",
          body: "We remind you of the legal deadline for registering the deposit so you don't miss it.",
        },
        {
          title: "Legal Reminders",
          body: "We send reminders for key deadlines and owner obligations — so you don't have to rely on memory.",
        },
        {
          title: "Okupas Protection",
          body: "We help you assess the risk and explain which measures actually reduce the chance of illegal occupation.",
        },
      ],
      cta: "I Want a Consultation Before Renting Out",
    },
    trust: {
      heading: "The Fear of Okupas Isn't Exaggerated",
      paragraphs: [
        "In 2024, Spain recorded 16,426 police reports of illegal home occupation — up 7.4% year on year.",
        "New court cases dropped sharply in early 2026 — but lawyers (ANA, AF Legis, UNEXIA) say that's not because the problem went away. A new law (April 2025) now requires mandatory pre-court negotiation with occupants, and more cases are being resolved informally instead.",
        "The market backs this up: by late 2025, over 24,000 occupied apartments were listed for sale on Idealista — up 5% quarter on quarter. Some owners are responding by not renting at all, or by pricing well below market.",
      ],
      calloutTag: "How we reduce this risk",
      calloutText:
        "Screening a tenant before you sign — including their income and employment contract — is something few owners actually do. It's the one step that filters out most problem cases.",
    },
    faq: {
      heading: "Questions We Get Asked Most",
      items: [
        {
          q: "What if I don't know where to start?",
          a: "You don't have to figure it out alone. Tell us about your apartment and situation — we'll walk you through what to do, for free, from preparing the apartment to signing the contract.",
        },
        {
          q: "How do I check that a tenant can actually pay?",
          a: "We check income, employment contract and overall ability to pay before you make a decision. It's not a guarantee, but it sharply reduces the risk.",
        },
        {
          q: "What if the tenant stops paying or refuses to leave anyway?",
          a: "We can't rule out the risk entirely — no one can. But proper screening upfront and a correctly drafted contract are what actually affect the odds of a problem, not fear or hindsight.",
        },
        {
          q: "What does this cost?",
          a: "The consultation and initial tenant screening are free for the owner. We make money at other stages of managing your apartment, so it's in our interest that you start renting it out with confidence.",
        },
      ],
    },
    howItWorks: {
      heading: "How It Works",
      steps: [
        { title: "Tell us your situation", body: "The apartment, your timeline, what's already done and what isn't." },
        { title: "Get a consultation", body: "What needs to be arranged, which deadlines matter, what to watch for." },
        { title: "We screen the tenant", body: "Income, employment contract, reputation — before you sign." },
        { title: "Sign with confidence", body: "With a clear understanding of the risks, and protection built in from the start." },
      ],
      cta: "Start With a Free Consultation",
    },
    testimonials: {
      heading: "What Owners Say",
      items: [
        {
          hook: "“I didn't realise the deposit had to be registered by a specific deadline — they just reminded me in time”",
          quote:
            "I would have definitely missed that deadline otherwise. They explained the process in advance and sent a reminder.",
          name: "Owner, first-time landlord",
        },
        {
          hook: "“They checked the tenant's employment contract — and I realised the income wasn't as stable as it looked”",
          quote: "Without that check, I would have signed with someone whose income was actually unstable.",
          name: "Owner, Barcelona",
        },
        {
          hook: "“Okupas is my smallest worry now — at least I understand what can be done in advance”",
          quote: "They explained the real protective measures instead of just scaring me with statistics.",
          name: "Owner, first-time landlord",
        },
      ],
    },
    closingCta: {
      heading: "Renting out for the first time is no reason to take a risk.",
      body: "Tenant screening, income, employment contract, deposit and lease — we help you work through all of it before your listing ever goes live.",
      cta: "Get a Free Consultation",
    },
  },
  es: {
    meta: {
      title: "¿Primer alquiler? Sin riesgos, sin errores — MoveOS",
      description:
        "¿Alquilas tu piso por primera vez? Verificamos al inquilino, sus ingresos y su contrato laboral, registramos la fianza dentro de plazo y te ayudamos a protegerte de los okupas. Consulta gratuita antes de publicar el anuncio.",
    },
    hero: {
      eyebrow: "Para propietarios · Barcelona · Primer alquiler",
      h1: "¿Alquilas por primera vez?\nLo revisamos todo antes del anuncio.",
      subheading:
        "Preparar el piso, el contrato, registrar la fianza, verificar al inquilino — la primera vez es fácil pasar por alto lo que luego sale caro.",
      cta: "Obtener una consulta gratuita",
      ctaMobile: "Consulta gratuita",
      freebieHeading: "Obtienes gratis:",
      freebieItems: [
        "una consulta sobre qué hacer antes de alquilar",
        "una verificación de ingresos y contrato laboral del inquilino",
        "un recordatorio del plazo legal para registrar la fianza",
        "una evaluación de riesgo de tu situación concreta",
      ],
      freebieNote: "El cálculo y la consulta son gratuitos y no te comprometen a nada.",
    },
    services: {
      heading: "De qué nos encargamos nosotros",
      intro:
        "Desde la primera consulta hasta el contrato firmado — te acompañamos en el paso que suele dar más miedo.",
      items: [
        {
          title: "Verificación del inquilino",
          body: "Comprobamos los ingresos, la reputación y la capacidad de pago del futuro inquilino antes de que firmes.",
        },
        {
          title: "Verificación del contrato laboral",
          body: "Comprobamos por separado el contrato laboral del inquilino — sin esto no se puede estar seguro de que sus ingresos sean estables y estén documentados.",
        },
        {
          title: "Consulta sobre el contrato",
          body: "Te explicamos qué debe incluir el contrato de alquiler y en qué fijarte en tu situación concreta.",
        },
        {
          title: "Registro de la fianza",
          body: "Te recordamos el plazo legal para registrar la fianza y te ayudamos a no pasarlo por alto.",
        },
        {
          title: "Recordatorios legales",
          body: "Te enviamos avisos de los plazos clave y las obligaciones del propietario — para que no dependas de la memoria.",
        },
        {
          title: "Protección frente a okupas",
          body: "Te ayudamos a evaluar el riesgo y te explicamos qué medidas reducen realmente la probabilidad de una ocupación ilegal.",
        },
      ],
      cta: "Quiero una consulta antes de alquilar",
    },
    trust: {
      heading: "El miedo a los okupas no es exagerado",
      paragraphs: [
        "En 2024 se registraron en España 16.426 denuncias policiales por ocupación ilegal de vivienda — un 7,4% más que el año anterior.",
        "A principios de 2026 el número de nuevos casos judiciales cayó bruscamente — pero los abogados (ANA, AF Legis, UNEXIA) explican que no es porque el problema haya desaparecido, sino por una nueva ley (abril de 2025) que obliga a negociar antes con los ocupantes, y porque cada vez más casos se resuelven de forma informal.",
        "El mercado lo confirma: a finales de 2025 había más de 24.000 pisos ocupados en venta en Idealista — un 5% más que el trimestre anterior. Algunos propietarios responden dejando de alquilar directamente o bajando el precio por miedo.",
      ],
      calloutTag: "Cómo reducimos este riesgo",
      calloutText:
        "Verificar al inquilino antes de firmar — incluyendo ingresos y contrato laboral — es algo que pocos propietarios hacen. Es precisamente en este paso donde se filtran la mayoría de los casos problemáticos.",
    },
    faq: {
      heading: "Las preguntas más frecuentes",
      items: [
        {
          q: "¿Y si no sé por dónde empezar?",
          a: "No hace falta que lo resuelvas solo. Cuéntanos sobre tu piso y tu situación — te explicamos gratis el procedimiento, desde preparar el piso hasta firmar el contrato.",
        },
        {
          q: "¿Cómo compruebo que el inquilino realmente puede pagar?",
          a: "Comprobamos ingresos, contrato laboral y capacidad de pago general antes de que tomes una decisión. No es una garantía, pero reduce mucho el riesgo.",
        },
        {
          q: "¿Y si el inquilino deja de pagar o se niega a irse de todos modos?",
          a: "No podemos eliminar el riesgo por completo — nadie puede. Pero una buena verificación de entrada y un contrato bien redactado son lo que realmente influye en la probabilidad del problema, no los miedos a posteriori.",
        },
        {
          q: "¿Cuánto cuesta esto?",
          a: "La consulta y la verificación inicial del inquilino son gratuitas para el propietario. Ganamos dinero en otras fases de la gestión del piso, así que nos interesa que empieces a alquilar con seguridad.",
        },
      ],
    },
    howItWorks: {
      heading: "Cómo funciona",
      steps: [
        { title: "Cuéntanos tu situación", body: "El piso, los plazos, qué está hecho y qué no." },
        { title: "Recibe una consulta", body: "Qué hay que tramitar, qué plazos importan, en qué fijarte." },
        { title: "Verificamos al inquilino", body: "Ingresos, contrato laboral, reputación — antes de firmar." },
        { title: "Firmas con más seguridad", body: "Con los riesgos claros y protección desde el principio." },
      ],
      cta: "Empezar con una consulta gratuita",
    },
    testimonials: {
      heading: "Qué dicen los propietarios",
      items: [
        {
          hook: "«No sabía que la fianza había que registrarla en un plazo concreto — simplemente me lo recordaron a tiempo»",
          quote:
            "Antes seguro que se me pasaba ese plazo. Me explicaron el procedimiento con antelación y me enviaron un recordatorio.",
          name: "Propietaria, primer alquiler",
        },
        {
          hook: "«Comprobaron el contrato laboral del inquilino y me di cuenta de que el ingreso no era tan estable como parecía»",
          quote: "Sin esa verificación habría firmado con alguien cuyo ingreso en realidad era inestable.",
          name: "Propietaria, Barcelona",
        },
        {
          hook: "«Lo que menos me preocupa ahora son los okupas — al menos entiendo qué se puede hacer de antemano»",
          quote: "Me explicaron medidas de protección reales, no solo me asustaron con estadísticas.",
          name: "Propietario, primer alquiler",
        },
      ],
    },
    closingCta: {
      heading: "El primer alquiler no es motivo para arriesgarte.",
      body: "Verificación del inquilino, ingresos, contrato laboral, fianza y contrato — te ayudamos a resolver todo esto antes de que el anuncio llegue al mercado.",
      cta: "Obtener una consulta gratuita",
    },
  },
  ru: {
    meta: {
      title: "Сдать квартиру впервые. Без риска и без ошибок — MoveOS",
      description:
        "Сдаёте квартиру впервые? Проверим арендатора, доход и трудовой договор, оформим депозит по закону и защитим от okupas. Бесплатная консультация до размещения объявления.",
    },
    hero: {
      eyebrow: "Для владельцев квартир · Барселона · Первая сдача",
      h1: "Сдаёте впервые?\nПроверим всё до объявления.",
      subheading:
        "Подготовка квартиры, договор, регистрация депозита, проверка арендатора — в первый раз легко упустить то, что потом обходится дорого.",
      cta: "Получить бесплатную консультацию",
      ctaMobile: "Бесплатная консультация",
      freebieHeading: "Вы получите бесплатно:",
      freebieItems: [
        "консультацию по порядку действий перед сдачей",
        "проверку дохода и трудового договора арендатора",
        "напоминание о сроке регистрации депозита",
        "оценку риска по конкретной ситуации",
      ],
      freebieNote: "Расчёт и консультация бесплатны и ни к чему не обязывают.",
    },
    services: {
      heading: "Что мы берём на себя",
      intro:
        "От первой консультации до подписанного договора — мы рядом на каждом шаге, который обычно пугает больше всего.",
      items: [
        {
          title: "Проверка арендатора",
          body: "Проверяем доход, репутацию и платёжеспособность будущего арендатора, прежде чем вы подпишете договор.",
        },
        {
          title: "Проверка трудового договора",
          body: "Отдельно проверяем трудовой договор арендатора — без этого нельзя быть уверенным, что доход стабилен и подтверждён документально.",
        },
        {
          title: "Консультация по договору",
          body: "Объясняем, что должно быть в договоре аренды и на что обратить внимание именно в вашей ситуации.",
        },
        {
          title: "Регистрация депозита",
          body: "Напоминаем об установленных законом сроках регистрации депозита и помогаем этого не пропустить.",
        },
        {
          title: "Юридические напоминания",
          body: "Присылаем напоминания по ключевым срокам и обязанностям владельца — чтобы не полагаться на память.",
        },
        {
          title: "Защита от okupas",
          body: "Помогаем оценить риски и объясняем, какие меры снижают вероятность незаконного захвата жилья.",
        },
      ],
      cta: "Хочу проконсультироваться перед сдачей",
    },
    trust: {
      heading: "Страх okupas — не преувеличение",
      paragraphs: [
        "В 2024 году в Испании зафиксировано 16 426 обращений в полицию по поводу незаконного захвата жилья — на 7,4% больше, чем годом ранее.",
        "В начале 2026 число новых судебных дел резко упало — но юристы (ANA, AF Legis, UNEXIA) объясняют это не тем, что проблема исчезла, а новым законом (апрель 2025), который обязывает сначала вести досудебные переговоры с оккупантами. Часть случаев теперь просто не доходит до суда.",
        "Рынок это подтверждает: в конце 2025 на Idealista было выставлено более 24 000 квартир с оккупантами — на 5% больше, чем кварталом ранее. Часть владельцев в ответ вообще перестаёт сдавать жильё или снижает цену от страха.",
      ],
      calloutTag: "Как мы снижаем этот риск",
      calloutText:
        "Проверка арендатора до подписания договора — включая доход и трудовой договор — это то, что делают редко. Именно на этом этапе можно отсеять большинство проблемных случаев.",
    },
    faq: {
      heading: "Вопросы, которые задают чаще всего",
      items: [
        {
          q: "А что если я не знаю, с чего начать?",
          a: "Не нужно разбираться самостоятельно. Расскажите о квартире и ситуации — мы бесплатно объясним порядок действий: от подготовки квартиры до подписания договора.",
        },
        {
          q: "Как проверить, что арендатор действительно может платить?",
          a: "Мы проверяем доход, трудовой договор и общую платёжеспособность до того, как вы примете решение. Это не гарантия, но это резко снижает риск.",
        },
        {
          q: "А если арендатор всё же перестанет платить или откажется съезжать?",
          a: "Мы не можем исключить риск полностью — его не исключает никто. Но грамотная проверка на входе и корректно оформленный договор реально влияют на вероятность проблемы, а не мифы и страхи задним числом.",
        },
        {
          q: "Сколько это стоит?",
          a: "Консультация и первичная проверка арендатора — бесплатны для владельца. Мы зарабатываем на других этапах работы с квартирой, поэтому заинтересованы, чтобы вы начали сдавать её осознанно.",
        },
      ],
    },
    howItWorks: {
      heading: "Как это работает",
      steps: [
        { title: "Расскажите о ситуации", body: "Квартира, сроки, что уже сделано, а что нет." },
        { title: "Получите консультацию", body: "Что нужно оформить, какие сроки важны, на что смотреть." },
        { title: "Мы проверяем арендатора", body: "Доход, трудовой договор, репутация — до подписания." },
        { title: "Подписываете договор увереннее", body: "С пониманием рисков и защитой на входе." },
      ],
      cta: "Начать с бесплатной консультации",
    },
    testimonials: {
      heading: "Что говорят владельцы",
      items: [
        {
          hook: "«Я не понимала, что депозит нужно регистрировать в конкретный срок — мне просто напомнили вовремя»",
          quote:
            "Раньше я бы точно пропустила этот срок. Сейчас мне заранее объяснили порядок действий и прислали напоминание.",
          name: "Владелец, первая сдача",
        },
        {
          hook: "«Проверили трудовой договор арендатора — и я поняла, что доход не такой стабильный, как казалось»",
          quote: "Без этой проверки я бы подписала договор с человеком, чей доход на деле был нестабилен.",
          name: "Владелец, Барселона",
        },
        {
          hook: "«Меньше всего боюсь окупас — теперь я хотя бы понимаю, что можно сделать заранее»",
          quote: "Мне объяснили реальные меры защиты, а не просто напугали статистикой.",
          name: "Владелец, первая сдача",
        },
      ],
    },
    closingCta: {
      heading: "Первая сдача — не повод рисковать.",
      body: "Проверка арендатора, доход, трудовой договор, депозит и договор — мы помогаем разобраться во всём этом ещё до того, как объявление появится на рынке.",
      cta: "Получить бесплатную консультацию",
    },
  },
};
