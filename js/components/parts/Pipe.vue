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
    'canvasWidth': {
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
    this._animate.linearIn('right', this.canvasWidth, this.pipeInterval * 2)
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

// export default class Pipe extends React.Component {
//     constructor(props) {
//         super(props)
//         // initialize state
//         this.state = {
//             right: -props.pipeWidth
//         }
//         // react state animation wrapper
//         this._animate = new ReactStateAnimation(this)
//     }

//     componentDidMount() {
//         this._animate.linear('right', this.props.canvasWidth, this.props.pipeInterval * 2)
//     }

//     componentWillUnmount() {
//         this.stop()
//     }

//     getGapPos() {
//         var pipe = React.findDOMNode(this.refs.pipe),
//             box = pipe.getBoundingClientRect()
//         return {
//             w: pipe.offsetWidth,
//             h: this.props.gapHeight,
//             t: this.props.topHeight,
//             l: box.left
//         }
//     }

//     stop() {
//         this._animate.stop()
//     }

//     render() {
//         return (

//         )
//     }
// }

// Pipe.defaultProps = {
//     pipeWidth: 60,
//     pipeInterval: 0,
//     canvasWidth: 0,
//     gapHeight: 0
// }
</script>