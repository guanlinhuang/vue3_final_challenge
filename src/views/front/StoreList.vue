<template>
  <img
    src=""
    alt=""
    style="width: 100%; height: 300px; background-color: antiquewhite"
  />
  <div class="store">
    <div class="container">
      <div class="store_btn d-flex justify-content-center my-5">
        <button type="button" class="btn btn-outline-info mx-3 px-4" @click.prevent="storeFilter('台北門市'),changeClass(1)" :class="{ active: isActive === 1 }" value="台北門市">台北門市</button>
        <button type="button" class="btn btn-outline-info mx-3 px-4" @click.prevent="storeFilter('新北門市'),changeClass(2)" :class="{ active: isActive === 2 }" value="新北門市">新北門市</button>
        <button type="button" class="btn btn-outline-info mx-3 px-4" @click.prevent="storeFilter('桃園門市'),changeClass(3)" :class="{ active: isActive === 3 }">桃園門市</button>
        <button type="button" class="btn btn-outline-info mx-3 px-4" @click.prevent="storeFilter('台中總店'),changeClass(4)" :class="{ active: isActive === 4 }">台中總店</button>
        <button type="button" class="btn btn-outline-info mx-3 px-4" @click.prevent="storeFilter('台中旗艦門市'),changeClass(5)" :class="{ active: isActive === 5 }">台中旗艦門市</button>
        <button type="button" class="btn btn-outline-info mx-3 px-4" @click.prevent="storeFilter('高雄門市'),changeClass(6)" :class="{ active: isActive === 6 }">高雄門市</button>
      </div>
      <div class="store_info d-flex justify-content-center mb-5">
        <div v-if="name === '台北門市'">
        <div class="row">
          <div class="col">
            <table class="store_detail table">
              <h5>台北門市</h5>
              <tbody>
                <tr>
                  <th scope="row">地址</th>
                  <td>台北市信義區</td>
                </tr>
                <tr>
                  <th scope="row">電話</th>
                  <td>02-1234-5678</td>
                </tr>
                <tr>
                  <th scope="row">支付方式</th>
                  <td>信用卡、Apple Pay</td>
                </tr>
                <tr>
                  <th scope="row">停車資訊</th>
                  <td>附設免費停車場</td>
                </tr>
                <tr>
                  <th scope="row">交通資訊</th>
                  <td>
                    <p>捷運/板南線「捷運市政府站」3號出口</p>
                    <p>捷運/淡水象山線「捷運象山站」1號出口</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col ms-4">
            <div class="store_map">
              <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3614.908661848201!2d121.56678105686952!3d25.03717359011662!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442ab7fff80ecf1%3A0x4f4cff44bb17ee07!2z55y86Y-h5biC5aC0IOmBoOeZvuS_oee-qUExM-W6lw!5e0!3m2!1szh-TW!2stw!4v1732944432131!5m2!1szh-TW!2stw" width="400" height="300" style="border:0;" allow="fullscreen" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
        </div></div>
        <div v-else-if="name === '新北門市'">
        <div class="row">
          <div class="col">
            <table class="store_detail table">
              <h5>新北門市</h5>
              <tbody>
                <tr>
                  <th scope="row">地址</th>
                  <td>台北市信義區</td>
                </tr>
                <tr>
                  <th scope="row">電話</th>
                  <td>02-1234-5678</td>
                </tr>
                <tr>
                  <th scope="row">支付方式</th>
                  <td>信用卡、Apple Pay</td>
                </tr>
                <tr>
                  <th scope="row">停車資訊</th>
                  <td>附設免費停車場</td>
                </tr>
                <tr>
                  <th scope="row">交通資訊</th>
                  <td>
                    <p>捷運/板南線「捷運市政府站」3號出口</p>
                    <p>捷運/淡水象山線「捷運象山站」1號出口</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col ms-4">
            <div class="store_map">
              <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3614.908661848201!2d121.56678105686952!3d25.03717359011662!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442ab7fff80ecf1%3A0x4f4cff44bb17ee07!2z55y86Y-h5biC5aC0IOmBoOeZvuS_oee-qUExM-W6lw!5e0!3m2!1szh-TW!2stw!4v1732944432131!5m2!1szh-TW!2stw" width="400" height="300" style="border:0;" allow="fullscreen" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
        </div></div>
        <div v-else-if="name === '桃園門市'">
        <div class="row">
          <div class="col">
            <table class="store_detail table">
              <h5>桃園門市</h5>
              <tbody>
                <tr>
                  <th scope="row">地址</th>
                  <td>台北市信義區</td>
                </tr>
                <tr>
                  <th scope="row">電話</th>
                  <td>02-1234-5678</td>
                </tr>
                <tr>
                  <th scope="row">支付方式</th>
                  <td>信用卡、Apple Pay</td>
                </tr>
                <tr>
                  <th scope="row">停車資訊</th>
                  <td>附設免費停車場</td>
                </tr>
                <tr>
                  <th scope="row">交通資訊</th>
                  <td>
                    <p>捷運/板南線「捷運市政府站」3號出口</p>
                    <p>捷運/淡水象山線「捷運象山站」1號出口</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col ms-4">
            <div class="store_map">
              <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3614.908661848201!2d121.56678105686952!3d25.03717359011662!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442ab7fff80ecf1%3A0x4f4cff44bb17ee07!2z55y86Y-h5biC5aC0IOmBoOeZvuS_oee-qUExM-W6lw!5e0!3m2!1szh-TW!2stw!4v1732944432131!5m2!1szh-TW!2stw" width="400" height="300" style="border:0;" allow="fullscreen" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
        </div></div>
        <div v-else-if="name === '台中總店'">
        <div class="row">
          <div class="col">
            <table class="store_detail table">
              <h5>台中總店</h5>
              <tbody>
                <tr>
                  <th scope="row">地址</th>
                  <td>台中市</td>
                </tr>
                <tr>
                  <th scope="row">電話</th>
                  <td>02-1234-5678</td>
                </tr>
                <tr>
                  <th scope="row">支付方式</th>
                  <td>信用卡、Apple Pay</td>
                </tr>
                <tr>
                  <th scope="row">停車資訊</th>
                  <td>附設免費停車場</td>
                </tr>
                <tr>
                  <th scope="row">交通資訊</th>
                  <td>
                    <p>捷運/板南線「捷運市政府站」3號出口</p>
                    <p>捷運/淡水象山線「捷運象山站」1號出口</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col ms-4">
            <div class="store_map">
              <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3614.908661848201!2d121.56678105686952!3d25.03717359011662!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442ab7fff80ecf1%3A0x4f4cff44bb17ee07!2z55y86Y-h5biC5aC0IOmBoOeZvuS_oee-qUExM-W6lw!5e0!3m2!1szh-TW!2stw!4v1732944432131!5m2!1szh-TW!2stw" width="400" height="300" style="border:0;" allow="fullscreen" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
        </div></div>
        <div v-else-if="name === '台中旗艦門市'">
        <div class="row">
          <div class="col">
            <table class="store_detail table">
              <h5>台中旗艦門市</h5>
              <tbody>
                <tr>
                  <th scope="row">地址</th>
                  <td>台中市</td>
                </tr>
                <tr>
                  <th scope="row">電話</th>
                  <td>02-1234-5678</td>
                </tr>
                <tr>
                  <th scope="row">支付方式</th>
                  <td>信用卡、Apple Pay</td>
                </tr>
                <tr>
                  <th scope="row">停車資訊</th>
                  <td>附設免費停車場</td>
                </tr>
                <tr>
                  <th scope="row">交通資訊</th>
                  <td>
                    <p>捷運/板南線「捷運市政府站」3號出口</p>
                    <p>捷運/淡水象山線「捷運象山站」1號出口</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col ms-4">
            <div class="store_map">
              <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3614.908661848201!2d121.56678105686952!3d25.03717359011662!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442ab7fff80ecf1%3A0x4f4cff44bb17ee07!2z55y86Y-h5biC5aC0IOmBoOeZvuS_oee-qUExM-W6lw!5e0!3m2!1szh-TW!2stw!4v1732944432131!5m2!1szh-TW!2stw" width="400" height="300" style="border:0;" allow="fullscreen" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
        </div></div>
        <div v-else-if="name === '高雄門市'">
        <div class="row">
          <div class="col">
            <table class="store_detail table">
              <h5>高雄門市</h5>
              <tbody>
                <tr>
                  <th scope="row">地址</th>
                  <td>高雄市</td>
                </tr>
                <tr>
                  <th scope="row">電話</th>
                  <td>02-1234-5678</td>
                </tr>
                <tr>
                  <th scope="row">支付方式</th>
                  <td>信用卡、Apple Pay</td>
                </tr>
                <tr>
                  <th scope="row">停車資訊</th>
                  <td>附設免費停車場</td>
                </tr>
                <tr>
                  <th scope="row">交通資訊</th>
                  <td>
                    <p>捷運/板南線「捷運市政府站」3號出口</p>
                    <p>捷運/淡水象山線「捷運象山站」1號出口</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col ms-4">
            <div class="store_map">
              <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3614.908661848201!2d121.56678105686952!3d25.03717359011662!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442ab7fff80ecf1%3A0x4f4cff44bb17ee07!2z55y86Y-h5biC5aC0IOmBoOeZvuS_oee-qUExM-W6lw!5e0!3m2!1szh-TW!2stw!4v1732944432131!5m2!1szh-TW!2stw" width="400" height="300" style="border:0;" allow="fullscreen" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
        </div></div>
      </div>
    </div>
  </div>
  <SmallSidebar ref="smallSidebar" :cartss="carts"></SmallSidebar>
</template>

<script>
import SmallSidebar from '@/components/SmallSidebar.vue'

export default {
  data () {
    return {
      name: '台北門市',
      isActive: 1, // 篩選資料按鈕用
      carts: []
    }
  },
  components: { // 區域註冊
    SmallSidebar
  },
  methods: {
    storeFilter (name) {
      this.name = name
    },
    changeClass (index) {
      this.isActive = index
      console.log('changeClass')
    },
    // 取得購物車列表
    getCart () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      // this.isLoading = true
      this.$http.get(url).then((response) => {
        console.log('getCart', response)
        this.carts = response.data.data.carts
        console.log('this.carts', this.carts)
      })
    }
  },
  created () {
    this.getCart()
  }
}
</script>
