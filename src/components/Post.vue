<template>
    <div>
        <div
            class="card mb-3"
            v-for="(data, index) in props.datas.data"
            :key="index"
        >
            <div class="d-flex p-2 px-3">
                <div class="d-flex flex-row align-items-center">
                    <img
                        :src="computedUserAvatar(data)"
                        height="50"
                        width="50"
                    />
                    <div class="d-flex flex-column ms-2">
                        <span class="font-weight-bold"
                            >{{ data.get_user_details.first_name }}
                            {{ data.get_user_details.last_name }}
                        </span>
                        <small class="text-mute">{{ data.created_time }}</small>
                    </div>
                </div>
            </div>

            <div class="px-3 mb-2">
                <div class="text-justify" :id="`post_message_${data.id}`">
                    {{ data.message }}
                </div>
            </div>

            <div v-if="$route.path == '/dashboard'">
                <div v-if="data.get_post_attachment_images.length == 1">
                    <div
                        class="w-100"
                        v-for="(file, index) in data.get_post_attachment_images"
                        :key="index"
                    >
                        <router-link :to="`/post/${data.id}?item=${index}`">
                            <img
                                v-if="
                                    file.file_type == 'png' ||
                                    file.file_type == 'jpg' ||
                                    !file.file_type
                                "
                                :src="file.image_url"
                                class="w-100"
                                height="350"
                            />
                            <video v-else class="w-100 h-100" controls>
                                <source
                                    :src="file.image_url"
                                    :type="`video/${file.file_type}`"
                                />
                            </video>
                        </router-link>
                    </div>
                </div>

                <div
                    class="d-inline-flex w-100"
                    v-if="data.get_post_attachment_images.length == 2"
                >
                    <div
                        class="w-50 bg-dark"
                        v-for="(file, index) in data.get_post_attachment_images"
                        :key="index"
                    >
                        <router-link :to="`/post/${data.id}?item=${index}`">
                            <img
                                v-if="
                                    file.file_type == 'png' ||
                                    file.file_type == 'jpg' ||
                                    !file.file_type
                                "
                                :src="file.image_url"
                                class="w-100"
                                height="320"
                            />
                            <video v-else class="w-100 h-100" controls>
                                <source
                                    :src="file.image_url"
                                    :type="`video/${file.file_type}`"
                                />
                            </video>
                        </router-link>
                    </div>
                </div>

                <div v-if="data.get_post_attachment_images.length == 3">
                    <div class="row mx-0">
                        <div
                            :class="
                                index == 2 ? 'col-12 px-0' : 'col-md-6 px-0'
                            "
                            v-for="(
                                file, index
                            ) in data.get_post_attachment_images"
                            :key="index"
                        >
                            <div class="bg-dark h-100">
                                <router-link
                                    :to="`/post/${data.id}?item=${index}`"
                                >
                                    <img
                                        v-if="
                                            file.file_type == 'png' ||
                                            file.file_type == 'jpg' ||
                                            !file.file_type
                                        "
                                        :src="file.image_url"
                                        class="w-100"
                                        height="280"
                                    />
                                    <video v-else class="w-100 h-100" controls>
                                        <source
                                            :src="file.image_url"
                                            :type="`video/${file.file_type}`"
                                        />
                                    </video>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="data.get_post_attachment_images.length == 4">
                    <div class="row mx-0">
                        <div
                            class="col-md-6 px-0"
                            v-for="(
                                file, index
                            ) in data.get_post_attachment_images"
                            :key="index"
                        >
                            <div class="bg-dark h-100">
                                <router-link
                                    :to="`/post/${data.id}?item=${index}`"
                                >
                                    <img
                                        v-if="
                                            file.file_type == 'png' ||
                                            file.file_type == 'jpg' ||
                                            !file.file_type
                                        "
                                        :src="file.image_url"
                                        class="w-100"
                                        height="240"
                                    />
                                    <video v-else class="w-100 h-100" controls>
                                        <source
                                            :src="file.image_url"
                                            :type="`video/${file.file_type}`"
                                        />
                                    </video>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="data.get_post_attachment_images.length >= 5">
                    <div class="row mx-0">
                        <div
                            class="col-md-6 position-relative px-0"
                            v-show="index < 4"
                            v-for="(
                                file, index
                            ) in data.get_post_attachment_images"
                            :key="index"
                        >
                            <div class="bg-dark h-100">
                                <router-link
                                    :to="`/post/${data.id}?item=${index}`"
                                >
                                    <img
                                        v-if="
                                            file.file_type == 'png' ||
                                            file.file_type == 'jpg' ||
                                            !file.file_type
                                        "
                                        :class="index == 3 ? 'opacity-25' : ''"
                                        :src="file.image_url"
                                        class="w-100"
                                        height="240"
                                    />
                                    <video v-else class="w-100 h-100" controls>
                                        <source
                                            :src="file.image_url"
                                            :type="`video/${file.file_type}`"
                                        />
                                    </video>
                                    <div
                                        class="position-absolute end-50 top-50 text-white"
                                        v-if="index == 3"
                                    >
                                        <i class="fa fa-plus-square"></i>
                                    </div>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                class="card px-4 rounded-1 py-1 mx-3 mb-2"
                v-for="file in data.get_post_attachment_files"
                :key="file.id"
            >
                <div class="d-flex flex-row justify-content-between">
                    <div class="text-primary">
                        {{ file.name }}
                    </div>
                    <div class="text-primary">
                        <a role="button" @click="download(file)"
                            ><i class="fa fa-download"></i
                        ></a>
                    </div>
                </div>
            </div>

            <div class="px-2">
                <hr />
                <div class="btn-group d-flex mb-2" role="group">
                    <a
                        role="button"
                        class="btn btn-outline-secondary w-100"
                        :class="data.authLikes ? 'text-primary' : ''"
                        @click="likePost($event, data)"
                    >
                        <i class="fa fa-thumbs-up me-1"></i>
                        <span>Like</span>
                    </a>
                    <a
                        role="button"
                        class="btn btn-outline-secondary w-100"
                        @click="hideComments($event, data.id)"
                    >
                        <i class="fa fa-commenting-o me-1"></i>
                        <span>Comments</span>
                    </a>
                </div>

                <div class="d-flex">
                    <div v-if="data.get_likes.length">
                        <img src="/img/like.jpg" width="20" height="20" />
                        <span class="me-1">{{ data.get_likes.length }}</span>
                        <span v-if="data.get_likes.length > 1">Likes</span>
                        <span v-else>Like</span>
                    </div>

                    <div class="ms-auto">
                        <div class="dropdown dropdown-menu-end">
                            <a
                                href=""
                                class="dropdown-toggle"
                                data-bs-toggle="dropdown"
                                >Sort comments</a
                            >
                            <ul class="dropdown-menu">
                                <li>
                                    <a
                                        class="dropdown-item"
                                        @click="latestComments(data)"
                                        role="button"
                                        >Latest Comments</a
                                    >
                                </li>
                                <li>
                                    <a
                                        class="dropdown-item"
                                        @click="oldComments(data)"
                                        role="button"
                                        >Old Comments</a
                                    >
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <hr />
                <div class="comments">
                    <Comment
                        :post_id="data.id"
                        :sort="data_pass.sort"
                        :sort_id="data_pass.sort_id"
                        :display="data_pass.isShow"
                        :key="data.id"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import Comment from "./Comment.vue";
