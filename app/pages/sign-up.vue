<script setup lang="ts">
definePageMeta({
  middleware: ['guest'],
})

const router = useRouter()

const body = reactive({
  username: '',
  password: '',
})

const error = reactive<Partial<typeof body>>({
  username: undefined,
  password: undefined,
})

const hasError = computed(
  () => Boolean(error.username) || Boolean(error.password)
)

const clearError = (key: keyof typeof error) => {
  error[key] = undefined
}

const loading = ref(false)

type Result = {
  400: typeof error
  409: undefined
}

const submit = async () => {
  loading.value = true
  const csrf = useCsrf()
  await $fetch('/api/sign-up', {
    body,
    method: 'post',
    headers: {
      [csrf.headerName]: csrf.csrf,
    },
  })
    .then(() => router.push('/sign-in'))
    .catch(
      handleClientFetchError<Result>({
        409() {
          error.username = 'Username already used'
        },
        400(res) {
          error.username = res.username
          error.password = res.password
        },
      })
    )
    .finally(() => (loading.value = false))
}
</script>

<template>
  <NuxtLayout name="auth">
    <form class="space-y-4" @submit.prevent="submit">
      <div>
        <InputText
          @input="clearError('username')"
          v-model="body.username"
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
          v-model="body.password"
          id="password"
          label="Password"
        />
        <InputError
          v-if="error.password"
          class="mt-1.5"
          :message="error.password"
        />
      </div>
      <Button :disabled="hasError || loading" type="submit" class="mt-6 h-11">
        <Icon
          v-if="loading"
          size="1.5rem"
          class="animate-spin"
          name="lucide:loader-circle"
        />
        <p v-else>Sign up</p>
      </Button>
    </form>
    <p class="mt-4 text-center text-slate-800">
      Already have an account?
      <NuxtLink class="text-slate-900 underline" to="/sign-in"
        >Sign in</NuxtLink
      >
    </p>
  </NuxtLayout>
</template>
