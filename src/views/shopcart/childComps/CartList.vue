<template>
  <div id="cart_list">
    <scroll ref="scroll" class="content">
      <div>
        <cart-list-item
          v-for="(item, index) in $store.state.cartList"
          :key="index"
          :item="item"
        ></cart-list-item>
      </div>
    </scroll>
  </div>
</template>
<script>
import Scroll from "@/components/common/scroll/Scroll";

import CartListItem from "./CartListItem.vue";

export default {
  data() {
    return {};
  },
  components: {
    Scroll,
    CartListItem
  },
  methods: {},
  activated() {
    this.$refs.scroll.refresh();
  }
};
</script>
<style scoped>
#cart_list {
  font-size: 0.68rem;
  height: calc(100vh - 1.9rem - 2.09rem - 1.9rem - 30px);
}

/**
* scroll
*/
.content {
  height: 100%;
  overflow: hidden;
}
</style>
