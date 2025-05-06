<template>
  <div class="backstage_bg">
    <div class="container pt-5 vh-100">
      <Form
        class="row justify-content-center"
        v-slot="{ errors }"
        @submit="signIn"
      >
        <div class="col-md-4">
          <h1 class="text-center my-5">管理員後台</h1>
          <div class="mb-3 mx-4 mx-sm-0">
            <label for="email" class="form-label">Email:&ensp;</label>
            <Field
              id="email"
              name="email"
              type="email"
              class="form-control"
              :class="{ 'is-invalid': errors['email'] }"
              placeholder="請輸入 Email"
              rules="email|required"
              v-model="user.username"
            ></Field>
            <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="mb-3 mx-4 mx-sm-0">
            <label for="password" class="form-label">Password:&ensp;</label>
            <Field
              id="password"
              name="password"
              type="password"
              class="form-control"
              :class="{ 'is-invalid': errors['password'] }"
              placeholder="請輸入 Password"
              rules="required"
              v-model="user.password"
            ></Field>
            <ErrorMessage
              name="password"
              class="invalid-feedback"
            ></ErrorMessage>
          </div>
          <div class="text-center mt-4">
            <button
              class="btnHover btnHover6 btn btn-outline-dark"
              type="submit"
            >
              <div>
                <span>登入 </span>
                <span>登入</span>
              </div>
            </button>
          </div>
        </div>
      </Form>
    </div>
    <ToastMessages />
  </div>
</template>

<script>
import emitter from "@/methods/emitter";
import ToastMessages from "@/components/ToastMessages.vue";
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  components: {
    ToastMessages,
  },
  provide() {
    return {
      emitter,
    };
  },
  methods: {
    signIn() {
      const api = `${process.env.VUE_APP_API}admin/signin`;
      this.$http
        .post(api, this.user)
        .then((res) => {
          if (res.data.success) {
            const { token, expired } = res.data;
            document.cookie = `hexToken=${token};expires=${new Date(
              expired
            )}; path=/`;
            this.$http.defaults.headers.common.Authorization = token;
            this.$httpMessageState(res, "登入");
            this.$router.push("/dashboard/products");
          } else {
            this.$httpMessageState(res, "登入");
          }
        })
        .catch((error) => {
          this.$httpMessageState(error, "連線錯誤");
        });
    },
  },
};
</script>
