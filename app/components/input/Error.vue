<script setup lang="ts">
defineProps<{ message: string }>()
</script>

<template>
  <div
    class="flex w-fit gap-x-2 rounded-md border-2 border-red-200 bg-red-50 px-1.5 pt-1 text-red-600"
  >
    <div class="">
      <Icon class="size-4" name="lucide:circle-alert" />
    </div>
    <p class="text-sm">{{ message }}</p>
  </div>
</template>
