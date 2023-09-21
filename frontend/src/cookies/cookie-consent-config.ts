const pluginConfig: UserConfig = {
  current_lang: 'sk',
  autoclear_cookies: true, // default: false
  page_scripts: true, // default: false

  // mode: 'opt-in'                          // default: 'opt-in'; value: 'opt-in' or 'opt-out'
  // delay: 0,                               // default: 0
  // auto_language: null                     // default: null; could also be 'browser' or 'document'
  // autorun: true,                          // default: true
  force_consent: true, // default: false
  // hide_from_bots: false,                  // default: false
  // remove_cookie_tables: false             // default: false
  // cookie_name: 'cc_cookie',               // default: 'cc_cookie'
  // cookie_expiration: 182,                 // default: 182 (days)
  // cookie_necessary_only_expiration: 182   // default: disabled
  // cookie_domain: location.hostname,       // default: current domain
  // cookie_path: '/',                       // default: root
  // cookie_same_site: 'Lax',                // default: 'Lax'
  // use_rfc_cookie: false,                  // default: false
  // revision: 0,                            // default: 0

  gui_options: {
    consent_modal: {
      layout: 'box', // box/cloud/bar
      position: 'middle center', // bottom/middle/top + left/right/center
      transition: 'zoom', // zoom/slide
      swap_buttons: true, // enable to invert buttons
    },
    settings_modal: {
      layout: 'box', // box/bar
      position: 'left', // left/right
      transition: 'zoom', // zoom/slide
    },
  },

  onFirstAction: function (user_preferences, cookie) {
    // callback triggered only once
    // @ts-ignore
    const analyticsEnabled = window.CC.allowedCategory('analytics')
    console.log(`analytics ${analyticsEnabled ? 'enabled' : 'disabled'}`)
  },

  onAccept: function (cookie) {
    // ...
  },

  onChange: function (cookie, changed_preferences) {
    // ...
  },

  languages: {
    sk: {
      consent_modal: {
        title: 'Používame cookies!',
        description:
          'Dobrý deň, táto webová stránka používa nevyhnutné súbory cookie na zabezpečenie správneho fungovania a sledovacie súbory cookie, aby sme pochopili, ako s ňou komunikujete. Ten bude nastavený až po súhlase. <button type="button" data-cc="c-settings" class="cc-link">Nechaj ma vybrať</button>',
        primary_btn: {
          text: 'Prijať všetko',
          role: 'accept_all', // 'accept_selected' or 'accept_all'
        },
        secondary_btn: {
          text: 'Odmietnuť všetko',
          role: 'accept_necessary', // 'settings' or 'accept_necessary'
        },
      },
      settings_modal: {
        title: 'Nastavenia súborov cookie',
        save_settings_btn: 'Uložiť nastavenia',
        accept_all_btn: 'Prijať všetko',
        reject_all_btn: 'Odmietnuť všetko',
        close_btn_label: 'Zavrieť',
        cookie_table_headers: [
          { col1: 'Názov' },
          { col2: 'Doména' },
          { col3: 'Expirácia' },
          { col4: 'Popis' },
        ],
        blocks: [
          {
            title: 'Používanie súborov cookie 📢',
            description:
              'Súbory cookie používam na zabezpečenie základných funkcií webovej stránky a na zlepšenie vášho online zážitku. Pre každú kategóriu si môžete vybrať, či sa chcete kedykoľvek prihlásiť/odhlásiť. Ďalšie podrobnosti týkajúce sa súborov cookie a iných citlivých údajov nájdete v úplnom znení <a href="#" class="cc-link">zásady ochrany osobných údajov</a>.',
          },
          {
            title: 'Nevyhnutne potrebné cookies',
            description:
              'Tieto cookies sú nevyhnutné pre správne fungovanie mojej webovej stránky. Bez týchto cookies by webová stránka nefungovala správne',
            toggle: {
              value: 'necessary',
              enabled: true,
              readonly: true, // cookie categories with readonly=true are all treated as "necessary cookies"
            },
          },
          {
            title: 'Súbory cookie výkonu a analytiky',
            description:
              'Tieto súbory cookie umožňujú webovej stránke zapamätať si voľby, ktoré ste urobili v minulosti',
            toggle: {
              value: 'analytics', // your cookie category
              enabled: false,
              readonly: false,
            },
            cookie_table: [
              // list of all expected cookies
              {
                col1: '^_ga', // match all cookies starting with "_ga"
                col2: 'google.com',
                col3: '2 years',
                col4: 'description ...',
                is_regex: true,
              },
              {
                col1: '_gid',
                col2: 'google.com',
                col3: '1 day',
                col4: 'description ...',
              },
            ],
          },
          {
            title: 'Cookies pre reklamu a zacielenie',
            description:
              'Tieto cookies zhromažďujú informácie o tom, ako používate webovú stránku, ktoré stránky ste navštívili a na ktoré odkazy ste klikli. Všetky údaje sú anonymizované a nie je možné ich použiť na vašu identifikáciu',
            toggle: {
              value: 'targeting',
              enabled: false,
              readonly: false,
            },
          },
          {
            title: 'Viac informácií',
            description:
              'V prípade akýchkoľvek otázok týkajúcich sa našich zásad týkajúcich sa súborov cookie a vašich možností, prosím <a class="cc-link" href="#yourcontactpage">kontaktuj nás</a>.',
          },
        ],
      },
    },
    en: {
      consent_modal: {
        title: 'We use cookies!',
        description:
          'Hi, this website uses essential cookies to ensure its proper operation and tracking cookies to understand how you interact with it. The latter will be set only after consent. <button type="button" data-cc="c-settings" class="cc-link">Let me choose</button>',
        primary_btn: {
          text: 'Accept all',
          role: 'accept_all', // 'accept_selected' or 'accept_all'
        },
        secondary_btn: {
          text: 'Reject all',
          role: 'accept_necessary', // 'settings' or 'accept_necessary'
        },
      },
      settings_modal: {
        title: 'Cookie Settings',
        save_settings_btn: 'Save settings',
        accept_all_btn: 'Accept all',
        reject_all_btn: 'Reject all',
        close_btn_label: 'Close',
        cookie_table_headers: [
          { col1: 'Name' },
          { col2: 'Domain' },
          { col3: 'Expiration' },
          { col4: 'Description' },
        ],
        blocks: [
          {
            title: 'Cookie usage 📢',
            description:
              'I use cookies to ensure the basic functionalities of the website and to enhance your online experience. You can choose for each category to opt-in/out whenever you want. For more details relative to cookies and other sensitive data, please read the full <a href="#" class="cc-link">privacy policy</a>.',
          },
          {
            title: 'Strictly necessary cookies',
            description:
              'These cookies are essential for the proper functioning of my website. Without these cookies, the website would not work properly',
            toggle: {
              value: 'necessary',
              enabled: true,
              readonly: true, // cookie categories with readonly=true are all treated as "necessary cookies"
            },
          },
          {
            title: 'Performance and Analytics cookies',
            description:
              'These cookies allow the website to remember the choices you have made in the past',
            toggle: {
              value: 'analytics', // your cookie category
              enabled: false,
              readonly: false,
            },
            cookie_table: [
              // list of all expected cookies
              {
                col1: '^_ga', // match all cookies starting with "_ga"
                col2: 'google.com',
                col3: '2 years',
                col4: 'description ...',
                is_regex: true,
              },
              {
                col1: '_gid',
                col2: 'google.com',
                col3: '1 day',
                col4: 'description ...',
              },
            ],
          },
          {
            title: 'Advertisement and Targeting cookies',
            description:
              'These cookies collect information about how you use the website, which pages you visited and which links you clicked on. All of the data is anonymized and cannot be used to identify you',
            toggle: {
              value: 'targeting',
              enabled: false,
              readonly: false,
            },
          },
          {
            title: 'More information',
            description:
              'For any queries in relation to our policy on cookies and your choices, please <a class="cc-link" href="#yourcontactpage">contact us</a>.',
          },
        ],
      },
    },
  },
}

export default pluginConfig
