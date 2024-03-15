<template>
    <div>
        <div class="container space-intro mb-150">
            <div class="row mb-4">
                <div class="col-lg-6 mb-4" v-for="(game, index) in games.data"
                    :key="index">
                    <div class="border">
                        <div class="d-flex flex-row">
                            <div>
                                <img
                                    :src="game.image_url"
                                    alt="Card image"
                                    :title="game.name"
                                    class=""
                                    width="200"
                                    height="250"
                                />
                            </div>
                            <div class="py-3 mx-3 w-100">
                              <div class="d-flex text-primary justify-content-between align-content-center">
                                <h4>{{ game.name }}</h4>
                                <div class="fs-5">
                                  {{ game.rating }}
                                  <i class="fa fa-star"></i>
                                </div>
                              </div>
                              <div class="text-primary">{{ game.genre }}</div>
                              <p class="game-description">{{ game.description }}</p>
                              <a :href="game.trailer_link" class="btn btn-primary w-100">
                                Trailer
                              </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="d-flex flex-row-reverse">
                <PaginateButton :paginate_data="games" />
            </div>
        </div>
    </div>
</template>
<script>
import PaginateButton from "../components/PaginateButton.vue";
import Star from "../components/Star.vue";

export default {
    data() {
        return {
            games: "",
        };
    },
    components: {
        PaginateButton,
        Star,
    },

    props: [],

    computed: {},

    methods: {
        limitText(input, int) {
            if (input.length > int) {
                return input.substring(0, int) + "...";
            }
            return input;
        },

        nextPage(url) {
            axios({
                method: "get",
                url: url,
            })
                .then((res) => {
                    this.games = res.data;
                })
                .catch((err) => {});
        },

        prevPage(url) {
            axios({
                method: "get",
                url: url,
            })
                .then((res) => {
                    this.games = res.data;
                })
                .catch((err) => {});
        },

        goToPage(url, page) {
            axios({
                method: "get",
                url: `${url}?page=${page}`,
            })
                .then((res) => {
                    this.games = res.data;
                })
                .catch((err) => {});
        },

        getGames() {
            axios({
                method: "get",
                url: `/api/games`,
            })
                .then((res) => {
                    this.games = res.data;
                })
                .catch((err) => {
                    console.log(err.response.message);
                });
        },
    },

    // watch: {
    //     $data: {
    //         handler: function(val, oldVal) {
    //             console.log('watcher: ',val);
    //         },
    //         deep: true
    //     },
    // },

    updated() {},

    mounted() {
        this.getGames();
    },
};
</script>

<style scoped>
.fa-star {
    color: rgb(233, 233, 12);
}

.rate_position {
    right: 0;
    bottom: 0;
    border-top-left-radius: 5px;
    color: #ffffff;
    z-index: 10;
}

.game-description {
    height: 100px;
    text-overflow: ellipsis;
    overflow-y: hidden;
}
</style>
