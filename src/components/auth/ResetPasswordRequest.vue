<template>
  <div class="space-intro">
    <div class="container d-flex flex-column">
      <div class="row align-items-center justify-content-center">
        <div class="col-sm-12 col-md-10 col-lg-6 col-xl-5">
          <div class="card shadow-sm">
            <div class="card-body">
              <div class="mb-4">
                <h5>Forgot Password?</h5>
                <p class="mb-2">Enter your registered email ID to reset the password</p>
              </div>
              <form @submit="resetPassword">
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input
                    type="email"
                    class="form-control"
                    placeholder="Enter Your Email"
                    required
                    v-model="email"
                    autocomplete="on"
                  />
                </div>
                <div class="mb-3 d-grid">
                  <button type="submit" ref="reset_btn" class="btn btn-primary">Reset Password</button>
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
<script>
import { ref } from "vue";

const email = ref("");

const resetPassword = (e) => {
  e.preventDefault();
  axios({
    method: "post",
    url: "/api/reset/password/request",
    data: {
      email: email.value,
    },
  })
    .then(function (res) {})
    .catch(function (err) {
      console.log(err.response.data.message);
    });
};
</script>

<style scoped></style>
