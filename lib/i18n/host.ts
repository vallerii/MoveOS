import type { Locale } from "./types";

/**
 * Copy for /[locale]/host — the landlord-facing short-term-rental
 * management landing page. Kept in its own dictionary, same reasoning as
 * ./home.ts: this page isn't one of the six tenant pain pages (it's not
 * even the same audience — landlords, not tenants), so its copy doesn't
 * fit the `pains` record shape the rest of the site is built around.
 *
 * Only `ru` is populated for now — see HOST_LOCALES below. The route
 * 404s for locales without an entry here rather than silently falling
 * back to Russian copy, so a missing translation is visible (a 404 on
 * /en/host) instead of hidden.
 */
export interface HostCopy {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    h1: string;
    subheading: string;
    cta: string;
    // Optional — shorter CTA copy for narrow screens (same pattern as
    // pains.*.heroCtaMobile in ./types.ts and earnings.ctaMobile above).
    // Falls back to `cta`.
    ctaMobile?: string;
  };
  earnings: {
    heading: string;
    body: string;
    listHeading: string;
    items: string[];
    cta: string;
    // Optional — shorter CTA copy for narrow screens, same pattern as
    // pains.*.heroCtaMobile in ./types.ts. This button's full label is long
    // enough to wrap on a phone-width card; falls back to `cta`.
    ctaMobile?: string;
    disclaimer: string;
  };
  services: {
    heading: string;
    intro: string;
    items: { title: string; body: string; list?: string[] }[];
    cta: string;
  };
  control: {
    heading: string;
    body: string;
    flowIntro: string;
    flow: string;
  };
  /** The three objection-handling rows plus the time-commitment row —
   * same "hairline-divided editorial row" shape, richer per-row content
   * (a numbered list, a bullet list, or quoted examples) than the plain
   * HowItWorks timeline needs. */
  details: {
    items: {
      title: string;
      body: string;
      numberedList?: string[];
      bulletList?: string[];
      quotes?: string[];
      footer?: string;
    }[];
  };
  howItWorks: {
    heading: string;
    steps: { title: string; body: string }[];
    cta: string;
  };
  coverage: {
    heading: string;
    items: { title: string; body: string }[];
  };
  /**
   * Illustrative placeholder quotes, not real customer testimonials — the
   * user's own draft flagged this block as a stand-in until real reviews
   * exist after the first clients. Same convention as
   * HomeCopy.situations.quotes (see ./home.ts), which is documented there
   * as illustrative rather than verified. Swap for real reviews before
   * this page goes live.
   */
  testimonials: {
    heading: string;
    items: { hook: string; quote: string; name: string }[];
  };
  leadForm: {
    heading: string;
    body: string;
    cta: string;
    fields: {
      address: string;
      rooms: string;
      area: string;
      name: string;
      phone: string;
    };
    consent: string;
    consentLink: string;
    success: string;
    error: string;
  };
  closingCta: {
    heading: string;
    body: string;
    cta: string;
  };
}

export const HOST_LOCALES: Locale[] = ["ru", "en", "es"];

