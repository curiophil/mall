<template>
  <div>
    <input type="text" v-model="value" @input="event()" @blur="event(true)">xxx
    <div>value:{{value}}</div>
  </div>
</template>

<script>

export default {
  name: "Category",
  data() {
    return {
      value: "",
      event: this.debounce(this.blur, 500)
    }
  },
  methods: {
    blur() {
      console.log(this.value)
    },
    debounce(func, delay) {
      let timer = null
      return function (rightNow=false, ...args) {
        if(rightNow) {
          clearTimeout(timer)
          func.apply(this, args)
        } else {
          if(timer) {
            clearTimeout(timer)
          }
          timer = setTimeout(() => {
            func.apply(this, args)
          }, delay)
        }
      }
    }
  }
}
</script>

<style scoped>
</style>
