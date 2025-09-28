<script setup lang="ts">
const { data: categories } = useAsyncData('categories', getCategories, {
  default() {
    return []
  },
  transform(categories) {
    return categories.map((c) => ({
      id: c.id,
      name: c.name,
      selected: false,
    }))
  },
})

const selectableCategories = reactive(categories)

const selectedCategories = computed(() => {
  return selectableCategories.value.filter((c) => c.selected)
})

const selectedCategoriesCount = computed(() => selectedCategories.value.length)

const isActive = ref(false)
</script>

<template>
  <div class="relative flex w-full rounded-md">
    <ClickOutside :action="() => (isActive = false)">
      <button
        type="button"
        @click="isActive = !isActive"
        class="grid place-items-center rounded-l-md border border-slate-200 px-3 py-2 text-slate-950 hover:bg-slate-50"
      >
        <Icon size="1.5rem" name="lucide:blocks" />
        <div
          class="order absolute -top-2 -left-2 grid aspect-square size-6 place-items-center rounded-md bg-slate-950 text-center text-sm text-white"
          v-if="selectedCategoriesCount > 0"
        >
          <div>
            {{ selectedCategoriesCount }}
          </div>
        </div>
      </button>
      <div
        class="absolute mt-1 max-h-screen min-w-[20rem] rounded-md border border-slate-200 bg-white p-2 shadow-lg"
        v-if="isActive"
      >
        <ul class="space-y-1">
          <li
            @click="category.selected = !category.selected"
            class="flex cursor-pointer justify-between rounded-md px-2 py-1 hover:bg-slate-100"
            v-for="category in selectableCategories"
          >
            <p>{{ category.name }}</p>
            <input
              class="accent-slate-950"
              type="checkbox"
              v-model="category.selected"
            />
          </li>
        </ul>
      </div>
    </ClickOutside>
    <input
      type="text"
      class="w-full border-y border-y-slate-200 bg-white px-4 focus:outline-none"
    />
    <button
      class="grid place-items-center rounded-r-md border-y border-r border-slate-200 px-3 py-2 text-slate-950 hover:bg-slate-50"
    >
      <Icon size="1.5rem" name="lucide:search" />
    </button>
  </div>
</template>
