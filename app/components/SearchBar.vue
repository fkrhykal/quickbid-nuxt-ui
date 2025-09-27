<script lang="ts">
type SelectableCategory = Category & {
  selected: boolean
}
</script>

<script setup lang="ts">
const props = defineProps<{ categories: Category[] }>()

const selectableCategories = reactive<SelectableCategory[]>(
  props.categories.map((category) => {
    return { ...category, selected: false }
  })
)

const selectedCategories = computed(() => {
  return selectableCategories.filter((c) => c.selected)
})

const selectedCategoriesCount = computed(() => selectedCategories.value.length)

const isShowCategories = ref(false)
</script>

<template>
  <div class="relative flex w-full rounded-md">
    <ClickOutside :action="() => (isShowCategories = false)">
      <button
        @click="isShowCategories = !isShowCategories"
        class="grid place-items-center rounded-l-md border border-slate-200 px-3 py-2 text-slate-950"
      >
        <Icon class="size-6" name="lucide:blocks" />
        <div
          class="order absolute -top-2 -left-2 grid aspect-square size-6 place-items-center rounded-md bg-slate-950 text-center text-sm text-white"
          v-if="selectedCategoriesCount > 0"
        >
          <div>
            {{ selectedCategoriesCount }}
          </div>
        </div>
      </button>
      <Transition>
        <div
          class="absolute mt-1 max-h-screen min-w-[20rem] rounded-md border border-slate-200 bg-white p-2 shadow-lg"
          v-if="isShowCategories"
        >
          <ul class="space-y-1">
            <li
              @click="category.selected = !category.selected"
              class="flex cursor-pointer justify-between rounded-md px-2 py-1 hover:bg-slate-50"
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
      </Transition>
    </ClickOutside>
    <input
      type="text"
      class="w-full border-y border-y-slate-200 bg-white px-4 focus:outline-none"
    />
    <button
      class="grid place-items-center rounded-r-md border-y border-r border-slate-200 px-3 py-2 text-slate-950"
    >
      <Icon class="size-6" name="lucide:search" />
    </button>
  </div>
</template>
