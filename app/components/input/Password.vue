<script setup lang="ts">
defineProps<{
  id: string
  label: string
}>()

const model = defineModel({
  default: '',
  required: false,
})

const isHidden = ref(true)

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
      class="w-full rounded-md border border-slate-200 py-3 pr-4.5 pl-2 focus:ring-4 focus:ring-slate-100 focus:outline-none"
      :id
      :type="isHidden ? 'password' : 'tex'"
    />
    <button
      type="button"
      @click="isHidden = !isHidden"
      class="absolute top-0 right-0 grid aspect-square h-full place-items-center rounded-r-md bg-slate-200/40 hover:bg-slate-200/60"
    >
      <div class="grid place-items-center">
        <Icon class="size-6 text-slate-950" v-if="isHidden" name="lucide:eye" />
        <Icon class="size-6 text-slate-950" v-else name="lucide:eye-off" />
      </div>
    </button>
  </div>
</template>
