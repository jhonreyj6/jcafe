<template>
  <div class="space-intro">
    <div class="container d-flex flex-column">
      <div class="row align-items-center justify-content-center">
        <div class="col-sm-12 col-md-10 col-lg-6 col-xl-5">
          <div class="card shadow-sm">
            <div class="card-body">
              <div class="mb-4">
                <h5>Enter new password</h5>
              </div>
              <form @submit.prevent="changePass">
                <div class="mb-3">
                  <label for="pass" class="form-label">Password:</label>
                  <input
                    type="password"
                    class="form-control"
                    id="pass"
                    placeholder="New Password"
                    v-model="form.password"
                  />
                </div>
                <div class="mb-3">
                  <label for="cpass" class="form-label">Confrim Password:</label>
                  <input
                    type="password"
                    class="form-control"
                    id="cpass"
                    placeholder="Repeat password"
                    v-model="form.confirm_password"
                  />
                </div>
                <div class="mb-3 d-grid">
                  <button type="submit" class="btn btn-primary">Change Password</button>
                </div>
                <span>Don't have an account? <router-link to="/register">Click here to register.</router-link></span>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const token = ref();
const form = ref({
  password: "",
  confirm_password: "",
});

const route = useRoute();

const changePass = () => {
  axios({
    method: "patch",
    params: {
      password: form.value.password,
      confirm_password: form.value.confirm_password,
      access_token: token.value,
    },
    url: `/api/reset/password`,
  })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err.response.data.message);
    });
};

onMounted(() => {
  axios({
    method: "get",
    url: `/api/reset/password/${route.query.access_token}`,
  })
    .then((res) => {
      token.value = res.data;
    })
    .catch((err) => {});
});
</script>

<style scoped></style>
