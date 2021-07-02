<template>
  <swiper class="swiper-detail">
    <swiper-item v-for="item in topImages">
      <img :src="item" alt="" class="img">
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from "@/components/common/swiper";

export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.swiper-detail {
  height: 300px;
  overflow: hidden;
}

.img {
  height: 100%;
}
</style>
