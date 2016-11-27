<template>
  <div class="pipe" ref="pipe" :style="{'right': right + 'px'}" >
    <div :style="{'height': topHeight + 'px'}" class="pipeTopHalf"></div>
    <div :style="{'height': bottomHeight + 'px'}" class="pipeBottomHalf"></div>
  </div>
</template>

<script>
import VueAnimation from 'vue-state-animation'

export default {

  props: {
    'pipeId': {
      type: Number,
      default: 0
    },
    'topHeight': {
      type: Number,
      default: 0
    },
    'bottomHeight': {
      type: Number,
      default: 0
    },
    'pipeInterval': {
      type: Number,
      default: 0
    },
    'screenWidth': {
      type: Number,
      default: 0
    },
    'gapHeight': {
      type: Number,
      default: 0
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
    this._animate.linearIn('right', this.screenWidth, this.pipeInterval * 2)
  },

  computed: {

  },

  components: {
  },

  methods: {
    componentWillUnmount() {
      this.stop()
    },

    getGapPos() {
      var pipe = this.$refs.pipe,
          box = pipe.getBoundingClientRect()
      return {
        w: pipe.offsetWidth,
        h: this.gapHeight,
        t: this.topHeight,
        l: box.left
      }
    },

    stop() {
      this._animate.stop()
    }
  }
}
</script>