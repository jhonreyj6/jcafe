<template>
    <div>
        <div
            v-show="!display.includes(comment.post_id)"
            v-for="(comment, index) in comments.data"
            :key="index"
        >
            <div class="d-flex flex-row mb-2">
                <img
                    :src="computedUserAvatar(comment)"
                    width="50"
                    height="50"
                    class="rounded-image"
                />
                <div class="d-flex">
                    <div class="d-flex flex-column ms-3">
                        <span class="name">{{
                            comment.user_details.first_name +
                            " " +
                            comment.user_details.last_name
                        }}</span>
                        <pre class="comment-text">{{ comment.message }}</pre>
                        <div class="d-flex flex-row align-items-center">
                            <div>
                                <span :class="comment.authLikes ? 'text-primary' : ''">{{ comment.get_likes.length }}</span>
                                <a
                                    role="button"
                                    class="me-2"
                                    :class="
                                        comment.authLikes
                                            ? 'text-primary'
                                            : 'text-secondary'
                                    "
                                    @click="likeComment(comment)"
                                >
                                    Like
                                </a>
                            </div>
                            <a role="button" class="me-2 text-secondary"
                                >Reply</a
                            >
                            <small>{{ comment.created_time }}</small>
                        </div>
                    </div>
                </div>
                <div
                    class="ms-auto"
                    v-if="
                        comment.user_id == currentUser.id ||
                        currentUser.role == 1
                    "
                >
                    <div class="dropdown dropdown-menu-end">
                        <a
                            role="button"
                            class="p-2"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <i class="fa fa-ellipsis-h"></i>
                        </a>
                        <div class="dropdown-menu">
                            <a
                                class="dropdown-item"
                                role="button"
                                @click="initEditComment(comment, post_id)"
                                >Edit</a
                            >
                            <div class="dropdown-divider"></div>
                            <a
                                class="dropdown-item"
                                role="button"
                                @click="deleteComment(comment)"
                                >Delete</a
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex mb-2" v-if="comments.next_page_url">
            <a role="button" class="text-primary" @click="loadMoreComment"
                >Load more comments</a
            >
        </div>

        <div class="card-footer border-0 px-3 py-3 bg-comment">
            <div class="d-flex flex-start w-100">
                <div class="form-outline w-100">
                    <div class="d-flex flex-wrap border-post">
                        <div
                            class="p-2 flex-fill bg-white"
                            contenteditable="true"
                            :id="`content_${post_id}`"
                        ></div>
                    </div>
                </div>
            </div>

            <div class="float-end mb-3 mt-4">
                <button
                    v-if="!edit.comment"
                    type="button"
                    @click="storeComment(post_id)"
                    class="btn btn-primary btn-sm bg-gradient"
                >
                    Post comment
                </button>

                <button
                    v-if="edit.comment"
                    type="button"
                    @click="editComment(post_id)"
                    class="btn btn-primary btn-sm me-1"
                >
                    Edit comment
                </button>
                <button
                    v-if="edit.comment"
                    @click="cancelEditComment(post_id)"
                    type="button"
                    class="btn btn-danger btn-sm"
                >
                    Cancel
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import { userStore } from "../stores/userStore";
const user_store = userStore();

