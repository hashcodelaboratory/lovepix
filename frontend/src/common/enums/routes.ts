export enum Route {
  DASHBOARD = '/dashboard',
  ESHOP = '/e-shop',
}

export const DashboardRoutes = {
  PRODUCTS: `${Route.DASHBOARD}/products`,
  ORDERS: `${Route.DASHBOARD}/orders`,
  VOUCHERS: `${Route.DASHBOARD}/vouchers`,
  CATEGORIES_ESHOP: `${Route.DASHBOARD}/categories-eshop`,
  CATEGORIES: `${Route.DASHBOARD}/categories`,
  DIMENSIONS: `${Route.DASHBOARD}/dimensions`,
  GALLERY: `${Route.DASHBOARD}/gallery`,
}
