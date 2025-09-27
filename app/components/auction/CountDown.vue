<script setup lang="ts">
const props = defineProps<{ closedAt: number }>()

const timeLeft = ref(props.closedAt - Date.now())
const countdown = computed(() => {
  const totalSeconds = Math.floor(timeLeft.value / 1000)
  const days = Math.floor(totalSeconds / (60 * 60 * 24))
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return {
    days,
    hours,
    minutes,
    seconds,
  }
})

const interval = ref<ReturnType<typeof setInterval>>()

onMounted(() => {
  interval.value = setInterval(() => {
    const remaining = props.closedAt - Date.now()
    timeLeft.value = remaining > 0 ? remaining : 0
    if (remaining <= 0 && interval.value) {
      clearInterval(interval.value)
    }
  }, 500)
})

onUnmounted(() => {
  clearInterval(interval.value)
})
</script>

<template>
  <div class="countdown flex justify-between gap-x-1 rounded-md p-2">
    <div class="w-[25%] rounded-md p-2 text-center">
      <div>{{ countdown.days }}d</div>
    </div>
    <div class="w-[25%] rounded-md p-2 text-center">
      <div>{{ countdown.hours }}h</div>
    </div>
    <div class="w-[25%] rounded-md p-2 text-center">
      <div>{{ countdown.minutes }}m</div>
    </div>
    <div class="w-[25%] rounded-md p-2 text-center">
      <div>{{ countdown.seconds }}s</div>
    </div>
  </div>
</template>
