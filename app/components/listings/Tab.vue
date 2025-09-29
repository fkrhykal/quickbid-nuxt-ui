<script setup lang="ts">
const { data: listings } = useAsyncData('listings', getAuctions, {
  dedupe: 'cancel',
})
</script>

<template>
  <div>
    <div class="flex justify-between gap-x-1">
      <div
        class="flex w-full justify-between rounded-md border border-slate-200"
      >
        <input type="text" class="w-full p-2 focus:outline-none" />
        <button class="flex items-center rounded-r-md px-4 hover:bg-slate-100">
          <Icon name="lucide:search" />
        </button>
      </div>
      <NuxtLink to="/dashboard/create-auction">
        <Button variant="ghost" class="w-min gap-x-2 px-4">
          <Icon name="lucide:circle-plus" />
          <p>New</p>
        </Button>
      </NuxtLink>
    </div>
    <ListingsTable class="mt-1" v-if="listings" :listings />
  </div>
</template>
