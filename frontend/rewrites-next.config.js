module.exports = {
    async rewrites() {
        return [ //For link translation to work they have to be changed in localization file and rewrites respectively
          {
            source: '/galeria',
            destination: '/gallery',
          },
          {
            source: '/materialy',
            destination: '/materials',
          },
          {
            source: '/o-nas',
            destination: '/about-us',
          },
          {
            source: '/partneri',
            destination: '/for-partners',
          },
          {
            source: '/nakupny-kosik',
            destination: '/shopping-cart',
          },
          {
            source: '/konfigurator',
            destination: '/configurator',
          },
          {
            source: '/obchod',
            destination: '/e-shop',
          },
          {
            source: '/dakujeme',
            destination: '/thanks',
          },
          {
            source: '/kontakt',
            destination: '/contact',
          },
          {
            source: '/cookies',
            destination: '/cookies',
          },
          {
            source: '/zasady-ochrany-osobnych-udajov',
            destination: '/privacy-policy',
          },
          {
            source: '/vseobecne-obchodne-podmienky',
            destination: '/conditions',
          },
          {
            source: '/profil',
            destination: '/profile',
          },
          {
            source: '/ucet',
            destination: '/account',
          },
          {
            source: '/recenzie',
            destination: '/reviews',
          },
        ]
    },
}