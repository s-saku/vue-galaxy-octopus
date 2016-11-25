<template>
  <div>
    test!!
  </div>
</template>

<script>
// import Canvas from './Canvas'
// import Setting from './settings/Setting'

export default {

  data () {
    return {
      setting: {
          reverseGravity: true,
          pipeInterval: 1600,
          noHit: false
      }
    }
  },

  computed: {

  },

  components: {
  },

  created () {
  },

  methods: {
    // onChangeSetting(setting) {
    //     // set game parameter
    //     this.setState({ setting: setting }, () => {
    //         this.refs.canvas.reset()
    //     })
    // }
  }
}
</script>