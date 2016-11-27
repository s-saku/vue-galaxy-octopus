<template>
  <div class='settings'>
    <div>
      <input id="input_reverseGravity" type='checkbox' v-model="setting.reverseGravity" @change="onChangeSetting" />
      <label htmlFor="input_reverseGravity">Reverse gravity</label>
    </div>
    <div>
      <label htmlFor="input_pipeInterval">Difficulity</label>
      <div>
        <label>
          <input type="radio" value="easy" v-model="setting.difficulity" @change="onChangeDifficulity" />
          Easy
        </label>
        <label>
          <input type="radio" value="normal" v-model="setting.difficulity" @change="onChangeDifficulity" />
          Normal
        </label>
        <label>
          <input type="radio" value="difficult" v-model="setting.difficulity" @change="onChangeDifficulity" />
          Difficult
        </label>
      </div>
    </div>
  </div>
</template>

<script>

export default {

  props: {
    'setting': {
      type: Object,
      default: {}
    }
  },

  data () {
    return {
    }
  },

  created () {
  },

  mounted () {
  },

  computed: {
  },

  components: {
  },

  methods: {
    onChangeDifficulity() {
      switch(this.setting.difficulity) {
        case 'easy':
          this.setting.pipeInterval = 1600
          this.setting.gapHeight = 180
          break
        case 'normal':
          this.setting.pipeInterval = 1200
          this.setting.gapHeight = 150
          break
        case 'difficult':
          this.setting.pipeInterval = 800
          this.setting.gapHeight = 120
          break
      }
      this.onChangeSetting()
    },

    onChangeSetting() {
      this.$emit('onChangeSetting')
    }
  }
 }

</script>