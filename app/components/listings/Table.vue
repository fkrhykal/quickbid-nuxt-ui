<script setup lang="ts">
defineProps<{ listings: Auction[] }>()
</script>

<template>
  <div class="flex flex-col">
    <div class="-m-1.5 overflow-x-auto">
      <div class="inline-block min-w-full p-1.5 align-middle">
        <div class="overflow-hidden rounded-lg border border-gray-200">
          <table class="w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 text-start text-xs text-gray-500 uppercase"
                >
                  Name
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-start text-xs text-gray-500 uppercase"
                >
                  Price
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-start text-xs text-gray-500 uppercase"
                >
                  ID
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="listing in listings">
                <td
                  class="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-800"
                >
                  {{ listing.product.name }}
                </td>
                <td class="px-6 py-4 text-sm whitespace-nowrap text-gray-800">
                  {{ listing.product.price }}
                </td>
                <td class="px-6 py-4 text-sm whitespace-nowrap text-gray-800">
                  {{ listing.id }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
