<template>
  <div class="pipe" ref="pipe" :style="{'right': right + 'px'}" >
    <div :style="{'height': pipe.topHeight + 'px'}" class="pipeTopHalf"></div>
    <div :style="{'height': pipe.bottomHeight + 'px'}" class="pipeBottomHalf"></div>
  </div>
</template>

<script>
import VueAnimation from 'vue-state-animation'

export default {

  props: {
    'pipe': {
      type: Array,
      default: function () { return [] }
    }
  },

  data () {
    return {
      pipeWidth: 60,
      right: -60,
      _animate: null
    }
  },

  created () {
    // vue animation wrapper
    this._animate = new VueAnimation(this)
  },

  mounted () {
    this._animate.linearIn('right', this.pipe.screenWidth, this.pipe.pipeInterval * 2)
  },

  methods: {
    componentWillUnmount() {
      this.stop()
    },

    getGapPos() {
      var pipeElement = this.$refs.pipe,
          box = pipeElement.getBoundingClientRect()
      return {
        w: pipeElement.offsetWidth,
        h: this.pipe.gapHeight,
        t: this.pipe.topHeight,
        l: box.left
      }
    },

    stop() {
      this._animate.stop()
    }
  }
}
</script>