<script lang="ts">
const v = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  GHOST: 'ghost',
} as const

type Variant = (typeof v)[keyof typeof v]
</script>

<script setup lang="ts">
withDefaults(defineProps<{ variant?: Variant }>(), {
  variant: v.PRIMARY,
})
</script>

<template>
  <button
    class="flex w-full items-center justify-center rounded-md p-2 font-semibold transition-all"
    :class="{
      'bg-slate-950 text-white hover:bg-slate-800 disabled:bg-slate-700':
        variant === v.PRIMARY,
      'bg-slate-200 text-slate-950 hover:bg-slate-300 disabled:bg-slate-50':
        variant === v.SECONDARY,
      'border border-slate-200 text-slate-950 hover:bg-slate-50':
        variant === v.GHOST,
    }"
  >
    <slot />
  </button>
</template>
