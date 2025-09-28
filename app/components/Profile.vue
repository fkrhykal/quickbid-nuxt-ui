<script setup lang="ts">
const { account, signOut } = useAuth()
const router = useRouter()
const isActive = ref(false)

const hideMenu = () => {
  isActive.value = false
}
const toHome = () => {
  router.push('/')
}
</script>

<template>
  <Button
    v-if="!account"
    variant="secondary"
    class="w-min px-4 whitespace-nowrap"
  >
    <NuxtLink to="/sign-in">Sign in</NuxtLink>
  </Button>
  <ClickOutside v-else :action="hideMenu">
    <div
      @click="isActive = !isActive"
      class="relative grid aspect-square size-full cursor-pointer place-items-center rounded-full border border-slate-200 bg-slate-100 text-slate-500"
    >
      <div class="font-bold capitalize">
        {{ account.username[0] }}
      </div>
      <div
        v-if="isActive"
        class="absolute top-[100%] right-0 mt-1 w-max min-w-[14rem] rounded-md border border-slate-200 bg-white p-2 shadow-lg"
      >
        <ul class="space-y-1 text-slate-950">
          <li>
            <NuxtLink
              to="/profile"
              class="flex w-full cursor-pointer items-center gap-x-3 rounded-md p-2 hover:bg-slate-100"
            >
              <Icon size="1rem" name="lucide:user-round" />
              <p>Profile</p>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/dashboard"
              class="flex w-full cursor-pointer items-center gap-x-3 rounded-md p-2 hover:bg-slate-100"
            >
              <Icon size="1rem" name="lucide:megaphone" />
              <p>Dashboard</p>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/wallet"
              class="flex w-full cursor-pointer items-center gap-x-3 rounded-md p-2 hover:bg-slate-100"
            >
              <Icon size="1rem" name="lucide:wallet-cards" />
              <p>Wallet</p>
            </NuxtLink>
          </li>
          <div class="h-[1px] w-full bg-slate-200"></div>
          <li
            @click="signOut(toHome)"
            class="flex w-full cursor-pointer items-center gap-x-3 rounded-md p-2 hover:bg-red-100"
          >
            <Icon size="1rem" name="lucide:log-out" />
            <p>Sign out</p>
          </li>
        </ul>
      </div>
    </div>
  </ClickOutside>
</template>
