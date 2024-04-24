<template>
    <div>
        <div class="container space-intro">
            <div class="row d-flex">
                <div class="col-lg-8">
                    <div>
                        <Post :datas="posts" />
                    </div>
                </div>

                <div class="col-lg-4">
                    <Ads />
                </div>
            </div>
        </div>

        <!-- <div
            class="modal fade"
            id="editModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">
                            Edit Post
                        </h1>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body">
                        <div class="card mb-4">
                            <div class="card-body">
                                <div class="d-flex flex-column mb-2 rounded">
                                    <div
                                        class="flex-fill div-like-pre p-2 min-100"
                                        contenteditable="true"
                                        @keyup="updateEditPostMessage"
                                    >
                                        {{ edit_post.data.message }}
                                    </div>
                                </div>

                                <div
                                    :class="
                                        edit_post.data.get_attach_files
                                            ? 'd-flex'
                                            : 'd-none'
                                    "
                                >
                                    <div class="flex-fill">
                                        <div class="d-flex">
                                            <div
                                                class="card w-25 position-relative dropbox me-2"
                                                v-for="file in edit_post.data
                                                    .get_attach_files"
                                                :key="file.id"
                                            >
                                                <img
                                                    :src="
                                                        computedPostFile(
                                                            file.file_link
                                                        )
                                                    "
                                                    class="w-100"
                                                    v-if="
                                                        getFileFormat(
                                                            file.file_link
                                                        ) == 'jpg' ||
                                                        getFileFormat(
                                                            file.file_link
                                                        ) == 'jpeg' ||
                                                        getFileFormat(
                                                            file.file_link
                                                        ) == 'png'
                                                    "
                                                    height="150"
                                                />
                                                <video
                                                    class="w-100 bg-dark"
                                                    v-else
                                                    controls
                                                    height="170"
                                                >
                                                    <source
                                                        :src="
                                                            computedPostFile(
                                                                file.file_link
                                                            )
                                                        "
                                                        type="video/mp4"
                                                    />
                                                </video>

                                                <div
                                                    class="position-absolute img_attach_remove"
                                                >
                                                    <button
                                                        class="btn btn-close border bg-primary"
                                                        @click="
                                                            removeAttachInEditPost(
                                                                file
                                                            )
                                                        "
                                                    ></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-secondary bg-gradient"
                            data-bs-dismiss="modal"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            class="btn btn-primary"
                            data-bs-dismiss="modal"
                            @click="updatePost"
                        >
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script setup>
import Post from "../components/Post.vue";
import { userStore } from "../stores/userStore";
import Ads from "../components/Ads.vue";
import { onBeforeMount, onMounted, ref } from "vue";

const posts = ref([]);
// const edit_post = ref({
//     attachment_remove: [],
//     data: "",
//     message: "",
// });

const post = ref({
    currentPage: 1,
    timeout: 0,
    collection: [],
});

const getPost = () => {
    if (userStore().user && post.value.currentPage) {
        const AuthStr = "Bearer ".concat(userStore().access_token);
        return new Promise((resolve, reject) => {
            axios({
                method: "get",
                url: `/api/posts?page=${post.value.currentPage}`,
                headers: { Authorization: AuthStr },
            })
                .then((res) => {
                    post.value.timeout = 1;
                    if (post.value.currentPage == 1) {
                        posts.value = res.data;
                        resolve(
                            res.data.data.forEach((data) => {
                                post.value.collection.push(data.id);
                            })
                        );
                    } else {
                        resolve(
                            res.data.data.forEach((data) => {
                                if (!post.value.collection.includes(data.id)) {
                                    posts.value.data.push(data);
                                    post.value.collection.push(data.id);
                                }
                            })
                        );
                    }
                })
                .catch((err) => {
                    console.log(err.response);
                    reject(err);
                });
        });
    }
};

const handleScroll = (event) => {
    if (
        window.scrollY + 200 >
        document.documentElement.scrollHeight -
            document.documentElement.clientHeight
    ) {
        if (
            posts.value.last_page != post.value.currentPage &&
            post.value.timeout
        ) {
            post.value.timeout = 0;
            post.value.currentPage++;
            getPost();
        }
    }
};

onMounted(() => {
    getPost();
});

onBeforeMount(() => {
    window.addEventListener("scroll", handleScroll);
});

// export default {
//     name: "Dashboard",
//     data() {
//         return {
//             image: [],
//             attach_exist: false,
//             attach: {
//                 files: [],
//                 file_type: [],
//             },
//             form_data: "",
//             posts: "",
//             edit_post: {
//                 attachment_remove: [],
//                 data: "",
//                 message: "",
//             },
//             post: {
//                 currentPage: 1,
//                 timeout: 0,
//                 collection: [],
//             },
//         };
//     },

//     components: {
//         Post,
//         Ads,
//     },

//     props: {},

//     computed: {
//         // currentUser() {
//         //   return this.$store.getters.currentUser;
//         // },
//     },

//     methods: {
//         getFileFormat(fileName) {
//             var re = /(?:\.([^.]+))?$/;
//             var ext = re.exec(fileName)[1];
//             return ext.trim();
//         },

//         uploadTriggerInput(e) {
//             var elem = this.$refs.input_upload;
//             if (elem && document.createEvent) {
//                 var evt = document.createEvent("MouseEvents");
//                 evt.initEvent("click", true, false);
//                 elem.dispatchEvent(evt);
//             }
//         },

//         inputTriggerButton(id) {
//             document.getElementById(id).click();
//         },

