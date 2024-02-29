<template>
    <div>
        <div class="space-intro">
            <div class="container mt-4">
                <div class="row">
                    <div class="col-3">
                        <ul class="nav flex-column">
                            <li class="nav-item">
                                <router-link class="nav-link active" to="/account/update">Account</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link class="nav-link" to="/account/payment/setting">Payment Setting</router-link>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Setting</a>
                            </li>
                        </ul>
                    </div>

                    <div class="col-9">
                        <!-- Profile picture card-->
                        <div class="card mb-4">
                            <div class="card-header">Profile Picture</div>
                            <div class="card-body text-center">
                                <!-- Profile picture image-->
                                <img
                                    class="img-account-profile rounded-circle mb-2"
                                    width="120"
                                    height="120"
                                    :src="form.photo"
                                    id="myPhoto"
                                    alt=""
                                />
                                <!-- Profile picture help block-->
                                <div class="small font-italic text-muted mb-4">
                                    JPG or PNG no larger than 5 MB
                                </div>
                                <!-- Profile picture upload button-->
                                <input
                                    type="file"
                                    class="d-none"
                                    @change="inputFile"
                                    id="input_upload"
                                    accept="image/png, image/jpg, image/jpeg"
                                />

                                <template v-if="form.boolUpload">
                                    <button
                                        class="btn btn-primary bg-gradient"
                                        @click="uploadTriggerInput"
                                        type="button"
                                    >
                                        Upload Image
                                    </button>
                                </template>

                                <template v-else>
                                    <button
                                        class="btn btn-danger me-2"
                                        type="button"
                                        @click="cancelUpload"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        class="btn btn-primary"
                                        type="button"
                                        @click="uploadImage"
                                    >
                                        Upload
                                    </button>
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
                                            <label
                                                class="small mb-1"
                                                for="inputFirstName"
                                                >First name</label
                                            >
                                            <input
                                                class="form-control"
                                                type="text"
                                                v-model="form.first_name"
                                                placeholder="Enter your first name"
                                            />
                                        </div>
                                        <!-- Form Group (last name)-->
                                        <div class="col-md-6">
                                            <label
                                                class="small mb-1"
                                                for="inputLastName"
                                                >Last name</label
                                            >
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
                                        <label
                                            class="small mb-1"
                                            for="inputEmailAddress"
                                            >Email address</label
                                        >
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
                                            <label
                                                class="small mb-1"
                                                for="inputPhone"
                                                >Phone number</label
                                            >
                                            <input
                                                class="form-control"
                                                type="text"
                                                v-model="form.contact"
                                                placeholder="Enter your phone number"
                                            />
                                        </div>
                                        <!-- Form Group (birthday)-->
                                        <div class="col-md-6">
                                            <label
                                                class="small mb-1"
                                                for="inputBirthday"
                                                >Birthday</label
                                            >
                                            <input
                                                class="form-control"
                                                v-model="form.birthday"
                                                type="date"
                                            />
                                        </div>
                                    </div>

                                    <div class="mb-3">
                                        <label
                                            class="small mb-1"
                                            for="inputUsername"
                                            >Address</label
                                        >
                                        <input
                                            class="form-control"
                                            type="text"
                                            v-model="form.address"
                                            placeholder="Enter your Address"
                                        />
                                    </div>

                                    <!-- Save changes button-->
                                    <button
                                        class="btn btn-primary bg-gradient mt-2"
                                        @click="updateProfile"
                                        type="button"
                                    >
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
<script>
import { userStore } from "../stores/userStore";

export default {
    data() {
        return {
            form: {
                first_name: "",
                last_name: "",
                birthday: "",
                contact: "",
                address: "",
                email: "",
                file: "",
                boolUpload: true,
                photo: "",
            },
            user: "",
            error: {
                birthday: "",
                first_name: "",
                last_name: "",
                contact: "",
            },
        };
    },
    components: {},

    props: [],

    computed: {
        currentUser() {
            return userStore().user;
        },

        // getProfilePicture() {
        //   return "/storage/user/" + this.user.id + "/img/" + this.user.profile_img;
        // },
    },

    methods: {
        updateProfile(e) {
            e.target.setAttribute("disabled", true);
            const AuthStr = "Bearer ".concat(userStore().access_token);
            axios({
                method: "post",
                params: {
                    username: this.form.username,
                    first_name: this.form.first_name,
                    last_name: this.form.last_name,
                    birthday: this.form.birthday,
                    contact: this.form.contact,
                    address: this.form.address,
                },
                url: `/api/account/update`,
                headers: { Authorization: AuthStr },
            })
                .then((res) => {
                    e.target.removeAttribute("disabled");
                })
                .catch((err) => {});
        },

        // trigger the input file
        uploadTriggerInput() {
            var elem = document.getElementById("input_upload");
            if (elem && document.createEvent) {
                var evt = document.createEvent("MouseEvents");
                evt.initEvent("click", true, false);
                elem.dispatchEvent(evt);
            }
        },

        inputFile(e) {
            this.form.file = e.target.files[0] || e.dataTransfer.files[0];
            if (this.form.file) {
                this.form.boolUpload = false;
                // this.previewImage(this.form.file);
                document.getElementById("myPhoto").src = URL.createObjectURL(
                    this.form.file
                );
            }
        },

        cancelUpload() {
            this.form.file = null;
            this.form.boolUpload = true;
            document.getElementById("myPhoto").src = this.form.photo;
        },

        uploadImage() {
            const formData = new FormData();
            formData.set("image", this.form.file);
            const AuthStr = "Bearer ".concat(userStore().access_token);

            axios
                .post("/api/account/update/image", formData, {
                    headers: { Authorization: AuthStr },
                })
                .then((res) => {
                    this.form.boolUpload = true;
                    // mutate user profile imaage
                })
                .catch((error) => {});
        },

        getAuthUserDetails() {
            const AuthStr = "Bearer ".concat(userStore().access_token);
            axios({
                method: "get",
                url: `/api/account`,
                headers: { Authorization: AuthStr },
            })
                .then((res) => {
                    this.user = res.data;
                    this.form.first_name = res.data.first_name;
                    this.form.last_name = res.data.last_name;
                    this.form.email = res.data.email;
                    this.form.address = res.data.address;
                    this.form.contact = res.data.contact;
                    this.form.birthday = res.data.birthday;
                    this.form.photo = res.data.profile_img
                        ? res.data.image_url
                        : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
                })
                .catch((err) => {});
        },
    },

    // watch: {
    //       $data: {
    //           handler: function(val, oldVal) {
    //               console.log('watcher: ',val);
    //           },
    //           deep: true
    //       },

    //       $props: {
    //           handler: function(val, oldVal) {
    //               console.log('watcher: ',val);
    //           },
    //           deep: true
    //       },
    //       some_prop: function() {
    //           //do something if some_prop updated
    //       },
    //   },

    updated() {},

    mounted() {
        this.getAuthUserDetails();
    },
};
</script>

<style scoped>
.nav-link:hover {
  background: #f7f7f7;
}

.container {
  max-width: 1024px;
}

</style>