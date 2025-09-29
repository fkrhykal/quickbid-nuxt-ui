export function useCountDown(closedAt: number, interval: number = 1_000) {
  const timeLeft = ref(closedAt - Date.now())
  const totalSeconds = computed(() => Math.floor(timeLeft.value / 1000))
  const days = computed(() => Math.floor(totalSeconds.value / (60 * 60 * 24)))
  const hours = computed(() =>
    Math.floor((totalSeconds.value % (60 * 60 * 24)) / 3600)
  )
  const minutes = computed(() => Math.floor((totalSeconds.value % 3600) / 60))
  const seconds = computed(() => totalSeconds.value % 60)
  const i = ref<ReturnType<typeof setInterval>>()

  onMounted(() => {
    i.value = setInterval(() => {
      const remaining = closedAt - Date.now()
      timeLeft.value = remaining > 0 ? remaining : 0
      if (remaining <= 0 && i.value) {
        clearInterval(i.value)
      }
    }, interval)
  })

  onUnmounted(() => {
    clearInterval(i.value)
  })
  return {
    days,
    hours,
    minutes,
    seconds,
  }
}
