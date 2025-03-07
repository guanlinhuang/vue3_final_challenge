import { createRouter, createWebHashHistory } from 'vue-router'
import UserBoard from '../views/user/UserBoard'

const routes = [
  {
    path: '/',
    name: 'UserBoard',
    component: UserBoard,
    children: [
      {
        path: '',
        name: '首頁',
        component: () => import('../views/user/HomeView.vue')
      },
      {
        path: 'aboutus',
        name: '關於我們',
        component: () => import('../views/user/UserAboutUs.vue')
      },
      {
        path: 'storelist',
        name: '店舖清單',
        component: () => import('../views/user/UserStoreList.vue')
      },
      {
        path: 'productsall/:categoryName?',
        name: '所有商品列表',
        component: () => import('../views/user/UserProductsAll.vue')
      },
      {
        path: 'products/:productId',
        name: '單一產品介紹',
        component: () => import('../views/user/UserProductDetail.vue')
      },
      {
        path: 'UserOrderSearch',
        name: '訂單查詢',
        component: () => import('../views/user/UserOrderSearch.vue')
      },
      {
        path: 'cart',
        name: '購物車',
        component: () => import('../views/user/UserCart.vue')
      },
      {
        path: 'order',
        name: '填寫資料',
        component: () => import('../views/user/UserOrder.vue')
      },
      {
        path: 'pay/:orderId',
        name: '結帳',
        component: () => import('../views/user/UserPay.vue')
      },
      {
        path: 'favorite',
        name: '最愛',
        component: () => import('../views/user/UserFavorite.vue')
      }
    ]
  },
  {
    path: '/login',
    name: '登入頁面',
    component: () => import('../views/backstage/BackstageLogin.vue')
  },
  {
    path: '/dashboard',
    name: '後台儀表板',
    component: () => import('../views/backstage/BackstageDashboard.vue'),
    children: [
      {
        path: 'products/:categoryName?',
        name: '產品列表',
        component: () => import('../views/backstage/BackstageProducts.vue')
      },
      {
        path: 'orders',
        name: '訂單列表',
        component: () => import('../views/backstage/BackstageOrders.vue')
      },
      {
        path: 'coupons',
        name: '優惠券列表',
        component: () => import('../views/backstage/BackstageCoupons.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes,
  scrollBehavior (to, from, savedPosition) {
    return {
      top: 0
    }
  }
})

export default router
