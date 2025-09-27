<script setup lang="ts">
const { data: categories } = useAsyncData(getCategories)
const { data: auctions } = useAsyncData(getAuctions)

const isActive = ref(false)

const hide = () => (isActive.value = false)
</script>

<template>
  <header
    class="sticky top-0 z-10 grid h-[4rem] place-items-center border-b border-b-slate-200 bg-white"
  >
    <nav
      class="container mx-auto flex h-full items-center justify-between gap-x-1 px-1"
    >
      <ClickOutside class="w-full" @click="isActive = true" :action="hide">
        <SearchBar v-if="categories" :categories="categories" />
      </ClickOutside>
      <Profile v-if="!isActive" class="h-[70%]" />
    </nav>
  </header>
  <main class="container mx-auto mt-2 space-y-4 px-1">
    <div class="grid justify-between gap-4 md:grid-cols-2 lg:grid-cols-4">
      <AuctionCard
        class="w-full"
        v-if="auctions"
        v-for="auction in auctions"
        :auction
      />
    </div>
  </main>
</template>
