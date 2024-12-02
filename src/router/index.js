import { createRouter, createWebHashHistory } from 'vue-router'
import Userboard from '../views/front/Userboard.vue'
// import { Comment } from 'vue'

const routes = [
  {
    path: '/',
    name: 'Userboard',
    component: Userboard,
    children: [
      {
        path: '', // 首頁頁面
        component: () => import('../views/front/HomeView.vue')
      },
      {
        path: 'aboutGuanTony', // 關於GuanTony頁面
        component: () => import('../views/front/AboutView.vue')
      },
      {
        path: 'orderQ&A', // 訂單Q&A頁面
        component: () => import('../views/front/OrderQ&A.vue')
      },
      {
        path: 'storelist', // 訂單查詢頁面
        component: () => import('../views/front/StoreList.vue')
      },
      {
        name: 'products',
        path: 'products/:category?', // 所有商品頁面
        component: () => import('../views/front/UserProductsAll.vue')
      },
      // 有加「 ? 」，/products、/products/:category都可選染
      // 若沒加「 ? 」，只能渲染/products/:category
      {
        path: 'products/:productId', // 某一產品頁面
        component: () => import('../views/front/UserProduct.vue')
      },
      {
        path: 'UserOrderSearch', // 訂單查詢頁面
        component: () => import('../views/front/UserOrderSearch.vue')
      },
      {
        path: 'cart', // 購物車頁面
        component: () => import('../views/front/UserCart.vue')
      },
      {
        path: 'order', // 填寫資料頁面
        component: () => import('../views/front/UserOrder.vue')
      },
      {
        path: 'pay/:orderId', // 結帳頁面
        component: () => import('../views/front/UserPay.vue')
      }
    ]
  },
  {
    path: '/login',
    name: '登入頁面',
    component: () => import('../views/back/Login.vue')
  },
  {
    path: '/dashboard',
    name: '後台儀表板',
    component: () => import('../views/back/Dashboard.vue'),
    children: [ // 新增子路徑
      {
        path: 'products', // 新增子路徑不需加「 / 」
        name: '新增產品頁面',
        component: () => import('../views/back/Products.vue')
      },
      {
        path: 'orders',
        name: '訂單資料頁面',
        component: () => import('../views/back/Orders.vue')
      },
      {
        path: 'coupons',
        name: '優惠券頁面',
        component: () => import('../views/back/Coupons.vue')
      },
      {
        path: 'cart', // 購物車頁面
        component: () => import('../views/front/UserCart.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active', // 可以讓選項變成啟用中的樣式
  routes
})

export default router // 匯出到main.js
