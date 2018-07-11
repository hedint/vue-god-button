<template>
  <button class="btn" :class="{'btn--loader': show_loader}" @click="eventHandler" @keypress="eventKeyPressHandler">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "VueButton",

  props: {
    text: String,
    no_enter : Boolean,
    type: String,
    url: String,
    method: String,
    params: String,
    click : [Function, String],
    loader: Boolean
  },

  data() {
    return {
      show_loader: false
    };
  },

  methods: {
    eventHandler(e) {
      if (this.show_loader) return;
      switch (this.type) {
        case "link":
          this.linkBehaviour(this.url);
          break;
        case "method":
          this.methodBehaviour(this.method, this.loader);
          break;
        case "just_button":
          this.justButtonBehavior(e);
      }
    },
    eventKeyPressHandler (e) {
      if (e.keyCode === 13 && this.no_enter) {
        e.preventDefault();
        e.stopPropagation();
      }

    },

    dispatchJsEvent (e) {
      const event = new CustomEvent ("god_button_click", {detail : {e}});
      document.dispatchEvent(event);
    },

    linkBehaviour(url) {
      window.open(url);
    },

    justButtonBehavior (e) {
      if (this.click) {
        if (typeof this.click === 'function') {
          this.click();
        }
        if (typeof this.click === 'string') {
          try {
            eval(this.click)(e);
          } catch (err) {
            window[this.click](e);
          }
        }
      }
      //this.$emit('click', e);
      this.dispatchJsEvent(e);
    },

    methodBehaviour(method = "emptyMethod", is_loader) {
      let method_params = this.checkForMethodParams(this.params);
      this.show_loader = is_loader;

      if (this[method]) {
        this[method](method_params);
      } else {
        window[method](method_params);
      }
    },

    checkForMethodParams(params) {
      let params_object = false;

      if (params) {
        params_object = JSON.parse(params);
      }

      return params_object;
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
