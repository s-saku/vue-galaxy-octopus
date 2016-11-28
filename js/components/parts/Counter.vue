<template>
  <span class="count">{{count}}</span>
</template>

<script>
export default {
  props: {
    'count': {
      type: Number,
      default: 0
    }
  }
 }
</script>