<template>
    <div>
        <div class="container space-intro mb-150">
            <div class="row mb-4">
                <div
                    class="col-lg-6 mb-4"
                    v-for="(game, index) in games.data"
                    :key="index"
                >
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
                                <div
                                    class="d-flex text-primary justify-content-between align-content-center"
                                >
                                    <h4>{{ game.name }}</h4>
                                    <div class="fs-5">
                                        {{ game.rating }}
                                        <i class="fa fa-star"></i>
                                    </div>
                                </div>
                                <div class="text-primary">{{ game.genre }}</div>
                                <p class="game-description">
                                    {{ game.description }}
                                </p>
                                <a
                                    :href="game.trailer_link"
                                    class="btn btn-primary w-100"
                                >
                                    Trailer
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="d-flex flex-row-reverse">
                <PaginateButton
                    :data="games"
                    @nextPage="nextPage"
                    @prevPage="prevPage"
                    @goToPage="goToPage"
                />
            </div>
        </div>
    </div>
</template>
<script setup>
import { onBeforeMount, ref } from "vue";
import PaginateButton from "../components/PaginateButton.vue";

const games = ref([]);

const getGames = () => {
    axios({
        method: "get",
        url: `/api/games`,
    })
        .then((res) => {
            games.value = res.data;
        })
        .catch((err) => {
            console.log(err.response.message);
        });
};

const nextPage = (url) => {
    axios({
        method: "get",
        url: url,
    })
        .then((res) => {
            games.value = res.data;
        })
        .catch((err) => {});
};

const prevPage = (url) => {
    axios({
        method: "get",
        url: url,
    })
        .then((res) => {
            games.value = res.data;
        })
        .catch((err) => {});
};

const goToPage = (url, page) => {
    axios({
        method: "get",
        url: `${url}?page=${page}`,
    })
        .then((res) => {
            games.value = res.data;
        })
        .catch((err) => {});
};

onBeforeMount(() => {
    getGames();
});
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
