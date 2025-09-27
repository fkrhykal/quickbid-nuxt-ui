<script setup lang="ts">
const router = useRouter()

const { submit, error, password, username, hasError, clearError } = useForm({
  payload: { username: '', password: '' },
  requestHandler: signUpHandler,
  responseHandler: {
    200: () => {
      router.push('/sign-in')
    },
    409: (res) => {
      error.username = res.error
    },
  },
})
</script>

<template>
  <main class="grid min-h-screen md:grid-cols-2">
    <section class="m-4 hidden rounded-md bg-slate-950 md:flex"></section>
    <section class="grid place-items-center">
      <div
        class="w-full max-w-[25rem] rounded-md border border-slate-200 p-12 shadow-lg"
      >
        <form class="space-y-4" @submit.prevent="submit">
          <div>
            <InputText
              @input="clearError('username')"
              v-model="username"
              id="username"
              label="Username"
            />
            <InputError
              v-if="error.username"
              class="mt-1.5"
              :message="error.username"
            />
          </div>
          <div>
            <InputPassword
              @input="clearError('password')"
              v-model="password"
              id="password"
              label="Password"
            />
            <InputError
              v-if="error.password"
              class="mt-1.5"
              :message="error.password"
            />
          </div>
          <Button :disabled="hasError" type="submit" class="mt-6"
            >Sign up</Button
          >
        </form>
        <p class="mt-4 text-center text-slate-800">
          Already have an account?
          <NuxtLink class="text-slate-900 underline" to="/sign-in"
            >Sign in</NuxtLink
          >
        </p>
      </div>
    </section>
  </main>
</template>
