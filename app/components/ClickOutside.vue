<script setup lang="ts" generic="T extends HTMLElement">
const props = defineProps<{ action: (el: T) => void }>()

useClickOutside('clickOutsideRef', props.action)
</script>

<template>
  <div ref="clickOutsideRef">
    <slot />
  </div>
</template>
