<template>
    <div class="">
        <div @click="goBack($event)" id="go_back" @keydown="goBack($event)">
            <div class="container" v-for="(data, index) in post.data" :key="index">
                <div class="padding-intro">
                    <div class="card z-3">
                        <div class="card-body">
                            <div class="card-title border-bottom">
                                <div class="d-flex">
                                    <div class="mb-1">
                                        <a role="button" @click="$router.back()" class="text-secondary h4">
                                            <i class="fa fa-arrow-circle-left"></i> Go back
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="card-text">
                                <div class="row">

                                    <div class="col-lg-8">
                                        <div class="card">
                                            <div class="position-relative" v-for="(file, index) in data.get_post_attachment_images" :key="index">
                                                <div v-if="currentFile == index">

                                                    <img
                                                        :src="file.image_url"
                                                        alt=""
                                                        class="img-height w-100"
                                                    />

                                                    <div class="position-absolute mx-0 absolute-center-left" v-if="currentFile > 0">
                                                        <a role="button" @click="prevImage" class="text-secondary p-3">
                                                            <i class="fa fa-arrow-left fa-2x"></i>
                                                        </a>
                                                    </div>

                                                    <div class="position-absolute mx-0 absolute-center-right" v-if="currentFile+1 != data.get_post_attachment_images.length">
                                                        <a role="button" @click="nextImage(data)" class="text-secondary p-3">
                                                            <i class="fa fa-arrow-right fa-2x"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="text-center mt-1 h5" v-if="data.get_post_attachment_images">
                                            {{ currentFile + 1 }} / {{ data.get_post_attachment_images.length }}
                                        </div>

                                    </div>

                                    <div class="col-lg-4 pe-2 ps-0">
                                        <Post :datas="post" />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
import Post from '../components/Post.vue'
import { userStore } from '../stores/userStore';

export default {
    data() {
        return {
            currentFile: '',
            post: '',
        }
    },
    components: {
        Post,
    },

    props: [
        'page'
    ],

    computed: {
        currentUser() {
            return userStore().user;
        },
    },

    methods: {
        prevImage(data) {
            if(this.currentFile != 0) {
                this.currentFile --;
            }
        },

        nextImage(data) {
            if(data.get_post_attachment_images.length - 1 > this.currentFile) {
                this.currentFile ++;
            }
        },

        goBack(e) {
            if(e.target.id == 'go_back' || e.keyCode == 27) {
                this.$router.back();
            }
        },

        getFileFormat(fileName) {
            var re = /(?:\.([^.]+))?$/;
            var ext = re.exec(fileName)[1];
            return ext.trim();
        },
    },

    // watch: {
    //     $data: {
    //         handler: function(val, oldVal) {
    //             console.log('Watch PostPage: ',val);
    //         },
    //         deep: true
    //     }
    // },

    updated() {

    },

    // deactivated() {
    //     // when you visit the page it will save the previous image so we will destroy it
    //     this.$destroy();
    // },




    mounted() {
        this.page ? this.currentFile = this.page : 0;

        const AuthStr = 'Bearer '.concat(userStore().access_token);
        axios({
            method: 'get',
            url: `/api/posts/show/${this.$route.params.id}`,
            headers: {Authorization: AuthStr}
        }).then(res => {console.log(res.data);
            this.post = res.data;
            console.log(this.post);
        }).catch(err => {
            console.log(err.response.data.message);
        });
    },
}
</script>

<style scoped>
.padding-intro {
    padding-top: 80px;
}


.img-height {
    height: 80vh;
}

.absolute-center-left {
    left: 1%;
    top: 45%;
}

.absolute-center-right {
    right: 1%;
    top: 45%;
}


</style>
