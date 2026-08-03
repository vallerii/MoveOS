import type { Locale } from "./types";

/**
 * Copy for the homepage (app/[locale]/page.tsx), kept separate from the
 * shared `Dictionary` type in ./types.ts. The homepage isn't pain-specific
 * like the rest of the site — it's the entry point that explains MoveOS and
 * routes the visitor to one of the six pain pages — so its copy doesn't fit
 * the `pains` record shape the rest of the app is built around. Keeping it
 * in its own small dictionary avoids widening the shared Dictionary type
 * (and every dictionary file) for fields only one page uses.
 */
/** One line of the hero h1 — a list of segments so individual words (the
 * brand name, one keyword) can be rendered in the brand-primary teal while
 * the rest stays dark ink, matching the reference design exactly. */
export type H1Segment = { text: string; accent?: boolean };

export interface HomeCopy {
  hero: {
    eyebrow: string;
    h1: H1Segment[][];
    subheading: string;
    cta: string;
    badges: string[];
  };
  situations: {
    whatWeDo: { heading: string; body: string; cta: string };
    trustStats: { heading: string; stats: { value: string; label: string }[] };
    /** One quote per pain, in PAIN_SLUGS order (deposit, admin, belongings,
     * urgent, buyout, repair) — illustrative "pain -> what we solved" lines,
     * not verified customer testimonials. */
    quotes: { quote: string; resolved: string; name: string }[];
    linksPanel: { heading: string; subheading: string };
  };
  trust: {
    heading: string;
    subheading: string;
    /** Wider CTA card at the end of the article-cards grid — the system's
     * one card-peach usage on this page. The article cards themselves come
     * from DatoCMS (see lib/datocms.ts getTrustArticles), not from this
     * dictionary — see components/Home/HomeTrust.tsx. */
    ctaCard: { badge: string; text: string };
  };
  howItWorks: {
    heading: string;
    subheading: string;
    steps: { title: string; body: string }[];
  };
  whyUs: {
    /** Ends with "MoveOS" in every locale — split on that word to render
     * the brand name in accent color, rest in ink, matching the reference. */
    eyebrow: string;
    heading: string;
    intro: string;
    /** Short one-or-two-word advantages shown as a checklist inside the
     * WhyUsGraphic card (homepage only). Rendered only when `card` (below)
     * is absent for the locale. */
    advantages: string[];
    /**
     * Richer version of the WhyUsGraphic card content — a heading + short
     * description ("what you'll have in hand after moving out") followed
     * by the full document/evidence checklist, replacing the plain
     * `advantages` sentences when present.
     *
     * Optional — RU-only for now (EN/ES not translated yet); WhyUsGraphic
     * falls back to `advantages` when `card` is absent for a locale.
     */
    card?: {
      heading: string;
      description: string;
      items: string[];
      note?: string;
    };
  };
  /**
   * "What exactly is included" block — sits between HomeWhyUs and the
   * quiz. Expands on situations.linksPanel by spelling out, per pain, what
   * the free help actually covers. `items` is in PAIN_SLUGS order
   * (deposit, admin, belongings, urgent, buyout, repair) so it maps 1:1 to
   * PAIN_ICONS/PAIN_SLUGS in HomeIncluded rather than needing its own
   * per-pain keying.
   */
  included: {
    heading: string;
    subheading: string;
    items: { title: string; body: string }[];
    ctaCard: { heading: string; body: string; button: string };
  };
}