import { userStore } from "../stores/userStore";
import { ref } from "vue";

const props = defineProps(["datas"]);
const data_pass = ref({
    sort: "",
    sort_id: null,
    isShow: [],
});

const download = (data) => {
    const AuthStr = "Bearer ".concat(userStore().access_token);
    axios({
        method: "get",
        params: {
            id: data.id,
        },
        url: `/api/posts/attachment/download`,
        headers: { Authorization: AuthStr },
    })
        .then((res) => {
            window.open(res.data, "_blank").focus();
        })
        .catch((err) => {
            console.log(err.response.data.message);
        });
};

const hideComments = (e, post_id) => {
    if (data_pass.value.isShow.includes(post_id)) {
        e.target.classList.remove("text-primary");
        data_pass.value.isShow = data_pass.value.isShow.filter((data) => {
            return data !== post_id;
        });
    } else {
        e.target.classList.add("text-primary");
        data_pass.value.isShow.push(post_id);
    }
};

const computedUserAvatar = (data) => {
    if (data.get_user_details.profile_img) {
        return data.get_user_details.image_url;
    } else {
        return "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
    }
};

const likePost = (e, data) => {
    data.authLikes = !data.authLikes;

    const AuthStr = "Bearer ".concat(userStore().access_token);
    axios({
        method: "post",
        params: {
            id: data.id,
        },
        url: `/api/posts/${data.id}/like`,
        headers: { Authorization: AuthStr },
    })
        .then((res) => {
            if (res.data.message == "like") {
                data.get_likes.push(res.data.data);
            } else {
                data.get_likes.forEach((elem, index) => {
                    if (elem.user_id == userStore().user.id) {
                        data.get_likes.splice(index, 1);
                    }
                });
            }
        })
        .catch((err) => {});
};

