<script setup lang="ts">
const error = ref<string>()
const router = useRouter()

const { username, password, submit } = useForm({
  payload: { username: '', password: '' },
  requestHandler: signInHandler,
  responseHandler: {
    200: () => {
      router.push('/')
    },
    401: () => {
      error.value = 'Username or password wrong'
    },
    500: () => {
      error.value = 'An error occured. Please try again later'
    },
  },
})
</script>

<template>
  <NuxtLayout name="auth">
    <form class="space-y-4" @submit.prevent="submit">
      <div class="space-y-4">
        <InputText
          @input="error = undefined"
          v-model="username"
          id="username"
          label="Username"
        />
        <InputPassword
          @input="error = undefined"
          v-model="password"
          id="password"
          label="Password"
        />
        <InputError v-if="error" :message="error" />
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
