<template>
  <router-link v-if="isExternalLink" :to="to">
    <slot></slot>
  </router-link>
  <a :href="to" v-else target="_blank">
    <slot></slot>
  </a>
</template>

<script>
import { Validator } from "@bigbighu/cms-utils";
export default {
  name: "AppLink",
  props: {
    to: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      isExternalLink: true,
    };
  },
  methods: {
    linkProp() {
      if (Validator.isExternal(this.to)) {
        this.isExternalLink = false;
      }
      this.isExternalLink = true;
    },
  },
  mounted() {
    this.linkProp();
  },
};
</script>

<style>
</style>