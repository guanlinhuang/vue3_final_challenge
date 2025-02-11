import { createRouter, createWebHashHistory } from 'vue-router'
import Userboard from '../views/user/Userboard.vue'
// import { Comment } from 'vue'

const routes = [
  {
    path: '/',
    name: 'Userboard',
    component: Userboard,
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
        path: 'orderQ&A',
        name: '訂單Q&A',
        component: () => import('../views/user/UserOrderQ&A.vue')
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
      // 有加「 ? 」，/products、/products/:category都可選染
      // 若沒加「 ? 」，只能渲染/products/:category
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
    children: [ // 新增子路徑
      {
        path: 'products/:categoryName?', // 新增子路徑不需加「 / 」
        name: '產品列表', // 不能隨意改 // 因為BackstageProducts.vue裡有用到此名稱
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
      // {
      //   path: 'cart', // 購物車頁面
      //   component: () => import('../views/user/UserCart.vue')
      // }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active', // 可以讓選項變成啟用中的樣式
  routes,
  scrollBehavior (to, from, savedPosition) { // 控制網頁畫面的滾動位置
    // console.log('控制網頁畫面的滾動位置', to, from, savedPosition)
    return {
      top: 0
    }
  }
})

export default router // 匯出到main.js
