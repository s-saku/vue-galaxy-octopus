<template>
  <div>
    <screen ref="screen" :setting="setting"></screen>
    <setting :setting="setting" v-on:onChangeSetting="onChangeSetting"></setting>
  </div>
</template>

<script>
import Screen from './Screen.vue'
import Setting from './settings/Setting.vue'

export default {

  data () {
    return {
      setting: {
        reverseGravity: false,
        pipeInterval: 1200,
        gapHeight: 150,
        difficulity: 'normal',
        noHit: false
      }
    }
  },

  components: {
    Screen,
    Setting
  },

  methods: {
    onChangeSetting() {
      // set game parameter
      this.$refs.screen.reset()
    }
  }
}
</script>