<script setup lang="ts">
const { data: account } = useAsyncData(getAccount)
</script>

<template>
  <div
    v-if="account"
    class="grid aspect-square place-items-center rounded-full border border-slate-200 bg-slate-100 text-slate-500"
  >
    <div class="font-bold capitalize">
      {{ account?.username[0] }}
    </div>
  </div>
  <Button v-else variant="secondary" class="w-min px-4 whitespace-nowrap">
    <NuxtLink to="/sign-in">Sign in</NuxtLink>
  </Button>
</template>
