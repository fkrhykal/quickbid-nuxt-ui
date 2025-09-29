<script setup lang="ts">
definePageMeta({
  middleware: ['signed-in'],
})

const tab = {
  Listings: 1,
  Bids: 2,
} as const

type Tab = (typeof tab)[keyof typeof tab]

const activeTab = ref<Tab>(tab.Listings)

const showTab = ref(false)
</script>

<template>
  <header
    class="sticky top-0 z-10 grid h-[4rem] place-items-center border-b border-b-slate-200 bg-white"
  >
    <nav
      class="container mx-auto flex h-full items-center justify-between gap-x-1 px-1"
    >
      <NuxtLink to="/">Home</NuxtLink>
      <Profile class="h-[70%]" />
    </nav>
  </header>
  <ClickOutside
    :action="() => (showTab = false)"
    class="container mx-auto px-1"
  >
    <div
      :class="{ hidden: !showTab }"
      class="fixed z-10 min-h-screen min-w-[10rem] border-r border-slate-200 bg-white py-1 pr-1 lg:block"
    >
      <ul class="space-y-1">
        <li
          @click="activeTab = tab.Listings"
          :class="{
            'bg-slate-100 hover:bg-slate-100': activeTab === tab.Listings,
          }"
          class="flex items-center gap-x-3 rounded-md px-4 py-2 hover:bg-slate-50"
        >
          <Icon size="1.25rem" name="lucide:banknote" />
          <p>Listings</p>
        </li>
        <li
          @click="activeTab = tab.Bids"
          :class="{
            'bg-slate-100 hover:bg-slate-100': activeTab === tab.Bids,
          }"
          class="flex items-center gap-x-3 rounded-md px-4 py-2 hover:bg-slate-50"
        >
          <Icon size="1.25rem" name="lucide:banknote" />
          <p>Bids</p>
        </li>
      </ul>
    </div>
    <div class="flex items-center gap-x-4 py-2 lg:hidden">
      <button
        @click="showTab = true"
        class="grid place-items-center rounded-md border border-slate-200 px-4 py-2"
      >
        <Icon name="lucide:menu" />
      </button>
      <div class="text-lg font-semibold">
        <p v-if="activeTab === tab.Listings">Listings</p>
        <p v-if="activeTab === tab.Bids">Bids</p>
      </div>
    </div>
  </ClickOutside>
  <main class="container mx-auto flex px-1">
    <div class="w-full py-1 lg:ml-[10rem] lg:pl-1">
      <ListingsTab class="w-full" v-if="activeTab === tab.Listings" />
    </div>
  </main>
</template>
