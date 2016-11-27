<template>
  <div>
    <screen :setting="setting"></screen>
    <!-- <setting :setting="setting" v-on:change="onChangeSetting"></setting> -->
  </div>
</template>

<script>
import Screen from './Canvas.vue'
// import Setting from './settings/Setting'

export default {

  data () {
    return {
      setting: {
          reverseGravity: false,
          pipeInterval: 1600,
          noHit: false
      },
      pipes: []
    }
  },

  components: {
    Screen
  },

  created () {

  },

  mounted () {

  },

  computed: {
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