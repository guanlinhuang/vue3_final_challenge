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
              <div class="imageUrl">
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
                  </label>
                  <input
                    type="file"
                    id="customFile"
                    class="form-control"
                    ref="fileInput"
                    @change="uploadFile"
                  />
                </div>
                <div
                  v-if="tempProduct.imageUrl"
                  class="mb-5"
                  style="width: 100%; height: 500px"
                >
                  <img
                    class="w-100 h-100 object-fit-cover"
                    :src="tempProduct.imageUrl"
                    :alt="tempProduct.title"
                  />
                </div>
              </div>
              <div class="imagesUrl">
                <div class="mb-3">
                  <label for="customFile_1" class="form-label"
                    >上傳其他圖片<i class="fas fa-spinner fa-spin"></i
                  ></label>
                  <input
                    type="file"
                    id="customFile_1"
                    class="form-control"
                    multiple
                    @change="uploadFiles"
                    ref="filesInput_1"
                  />
                </div>
                <div
                  class="row my-1"
                  v-for="(item, key) in tempProduct.imagesUrl"
                  :key="key"
                >
                  <div class="col-2 d-flex align-items-center">
                    <button
                      type="button"
                      class="btn btn-outline-danger"
                      @click="tempProduct.imagesUrl.splice(key, 1)"
                    >
                      <i class="bi bi-x-lg"></i>
                    </button>
                  </div>
                  <div class="col-10 ps-0">
                    <img class="img-fluid" :src="item" :alt="item" />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-6 mt-4 mt-lg-0">
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
                  rows="6"
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
                  rows="6"
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
        <div class="modal-footer row">
          <div class="col col-lg-3 pe-0">
            <button
              type="button"
              class="btnHover me-lg-1 w-100"
              data-bs-dismiss="modal"
            >
              <div>
                <span>取消編輯</span>
                <span>取消編輯</span>
              </div>
            </button>
          </div>
          <div class="col col-lg-3 ps-0">
            <button
              type="button"
              class="btnHover btnHover5 me-lg-1 w-100"
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
  </div>
</template>

<script>
import modalMixin from "@/mixins/modalMixin";

export default {
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  watch: {
    product(value) {
      this.tempProduct = {
        imagesUrl: [], // => 當 value 沒有 imagesUrl，使用  imagesUrl: []
        ...value, // 當  value 有 imagesUrl ，value 的 imagesUrl 會覆蓋掉前面的   imagesUrl: []
      };
    },
  },
  data() {
    return {
      modal: {},
      tempProduct: {},
    };
  },
  methods: {
    uploadFile() {
      const uploadedFile = this.$refs.fileInput.files[0];
      const formData = new FormData();
      formData.append("file-to-upl", uploadedFile);
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`;
      this.$http.post(url, formData).then((response) => {
        if (response.data.success) {
          this.tempProduct.imageUrl = response.data.imageUrl; // 儲存主要圖片imageUrl
        }
      });
    },

    // 將多張圖片一次上傳並儲存至imagesUrl
    uploadFiles() {
      const files = this.$refs.filesInput_1.files;
      Array.from(files).forEach((files) => {
        const formData = new FormData();
        formData.append("file-to-upload", files);

        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`;
        this.$http
          .post(api, formData)
          .then((res) => {
            if (res.data.success) {
              this.tempProduct.imagesUrl.push(res.data.imageUrl);
            }
          })
          .catch(() => {
            alert("上傳失敗，請稍後再試");
          });
      });
    },
  },

  mixins: [modalMixin],
};
</script>

<!-- 根據錯誤信息 this.tempProduct.imagesUrl.push is not a function，可以推測 this.tempProduct.imagesUrl 可能沒有被初始化為一個陣列或被覆蓋為其他類型。

要解決這個問題，首先確保 this.tempProduct.imagesUrl 是一個陣列，並且在使用 .push() 方法之前，它的類型確實是陣列。 -->
