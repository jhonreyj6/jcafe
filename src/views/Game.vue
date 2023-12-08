<template>
  <div>
    <div class="container space-intro mb-150">
      <div class="row">
        <div class="col-lg-2" v-for="(game, index) in games.data" :key="index">
          <div class="card mb-4 p-2 border-primary">
            <div class="position-relative">
                <img
                  class="card-img-top bg-primary bg-gradient p-1 rounded"
                  :src="game.image_url"
                  alt="Card image"
                  height="150"
                  :title="game.name"
                />
                <div class="position-absolute rate_position bg-primary border-primary p-2">
                    <div class="d-inline-flex align-items-center gap-1">
                        <span>{{ game.rating }}</span> <i class="fa fa-star text-yel"></i>
                    </div>
                </div>
            </div>

            <div class="card-body p-2">
              <h5 class="card-title text-truncate mb-0" :title="game.name">
                {{ limitText(game.name, 14) }}
              </h5>
              <div class="card-text mb-2">
                <p class="mb-2" style="height: 90px; word-wrap: break-word; overflow-y: hidden;" :title="game.genre">
                  {{ limitText(game.genre, 80) }}
                </p>
              </div>

              <div class="text-center">
                <a
                  :href="game.trailer_link"
                  target="_blank"
                  class="btn btn-primary"
                  >Watch Trailer</a
                >
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
  }
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
</style>
