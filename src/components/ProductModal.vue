<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content border-0">
        <div class="modal-header modal_bg text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>新增產品</span>
          </h5>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-6">
              <div class="mb-3">
                <label for="image" class="form-label">輸入圖片網址</label>
                <input
                  type="text"
                  class="form-control"
                  id="image"
                  v-model="tempProduct.imageUrl"
                  placeholder="請輸入圖片連結"
                />
              </div>
              <div class="mb-3">
                <label for="customFile" class="form-label"
                  >或 上傳主要圖片
                  <i class="fas fa-spinner fa-spin"></i>
                </label>
                <input
                  type="file"
                  id="customFile"
                  class="form-control"
                  ref="fileInput"
                  @change="uploadFile"
                />
              </div>
              <img
                class="img-fluid"
                :src="tempProduct.imageUrl"
                :alt="tempProduct.title"
              />
              <div class="mb-3 imgs-upload-box">
                <label for="customFile_1" class="form-label"
                  >上傳其他圖片<i class="fas fa-spinner fa-spin"></i
                ></label>
                <div class="mb-3 input-group">
                  <input
                    type="file"
                    id="customFile_1"
                    class="form-control"
                    multiple
                    @change="uploadFiles"
                    ref="filesInput_1"
                  />
                  <button type="button" class="btn btn-outline-danger">
                    移除
                  </button>
                </div>
              </div>
              <!-- 延伸技巧，多圖 -->
              <div class="mt-5" v-if="tempProduct.images">
                <div
                  v-for="(image, key) in tempProduct.images"
                  class="mb-3 input-group"
                  :key="key"
                >
                  <input
                    type="url"
                    class="form-control form-control"
                    v-model="tempProduct.images[key]"
                    placeholder="請輸入連結"
                  />
                  <button
                    type="button"
                    class="btn btn-outline-danger"
                    @click="tempProduct.images.splice(key, 1)"
                  >
                    移除
                  </button>
                </div>
                <div
                  v-if="
                    tempProduct.images[tempProduct.images.length - 1] ||
                    !tempProduct.images.length
                  "
                >
                  <button
                    class="btn btn-outline-primary btn-sm d-block w-100"
                    @click="tempProduct.images.push('')"
                  >
                    新增圖片
                  </button>
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  v-model="tempProduct.title"
                  placeholder="請輸入標題"
                />
              </div>
              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <p class="mb-2">分類</p>
                  <select
                    class="form-select select_border"
                    aria-label="Default select example"
                    v-model="tempProduct.category"
                  >
                    <option value="咖啡">咖啡</option>
                    <option value="果汁">果汁</option>
                    <option value="冰沙">冰沙</option>
                    <option value="甜點">甜點</option>
                    <option value="組合餐">組合餐</option>
                  </select>
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">單位</label>
                  <input
                    type="text"
                    class="form-control"
                    id="unit"
                    v-model="tempProduct.unit"
                    placeholder="請輸入單位"
                  />
                </div>
              </div>
              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input
                    type="number"
                    class="form-control"
                    id="origin_price"
                    v-model.number="tempProduct.origin_price"
                    placeholder="請輸入原價"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input
                    type="number"
                    class="form-control"
                    id="price"
                    v-model.number="tempProduct.price"
                    placeholder="請輸入售價"
                  />
                </div>
              </div>
              <hr />
              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea
                  type="text"
                  class="form-control"
                  id="description"
                  v-model="tempProduct.description"
                  placeholder="請輸入產品描述"
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea
                  type="text"
                  class="form-control"
                  id="content"
                  v-model="tempProduct.content"
                  placeholder="請輸入產品說明內容"
                ></textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="tempProduct.is_enabled"
                    :true-value="1"
                    :false-value="0"
                    id="is_enabled"
                  />
                  <label class="form-check-label" for="is_enabled">
                    是否啟用
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btnHover me-1" data-bs-dismiss="modal">
            <div>
              <span>取消編輯</span>
              <span>取消編輯</span>
            </div>
          </button>
          <button
            type="button"
            class="btnHover me-1"
            @click="$emit('update-product', tempProduct)"
          >
            <div>
              <span>儲存</span>
              <span>儲存</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'

