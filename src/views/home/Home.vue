<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control class="tab-control"
                 :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick" ref="tabControl1" v-show="isTabFixed"/>
    <scroll class="content" ref="scroll"
            :probe-type="3" @scroll="contentScroll" :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <home-recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control class="tab-control"
                   :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick" ref="tabControl2"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import HomeRecommendView from "@/views/home/childComps/HomeRecommendView";
import FeatureView from "@/views/home/childComps/FeatureView";

import NavBar from "@/components/common/navbar/NavBar";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from "@/components/common/scroll/Scroll";

import {getHomeGoods, getHomeMultidata} from "@/network/network/home";
import {backTopMixin, imageListenerMixin} from "@/common/mixin";


export default {
  name: "Home",
  components: {
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
  },
  data() {
    return {
      banners: null,
      recommends: null,
      goods: {
        pop: {page: 0, list: [], saveY: 0},
        new: {page: 0, list: [], saveY: 0},
        sell: {page: 0, list: [], saveY: 0}
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
    }
  },
  mixins: [imageListenerMixin, backTopMixin],
  created() {
    this.getHomeMultidata()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {

  },
  activated() {
    // 回来时，滚动到上次离开保存的位置
    this.$refs.scroll.scrollTo(0, this.goods[this.currentType].saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    // 离开时，保存滚动到的位置
    this.goods[this.currentType].saveY = this.$refs.scroll.scroll.y

    this.$bus.$off('itemImageLoad', this.imageListener)
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    },
  },
  methods: {
    /**
     * 网络请求相关方法
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      let page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
      })
    },
    /**
     * 事件监听相关方法
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentActiveIndex = index
      this.$refs.tabControl2.currentActiveIndex = index
    },
    contentScroll(position) {
      // 判断backTop是否显示
      this.isShowBackTop = position.y < -1000

      //决定tabControl是否吸顶
      this.isTabFixed = position.y < -this.tabOffsetTop
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
      this.$refs.scroll.finishPullUp()
      this.$refs.scroll.refresh()
    },
    swiperImageLoad() {
      // 监听轮播图的image加载完成，获取到的tabOffsetTop才是正确的值
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    }

  },
  watch: {
    // 监听展示的类型
    currentType(newVal, oldVal) {
      // 保存离开时类型的滑动的距离
      this.goods[oldVal].saveY = this.$refs.scroll.scroll.y
      if(!this.isTabFixed) {
        // 如果离开时，tab-control没有固定住，则新的类型应该滚动到和旧的类型一致
        this.goods[newVal].saveY = this.goods[oldVal].saveY
      }else if(this.goods[newVal].saveY > -this.tabOffsetTop) {
        // 如果tab-control固定住，但新的类型的滚动距离没有达到使tab-control固定，则新的类型应该滚动到固定住的位置
        this.goods[newVal].saveY = -this.tabOffsetTop
      }
      this.$refs.scroll.scrollTo(0, this.goods[newVal].saveY, 0)
      this.$refs.scroll.refresh()
    }
  }
}
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #ffffff;

    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  /*.content {*/
  /*  height: calc(100% - 93px);*/
  /*  overflow: hidden;*/
  /*  !*margin-top: 44px;*!*/
  /*}*/

</style>