export default {
    data() {
        return {
            comments: "",
            edit: {
                comment: "",
            },
            comment: {
                collection: [],
            },
        };
    },
    components: {},

    props: {
        post_id: {
            type: Number,
        },
        sort: {
            type: String,
        },
        sort_id: {
            type: Number,
        },
        display: {
            type: Array,
        },
    },

    computed: {
        currentUser() {
            return userStore().user;
        },
    },

    methods: {
        computedUserAvatar(data) {
            if (data.user_details.image_url) {
                return data.user_details.image_url;
            } else {
                return "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
            }
        },

        storeComment(post_id) {
            const AuthStr = "Bearer ".concat(userStore().access_token);
            axios({
                method: "post",
                params: {
                    post_id: this.post_id,
                    message: document.getElementById(`content_${post_id}`)
                        .innerText,
                },
                url: `/api/posts/${this.post_id}/comment`,
                headers: { Authorization: AuthStr },
            })
                .then((res) => {
                    document.getElementById(`content_${post_id}`).innerText =
                        "";
                    this.comments.data.push(res.data);
                    // this.comments = res.data;
                })
                .catch((err) => {
                    console.log(err.response.data.message);
                });
        },

        likeComment(data) {
            data.authLikes = !data.authLikes;

            const AuthStr = "Bearer ".concat(userStore().access_token);
            axios({
                method: "post",
                url: `/api/posts/${data.post_id}/comment/${data.id}/like`,
                headers: { Authorization: AuthStr },
            })
                .then((res) => {
                    if (res.data.message == "like") {
                        data.get_likes.unshift(res.data.data);
                    } else {
                        data.get_likes.forEach((elem, index) => {
                            if (elem.comment_id == data.id) {
                                data.get_likes.splice(index, 1);
                            }
                        });
                    }
                })
                .catch((err) => {});
        },

        deleteComment(comment) {
            const AuthStr = "Bearer ".concat(userStore().access_token);
            axios({
                method: "delete",
                url: `/api/posts/${comment.post_id}/comment`,
                params: {
                    comment_id: comment.id,
                },
                headers: { Authorization: AuthStr },
            })
                .then((res) => {
                    this.comments.data.forEach((elem, index) => {
                        if (elem.id == comment.id) {
                            this.comments.data.splice(index, 1);
                        }
                    });
                })
                .catch((err) => {
                    console.log(err.response.data.message);
                });
        },

        editComment(post_id) {
            const AuthStr = "Bearer ".concat(userStore().access_token);
            axios({
                method: "patch",
                params: {
                    message: document.getElementById(`content_${post_id}`)
                        .innerText,
                    comment_id: this.edit.comment.id,
                },
                url: `/api/posts/${this.edit.comment.post_id}/comment`,
                headers: { Authorization: AuthStr },
            })
                .then((res) => {
                    this.comments.data.forEach((elem, index) => {
                        if (elem == this.edit.comment) {
                            this.comments.data[index].message =
                                document.getElementById(
                                    `content_${post_id}`
                                ).innerText;
                        }
                    });
                    this.edit.comment = "";
                    document.getElementById(`content_${post_id}`).innerText =
                        "";
                })
                .catch((err) => {});
        },

        initEditComment(comment, post_id) {
            this.edit.comment = comment;
            comment.edit_mode = 1;
            document.getElementById(`content_${post_id}`).innerText =
                comment.message;
        },

        cancelEditComment(post_id) {
            document.getElementById(`content_${post_id}`).innerText = "";
            this.edit.comment = "";
        },

        getComments(page) {
            if (page) {
                var url = this.comments.next_page_url;
            } else {
                var url = `/api/posts/${this.post_id}/comment?page=1`;
            }

            const AuthStr = "Bearer ".concat(userStore().access_token);
            axios({
                method: "get",
                params: {
                    post_id: this.post_id,
                    sort: this.sort,
                },
                url: url,
                headers: { Authorization: AuthStr },
            })
                .then((res) => {
                    if (!this.comments) {
                        this.comments = res.data;
                        res.data.data.forEach((data) => {
                            this.comment.collection.push(data.id);
                        });
                    } else {
                        res.data.data.forEach((data) => {
                            if (!this.comment.collection.includes(data.id)) {
                                this.comments.data.push(data);
                                this.comment.collection.push(data.id);
                            }
                        });
                        this.comments.next_page_url = res.data.next_page_url;
                    }
                })
                .catch((err) => {
                    console.log(err.response.data.message);
                });
        },

        loadMoreComment() {
            if (this.comments.last_page != this.comments.current_page) {
                this.comments.current_page++;
                this.getComments(this.comments.next_page_url);
            }
        },
    },

    watch: {
        // $data: {
        //     handler: function (val, oldVal) {
        //         console.log("comment:", val);
        //     },
        //     deep: true,
        // },

        $props: {
            handler: function (val, oldVal) {
                this.comments = "";
                this.comment.collection = [];
                this.getComments();
            },
            deep: true,
        },
    },

    // watch: {
    //
    // },

    updated() {},

    mounted() {
        this.getComments();
    },
};
</script>

<style scoped>
.bg-comment {
    background: #f1f1f1;
}
</style>


