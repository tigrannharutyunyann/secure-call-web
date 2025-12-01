import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      nav: {
        about: "About",
        download: "Download",
        signIn: "Sign in",
        getStarted: "Get started",
      },
      hero: {
        tagline: "Secure voice platform",
        title: "Private voice calls with keys that stay on your devices",
        subtitle:
          "End-to-end encryption, per-device keys, transparent sessions, and audited signaling. Calls stay private by default and never persist on servers.",
        supporting: "Real-time SRTP encryption, device-scoped keys, and transparent session indicators.",
        ctaPrimary: "Get started",
        ctaSecondary: "Learn more",
        badges: {
          e2e: "E2E voice calls",
          srtp: "SRTP + AES-256 encryption",
          transparency: "Session transparency",
          device: "Device control",
        },
      },
      about: {
        heading: "About Secure Call",
        subtitle: "A privacy-first voice communication client built around user-controlled encryption keys.",
        p1: "Secure Call is designed around a simple idea: your voice conversations should belong only to you. The application uses end-to-end encryption with device-generated keys, ensuring that private keys never leave your phone, laptop, or desktop environment.",
        p2: "Unlike conventional calling platforms, Secure Call provides full transparency into the session state, device trust, and encryption indicators. The interface prioritizes clarity, honesty, and user control — no hidden logs, no silent key changes, and no opaque alerts.",
        howHeading: "How we explain security",
        howDesc: "Six principles that keep the product clear and honest.",
      },
      explain: {
        cards: [
          {
            title: "Transparent crypto",
            body: "We name the algorithms we use — SRTP, AES-256, X25519 — and why. No vague claims.",
          },
          {
            title: "Device-scoped keys",
            body: "Every device generates and stores its own encryption keys locally. Private keys never sync through servers.",
          },
          {
            title: "Session key rotation",
            body: "Session keys are refreshed during calls, reducing long-term risk and improving forward secrecy.",
          },
          {
            title: "Trust controls",
            body: "Users decide who to trust. The app warns when contacts' keys change.",
          },
          {
            title: "Trusted session flow",
            body: "Users can see every stage of the secure session—from key setup to channel verification—ensuring trust at each step.",
          },
          {
            title: "Endpoint authentication",
            body: "Before a call starts, both devices authenticate each other to prevent impersonation or man-in-the-middle attacks.",
          },
        ],
      },
      download: {
        heading: "Download",
        desc: "Download the Secure Call desktop client and keep your encrypted calls under your control.",
        button: "Download",
      },
      auth: {
        login: {
          title: "Login",
          subtitle: "End-to-end encrypted voice communication",
          emailLabel: "Email",
          emailPlaceholder: "example@gmail.com",
          passwordLabel: "Password",
          passwordPlaceholder: "Enter password",
          submit: "Login",
          newHere: "New here?",
          createAccount: "Create Account",
          showPassword: "Show password",
          hidePassword: "Hide password",
          errors: {
            emailRequired: "Email is required",
            passwordRequired: "Password is required",
            invalidEmail: "Invalid email",
          },
        },
        register: {
          title: "Create Account",
          subtitle: "Register your Secure Call account",
          emailLabel: "Email",
          emailPlaceholder: "example@gmail.com",
          sendCode: "Send code",
          codeLabel: "Verification Code",
          codePlaceholder: "Enter code",
          passwordLabel: "Password",
          passwordPlaceholder: "Create password",
          confirmLabel: "Confirm Password",
          confirmPlaceholder: "Repeat password",
          submit: "Create Account",
          already: "Already have an account?",
          signIn: "Sign In",
          showPassword: "Show password",
          hidePassword: "Hide password",
          infoCodeSent: "Verification code was sent to your email",
          errors: {
            emailRequired: "Email is required",
            invalidEmail: "Invalid email",
            codeRequired: "Verification code is required",
            passwordRequired: "Password is required",
            confirmRequired: "Confirm password is required",
            passwordShort: "Password must be at least 6 characters",
            passwordMismatch: "Passwords do not match",
          },
        },
      },
      footer: {
        text: "Secure Call is a concept project exploring transparent, user-controlled encryption for voice calls.",
      },
    },
  },
  ru: {
    translation: {
      nav: {
        about: "О проекте",
        download: "Скачать",
        signIn: "Войти",
        getStarted: "Начать",
      },
      hero: {
        tagline: "Платформа защищенных звонков",
        title: "Приватные голосовые звонки с ключами, которые остаются на ваших устройствах",
        subtitle:
          "Сквозное шифрование, отдельные ключи для каждого устройства, прозрачные сессии и аудит сигналинга. Звонки по умолчанию остаются приватными и не хранятся на серверах.",
        supporting: "Шифрование SRTP в реальном времени, ключи на устройствах и прозрачные индикаторы сессий.",
        ctaPrimary: "Начать",
        ctaSecondary: "Узнать больше",
        badges: {
          e2e: "E2E голосовые звонки",
          srtp: "SRTP + AES-256",
          transparency: "Прозрачность сессии",
          device: "Контроль устройств",
        },
      },
      about: {
        heading: "О Secure Call",
        subtitle: "Клиент для голосовой связи, где приватность — в приоритете, а ключи шифрования контролирует пользователь.",
        p1: "Secure Call создан вокруг простой идеи: ваши голосовые разговоры должны принадлежать только вам. Приложение использует сквозное шифрование с ключами, генерируемыми на устройстве, поэтому приватные ключи не покидают ваш телефон, ноутбук или компьютер.",
        p2: "В отличие от обычных платформ звонков Secure Call обеспечивает полную прозрачность состояния сессии, доверия к устройствам и индикаторов шифрования. Интерфейс ставит на первое место ясность, честность и контроль пользователя — никаких скрытых логов, неожиданных смен ключей и непонятных предупреждений.",
        howHeading: "Как мы объясняем безопасность",
        howDesc: "Шесть принципов, которые делают продукт понятным и честным.",
      },
      explain: {
        cards: [
          {
            title: "Прозрачная криптография",
            body: "Мы называем алгоритмы, которые используем — SRTP, AES-256, X25519 — и объясняем зачем. Никаких расплывчатых заявлений.",
          },
          {
            title: "Ключи на устройстве",
            body: "Каждое устройство генерирует и хранит свои ключи шифрования локально. Приватные ключи не синхронизируются через серверы.",
          },
          {
            title: "Ротация ключей сессии",
            body: "Ключи сессии обновляются во время звонков, снижая долгосрочные риски и повышая прямую секретность.",
          },
          {
            title: "Контроль доверия",
            body: "Пользователь сам решает, кому доверять. Приложение предупреждает при смене ключей контактов.",
          },
          {
            title: "Доверенный ход сессии",
            body: "Пользователь видит каждый этап защищенной сессии — от настройки ключей до подтверждения канала — и понимает, чему доверять.",
          },
          {
            title: "Аутентификация конечных точек",
            body: "Перед началом звонка устройства аутентифицируют друг друга, чтобы избежать подмены или атаки посредника.",
          },
        ],
      },
      download: {
        heading: "Скачать",
        desc: "Скачайте десктоп-клиент Secure Call и держите зашифрованные звонки под своим контролем.",
        button: "Скачать",
      },
      auth: {
        login: {
          title: "Вход",
          subtitle: "Шифрованная голосовая связь",
          emailLabel: "Email",
          emailPlaceholder: "example@gmail.com",
          passwordLabel: "Пароль",
          passwordPlaceholder: "Введите пароль",
          submit: "Войти",
          newHere: "Впервые здесь?",
          createAccount: "Создать аккаунт",
          showPassword: "Показать пароль",
          hidePassword: "Скрыть пароль",
          errors: {
            emailRequired: "Требуется email",
            passwordRequired: "Требуется пароль",
            invalidEmail: "Некорректный email",
          },
        },
        register: {
          title: "Создать аккаунт",
          subtitle: "Зарегистрируйте аккаунт Secure Call",
          emailLabel: "Email",
          emailPlaceholder: "example@gmail.com",
          sendCode: "Отправить код",
          codeLabel: "Код подтверждения",
          codePlaceholder: "Введите код",
          passwordLabel: "Пароль",
          passwordPlaceholder: "Придумайте пароль",
          confirmLabel: "Повторите пароль",
          confirmPlaceholder: "Повторите пароль",
          submit: "Создать аккаунт",
          already: "Уже есть аккаунт?",
          signIn: "Войти",
          showPassword: "Показать пароль",
          hidePassword: "Скрыть пароль",
          infoCodeSent: "Код отправлен на вашу почту",
          errors: {
            emailRequired: "Требуется email",
            invalidEmail: "Некорректный email",
            codeRequired: "Требуется код подтверждения",
            passwordRequired: "Требуется пароль",
            confirmRequired: "Требуется подтверждение пароля",
            passwordShort: "Пароль должен быть не короче 6 символов",
            passwordMismatch: "Пароли не совпадают",
          },
        },
      },
      footer: {
        text: "Secure Call — концепт-проект, исследующий прозрачное, контролируемое пользователем шифрование голосовых звонков.",
      },
    },
  },
  hy: {
    translation: {
      nav: {
        about: "Ծրագրի մասին",
        download: "Ներբեռնել",
        signIn: "Մուտք",
        getStarted: "Սկսել",
      },
      hero: {
        tagline: "Անվտանգ ձայնային հարթակ",
        title: "Գաղտնի ձայնազանգեր՝ բանալիները մնում են ձեր սարքերում",
        subtitle:
          "Վերջից-վերջ կոդավորում, յուրաքանչյուր սարքի առանձին բանալիներ, թափանցիկ սեսիաներ և ստուգված սիգնալինգ։ Զանգերը լռելյայն մասնավոր են և չեն պահպանվում սերվերներում։",
        supporting: "SRTP կոդավորում իրական ժամանակում, սարքերին վերապահված բանալիներ և թափանցիկ սեսիայի ցուցիչներ։",
        ctaPrimary: "Սկսել",
        ctaSecondary: "Իմանալ ավելին",
        badges: {
          e2e: "E2E ձայնային զանգեր",
          srtp: "SRTP + AES-256",
          transparency: "Սեսիայի թափանցիկություն",
          device: "Սարքերի վերահսկում",
        },
      },
      about: {
        heading: "Secure Call-ի մասին",
        subtitle: "Գաղտնիության վրա հիմնված ձայնային հաճախորդ, որտեղ կոդավորման բանալիները վերահսկվում են օգտագործողի կողմից։",
        p1: "Secure Call-ը ստեղծված է պարզ գաղափարի շուրջ. ձեր խոսակցությունները պետք է պատկանեն միայն ձեզ։ Կիրառումը օգտագործում է վերջից-վերջ կոդավորում սարքի կողմից գեներացվող բանալիներով, ուստի մասնավոր բանալիները չեն լքում ձեր հեռախոսը, նոթբուքը կամ համակարգիչը։",
        p2: "Ի տարբերություն սովորական զանգերի հարթակների՝ Secure Call-ը ապահովում է սեսիայի վիճակի, սարքերի վստահության և կոդավորման ցուցիչների լիարժեք թափանցիկություն։ Ինտերֆեյսը առաջնահերթություն է տալիս պարզությունը, ազնվությունը և օգտագործողի վերահսկումը — առանց թաքնված մատյանների, անսպասելի բանալիափոխությունների և անհասկանալի նախազգուշացումների։",
        howHeading: "Ինչպես ենք բացատրում անվտանգությունը",
        howDesc: "Վեց սկզբունք, որոնք պահում են արտադրանքը պարզ և ազնիվ։",
      },
      explain: {
        cards: [
          {
            title: "Թափանցիկ կրիպտոգրաֆիա",
            body: "Անվանում ենք օգտագործվող ալգորիթմները — SRTP, AES-256, X25519 — և բացատրում, թե ինչու։ Առանց մշուշոտ հայտարարությունների։",
          },
          {
            title: "Սարքերին վերապահված բանալիներ",
            body: "Յուրաքանչյուր սարք տեղում ստեղծում և պահում է իր կոդավորման բանալիները։ Մասնավոր բանալիները չեն համաժամացվում սերվերներով։",
          },
          {
            title: "Սեսիայի բանալիների ռոտացիա",
            body: "Սեսիայի բանալիները թարմացվում են զանգերի ընթացքում՝ նվազեցնելով երկարաժամկետ ռիսկերը և բարձրացնելով գաղտնীয়ությունը։",
          },
          {
            title: "Վստահության վերահսկում",
            body: "Օգտագործողը որոշում է՝ ում վստահել։ Հավելվածը զգուշացնում է, երբ կոնտակտների բանալիները փոխվում են։",
          },
          {
            title: "Վստահելի սեսիայի ընթացք",
            body: "Օգտագործողը տեսնում է պաշտպանված սեսիայի յուրաքանչյուր փուլը՝ բանալիների կարգավորումից մինչև ալիքի հաստատում, ապահովելով վստահություն յուրաքանչյուր քայլում։",
          },
          {
            title: "Վերջնակետերի նույնականացում",
            body: "Զանգից առաջ սարքերը հաստատում են միմյանց, կանխելու համար փոխարինումը կամ միջնորդի հարձակումը։",
          },
        ],
      },
      download: {
        heading: "Ներբեռնել",
        desc: "Ներբեռնեք Secure Call դեսկտոպ հաճախորդը և պահեք ձեր գաղտնագրված զանգերը սեփական վերահսկողության տակ։",
        button: "Ներբեռնել",
      },
      auth: {
        login: {
          title: "Մուտք",
          subtitle: "Վերջից-վերջ կոդավորված ձայնային կապ",
          emailLabel: "Email",
          emailPlaceholder: "example@gmail.com",
          passwordLabel: "Գաղտնաբառ",
          passwordPlaceholder: "Գրեք գաղտնաբառը",
          submit: "Մուտք",
          newHere: "Նոր ե՞ք այստեղ",
          createAccount: "Ստեղծել հաշիվ",
          showPassword: "Ցուցադրել գաղտնաբառը",
          hidePassword: "Թաքցնել գաղտնաբառը",
          errors: {
            emailRequired: "Պետք է լրացնել email-ը",
            passwordRequired: "Պետք է լրացնել գաղտնաբառը",
            invalidEmail: "Անվավեր email",
          },
        },
        register: {
          title: "Ստեղծել հաշիվ",
          subtitle: "Գրանցեք Secure Call հաշիվը",
          emailLabel: "Email",
          emailPlaceholder: "example@gmail.com",
          sendCode: "Ուղարկել կոդ",
          codeLabel: "Ստուգման կոդ",
          codePlaceholder: "Գրեք կոդը",
          passwordLabel: "Գաղտնաբառ",
          passwordPlaceholder: "Ստեղծեք գաղտնաբառ",
          confirmLabel: "Հաստատեք գաղտնաբառը",
          confirmPlaceholder: "Կրկնեք գաղտնաբառը",
          submit: "Ստեղծել հաշիվ",
          already: "Արդեն ունե՞ք հաշիվ",
          signIn: "Մուտք",
          showPassword: "Ցուցադրել գաղտնաբառը",
          hidePassword: "Թաքցնել գաղտնաբառը",
          infoCodeSent: "Ստուգման կոդը ուղարկվեց ձեր էլ․փոստին",
          errors: {
            emailRequired: "Պետք է լրացնել email-ը",
            invalidEmail: "Անվավեր email",
            codeRequired: "Պետք է ստուգման կոդը",
            passwordRequired: "Պետք է լրացնել գաղտնաբառը",
            confirmRequired: "Պետք է հաստատել գաղտնաբառը",
            passwordShort: "Գաղտնաբառը պետք է լինի առնվազն 6 նիշ",
            passwordMismatch: "Գաղտնաբառերը չեն համընկնում",
          },
        },
      },
      footer: {
        text: "Secure Call-ը կոնցեպտ նախագիծ է, որը ուսումնասիրում է թափանցիկ, օգտագործողի կողմից վերահսկվող կոդավորումը ձայնային զանգերի համար։",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
