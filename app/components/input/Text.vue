<script setup lang="ts">
defineProps<{
  id: string
  label: string
}>()

const model = defineModel({
  default: '',
  required: false,
})

const isFocus = ref(false)

const isActive = computed(() => model.value.length > 0 || isFocus.value)
</script>

<template>
  <div class="relative">
    <label
      :class="{ '-translate-y-[100%]': isActive }"
      class="pointer-events-none absolute top-[25%] left-2 bg-white p-0.5 text-slate-900 transition-all"
      :for="id"
      >{{ label }}</label
    >
    <input
      v-model="model"
      @focus="isFocus = true"
      @blur="isFocus = false"
      class="w-full rounded-md border border-slate-200 px-2 py-3 focus:ring-4 focus:ring-slate-100 focus:outline-none"
      :id
      type="text"
    />
  </div>
</template>
