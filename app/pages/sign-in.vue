<script setup lang="ts">
definePageMeta({
  middleware: ['guest'],
})

const { signIn } = useAuth()
const router = useRouter()

const error = ref(false)
const body = reactive({
  username: '',
  password: '',
})

const submit = async () => {
  await signIn({
    body,
    onResponseError() {
      error.value = true
    },
  })
  await router.push('/')
}
</script>

<template>
  <NuxtLayout name="auth">
    <form class="space-y-4" @submit.prevent="submit">
      <div class="space-y-4">
        <InputText v-model="body.username" id="username" label="Username" />
        <InputPassword v-model="body.password" id="password" label="Password" />
        <InputError v-if="error" message="Username or password wrong" />
      </div>
      <Button type="submit" class="mt-6">Sign in</Button>
    </form>
    <p class="mt-4 text-center text-slate-800">
      Doesn't have an account?
      <NuxtLink class="text-slate-900 underline" to="/sign-up"
        >Sign up</NuxtLink
      >
    </p>
  </NuxtLayout>
</template>
