<template>
  <main class="grid min-h-screen lg:grid-cols-2">
    <section class="m-4 hidden rounded-md bg-slate-950 lg:flex"></section>
    <section class="grid place-items-center">
      <div
        class="w-full max-w-[25rem] rounded-md border border-slate-200 p-12 shadow-lg"
      >
        <slot />
      </div>
    </section>
  </main>
</template>
