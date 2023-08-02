module.exports = {
    async rewrites() {
        return [
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
            source: '/pre-partnerov',
            destination: '/for-partners',
          },
          {
            source: '/kosik',
            destination: '/shopping-cart',
          },
          {
            source: '/konfigurator',
            destination: '/configurator',
          },
          {
            source: '/e-shop',
            destination: '/e-shop',
          },
          {
            source: '/dakujeme',
            destination: '/thanks',
          },
          {
            source: '/nase-kontakty',
            destination: '/our-contacts',
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
            source: '/kontakt',
            destination: '/contact',
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