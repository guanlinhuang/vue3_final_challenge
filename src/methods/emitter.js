// mitt跨元件資料傳遞js // 先安裝套件npm install mitt --legacy-peer-deps
import mitt from 'mitt' // 匯入套件

const emitter = mitt() // 定義變數

export default emitter // 匯出

// mitt 套件.js被獨立於 methods 資料夾，非 src/main.js，原因是使用的範圍不大。
// 假如是全域性使用，直接在 src/main.js 引入即可
