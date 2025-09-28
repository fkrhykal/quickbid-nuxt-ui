<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})

const isActive = ref(false)

const hide = () => {
  isActive.value = false
}
</script>
<template>
  <header
    class="sticky top-0 z-10 grid h-[4rem] place-items-center border-b border-b-slate-200 bg-white"
  >
    <nav
      class="container mx-auto flex h-full items-center justify-between gap-x-1 px-1"
    >
      <ClickOutside class="w-full" @click="isActive = true" :action="hide">
        <AuctionSearchBar />
      </ClickOutside>
      <Profile v-if="!isActive" class="h-[70%]" />
    </nav>
  </header>
  <main></main>
</template>
