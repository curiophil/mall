<template>
  <div class="toast">
      <div class="toast_div" v-show="isShowTip">{{ message }}</div>
  </div>
</template>
<script>
export default {
  name: 'Toast',
  data() {
    return {
      isShowTip: false,
      message: ""
    };
  },
  methods: {
    show(msg, delay = 1000) {
      this.isShowTip = true;
      this.message = msg;
      setTimeout(() => {
        this.isShowTip = false;
      }, delay);
    }
  }
};
</script>
<style scoped>
/**
* 给加入购物车做样式即过渡
*/
.toast_div {
/*  font-size: 0.8rem;*/
/*  text-align: center;*/
/*  line-height: 2rem;*/
/*  height: 2rem;*/
/*  width: 10rem;*/
/*  height: 20px;*/

  background-color: rgba(128, 128, 128, 0.2);
/*  border-radius: 0.4rem;*/
/*  border: 0.04rem solid rgba(0, 0, 0, 0.4);*/
/*  color: white;*/

/*  position: fixed;*/
/*  top: 50%;*/
/*  left: 50%;*/
/*  transform: translate(-50%, -50%);*/
}
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  font-size: 18px;
  text-align: center;
  line-height: 28px;
  height: 22px;
  width: 220px;
  height: 22px;

  z-index: 999;
  /*background-color: rgba(128, 128, 128, 0.9);*/
}

.toast-enter,
.toast-leave-to {
  opacity: 0;
}
.toast-enter-active {
  transition: opacity 1s;
}
.toast-leave-active {
  transition: opacity 1s;
}
</style>