export const HOST_COPY: Partial<Record<Locale, HostCopy>> = {
  en: {
    meta: {
      title: "Short-Term Rental Property Management",
      description:
        "Rent out your apartment on Airbnb without the hassle: listing, guests, cleaning, inspections and reporting — all handled for you. Free income estimate.",
    },
    hero: {
      eyebrow: "For Property Owners · Barcelona",
      h1: "Rent Out Your Apartment Short-Term.\nWe Handle the Management.",
      subheading:
        "Hand us the keys — we run the whole process: listing your apartment, guest communication, check-in, cleaning, condition checks and financial reporting.\n\nYou earn income from your property without dealing with the day-to-day of running a rental yourself.",
      cta: "Find Out What My Apartment Could Earn",
      ctaMobile: "Check My Income",
    },
    earnings: {
      heading: "Your Apartment Could Earn More",
      body: "Short-term rental lets you tap into high tourist demand and flexibly adjust nightly rates for the season, events and city occupancy.\n\nWe analyze your apartment, its location and the market, and calculate potential income before we start working together.",
      listHeading: "You'll See:",
      items: [
        "an estimated nightly rate",
        "an occupancy forecast",
        "potential monthly and annual revenue",
        "management costs",
        "expected owner income",
      ],
      cta: "Get My Apartment's Income Estimate",
      ctaMobile: "Get My Estimate",
      disclaimer:
        "The estimate is individual and depends on location, the apartment's condition, the season and short-term rental rules in your specific city.",
    },
    services: {
      heading: "Hand Us the Keys. We'll Handle the Rest.",
      intro: "We fully manage the short-term rental process.",
      items: [
        {
          title: "Listing Your Apartment",
          body: "We prepare the listing and publish it on Airbnb, Booking and other suitable platforms.\n\nWe handle the photos, description, pricing, calendar and availability.",
        },
        {
          title: "Guest Communication",
          body: "We answer guest questions before and during their stay, send instructions and resolve issues as they come up.",
        },
        {
          title: "Check-in and Check-out",
          body: "We handle guest arrivals and departures, so you don't have to work around every booking yourself.",
        },
        {
          title: "Cleaning",
          body: "After every stay, we arrange cleaning and get the apartment ready for the next guest.",
        },
        {
          title: "Apartment Checks",
          body: "After checkout, we inspect the apartment's condition and flag any damage or issues.",
        },
        {
          title: "Pricing and Occupancy",
          body: "We track demand and adjust nightly rates so your apartment stays competitive and earns as much as it reasonably can.",
        },
        {
          title: "Reporting",
          body: "You get regular updates on:",
          list: ["bookings", "occupancy", "income", "expenses", "the apartment's condition"],
        },
      ],
      cta: "I Want to Hand Over Management",
    },
    control: {
      heading: "You Know What's Happening With Your Apartment",
      body: "One of the main reasons owners are wary of short-term rental is losing control.\n\nThat's why, after every stay, we check the apartment's condition and flag any issues that come up.",
      flowIntro: "You'll know:",
      flow: "who stayed → when they left → what condition the apartment is in → what the booking earned",
    },
    details: {
      items: [
        {
          title: "What if guests break something?",
          body: "We set the process up in advance so situations like this don't become the owner's problem.\n\nDepending on the apartment and platform, we arrange appropriate insurance coverage and use the host-protection mechanisms the booking platforms provide.\n\nIf damage happens:",
          numberedList: [
            "we document it",
            "we gather the necessary evidence",
            "we contact the guest and the platform",
            "we file a compensation claim",
            "we arrange repairs",
          ],
          footer: "You don't have to deal with guests, platform support or contractors yourself.",
        },
        {
          title: "What if the apartment sits empty?",
          body: "Our job is to manage not just the apartment, but its occupancy.\n\nWe track:",
          bulletList: [
            "prices of comparable apartments",
            "seasonality",
            "local demand",
            "events and peak dates",
            "booking lengths",
            "open gaps in the calendar",
          ],
          footer: "The nightly rate can be adjusted based on demand.",
        },
        {
          title: "What if a guest can't check in?",
          body: "We handle the check-in process and stay the guest's point of contact.\n\nYou won't be the one answering messages at night like:",
          quotes: ["“We've arrived, where are the keys?”", "“I can't get the door open.”"],
          footer: "Our team handles that.",
        },
        {
          title: "How much time does this take the owner?",
          body: "Very little.\n\nOnce your apartment is live, you don't have to:",
          bulletList: [
            "find guests",
            "answer messages",
            "handle check-ins",
            "find cleaners",
            "oversee cleaning",
            "inspect the apartment",
            "deal with damage",
            "manage the booking calendar",
            "adjust prices",
            "track income statistics",
          ],
          footer: "You see the results and get the reports.",
        },
      ],
    },
    howItWorks: {
      heading: "How It Starts",
      steps: [
        { title: "Show Us Your Apartment", body: "Tell us about your apartment or send photos and the address." },
        { title: "Get Your Estimate", body: "We assess the potential nightly rate, demand and likely occupancy." },
        {
          title: "Agree on Terms",
          body: "We discuss the management model, costs, insurance and rules for using the apartment.",
        },
        { title: "Hand Over the Keys", body: "We prepare the apartment and launch the listing." },
        { title: "Get Bookings and Reports", body: "We handle the operational work, you watch the results." },
      ],
      cta: "Calculate My Apartment's Income",
    },
    coverage: {
      heading: "All Management, in One Place",
      items: [
        { title: "Airbnb and Booking", body: "Creating and managing listings." },
        { title: "Guests", body: "Communication before, during and after the stay." },
        { title: "Check-in", body: "Check-in and check-out." },
        { title: "Cleaning", body: "Arranging cleaning between bookings." },
        { title: "Inspections", body: "Checking the apartment's condition." },
        { title: "Protection", body: "Handling insurance and compensation." },
        { title: "Pricing", body: "Adjusting the nightly rate." },
        { title: "Reporting", body: "Clear information on occupancy and income." },
      ],
    },
    testimonials: {
      heading: "What Owners Say",
      items: [
        {
          hook: "“I don't have to think about who's checking in today anymore”",
          quote:
            "I used to constantly answer guests and arrange cleaning myself. Now I just see the bookings and get a report on the apartment.",
          name: "Anna, property owner",
        },
        {
          hook: "“What matters most to me is knowing what's happening with the apartment”",
          quote:
            "I used to worry about damage and the apartment's condition after guests left. Now it gets checked after every stay, and if something comes up, the team handles it.",
          name: "Michael, property owner",
        },
        {
          hook: "“The apartment earns income and barely takes any of my time”",
          quote: "For me it's become close to passive income. That's exactly what I wanted.",
          name: "Alexander, property owner",
        },
      ],
    },
    leadForm: {
      heading: "Have an Apartment? Let's Calculate What It Could Earn",
      body: "It's free and doesn't commit you to anything.\n\nSend us the apartment's address and a few basic details. We'll assess the market and show you a possible short-term rental scenario.",
      cta: "Get a Free Estimate",
      fields: {
        address: "Apartment Address",
        rooms: "Number of Rooms",
        area: "Size",
        name: "Your Name",
        phone: "Phone / WhatsApp",
      },
      consent: "By submitting this form, you agree to the processing of your data under our",
      consentLink: "privacy policy",
      success: "Thank you! We'll be in touch within one business day.",
      error: "Couldn't submit your request. Please try again or reach us directly.",
    },
    closingCta: {
      heading: "Your Apartment. Our Management.",
      body: "Guests, cleaning, check-ins, inspections, pricing and reporting — all on us.\n\nYou get clear income from your property and keep control over what happens to it.",
      cta: "Find Out My Potential Income",
    },
  },
  es: {
    meta: {
      title: "Gestión de alquiler de temporada",
      description:
        "Alquila tu piso por días sin complicaciones: publicación, huéspedes, limpieza, control e informes — nos ocupamos de todo. Cálculo de ingresos gratis.",
    },
    hero: {
      eyebrow: "Para propietarios · Barcelona",
      h1: "Alquila tu piso por días.\nNosotros nos encargamos de la gestión.",
      subheading:
        "Danos las llaves — organizamos todo el proceso: publicación del piso, comunicación con los huéspedes, check-in, limpieza, control del estado y reportes financieros.\n\nObtienes ingresos de tu propiedad sin tener que ocuparte tú mismo del día a día del alquiler.",
      cta: "Saber cuánto puede generar mi piso",
      ctaMobile: "Ver mi ingreso",
    },
    earnings: {
      heading: "Tu piso puede generar más",
      body: "El alquiler de temporada te permite aprovechar la alta demanda turística y ajustar el precio por noche según la temporada, los eventos y la ocupación de la ciudad.\n\nAnalizamos tu piso, su ubicación y el mercado, y calculamos el ingreso potencial antes de empezar a colaborar.",
      listHeading: "Verás:",
      items: [
        "el precio aproximado por noche",
        "una previsión de ocupación",
        "los ingresos potenciales mensuales y anuales",
        "los costes de gestión",
        "el ingreso esperado para el propietario",
      ],
      cta: "Obtener el cálculo de rentabilidad de mi piso",
      ctaMobile: "Obtener cálculo",
      disclaimer:
        "El cálculo es individual y depende de la ubicación, el estado del piso, la temporada y la normativa de alquiler de temporada de cada ciudad.",
    },
    services: {
      heading: "Danos las llaves. Del resto nos encargamos nosotros.",
      intro: "Gestionamos por completo el proceso de alquiler de temporada.",
      items: [
        {
          title: "Publicación del piso",
          body: "Preparamos el anuncio y publicamos el piso en Airbnb, Booking y otras plataformas adecuadas.\n\nNos encargamos de las fotos, la descripción, los precios, el calendario y la disponibilidad.",
        },
        {
          title: "Atención a los huéspedes",
          body: "Respondemos las preguntas de los huéspedes antes y durante su estancia, enviamos instrucciones y resolvemos cualquier incidencia.",
        },
        {
          title: "Check-in y check-out",
          body: "Organizamos la entrada y salida de los huéspedes para que no tengas que adaptarte tú a cada reserva.",
        },
        {
          title: "Limpieza",
          body: "Después de cada estancia organizamos la limpieza y preparamos el piso para el siguiente huésped.",
        },
        {
          title: "Control del piso",
          body: "Después de cada salida revisamos el estado del piso y registramos posibles daños o incidencias.",
        },
        {
          title: "Precios y ocupación",
          body: "Seguimos la demanda y ajustamos el precio por noche para que tu piso siga siendo competitivo y genere el máximo ingreso razonable.",
        },
        {
          title: "Informes",
          body: "Recibes información periódica sobre:",
          list: ["las reservas", "la ocupación", "los ingresos", "los gastos", "el estado del piso"],
        },
      ],
      cta: "Quiero poner mi piso en gestión",
    },
    control: {
      heading: "Sabes qué pasa con tu piso",
      body: "Uno de los principales motivos por los que los propietarios temen el alquiler de temporada es perder el control.\n\nPor eso, después de cada estancia, controlamos el estado del piso y, si hace falta, registramos las incidencias que surjan.",
      flowIntro: "Sabrás:",
      flow: "quién se alojó → cuándo salió → en qué estado está el piso → cuánto generó la reserva",
    },
    details: {
      items: [
        {
          title: "¿Y si los huéspedes rompen algo?",
          body: "Organizamos el proceso de antemano para que este tipo de situaciones no se conviertan en un problema para el propietario.\n\nSegún el piso y la plataforma utilizada, organizamos la cobertura de seguro adecuada y usamos los mecanismos de protección para anfitriones que ofrecen las plataformas de reserva.\n\nSi se produce un daño:",
          numberedList: [
            "lo registramos",
            "reunimos los materiales necesarios",
            "nos ponemos en contacto con el huésped y la plataforma",
            "tramitamos la solicitud de compensación",
            "organizamos la reparación del piso",
          ],
          footer: "No tienes que lidiar tú mismo con los huéspedes, el soporte de las plataformas ni los proveedores.",
        },
        {
          title: "¿Y si el piso se queda vacío?",
          body: "Nuestra tarea es gestionar no solo el piso, sino también su ocupación.\n\nSeguimos:",
          bulletList: [
            "los precios de pisos similares",
            "la estacionalidad",
            "la demanda local",
            "eventos y fechas de máxima demanda",
            "la duración de las reservas",
            "los huecos libres en el calendario",
          ],
          footer: "El precio por noche puede ajustarse según la demanda.",
        },
        {
          title: "¿Y si un huésped no puede entrar al piso?",
          body: "Organizamos el proceso de check-in y seguimos siendo el punto de contacto del huésped.\n\nNo tienes que ser tú quien responda por la noche a mensajes como:",
          quotes: ["«Hemos llegado, ¿dónde están las llaves?»", "«No conseguimos abrir la puerta»."],
          footer: "De eso se encarga nuestro equipo.",
        },
        {
          title: "¿Cuánto tiempo le dedica el propietario?",
          body: "El mínimo.\n\nUna vez que el piso está en marcha, no necesitas:",
          bulletList: [
            "buscar huéspedes",
            "responder mensajes",
            "gestionar entradas",
            "buscar personal de limpieza",
            "supervisar la limpieza",
            "revisar el piso",
            "lidiar con daños",
            "llevar el calendario de reservas",
            "cambiar los precios",
            "recopilar estadísticas de ingresos",
          ],
          footer: "Tú ves el resultado y recibes los informes.",
        },
      ],
    },
    howItWorks: {
      heading: "Así empieza todo",
      steps: [
        { title: "Muéstranos tu piso", body: "Cuéntanos sobre tu piso o envíanos fotos y la dirección." },
        { title: "Recibe el cálculo", body: "Evaluamos el precio potencial por noche, la demanda y la ocupación posible." },
        {
          title: "Acordamos las condiciones",
          body: "Hablamos del modelo de gestión, los costes, el seguro y las normas de uso del piso.",
        },
        { title: "Entrega las llaves", body: "Preparamos el piso y ponemos en marcha la publicación." },
        { title: "Recibe reservas e informes", body: "Nosotros nos ocupamos del trabajo operativo, tú sigues los resultados." },
      ],
      cta: "Calcular el ingreso de mi piso",
    },
    coverage: {
      heading: "Toda la gestión, en un solo lugar",
      items: [
        { title: "Airbnb y Booking", body: "Creación y gestión de los anuncios." },
        { title: "Huéspedes", body: "Comunicación antes, durante y después de la estancia." },
        { title: "Entrada", body: "Check-in y check-out." },
        { title: "Limpieza", body: "Organización de la limpieza entre reservas." },
        { title: "Control", body: "Revisión del estado del piso." },
        { title: "Protección", body: "Gestión de seguros y compensaciones." },
        { title: "Precios", body: "Ajuste del precio por noche." },
        { title: "Informes", body: "Información clara sobre ocupación e ingresos." },
      ],
    },
    testimonials: {
      heading: "Qué dicen los propietarios",
      items: [
        {
          hook: "«Ya no pienso en quién se aloja hoy»",
          quote:
            "Antes tenía que responder constantemente a los huéspedes y coordinar la limpieza. Ahora solo veo las reservas y recibo un informe del piso.",
          name: "Ana, propietaria",
        },
        {
          hook: "«Lo más importante para mí es saber qué pasa con el piso»",
          quote:
            "Me preocupaban los daños y el estado del piso después de los huéspedes. Ahora se revisa después de cada estancia, y si surge algún problema, el equipo se encarga.",
          name: "Miguel, propietario",
        },
        {
          hook: "«El piso genera ingresos y apenas me quita tiempo»",
          quote: "Para mí se ha convertido casi en un ingreso pasivo. Es justo lo que quería.",
          name: "Alejandro, propietario",
        },
      ],
    },
    leadForm: {
      heading: "¿Tienes un piso? Calculamos cuánto puede generar",
      body: "Es gratis y no te compromete a nada.\n\nEnvíanos la dirección del piso y algunos datos básicos. Evaluaremos el mercado y te mostraremos un posible escenario de alquiler de temporada.",
      cta: "Obtener cálculo gratuito",
      fields: {
        address: "Dirección del piso",
        rooms: "Número de habitaciones",
        area: "Superficie",
        name: "Tu nombre",
        phone: "Teléfono / WhatsApp",
      },
      consent: "Al enviar este formulario, aceptas el tratamiento de tus datos según nuestra",
      consentLink: "política de privacidad",
      success: "¡Gracias! Nos pondremos en contacto contigo en el plazo de un día laborable.",
      error: "No se ha podido enviar la solicitud. Inténtalo de nuevo o escríbenos directamente.",
    },
    closingCta: {
      heading: "Tu piso. Nuestra gestión.",
      body: "Huéspedes, limpieza, entradas, control, precios e informes — de nuestro lado.\n\nObtienes un ingreso claro de tu propiedad y mantienes el control sobre lo que sucede con ella.",
      cta: "Saber mi ingreso potencial",
    },
  },
  ru: {
    meta: {
      title: "Управление квартирой в краткосрочной аренде",
      description:
        "Сдавайте квартиру посуточно без хлопот: размещение, гости, уборка, контроль и отчётность берём на себя. Бесплатный расчёт дохода.",
    },
    hero: {
      eyebrow: "Для владельцев квартир · Барселона",
      h1: "Сдавайте квартиру посуточно.\nУправление возьмём на себя.",
      subheading:
        "Передайте нам ключи — мы организуем весь процесс: размещение квартиры, работу с гостями, заселение, уборку, контроль состояния и финансовую отчётность.\n\nВы получаете доход от квартиры без необходимости самостоятельно заниматься ежедневными вопросами аренды.",
      cta: "Узнать, сколько может приносить моя квартира",
      ctaMobile: "Узнать доход",
    },
    earnings: {
      heading: "Ваша квартира может зарабатывать больше",
      body: "Краткосрочная аренда позволяет использовать высокий туристический спрос и гибко менять стоимость проживания в зависимости от сезона, событий и загрузки города.\n\nМы анализируем квартиру, расположение и рынок и рассчитываем потенциальный доход до начала сотрудничества.",
      listHeading: "Вы увидите:",
      items: [
        "ориентировочную стоимость проживания за ночь",
        "прогноз загрузки",
        "потенциальную выручку за месяц и год",
        "расходы на управление",
        "ожидаемый доход владельца",
      ],
      cta: "Получить расчёт доходности квартиры",
      ctaMobile: "Получить расчёт",
      disclaimer:
        "Расчёт индивидуален и зависит от расположения, состояния квартиры, сезона и правил краткосрочной аренды в конкретном городе.",
    },
    services: {
      heading: "Передайте нам ключи. Остальное организуем мы.",
      intro: "Мы полностью управляем процессом краткосрочной аренды.",
      items: [
        {
          title: "Размещение квартиры",
          body: "Подготавливаем объявление и размещаем квартиру на Airbnb, Booking и других подходящих площадках.\n\nРаботаем с фотографиями, описанием, ценами, календарём и доступностью квартиры.",
        },
        {
          title: "Работа с гостями",
          body: "Отвечаем на вопросы гостей до бронирования и во время проживания, отправляем инструкции и решаем возникающие вопросы.",
        },
        {
          title: "Check-in и check-out",
          body: "Организуем заселение и выезд гостей, чтобы владельцу не приходилось самостоятельно подстраиваться под каждое бронирование.",
        },
        {
          title: "Уборка",
          body: "После каждого проживания организуем уборку и подготовку квартиры к следующему гостю.",
        },
        {
          title: "Контроль квартиры",
          body: "После выезда проверяем состояние квартиры и фиксируем возможные повреждения или проблемы.",
        },
        {
          title: "Цены и загрузка",
          body: "Следим за спросом и корректируем стоимость проживания, чтобы квартира оставалась конкурентоспособной и приносила максимально разумный доход.",
        },
        {
          title: "Отчётность",
          body: "Вы регулярно получаете информацию о:",
          list: ["бронированиях", "загрузке", "доходе", "расходах", "состоянии квартиры"],
        },
      ],
      cta: "Хочу передать квартиру в управление",
    },
    control: {
      heading: "Вы знаете, что происходит с квартирой",
      body: "Одна из главных причин, почему владельцы боятся краткосрочной аренды, — потеря контроля.\n\nПоэтому после проживания гостей мы контролируем состояние квартиры и при необходимости фиксируем возникшие проблемы.",
      flowIntro: "Вы понимаете:",
      flow: "кто проживал → когда выехал → в каком состоянии квартира → сколько принесло бронирование",
    },
    details: {
      items: [
        {
          title: "Что, если гости что-нибудь сломают?",
          body: "Мы заранее выстраиваем процесс так, чтобы такие ситуации не становились проблемой владельца.\n\nВ зависимости от квартиры и используемой платформы мы организуем подходящее страховое покрытие и используем механизмы защиты хозяев, предоставляемые сервисами бронирования.\n\nЕсли возникает повреждение:",
          numberedList: [
            "фиксируем его",
            "собираем необходимые материалы",
            "связываемся с гостем и платформой",
            "подаём запрос на компенсацию",
            "организуем восстановление квартиры",
          ],
          footer: "Вам не приходится самостоятельно разбираться с гостями, поддержкой платформ и подрядчиками.",
        },
        {
          title: "А если квартира будет простаивать?",
          body: "Наша задача — управлять не только квартирой, но и её загрузкой.\n\nМы следим за:",
          bulletList: [
            "ценами похожих квартир",
            "сезонностью",
            "локальным спросом",
            "мероприятиями и пиковыми датами",
            "длительностью бронирований",
            "свободными окнами в календаре",
          ],
          footer: "Стоимость проживания может корректироваться в зависимости от спроса.",
        },
        {
          title: "А если гость не сможет заселиться?",
          body: "Мы организуем процесс check-in и остаёмся точкой контакта для гостя.\n\nВладельцу не нужно вечером отвечать на сообщения вроде:",
          quotes: ["«Мы приехали, где ключи?»", "«Не получается открыть дверь»."],
          footer: "Этим занимается наша команда.",
        },
        {
          title: "Сколько времени это занимает у владельца?",
          body: "Минимум.\n\nПосле запуска квартиры вам не нужно самостоятельно:",
          bulletList: [
            "искать гостей",
            "отвечать на сообщения",
            "проводить заселения",
            "искать уборщиков",
            "контролировать уборку",
            "проверять квартиру",
            "разбираться с повреждениями",
            "вести календарь бронирований",
            "менять цены",
            "собирать статистику по доходу",
          ],
          footer: "Вы видите результат и получаете отчётность.",
        },
      ],
    },
    howItWorks: {
      heading: "Как всё начинается",
      steps: [
        { title: "Покажите нам квартиру", body: "Расскажите о квартире или отправьте фотографии и адрес." },
        { title: "Получите расчёт", body: "Мы оцениваем потенциальную стоимость проживания, спрос и возможную загрузку." },
        { title: "Согласуем условия", body: "Обсуждаем модель управления, расходы, страхование и правила использования квартиры." },
        { title: "Передайте ключи", body: "Мы подготавливаем квартиру и запускаем размещение." },
        { title: "Получайте бронирования и отчётность", body: "Мы занимаемся операционной работой, а вы следите за результатами." },
      ],
      cta: "Рассчитать доход моей квартиры",
    },
    coverage: {
      heading: "Всё управление — в одном месте",
      items: [
        { title: "Airbnb и Booking", body: "Создание и управление размещениями." },
        { title: "Гости", body: "Коммуникация до, во время и после проживания." },
        { title: "Заселение", body: "Check-in и check-out." },
        { title: "Уборка", body: "Организация уборки между бронированиями." },
        { title: "Контроль", body: "Проверка состояния квартиры." },
        { title: "Защита", body: "Работа со страхованием и компенсациями." },
        { title: "Ценообразование", body: "Корректировка стоимости проживания." },
        { title: "Отчётность", body: "Понятная информация о загрузке и доходе." },
      ],
    },
    testimonials: {
      heading: "Что говорят владельцы",
      items: [
        {
          hook: "«Я больше не думаю о том, кто сегодня заселяется»",
          quote:
            "Раньше мне постоянно приходилось отвечать гостям и договариваться с уборкой. Сейчас я просто вижу бронирования и получаю отчёт по квартире.",
          name: "Анна, владелец квартиры",
        },
        {
          hook: "«Главное для меня — понимать, что происходит с квартирой»",
          quote:
            "Я переживал из-за повреждений и состояния квартиры после гостей. Теперь квартира проверяется после проживаний, и если возникает проблема, команда занимается ей сама.",
          name: "Михаил, владелец квартиры",
        },
        {
          hook: "«Квартира приносит доход, а моего времени почти не требует»",
          quote: "Для меня это стало практически пассивным источником дохода. Именно этого я и хотел.",
          name: "Александр, владелец квартиры",
        },
      ],
    },
    leadForm: {
      heading: "Есть квартира? Посчитаем, сколько она может приносить",
      body: "Это бесплатно и ни к чему вас не обязывает.\n\nОтправьте нам адрес квартиры и несколько основных параметров. Мы оценим рынок и покажем возможный сценарий краткосрочной аренды.",
      cta: "Получить бесплатный расчёт",
      fields: {
        address: "Адрес квартиры",
        rooms: "Количество комнат",
        area: "Площадь",
        name: "Ваше имя",
        phone: "Телефон / WhatsApp",
      },
      consent: "Отправляя заявку, вы соглашаетесь на обработку данных согласно",
      consentLink: "политике конфиденциальности",
      success: "Спасибо! Мы свяжемся с вами в течение рабочего дня.",
      error: "Не получилось отправить заявку. Попробуйте ещё раз или напишите нам напрямую.",
    },
    closingCta: {
      heading: "Ваша квартира. Наше управление.",
      body: "Гости, уборка, заселения, контроль, цены и отчётность — на нашей стороне.\n\nВы получаете понятный доход от недвижимости и сохраняете контроль над тем, что с ней происходит.",
      cta: "Узнать потенциальный доход",
    },
  },
};
