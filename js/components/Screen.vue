<template>
  <div class="screen" ref="screen" @click="onClickScreen">
    <counter :count="count"></counter>
    <octopus ref="octopus" :reverse="setting.reverseGravity" :screenHeight="screenHeight"></octopus>
    <pipe v-for="pipe in pipes" ref="pipe" :key="pipe.id" :pipe="pipe"></pipe>
  </div>
</template>

<script>
import Counter from './parts/Counter.vue'
import Octopus from './parts/Octopus.vue'
import Pipe from './parts/Pipe.vue'
import VueAnimation from 'vue-state-animation'

var Loop = VueAnimation.Loop

export default {

  props: {
    'setting': {
      type: Object,
      default: function () { return {} }
    }
  },

  data () {
    return {
      phase: 'INTRO',
      screenWidth: 0,
      screenHeight: 0,
      pipes: [],
      count: 0
    }
  },

  components: {
    Octopus,
    Pipe,
    Counter
  },

  created () {
  },

  mounted () {
    var screen = this.$refs.screen
    this.screenWidth = screen.offsetWidth
    this.screenHeight = screen.offsetHeight
    // create main loop
    this._loop = new Loop(this.watchPos.bind(this))
    // space key handling
    document.body.addEventListener('keydown', (e)=>{
      var key = (window.Event) ? e.which : e.keyCode
      if(key === 32) {
        this.onClickScreen(e)
      }
    })
  },

  methods: {
    watchPos() {
      if (this.phase === 'RUNNING') {
        var res = this.detectCollision()
        if (!res || this.setting.noHit) { return true }
        if (res.state === 'HIT') {
          // collision detected & game end
          this._fail()
        } else if (res.state === 'SUCCESS') {
          // successfully jumped
          this._incrementCount()
        }
        return true
      }
    },

    // detect collision
    detectCollision() {
      var reverse = this.setting.reverseGravity,
          screenH = this.$refs.screen.offsetHeight,
          octopusPos = this.$refs.octopus.getPos(),
          hitBuf = 10
      if(reverse ? octopusPos.t < hitBuf : (octopusPos.t + octopusPos.h) > screenH - hitBuf){
        this.collisionState = "HIT"
        return {state: "HIT"}
      }
      // first pipe data
      var pipeId = this.count + 1
      var pipe = this.$refs.pipe ? this.$refs.pipe[0] : null
      if (pipe && !pipe.done) {
        var gapPos = this.$refs.pipe[0].getGapPos()
        // detect left to right range
        if ((octopusPos.l + octopusPos.w) >= gapPos.l && octopusPos.l <= (gapPos.l + gapPos.w)) {
          // detect bottom to top range
          if (octopusPos.t < gapPos.t || (octopusPos.t + octopusPos.h) > gapPos.t + gapPos.h) {
            this.collisionState = "HIT"
            return {state: "HIT"}
          }
        } else if (octopusPos.l >= (gapPos.l + gapPos.w)) {
          this.collisionState = "SUCCESS"
          pipe.done = true
          return {state: "SUCCESS"}
        }
      }
    },

    // fail to jump
    _fail() {
      this._loop.end()
      clearInterval(this._pipeTimer)
      this.$refs.pipe.map((pipe) => {pipe.stop()})
      this.phase = 'ENDING'
      this.$refs.octopus.fall().then(() => this.phase = 'INTRO')
    },

    // listen click and space key
    onClickScreen(e) {
      e.stopPropagation()
      e.preventDefault()
      switch(this.phase) {
        case 'INTRO':
          this.phase = 'RUNNING'
          this.count = 0
          this.pipes = []
          this.$refs.octopus.bottom = this.$refs.octopus.initBottom
          this.$refs.octopus.jump()
          this.$nextTick(() => {
            this._loop.start()
            this._pipeTimer = setInterval(this._createPipe, this.setting.pipeInterval)
          })
          break
        case 'RUNNING':
          this.$refs.octopus.jump()
          break
        case 'ENDING':
          break
      }
    },

    // create and move pipe
    _createPipe() {
      var topHeight = Math.floor(Math.random() * (this.screenHeight - 250)) + 50,
          bottomHeight = this.screenHeight - (topHeight + this.setting.gapHeight)
      // show at most two pipes
      var lastPipe = this.pipes[this.pipes.length - 1],
          lastIndex = lastPipe && lastPipe.id || 0
      if(this.pipes.length > 1){
        this.pipes.splice(0, 1)
      }
      this.pipes.push({
        id: lastIndex + 1,
        topHeight: topHeight,
        bottomHeight: bottomHeight,
        gapHeight: this.setting.gapHeight,
        pipeInterval: this.setting.pipeInterval,
        screenWidth: this.screenWidth
      })
    },

    reset() {
      this._fail()
    },

    // update counter
    _incrementCount(count) {
      this.count = this.count + 1
    }

  }
}

</script>