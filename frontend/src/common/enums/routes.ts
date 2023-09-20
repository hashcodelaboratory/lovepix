export enum Route {
  DASHBOARD = '/dashboard',
  ESHOP = '/e-shop',
  THANKS = '/thanks',
}

export const DashboardRoutes = {
  PRODUCTS: `${Route.DASHBOARD}/products`,
  ORDERS: `${Route.DASHBOARD}/orders`,
  VOUCHERS: `${Route.DASHBOARD}/vouchers`,
  CATEGORIES_ESHOP: `${Route.DASHBOARD}/categories-eshop`,
  CATEGORIES: `${Route.DASHBOARD}/categories`,
  DIMENSIONS: `${Route.DASHBOARD}/dimensions`,
  GALLERY: `${Route.DASHBOARD}/gallery`,
  MATERIALS: `${Route.DASHBOARD}/materials`,
}
