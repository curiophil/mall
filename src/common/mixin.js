import {debounce} from "@/common/utils";
import BackTop from "@/components/content/backtop/BackTop";

export const imageListenerMixin = {
  data() {
    return {
      imageListener: null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 2000)
    this.imageListener = () => refresh()
    this.$bus.$on('itemImageLoad', this.imageListener)
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backClick() {
      // 怪我，忘了给scroll标签加 class="content"
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
  }
}
