import {debounce} from "@/common/utils";

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
