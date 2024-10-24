<template>
  <div>
    <div class="space-intro">
      <div class="container">
        <div class="row">
          <div class="col-md-3 col-12 mb-2">
            <ul class="nav flex-md-column justify-content-center flex-row w-100 mb-3">
              <li class="nav-item w-auto">
                <router-link class="nav-link active" to="/account/update">Account</router-link>
              </li>
              <li class="nav-item w-auto">
                <router-link class="nav-link" to="/account/payment/setting">Payment Setting</router-link>
              </li>
              <li class="nav-item w-auto">
                <a class="nav-link" href="#">Setting</a>
              </li>
            </ul>
          </div>

          <div class="col-9 mb-5 max-screen-mobile">
            <!-- Profile picture card-->
            <div class="card mb-4">
              <div class="card-header">Profile Picture</div>
              <div class="card-body text-center">
                <!-- Profile picture image-->
                <img
                  class="img-account-profile rounded-circle mb-2"
                  width="120"
                  height="120"
                  :src="displayUserImage(form.id, form.photo)"
                  id="myPhoto"
                  alt=""
                />
                <!-- Profile picture help block-->
                <div class="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                <!-- Profile picture upload button-->
                <input
                  type="file"
                  class="d-none"
                  @change="inputFile"
                  id="input_upload"
                  accept="image/png, image/jpg, image/jpeg"
                />

                <template v-if="form.boolUpload">
                  <button class="btn btn-primary bg-gradient" @click="uploadTriggerInput" type="button">
                    Upload Image
                  </button>
                </template>

                <template v-else>
                  <button class="btn btn-danger me-2" type="button" @click="cancelUpload">Cancel</button>
                  <button class="btn btn-primary" type="button" @click="uploadImage">Upload</button>
                </template>
              </div>
            </div>

            <!-- Account details card-->
            <div class="card mb-4">
              <div class="card-header">Account Details</div>
              <div class="card-body">
                <form>
                  <!-- Form Group (username)-->

                  <!-- Form Row-->
                  <div class="row gx-3 mb-3">
                    <!-- Form Group (first name)-->
                    <div class="col-md-6">
                      <label class="small mb-1" for="inputFirstName">First name</label>
                      <input
                        class="form-control"
                        type="text"
                        v-model="form.first_name"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <!-- Form Group (last name)-->
                    <div class="col-md-6">
                      <label class="small mb-1" for="inputLastName">Last name</label>
                      <input
                        class="form-control"
                        v-model="form.last_name"
                        type="text"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  <!-- Form Group (email address)-->
                  <div class="mb-3">
                    <label class="small mb-1" for="inputEmailAddress">Email address</label>
                    <input
                      class="form-control"
                      v-model="form.email"
                      type="email"
                      placeholder="Enter your email address"
                      disabled
                    />
                  </div>
                  <!-- Form Row-->
                  <div class="row gx-3 mb-3">
                    <!-- Form Group (phone number)-->
                    <div class="col-md-6">
                      <label class="small mb-1" for="inputPhone">Phone number</label>
                      <input
                        class="form-control"
                        type="text"
                        v-model="form.contact"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <!-- Form Group (birthday)-->
                    <div class="col-md-6">
                      <label class="small mb-1" for="inputBirthday">Birthday</label>
                      <input class="form-control" v-model="form.birthday" type="date" />
                    </div>
                  </div>

                  <div class="mb-3">
                    <label class="small mb-1" for="inputUsername">Address</label>
                    <input class="form-control" type="text" v-model="form.address" placeholder="Enter your Address" />
                  </div>

                  <!-- Save changes button-->
                  <button class="btn btn-primary bg-gradient mt-2" @click="updateProfile" type="button">
                    Save changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { userStore } from "../stores/userStore";

const form = ref({
  id: "",
  first_name: "",
  last_name: "",
  birthday: "",
  contact: "",
  address: "",
  email: "",
  file: "",
  boolUpload: true,
  photo: "",
});

const user = ref();
const error = ref({
  birthday: "",
  first_name: "",
  last_name: "",
  contact: "",
});

const displayUserImage = (id, img) => {
  return `${import.meta.env.VITE_API_URL}/storage/users/${id}/images/${img}`;
};

const updateProfile = (e) => {
  e.target.setAttribute("disabled", true);
  const AuthStr = "Bearer ".concat(userStore().access_token);
  axios({
    method: "post",
    params: {
      username: form.value.username,
      first_name: form.value.first_name,
      last_name: form.value.last_name,
      birthday: form.value.birthday,
      contact: form.value.contact,
      address: form.value.address,
    },
    url: `/api/account/update`,
    headers: { Authorization: AuthStr },
  })
    .then((res) => {
      e.target.removeAttribute("disabled");
    })
    .catch((err) => {});
};

//     // trigger the input file
const uploadTriggerInput = () => {
  var elem = document.getElementById("input_upload");
  if (elem && document.createEvent) {
    var evt = document.createEvent("MouseEvents");
    evt.initEvent("click", true, false);
    elem.dispatchEvent(evt);
  }
};

const inputFile = (e) => {
  form.value.file = e.target.files[0] || e.dataTransfer.files[0];
  if (form.value.file) {
    form.value.boolUpload = false;
    // this.previewImage(this.form.file);
    document.getElementById("myPhoto").src = URL.createObjectURL(form.value.file);
  }
};

const cancelUpload = () => {
  form.value.file = null;
  form.value.boolUpload = true;
  document.getElementById("myPhoto").src = form.value.photo;
};

const uploadImage = () => {
  const formData = new FormData();
  formData.set("image", form.value.file);
  const AuthStr = "Bearer ".concat(userStore().access_token);

  axios
    .post("/api/account/update/image", formData, {
      headers: { Authorization: AuthStr },
    })
    .then((res) => {
      form.value.boolUpload = true;
      // mutate user profile imaage
    })
    .catch((error) => {});
};

const getAuthUserDetails = () => {
  const AuthStr = "Bearer ".concat(userStore().access_token);
  axios({
    method: "get",
    url: `/api/account`,
    headers: { Authorization: AuthStr },
  })
    .then((res) => {
      user.value = res.data;
      form.value.id = res.data.id;
      form.value.first_name = res.data.first_name;
      form.value.last_name = res.data.last_name;
      form.value.email = res.data.email;
      form.value.address = res.data.address;
      form.value.contact = res.data.contact;
      form.value.birthday = res.data.birthday;
      form.value.photo = res.data.profile_img
        ? res.data.profile_img
        : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
    })
    .catch((err) => {});
};

onMounted(() => {
  getAuthUserDetails();
});
</script>

<style scoped>
.nav-link:hover {
  background: #f7f7f7;
}

.container {
  max-width: 1024px;
}

@media (max-width: 576px) {
  .max-screen-mobile {
    width: 100% !important;
  }
}

.space-intro {
  margin-top: 80px;
}
</style>
