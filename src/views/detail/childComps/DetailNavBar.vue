<template>
  <nav-bar>
    <div slot="left" @click="backClick">
      <img src="@/assets/img/common/back.svg" alt="" class="back-img">
    </div>
    <div slot="center" class="title">
      <div v-for="(item, index) in titles" class="title-item"
           :class="{active: currentIndex == index}" @click="titleClick(index)">{{item}}</div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods: {
    backClick() {
      this.$router.back()
    },
    titleClick(index) {
      this.currentIndex = index
    }
  }
}
</script>

<style scoped>
  .title {
    display: flex;
    font-size: 18px;
  }

  .title-item {
    flex: 1;
  }

  .back-img {
    margin-top: 10px;
  }

  .active {
    color: var(--color-high-text);
  }
</style>
