<script setup lang="ts">
const props = defineProps<{ src: string; imgAttrs?: Record<string, any> }>()

const nonce = useNonce()
const isLoaded = ref(false)
const isError = ref(false)
const isLoading = computed(() => !isLoaded.value && !isError.value)
const isImg = (target: EventTarget | null): target is HTMLImageElement => {
  return target !== null
}

const onLoad = (event: Event) => {
  if (
    isImg(event.target) &&
    event.target.complete &&
    event.target.naturalWidth > 0
  ) {
    isLoaded.value = true
    return
  }
  isError.value = true
}
const onError = () => {
  isError.value = true
}
</script>

<template>
  <div class="relative">
    <div
      class="loading absolute top-0 right-0 bottom-0 left-0 grid place-items-center rounded-md bg-slate-200"
      v-if="isLoading"
    ></div>
    <NuxtPicture
      @load="onLoad"
      @error="onError"
      :nonce="nonce"
      :img-attrs="imgAttrs"
      :class="{ 'opacity-0': isLoading || isError }"
      format="webp"
      :src="src"
    />
    <div
      class="absolute top-0 right-0 bottom-0 left-0 grid place-items-center rounded-md bg-slate-100"
      v-if="isError"
    >
      <Icon class="size-12 text-slate-300" name="lucide:image-off" />
    </div>
  </div>
</template>

<style>
.loading {
  background: linear-gradient(-90deg, #dad8d8 0%, #fcfcfc 50%, #dad8d8 100%);
  background-size: 400% 400%;
  animation: background-pulse 1.2s ease-in-out infinite;
}
@keyframes background-pulse {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: -135% 0%;
  }
}
</style>
