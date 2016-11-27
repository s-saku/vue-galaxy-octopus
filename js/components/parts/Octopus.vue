<template>
  <div class="octopus" ref="octopus" :style="{ 'bottom': bottom + 'px' }"></div>
</template>

<script>
import VueAnimation from 'vue-state-animation'

export default {

  props: {
    'reverse': {
      type: Boolean,
      default: {}
    },
    'screenHeight': {
      type: Number,
      default: 0
    }
  },

  data () {
    return {
      initBottom: 225,
      bottom: 225,
      _animate: null
    }
  },

  created () {

  },

  mounted () {
    // vue animation wrapper
    this._animate = new VueAnimation(this)
  },

  computed: {

  },

  components: {
  },

  methods: {
    getPos() {
      var octopus = this.$refs.octopus,
          box = octopus.getBoundingClientRect()
      return {
          w: octopus.offsetWidth,
          h: octopus.offsetHeight,
          t: octopus.offsetTop,
          l: box.left
      }
    },

    jump() {
      return new Promise((resolve, reject) => {
        var distance = 60,
            operator = this.reverse ? -1 : 1,
            pos = this.getPos()
        // rotate by css transform
        this.rotate(-20 * operator)
        this._animate
          .stop()
          .linearIn('bottom', this.bottom + (distance * operator), 200)
          .then(() => {
            this.rotate(0)
            this._animate.linearIn('bottom', this.bottom - (distance * operator), 300)
              .then(() => {
                this.fall().then(resolve)
              })
          })
      })
    },

    fall() {
      return new Promise((resolve, reject) => {
        var pos = this.getPos(),
            screenH = this.screenHeight,
            reverse = this.reverse,
            operator = reverse ? -1 : 1,
            distance = reverse ? pos.t : screenH - pos.t - pos.h,
            totalFallTime = 1000/*time for fall*/ * distance / screenH
        // rotate by css transform
        this.rotate(90 * operator)
        if(distance < 10){
          resolve()
        }else{
          this._animate
            .stop()
            .linearIn('bottom', reverse ? screenH - pos.h : 0, totalFallTime)
            .then(resolve)
        }
      })
    },

    rotate(deg) {
      var octopus = this.$refs.octopus
      octopus.style.webkitTransform = 'rotate(' + deg + 'deg)'
      octopus.style.mozTransform = 'rotate(' + deg + 'deg)'
      octopus.style.msTransform = 'rotate(' + deg + 'deg)'
      octopus.style.oTransform = 'rotate(' + deg + 'deg)'
      octopus.style.transform = 'rotate(' + deg + 'deg)'
    }
  }
}



// export default class Octopus extends React.Component {
//     constructor(props) {
//         super(props)
//         // initialize state
//         this.state = {
//             bottom: props.initBottom
//         }
//         // react state animation wrapper
//         this._animate = new ReactStateAnimation(this)
//     }





//     stop() {
//         this._animate.stop()
//     }

// }
</script>