export default {
  props: {
    product: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  watch: {
    product () {
      this.tempProduct = this.product
    }
  },
  data () {
    return {
      modal: {},
      tempProduct: {
        imageUrl: '',
        imagesUrl: []
      }
    }
  },
  methods: {
    uploadFile () {
      const uploadedFile = this.$refs.fileInput.files[0]
      const formData = new FormData()
      formData.append('file-to-upl', uploadedFile)
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`
      this.$http.post(url, formData).then((response) => {
        if (response.data.success) {
          this.tempProduct.imageUrl = response.data.imageUrl // 儲存主要圖片imageUrl
        }
      })
    },

    // uploadFiles1 () {
    //   const uploadedFile = this.$refs.fileInput_1.files[0]
    //   const formData = new FormData()
    //   formData.append('file-to-upl', uploadedFile)
    //   const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`
    //   this.$http.post(url, formData).then((response) => {
    //     if (response.data.success) {
    //       this.tempProduct.imagesUrl = response.data.imageUrl // 儲存多圖圖片imagesUrl
    //     }
    //   })
    // },

    // 將圖片上傳並儲存至imagesUrl(多圖用)
    uploadPost (files) {
      // if (!files) {
      //   return
      // }
      const formData = new FormData()
      formData.append('file-to-upload', files)

      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`
      this.$http.post(api, formData)
        .then((res) => {
          if (res.data.success) {
            if (Array.isArray(this.tempProduct.imagesUrl)) {
              this.tempProduct.imagesUrl.push(res.data.imageUrl)
              console.log(this.tempProduct.imagesUrl)
              console.log(this.tempProduct.imagesUrl.length)
              console.log('是陣列')
            } else {
              console.log('不是陣列')
            }
          } else {
            console.log('不是陣列')
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },

    // 等待所有圖上傳完後再回傳訊息
    uploadFiles () {
      const files = this.$refs.filesInput_1.files
      Array.from(files).forEach((files) => {
        this.uploadPost(files) // 呼叫 uploadPost 方法來處理單個文件
      })
      // const uploadPromises = Array.from(files).map(file => {
      //   return this.uploadPost(file) // 呼叫 uploadPost 來處理單個檔案
      // })

      // 等待所有檔案上傳完畢
      Promise.all(files)
        .then(() => {
          this.uploadInProgress = false // 上傳完成
          console.log('所有檔案已上傳完畢')
        })
        .catch((error) => {
          this.uploadInProgress = false // 上傳失敗
          console.log('某些檔案上傳失敗:', error)
        })
      // if (!file1 && !file2) {
      //   alert('請選擇檔案')
      //   return
      // }
      // ↓即使其中一個內容不存在，也回報成功，使then可運行
      // const upload1 = file1 ? this.uploadPost(file1) : Promise.resolve('not file1')
      // const upload2 = file2 ? this.uploadPost(file2) : Promise.resolve('not file2')

    //   Promise.all([
    //     upload1,
    //     upload2
    //   ])
    //     .then((res) => {
    //       alert('上傳成功')
    //       this.clearInput(this.$refs.filesInput1)
    //       this.clearInput(this.$refs.filesInput2)
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //     })
    }
  },

  mixins: [modalMixin]
}
</script>

<!-- 根據錯誤信息 this.tempProduct.imagesUrl.push is not a function，可以推測 this.tempProduct.imagesUrl 可能沒有被初始化為一個陣列或被覆蓋為其他類型。

要解決這個問題，首先確保 this.tempProduct.imagesUrl 是一個陣列，並且在使用 .push() 方法之前，它的類型確實是陣列。 -->
