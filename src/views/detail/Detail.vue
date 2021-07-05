<template>
  <div class="detail" id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="detailNavBar"/>
    <scroll class="content" ref="scroll" @scroll="newContentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="param" :param-info="paramInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <detail-bot-bar @addEvent="addToCart" v-show="isDetailLoaded"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <back-top/>
  </div>
</template>

<script>
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
import DetailBotBar from "@/views/detail/childComps/DetailBotBar";

import Scroll from "@/components/common/scroll/Scroll";
import GoodsList from "@/components/content/goods/GoodsList";

import {getDetail, getRecommend, Goods, GoodsParam, Shop} from "@/network/network/detail";
import {debounce, formatDate} from "@/common/utils";
import {backTopMixin, imageListenerMixin} from "@/common/mixin";





export default {
  name: "Detail",
  components: {
    DetailBotBar,
    GoodsList,
    DetailParamInfo,
    DetailGoodsInfo,
    Scroll,
    DetailShopInfo,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      recommends: [],
      themeTopYs: [],
      currentIdx: 0,
      newContentScroll: () => {},
      isDetailLoaded: false
    }
  },
  mixins: [imageListenerMixin, backTopMixin],
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh()
      this.themeTopYs.push(0, this.$refs.param.$el.offsetTop,
        this.$refs.param.$el.offsetTop+1, this.$refs.recommend.$el.offsetTop, Number.MAX_VALUE)
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index])
    },
    contentScroll(position) {
      let y = -position.y
      for (let i = 0; i < this.themeTopYs.length - 1; i++) {
        if(i != this.currentIdx && (y >= this.themeTopYs[i] && y < this.themeTopYs[i + 1])) {
          this.$refs.detailNavBar.currentIndex = i
          this.currentIdx = i
        }
      }

      this.isShowBackTop = y > 1000
    },
    addToCart() {
      const product = {}
      product.desc = this.goods.desc
      product.title = this.goods.desc
      product.img = this.topImages[0]
      product.price = this.goods.realPrice
      product.iid = this.iid
      product.checked = false;

      this.$store.dispatch('addCart', product).then(res => {
        this.$toast.show(res, 1500)
      })
    }
  },
  created() {
    this.iid = this.$route.params.id
    // getDetail(this.iid).then(res => {
    //   const data = res.result
    //   this.topImages = data.itemInfo.topImages
    //   this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
    //   this.shop = new Shop(data.shopInfo)
    //   this.detailInfo = data.detailInfo
    //   this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
    //
    //   // console.log(formatDate(new Date(data.rate.list[0].created * 1000), 'yyyy-MM-dd hh:mm:ss'))
    // })
    // getRecommend().then(res => {
    //   // console.log(res)
    //   this.recommends = res.data.list
    // })

    Promise
      .all([getDetail(this.iid), getRecommend()])
      .then(([res1, res2]) => {
        const data = res1.result
        this.topImages = data.itemInfo.topImages
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        this.shop = new Shop(data.shopInfo)
        this.detailInfo = data.detailInfo
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        this.recommends = res2.data.list
        this.isDetailLoaded = true
      })


    //做了个防抖，当延迟设置很大时好像没啥用
    this.newContentScroll = debounce(this.contentScroll, 50)
  },
  mounted() {

  },
  destroyed() {
    this.$bus.$off('itemImageLoad', this.imageListener)
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px);
}
</style>
