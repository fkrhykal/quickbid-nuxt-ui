<script setup lang="ts">
definePageMeta({
  middleware: ['signed-in'],
})
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
  <main class="container mx-auto px-2">
    <div>
      <form @submit.prevent="">
        <InputText label="Product Name" id="listing-product-name" />
        <InputText label="Product Price" id="listing-product-price" />
        <Button type="submit"> Post </Button>
      </form>
    </div>
  </main>
</template>
