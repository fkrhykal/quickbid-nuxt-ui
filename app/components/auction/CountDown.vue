<script setup lang="ts">
const props = defineProps<{ closedAt: number }>()
const { days, hours, minutes, seconds } = useCountDown(props.closedAt)
</script>

<template>
  <div class="countdown flex justify-between gap-x-1 rounded-md p-2">
    <div class="w-[25%] rounded-md p-2 text-center">
      <div>{{ days }}d</div>
    </div>
    <div class="w-[25%] rounded-md p-2 text-center">
      <div>{{ hours }}h</div>
    </div>
    <div class="w-[25%] rounded-md p-2 text-center">
      <div>{{ minutes }}m</div>
    </div>
    <div class="w-[25%] rounded-md p-2 text-center">
      <div>{{ seconds }}s</div>
    </div>
  </div>
</template>
