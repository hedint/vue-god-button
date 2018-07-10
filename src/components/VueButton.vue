<template>
  <button class="btn" :class="{'btn--loader': show_loader}" @click="eventHandler">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "VueButton",

  props: {
    text: String,
    type: String,
    url: String,
    method: String,
    loader: Boolean
  },

  data() {
    return {
      show_loader: false
    };
  },

  methods: {
    eventHandler() {
      if (this.show_loader) return;

      switch (this.type) {
        case "link":
          this.linkBehaviour(this.url);
          break;
        case "method":
          this.methodBehaviour(this.method, this.loader);
          break;
      }
    },

    linkBehaviour(url) {
      window.open(url);
    },

    methodBehaviour(method = "emptyMethod", is_loader) {
      this.show_loader = is_loader;
      console.log("this[method]", this[method]);
      console.log("this['m2ethod']", this["m2ethod"]);
      this[method]();
    },

    emptyMethod() {
      return;
    },

    changeBgColor() {
      const LETTERS = "0123456789ABCDEF";
      let color = "#";

      for (let i = 0; i < 6; i++) {
        color += LETTERS[Math.floor(Math.random() * 16)];
      }

      document.body.style.background = color;

      if (this.show_loader) {
        setTimeout(() => {
          this.show_loader = !this.show_loader;
        }, 1500);
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.btn
  position relative
  margin 5px 0
  padding 20px 25px
  outline 0
  border 1px solid transparent
  border-radius 8px
  background #ac2c28
  color #fff
  text-decoration none
  user-select none
  -webkit-font-smoothing antialiased
  font 300 87.5%/1.3572 Arial,sans-serif
  cursor pointer

  &:not(.loading, &--loader):hover
    background red

  &--loader
    color transparent
    border-color transparent
    cursor default
    &:hover
      color transparent
      border-color transparent
      cursor default
      &:after
        background transparent
    &:after
      content '.'
      font normal 100px/10px Georgia
      animation loader-grey 1s infinite
      color transparent
      position absolute
      left 50%
      top 0
      transform translate(-50%, -50%)
      background transparent

@keyframes loader-grey
  from
    text-shadow: -1ex 0 #ffffff, -.5ex 0 rgba(#ffffff, 0.5) , 0 0 rgba(#ffffff, 0.5) , .5ex 0 rgba(#ffffff, 0.5) , 1ex 0 rgba(#ffffff, 0.5);
  16%
    text-shadow: -1ex 0 rgba(#ffffff, 0.5) , -.5ex 0 #ffffff, 0 0 rgba(#ffffff, 0.5) , .5ex 0 rgba(#ffffff, 0.5) , 1ex 0 rgba(#ffffff, 0.5);
  32%
    text-shadow: -1ex 0 rgba(#ffffff, 0.5) , -.5ex 0 rgba(#ffffff, 0.5) , 0 0 #ffffff, .5ex 0 rgba(#ffffff, 0.5) , 1ex 0 rgba(#ffffff, 0.5);
  48%
    text-shadow: -1ex 0 rgba(#ffffff, 0.5) , -.5ex 0 rgba(#ffffff, 0.5) , 0 0 rgba(#ffffff, 0.5) , .5ex 0 #ffffff, 1ex 0 rgba(#ffffff, 0.5);
  64%
    text-shadow: -1ex 0 rgba(#ffffff, 0.5) , -.5ex 0 rgba(#ffffff, 0.5) , 0 0 rgba(#ffffff, 0.5) , .5ex 0 rgba(#ffffff, 0.5) , 1ex 0 #ffffff;
  80%, to
    text-shadow: -1ex 0 rgba(#ffffff, 0.5) , -.5ex 0 rgba(#ffffff, 0.5) , 0 0 rgba(#ffffff, 0.5) , .5ex 0 rgba(#ffffff, 0.5) , 1ex 0 rgba(#ffffff, 0.5);
</style>