export const HOME_COPY: Record<Locale, HomeCopy> = {
  en: {
    hero: {
      eyebrow: "Free for Renters in Barcelona ·",
      h1: [
        [{ text: "Move out" }],
        [{ text: "with confidence." }],
        [{ text: "MoveOS", accent: true }, { text: " has" }],
        [{ text: "everything", accent: true }, { text: " covered." }],
      ],
      subheading:
        "MoveOS is a free service for tenants moving out in Barcelona. Tell us what's going on — your deposit, an urgent move, paperwork, furniture, or a small repair — and we'll walk you through it, for free.",
      cta: "Tell Us Your Situation",
      badges: ["Free, no obligation", "Barcelona-based", "Answers in 15 minutes"]
    },
    situations: {
      whatWeDo: {
        heading: "One platform. Every step of moving out.",
        body: "Deposit, paperwork, belongings, repairs — we walk you through the whole move-out, for free.",
        cta: "See all situations",
      },
      trustStats: {
        heading: "Free for tenants. Transparent for landlords.",
        stats: [
          { value: "6", label: "free solutions — one per situation" },
          { value: "€0", label: "cost to the tenant" },
        ],
      },
      quotes: [
        {
          quote:
            "I didn't know you had to notify the landlord in advance by law — I almost lost part of my deposit over one missed form.",
          resolved: "We mapped out the procedure and deadlines. Deposit protected.",
          name: "Marta, tenant",
        },
        {
          quote:
            "Cancelling internet at the old flat, setting it up at the new one, updating my bank and padrón address — that would've eaten my whole weekend.",
          resolved: "We built the checklist and handled part of it for you.",
          name: "Irene, tenant",
        },
        {
          quote: "After moving out I still had furniture left — no time to sell it, too much to just throw away.",
          resolved: "We found who to pass it to and where to store it.",
          name: "Pablo, moving out this week",
        },
        {
          quote:
            "I had a week to move out — handling all the logistics myself wasn't something I had the time or energy for.",
          resolved: "We took the move-out logistics off your hands.",
          name: "Diego, moved out in 6 days",
        },
        {
          quote: "I'm paying below market rent and was afraid moving out would only cost me money.",
          resolved: "We offered a bonus up to €2,000 and same-day deposit return.",
          name: "Javier, tenant",
        },
        {
          quote:
            "I was afraid a small chip in the wall would be billed as damage instead of normal wear, and cost me my deposit.",
          resolved: "We assessed what actually needed fixing.",
          name: "Laura, tenant",
        },
      ],
      linksPanel: {
        heading: "Explore your situation in detail",
        subheading: "Every situation has its own page with a free quiz.",
      },
    },
    trust: {
      heading: "Before You Hand Back the Keys",
      subheading: "A few things most tenants in Barcelona don't find out until it's too late.",
      ctaCard: { badge: "Free · 15 minutes", text: "Find out what your situation is →" },
    },
    howItWorks: {
      heading: "How It Works",
      subheading: "The same three steps, whichever problem you start with.",
      steps: [
        {
          title: "Tell us your situation",
          body: "Pick the page that matches what you need — deposit, paperwork, an urgent move, furniture, repairs, or a lease buyout.",
        },
        {
          title: "Get a free 15-minute review",
          body: "We go through your specific case and give you a clear, personal plan — no generic checklist.",
        },
        {
          title: "Move out with your deposit intact",
          body: "You keep control of the keys, the paperwork, and the money that's yours.",
        },
      ],
    },
    whyUs: {
      eyebrow: "Why MoveOS",
      heading: "We're not just a service. We're your advocate during the move-out.",
      intro:
        "From the first call to the final handover, we handle the calls, the paperwork, and the awkward conversations — so you can move out without the stress.",
      advantages: [
        "We check the entry/exit report and photos, and tell you how to get your full deposit back.",
        "We build the checklist — internet, bank, padrón — and handle part of it for you.",
        "We assess what actually needs repairing versus normal wear and tear.",
        "We find where your furniture and belongings can go when there's nowhere for them.",
      ],
    },
    included: {
      heading: "Exactly What's Included in the Help",
      subheading: "Concrete steps for each of the 6 situations — not generic advice.",
      items: [
        {
          title: "Deposit",
          body: "We review your move-in/move-out report and photos and tell you how to get your full deposit back — no illegal deductions.",
        },
        {
          title: "Moving Admin",
          body: "We build your admin checklist — internet, bank, padrón, subscriptions — and handle part of it for you, so nothing comes back to bite you.",
        },
        {
          title: "Furniture & Belongings",
          body: "We inventory your furniture and belongings and find where they can go — sell, donate, or store, if there's nowhere for them.",
        },
        {
          title: "Urgent Move-Out",
          body: "We go through your lease and notice period so you can move out early without penalties or losing your deposit.",
        },
        {
          title: "Move-Out Bonus",
          body: "If you're renting below market, we assess the gap and offer a bonus up to €2,000 plus your deposit back the same day — no month-long wait.",
        },
        {
          title: "Minor Repairs",
          body: "We review before/after photos and fix only what's actually needed for your deposit back — no overpaying for a full renovation.",
        },
      ],
      ctaCard: {
        heading: "Free, Until You Decide Otherwise",
        body: "A 15-minute consultation, a local Barcelona team, no obligation at any step.",
        button: "Get My Free Review →",
      },
    },
  },
  es: {
    hero: {
      eyebrow: "Gratis para inquilinos en Barcelona ·",
      h1: [
        [{ text: "Múdate" }],
        [{ text: "con confianza." }],
        [{ text: "MoveOS", accent: true }, { text: " se encarga" }],
        [{ text: "de " }, { text: "todo.", accent: true }],
      ],
      subheading:
        "MoveOS es un servicio gratuito para inquilinos que se mudan en Barcelona. Cuéntanos qué te pasa — tu fianza, una mudanza urgente, papeleo, muebles o una pequeña reparación — y te acompañamos, gratis.",
      cta: "Cuéntanos Tu Situación",
      badges: ["Gratis, sin compromiso", "Equipo local en Barcelona", "Respuesta en 15 minutos"],
    },
    situations: {
      whatWeDo: {
        heading: "Una plataforma. Todos los pasos de tu mudanza.",
        body: "Fianza, papeleo, muebles, reparaciones — te acompañamos gratis en toda tu mudanza, paso a paso.",
        cta: "Ver todas las situaciones",
      },
      trustStats: {
        heading: "Gratis para inquilinos. Transparente para propietarios.",
        stats: [
          { value: "6", label: "soluciones gratuitas — una por situación" },
          { value: "0 €", label: "coste para el inquilino" },
        ],
      },
      quotes: [
        {
          quote:
            "No sabía que había que avisar al propietario con antelación por ley — casi pierdo parte de la fianza por un papel.",
          resolved: "Te explicamos el procedimiento y los plazos. Fianza protegida.",
          name: "Marta, inquilina",
        },
        {
          quote:
            "Dar de baja el internet en el piso antiguo, darlo de alta en el nuevo, cambiar la dirección en el banco y el padrón — eso se habría comido todo el fin de semana.",
          resolved: "Hicimos la checklist y gestionamos parte de las gestiones.",
          name: "Irene, inquilina",
        },
        {
          quote: "Al mudarme me quedaron muebles — sin tiempo para venderlos, y tirarlos daba pena.",
          resolved: "Encontramos a quién dárselos y dónde guardarlos.",
          name: "Pablo, se muda esta semana",
        },
        {
          quote:
            "Tenía una semana para mudarme — encargarme yo solo de toda la logística no era algo para lo que tuviera tiempo ni energía.",
          resolved: "Nos hicimos cargo de la logística de la mudanza.",
          name: "Diego, se mudó en 6 días",
        },
        {
          quote: "Pago un alquiler por debajo de mercado y temía que mudarme solo me costara dinero.",
          resolved: "Ofrecimos un bono de hasta 2.000 € y devolución de fianza el mismo día.",
          name: "Javier, inquilino",
        },
        {
          quote:
            "Temía que un desconchón en la pared se facturara como daño y no como desgaste normal, y me quitaran la fianza.",
          resolved: "Evaluamos qué reparación hacía falta de verdad.",
          name: "Laura, inquilina",
        },
      ],
      linksPanel: {
        heading: "Descubre tu situación con más detalle",
        subheading: "Cada situación tiene su propia página con un test gratuito.",
      },
    },
    trust: {
      heading: "Antes de Devolver las Llaves",
      subheading: "Algunas cosas que la mayoría de inquilinos en Barcelona descubre demasiado tarde.",
      ctaCard: { badge: "Gratis · 15 minutos", text: "Descubre cuál es tu situación →" },
    },
    howItWorks: {
      heading: "Cómo Funciona",
      subheading: "Los mismos tres pasos, empieces por el problema que empieces.",
      steps: [
        {
          title: "Cuéntanos tu situación",
          body: "Elige la página que más se parece a lo que necesitas: fianza, papeleo, mudanza urgente, muebles, reparaciones o traspaso de contrato.",
        },
        {
          title: "Recibe una revisión gratuita de 15 minutos",
          body: "Repasamos tu caso concreto y te damos un plan claro y personal — nada de checklists genéricas.",
        },
        {
          title: "Múdate sin perder tu fianza",
          body: "Tú mantienes el control de las llaves, el papeleo y el dinero que es tuyo.",
        },
      ],
    },
    whyUs: {
      eyebrow: "Por Qué MoveOS",
      heading: "No somos solo un servicio. Somos tu defensor durante la mudanza.",
      intro:
        "Desde la primera llamada hasta la entrega de llaves, nos encargamos de las llamadas, el papeleo y las conversaciones incómodas — para que te mudes sin estrés.",
      advantages: [
        "Revisamos el acta y las fotos de entrada/salida, y te decimos cómo recuperar toda la fianza.",
        "Hacemos la checklist — internet, banco, padrón — y gestionamos parte por ti.",
        "Evaluamos qué reparación hace falta de verdad, frente al desgaste normal.",
        "Encontramos dónde puede ir tu mobiliario y tus cosas cuando no tienen sitio.",
      ],
    },
    included: {
      heading: "Qué incluye exactamente la ayuda",
      subheading: "Pasos concretos para cada una de las 6 situaciones — no consejos genéricos.",
      items: [
        {
          title: "Fianza",
          body: "Revisamos el acta y las fotos de entrada y salida y te decimos cómo recuperar tu fianza completa — sin deducciones ilegales.",
        },
        {
          title: "Trámites de mudanza",
          body: "Hacemos tu checklist de trámites — internet, banco, padrón, suscripciones — y gestionamos parte por ti, para que nada se te escape.",
        },
        {
          title: "Muebles y pertenencias",
          body: "Hacemos un inventario de tus muebles y pertenencias y buscamos dónde llevarlos — vender, donar o guardar, si no tienen sitio.",
        },
        {
          title: "Mudanza urgente",
          body: "Revisamos tu contrato y el plazo de preaviso para que puedas mudarte antes sin penalizaciones ni perder la fianza.",
        },
        {
          title: "Bono por mudanza",
          body: "Si tu alquiler está por debajo de mercado, evaluamos la diferencia y te ofrecemos un bono de hasta 2.000 € más la fianza el mismo día, sin esperar un mes.",
        },
        {
          title: "Pequeñas reparaciones",
          body: "Revisamos fotos de antes y después y reparamos solo lo necesario para recuperar tu fianza — sin pagar de más por una reforma completa.",
        },
      ],
      ctaCard: {
        heading: "Gratis, hasta que decidas lo contrario",
        body: "Consulta de 15 minutos, equipo local en Barcelona, sin compromiso en ningún paso.",
        button: "Hacer mi revisión gratuita →",
      },
    },
  },
  ru: {
    hero: {
      eyebrow: "Бесплатно для арендаторов в Барселоне ·",
      h1: [
        [{ text: "Съезжайте" }],
        [{ text: "с уверенностью." }],
        [{ text: "MoveOS", accent: true }, { text: " берёт" }],
        [{ text: "всё", accent: true }, { text: " на себя." }],
      ],
      subheading:
        "Собираетесь скоро съехать, но не знаете с чего начать? Расскажите, какие у вас трудности — и мы вам поможем.",
      cta: "Расскажите о своей ситуации",
      badges: ["Бесплатно, без обязательств", "Местная команда в Барселоне", "Ответ за 15 минут"],
    },
    situations: {
      whatWeDo: {
        heading: "Одна платформа. Все шаги выезда.",
        body: "Депозит, документы, вещи, ремонт — мы бесплатно проводим вас через весь выезд, шаг за шагом.",
        cta: "Посмотреть все ситуации",
      },
      trustStats: {
        heading: "Бесплатно для арендаторов. Прозрачно для владельцев.",
        stats: [
          { value: "6", label: "бесплатных решений — под каждую ситуацию" },
          { value: "0 €", label: "стоимость для арендатора" },
        ],
      },
      quotes: [
        {
          quote:
            "Я не знала, что владельца нужно уведомить заранее по закону — чуть не потеряла часть депозита из-за одной бумажки.",
          resolved: "Разобрали процедуру и сроки. Депозит защищён.",
          name: "Марта, арендатор",
        },
        {
          quote:
            "Отключить интернет на старой квартире, подключить на новой, поменять адрес в банке и в padrón — на это ушли бы все выходные.",
          resolved: "Собрали чек-лист и сделали часть дел за вас.",
          name: "Ирене, арендатор",
        },
        {
          quote: "После выезда осталась мебель — продавать некогда, а выбросить жалко.",
          resolved: "Нашли, куда передать и где хранить.",
          name: "Пабло, съезжает на этой неделе",
        },
        {
          quote: "Нужно было съехать за неделю — разбираться самому со всей логистикой не было ни сил, ни времени.",
          resolved: "Взяли логистику выезда на себя.",
          name: "Диего, съехал за 6 дней",
        },
        {
          quote: "Я снимаю дешевле рынка и боялась, что выезд обернётся только потерями.",
          resolved: "Предложили бонус до 2 000 € и депозит день в день.",
          name: "Хавьер, арендатор",
        },
        {
          quote: "Боялась, что скол на стене посчитают ремонтом, а не износом, и снимут с депозита.",
          resolved: "Оценили, что действительно нужно чинить.",
          name: "Лаура, арендатор",
        },
      ],
      linksPanel: {
        heading: "Изучите свою ситуацию подробнее",
        subheading: "У каждой ситуации — отдельная страница с бесплатным квизом.",
      },
    },
    trust: {
      heading: "Прежде чем сдать ключи",
      subheading: "Узнай то, что большинство арендаторов в Барселоне узнают слишком поздно.",
      ctaCard: { badge: "Бесплатно · 15 минут", text: "Узнайте, какая у вас ситуация →" },
    },
    howItWorks: {
      heading: "Как это работает",
      subheading: "Одни и те же три шага, с какой бы проблемы вы ни начали.",
      steps: [
        {
          title: "Расскажите о своей ситуации",
          body: "Выберите страницу, которая ближе всего к вашей задаче: депозит, бумажные дела, срочный выезд, мебель, ремонт или выкуп договора.",
        },
        {
          title: "Получите бесплатную 15-минутную консультацию",
          body: "Мы разбираем именно ваш случай и даём понятный личный план — а не общий чек-лист.",
        },
        {
          title: "Съезжайте, не теряя депозит",
          body: "Вы сохраняете контроль над ключами, документами и деньгами, которые принадлежат вам.",
        },
      ],
    },
    whyUs: {
      eyebrow: "Почему MoveOS",
      heading: "Мы не просто сервис. Мы ваш защитник на этапе выезда.",
      intro:
        "От первого звонка до передачи ключей мы берём на себя переговоры с владельцем, бумажную волокиту и все неприятные моменты — чтобы вы съехали без стресса.",
      advantages: [
        "Проверяем акт и фото при выезде и говорим, как вернуть депозит полностью.",
        "Составляем список бытовых дел — интернет, банк, padrón — и часть делаем за вас.",
        "Оцениваем, что из ремонта действительно нужно, а что — естественный износ.",
        "Находим, куда передать мебель и вещи, если им некуда деться.",
      ],
      card: {
        heading: "Что вы получите на руки после выезда",
        description:
          "Не просто чек-лист, а организованная папка с доказательствами — вместо десятка случайных фото в галерее телефона, которую можно предъявить в любой момент, если возникнет спор.",
        items: [
          "Договор аренды",
          "Опись имущества при въезде",
          "Фото квартиры до ремонта",
          "Фото квартиры после ремонта",
          "Финальные фото каждой комнаты",
          "Финальное видео всей квартиры",
          "Показания счётчиков",
          "Подтверждения закрытия коммунальных договоров",
          "Акт передачи ключей",
          "Подписанный акт передачи квартиры",
          "Подтверждения всех платежей",
          "Документы по депозиту (fianza)",
        ],
        note: "Ничего из этого не удаляется, пока депозит не вернулся и все вопросы не закрыты.",
      },
    },
    included: {
      heading: "Что именно входит в помощь",
      subheading: "По каждой из 6 ситуаций — конкретные шаги, а не общие слова.",
      items: [
        {
          title: "Депозит",
          body: "Проверяем акт и фото на въезд и выезд и подсказываем, как вернуть депозит полностью — без незаконных удержаний.",
        },
        {
          title: "Бытовые дела",
          body: "Собираем чек-лист бытовых дел — интернет, банк, padrón, подписки — и часть делаем за вас, чтобы ничего не всплыло после переезда.",
        },
        {
          title: "Мебель и вещи",
          body: "Составляем опись мебели и вещей и находим, куда их передать — продать, отдать или сдать на хранение, если им некуда деться.",
        },
        {
          title: "Срочный выезд",
          body: "Разбираем ваш договор и сроки уведомления, чтобы съехать раньше срока без штрафов и потери депозита.",
        },
        {
          title: "Бонус за выезд",
          body: "Если снимаете квартиру дешевле рынка — оценим разницу и предложим бонус до 2000 € плюс депозит в день выезда, без ожидания месяца.",
        },
        {
          title: "Мелкий ремонт",
          body: "Смотрим фото до/после и чиним только то, что действительно нужно для возврата депозита — без переплаты за капитальный ремонт.",
        },
      ],
      ctaCard: {
        heading: "Всё бесплатно, пока вы не решите иначе",
        body: "15-минутная консультация, локальная команда в Барселоне, без обязательств на любом шаге.",
        button: "Пройти проверку →",
      },
    },
  },
};