const latestComments = (data) => {
    data_pass.value.sort = "latest";
    data_pass.value.sort_id = data.id;
};

const oldComments = (data) => {
    data_pass.value.sort = "oldest";
    data_pass.value.sort_id = data.id;
};

// export default {
//     data() {
//         return {
//             // datas: '',
//             data_pass: {
//                 sort: "",
//                 sort_id: null,
//                 isShow: [],
//             },
//         };
//     },
//     components: {
//         Comment,
//     },

//     props: ["datas"],

//     computed: {
//         currentUser() {
//             return userStore().user;
//         },
//     },

//     methods: {
//         download(data) {
//             const AuthStr = "Bearer ".concat(userStore().access_token);
//             axios({
//                 method: "get",
//                 params: {
//                     id: data.id,
//                 },
//                 url: `/api/posts/attachment/download`,
//                 headers: { Authorization: AuthStr },
//             })
//                 .then((res) => {
//                     window.open(res.data, "_blank").focus();
//                 })
//                 .catch((err) => {
//                     console.log(err.response.data.message);
//                 });
//         },

//         hideComments(e, post_id) {
//             if (this.data_pass.isShow.includes(post_id)) {
//                 e.target.classList.remove("text-primary");
//                 this.data_pass.isShow = this.data_pass.isShow.filter((data) => {
//                     return data !== post_id;
//                 });
//             } else {
//                 e.target.classList.add("text-primary");
//                 this.data_pass.isShow.push(post_id);
//             }
//         },

//         computedUserAvatar(data) {
//             if (data.get_user_details.profile_img) {
//                 return data.get_user_details.image_url;
//             } else {
//                 return "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
//             }
//         },

//         likePost(e, data) {
//             data.authLikes = !data.authLikes;

//             const AuthStr = "Bearer ".concat(userStore().access_token);
//             axios({
//                 method: "post",
//                 params: {
//                     id: data.id,
//                 },
//                 url: `/api/posts/${data.id}/like`,
//                 headers: { Authorization: AuthStr },
//             })
//                 .then((res) => {
//                     if (res.data.message == "like") {
//                         data.get_likes.push(res.data.data);
//                     } else {
//                         data.get_likes.forEach((elem, index) => {
//                             if (elem.user_id == userStore().user.id) {
//                                 data.get_likes.splice(index, 1);
//                             }
//                         });
//                     }
//                 })
//                 .catch((err) => {});
//         },

//         latestComments(data) {
//             this.data_pass.sort = "latest";
//             this.data_pass.sort_id = data.id;
//         },

//         oldComments(data) {
//             this.data_pass.sort = "oldest";
//             this.data_pass.sort_id = data.id;
//         },

//         updateParentEditPost(data) {
//             this.$parent.edit_post.data = data;
//             this.$parent.edit_post.message = data.message;
//             this.$parent.edit_post.attachment_remove = [];
//         },
//     },

//     watch: {
//         $data: {
//             handler: function (val, oldVal) {
//                 console.log("watcher: ", val);
//             },
//             deep: true,
//         },
//     },

//     updated() {},

//     mounted() {},
// };
</script>

<style scoped>
.border-post {
    border: 1px solid #e1e1e1;
}

.btn-outline-secondary:hover {
    background: #ffffff;
    color: #0d6efd !important;
}
</style>


