<template>
    <div>
        <div class="card mb-3" v-for="(data, index) in datas.data" :key="index">
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
                <div class="ms-auto mt-1 dropdown dropdown-menu-end" v-if="currentUser.id == data.user_id">
                    <a
                        role="button"
                        class="p-2 text-secondary"
                        data-bs-toggle="dropdown"
                        ><i class="fa fa-ellipsis-h"></i
                    ></a>
                    <ul class="dropdown-menu">
                        <li>
                            <a
                                role="button"
                                class="dropdown-item"
                                data-bs-toggle="modal"
                                @click="updateParentEditPost(data)"
                                data-bs-target="#editModal"
                                >Edit</a
                            >
                        </li>
                        <li class="dropdown-divider"></li>
                        <li>
                            <a
                                class="dropdown-item"
                                role="button"
                                @click="deletePost(data)"
                                >Delete</a
                            >
                        </li>
                    </ul>
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
                        <router-link
                            :to="`/post/${data.id}`"
                        >
                            <img
                                :src="file.image_url"
                                class="w-100 attach_image"
                            />
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
                        <router-link
                            :to="`/post/${data.id}`"
                        >
                            <img
                                :src="file.image_url"
                                class="w-100 attach_image"
                            />
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
                                    :to="`/post/${data.id}`"
                                >
                                    <img
                                        :src="file.image_url"
                                        class="w-100 attach_image"
                                    />
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
                                    :to="`/post/${data.id}`"
                                >
                                    <img
                                        :src="file.image_url"
                                        class="w-100 attach_image"
                                    />
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
                                    :to="`/post/${data.id}`"
                                >
                                    <img
                                        :class="index == 3 ? 'opacity-25' : ''"
                                        :src="file.image_url"
                                        class="w-100 attach_image"
                                    />
                                    <div
                                        class="position-absolute center text-white"
                                        v-show="index == 3"
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
                class="card px-4 rounded-5 mx-3 mb-2"
                v-for="file in data.get_post_attachment_files"
                :key="file.id"
            >
                <div class="d-flex flex-row justify-content-between">
                    <div>
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
<script>
import Comment from "./Comment.vue";
import { userStore } from "../stores/userStore";

export default {
    data() {
        return {
            // datas: '',
            data_pass: {
                sort: "",
                sort_id: null,
                isShow: [],
            },
        };
    },
    components: {
        Comment,
    },

    props: ["datas"],

    computed: {
        currentUser() {
            return userStore().user;
        }
    },

    methods: {
        download(data) {
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
        },

        hideComments(e, post_id) {
            if (this.data_pass.isShow.includes(post_id)) {
                e.target.classList.remove("text-primary");
                this.data_pass.isShow = this.data_pass.isShow.filter((data) => {
                    return data !== post_id;
                });
            } else {
                e.target.classList.add("text-primary");
                this.data_pass.isShow.push(post_id);
            }
        },

        computedUserAvatar(data) {
            if (data.get_user_details.profile_img) {
                return data.get_user_details.image_url;
            } else {
                return "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
            }
        },

        likePost(e, data) {
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
        },

        deletePost(data) {
            const AuthStr = "Bearer ".concat(userStore().access_token);
            axios({
                method: "delete",
                params: {
                    id: data.id,
                },
                url: `/api/posts`,
                headers: { Authorization: AuthStr },
            })
                .then((res) => {
                    this.datas.data.forEach((elem, index) => {
                        if (elem.id == data.id) {
                            this.datas.data.splice(index, 1);
                        }
                    });
                })
                .catch((err) => {});
        },

        latestComments(data) {
            this.data_pass.sort = "latest";
            this.data_pass.sort_id = data.id;
        },

        oldComments(data) {
            this.data_pass.sort = "oldest";
            this.data_pass.sort_id = data.id;
        },

        updateParentEditPost(data) {
            this.$parent.edit_post.data = data;
            this.$parent.edit_post.message = data.message;
            this.$parent.edit_post.attachment_remove = [];
        },
    },

    watch: {
        $data: {
            handler: function (val, oldVal) {
                console.log("watcher: ", val);
            },
            deep: true,
        },
    },

    updated() {},

    mounted() {},
};
</script>

<style scoped>
.border-post {
    border: 1px solid #e1e1e1;
}

.attach_image {
    height: 300px;
}

.btn-outline-secondary:hover {
    background: #ffffff;
    color: #0d6efd !important;
}
</style>


