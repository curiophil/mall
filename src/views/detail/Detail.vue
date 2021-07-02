<template>
  <div class="detail" id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo"/>
      <goods-list :goods="recommends"/>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";

import Scroll from "@/components/common/scroll/Scroll";
import GoodsList from "@/components/content/goods/GoodsList";

import {getDetail, getRecommend, Goods, GoodsParam, Shop} from "@/network/network/detail";
import {formatDate} from "@/common/utils";
import {imageListenerMixin} from "@/common/mixin";


export default {
  name: "Detail",
  components: {
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
    }
  },
  mixins: [imageListenerMixin],
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh()
    },
  },
  created() {
    this.iid = this.$route.params.id
    getDetail(this.iid).then(res => {
      const data = res.result
      this.topImages = data.itemInfo.topImages
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      this.shop = new Shop(data.shopInfo)
      this.detailInfo = data.detailInfo
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      console.log(formatDate(new Date(data.rate.list[0].created * 1000), 'yyyy-MM-dd hh:mm:ss'))
    })
    getRecommend().then(res => {
      console.log(res)
      this.recommends = res.data.list
    })
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
