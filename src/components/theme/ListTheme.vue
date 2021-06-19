<template>
  <v-container>
    <div class="grid">
      <Theme
        v-bind:class="item.description == 'd' ? 'large' : 'item'"
        v-for="item in themesList"
        :key="item.name"
        :item="item"
      />
    </div>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import "vuetify/dist/vuetify.min.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import Theme from "./Theme.vue";
export default {
  name: "ListTheme",
  components: {
    Theme
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["themesList"])
  },
  mounted() {
    this.getThemesList();
  },
  methods: {
    ...mapActions(["getThemesList"])
  }
};
</script>
<style>
.grid {
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-gap: 1em 1em;
  grid-auto-flow: row dense;
}

.item {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 0.25em;
  padding: 2em;
}

.large {
  background: rgba(255, 0, 0, 0.25);
  grid-column: auto;
  grid-row: auto / span 2;
  height: 500px;
}
</style>
