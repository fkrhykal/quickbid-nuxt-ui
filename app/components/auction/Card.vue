

<script setup lang="ts">
const props = defineProps<{ auction: Auction }>()

const formatedHighestBid = computed(() => {
  const priceBid = props.auction.bidders.toSorted((a, b) => b.bid - a.bid)[0]
    ?.bid
  const format = Intl.NumberFormat('id-ID', {
    currency: 'IDR',
    currencyDisplay: 'symbol',
    currencySign: 'accounting',
    style: 'currency',
  })
  const highestBid = priceBid ?? props.auction.product.price
  return format.format(highestBid)
})
</script>

<template>
  <div class="gap-x-4 rounded-md border border-slate-200 p-2 shadow-lg">
    <div class="relative">
      <ImageSkeleton
        :img-attrs="{
          style: 'width:100%;height:100%;border-radius:6px;outline: none;',
        }"
        class="aspect-[8/12]"
        :src="auction.product.image"
      />
      <ClientOnly>
        <AuctionCountDown
          b
          class="absolute bottom-[0.5rem] left-[0.5rem] w-full max-w-[80%] bg-white/80"
          :closed-at="auction.closedAt"
        />
      </ClientOnly>
    </div>
    <div class="mt-2">
      <div>{{ auction.product.name }}</div>
      <p>{{ formatedHighestBid }}</p>
    </div>
  </div>
</template>
