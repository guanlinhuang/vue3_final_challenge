export default {
  saveFavorite (favorite) {
    const favoriteStr = JSON.stringify(favorite) // JSON.stringify()：將資料轉為 JSON 格式的字串
    localStorage.setItem('favoriteProduct', favoriteStr) // setItem :儲存或移除localstorage裡的產品
  },
  getFavorite () {
    return JSON.parse(localStorage.getItem('favoriteProduct')) // JSON.parse(myJSON)：將資料由 JSON 格式字串轉回原本的資料內容及型別 // getItem :取得localstorage裡的產品
  }
}

// favoriteProduct 為UserFavorite.vue裡的變數名稱
// 新增 :localStorage.setItem(`myCat`, `Tom`);
// 取得 :let cat = localStorage.getItem(`myCat`);
// 移除 :localStorage.removeItem(`myCat`);
// 清除所有 :localStorage.clear();