//         createPost(e) {
//             if (document.getElementById("editable").innerText.length > 1000) {
//                 this.$parent.notification.message.push(
//                     "Message is too long. Only 1000 characters allow"
//                 );
//                 return false;
//             }

//             if (
//                 document.getElementById("editable").innerText.length ||
//                 this.form_data
//             ) {
//                 e.target.setAttribute("disabled", true);
//                 const AuthStr = "Bearer ".concat(userStore().access_token);
//                 axios({
//                     method: "POST",
//                     params: {
//                         message: document.getElementById("editable").innerText,
//                         files: this.form_data,
//                     },
//                     data: this.form_data,
//                     url: `/api/posts`,
//                     headers: {
//                         Authorization: AuthStr,
//                     },
//                 })
//                     .then((res) => {
//                         e.target.removeAttribute("disabled");
//                         this.attach_exist = false;
//                         this.form_data = "";
//                         document.getElementById("editable").innerHTML = "";
//                         this.posts = res.data;
//                         this.post.currentPage = 1;
//                     })
//                     .catch((err) => {
//                         e.target.removeAttribute("disabled");
//                     });
//             }
//         },

//         attachFile(e) {
//             if (this.$refs.input_upload.files.length <= 6) {
//                 this.attach_exist = true;
//                 this.attach.files = [];
//                 this.attach.file_type = [];
//                 let formData = new FormData();
//                 for (
//                     let index = 0;
//                     index < this.$refs.input_upload.files.length;
//                     index++
//                 ) {
//                     this.attach.files.push(
//                         URL.createObjectURL(
//                             this.$refs.input_upload.files[index]
//                         )
//                     );
//                     this.attach.file_type.push(
//                         this.$refs.input_upload.files[index].type
//                     );
//                     formData.append(
//                         "files[]",
//                         this.$refs.input_upload.files[index]
//                     );
//                 }
//                 this.form_data = formData;
//             } else {
//                 this.$parent.notification.message.push(
//                     "Too many files!. Only 6 files can be uploaded."
//                 );
//             }
//         },

//         removeAttachInPost(file) {
//             var exist = this.attach.files.indexOf(file);
//             if (exist > -1) {
//                 this.attach.files.splice(exist, 1);
//                 this.attach.file_type.splice(exist, 1);
//             }
//         },

//         updatePost() {
//             const AuthStr = "Bearer ".concat(userStore().access_token);
//             axios({
//                 method: "patch",
//                 params: {
//                     id: this.edit_post.data.id,
//                     message: this.edit_post.message,
//                     files: this.edit_post.attachment_remove,
//                 },
//                 url: `/api/posts`,
//                 headers: { Authorization: AuthStr },
//             })
//                 .then((res) => {
//                     document.getElementById(
//                         `post_message_${this.edit_post.data.id}`
//                     ).innerText = this.edit_post.message;
//                 })
//                 .catch((err) => {});
//         },

//         updateEditPostMessage(e) {
//             this.edit_post.message = e.target.innerText;
//         },

//         removeAttachInEditPost(file) {
//             this.edit_post.attachment_remove.push(file.id);
//             this.edit_post.data.get_attach_files.forEach((elem, index) => {
//                 if (elem.id == file.id) {
//                     this.edit_post.data.get_attach_files.splice(index, 1);
//                 }
//             });
//         },

//         computedPostFile(file_link) {
//             return `/storage/post/file/${file_link}`;
//         },

//         getPost() {
//             if (userStore().user && this.post.currentPage) {
//                 const AuthStr = "Bearer ".concat(userStore().access_token);
//                 return new Promise((resolve, reject) => {
//                     axios({
//                         method: "get",
//                         url: `/api/posts?page=${this.post.currentPage}`,
//                         headers: { Authorization: AuthStr },
//                     })
//                         .then((res) => {
//                             this.post.timeout = 1;
//                             if (this.post.currentPage == 1) {
//                                 this.posts = res.data;
//                                 resolve(
//                                     res.data.data.forEach((data) => {
//                                         this.post.collection.push(data.id);
//                                     })
//                                 );
//                             } else {
//                                 resolve(
//                                     res.data.data.forEach((data) => {
//                                         if (
//                                             !this.post.collection.includes(
//                                                 data.id
//                                             )
//                                         ) {
//                                             this.posts.data.push(data);
//                                             this.post.collection.push(data.id);
//                                         }
//                                     })
//                                 );
//                             }
//                         })
//                         .catch((err) => {
//                             console.log(err.response);
//                             reject(err);
//                         });
//                 });
//             }
//         },

//         handleScroll(event) {
//             if (
//                 window.scrollY + 200 >
//                 document.documentElement.scrollHeight -
//                     document.documentElement.clientHeight
//             ) {
//                 if (
//                     this.posts.last_page != this.post.currentPage &&
//                     this.post.timeout
//                 ) {
//                     this.post.timeout = 0;
//                     this.post.currentPage++;
//                     this.getPost();
//                 }
//             }
//         },
//     },

//     // watch: {
//     //   $data: {
//     //     handler: function (val, oldVal) {
//     //       console.log("watcher: ", val);
//     //     },
//     //     deep: true,
//     //   },
//     // },

//     created() {
//         window.addEventListener("scroll", this.handleScroll);
//     },

//     updated() {},

//     beforeMount() {},

//     mounted() {
//         this.getPost();
//     },
// };
</script>

<style scoped>
.min-100 {
    min-height: 100px;
}

.dropbox {
    height: 150px;
}

.img_attach_remove {
    right: 0%;
    top: 0%;
    color: #ffffff;
}

.center {
    top: 40% !important;
    left: 42% !important;
}
</style>


