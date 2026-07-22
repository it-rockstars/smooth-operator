<template>
  <div class="min-h-screen flex items-center justify-center py-12">
    <div class="max-w-xl mx-auto px-6 w-full">
      <!-- Step 1: Onboarding form -->
      <div v-if="step === 'form'" class="text-center">
        <div class="w-16 h-16 bg-accent rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
          🔒
        </div>
        <h1 class="text-3xl md:text-4xl font-bold mb-4">{{ t('onboarding.headline') }}</h1>
        <p class="text-lg text-rock-400 mb-8">{{ t('onboarding.description') }}</p>

        <form @submit.prevent="handleSubmit" class="bg-rock-900 border border-rock-700 rounded-xl p-6 text-left space-y-5">
          <div>
            <label class="block text-sm font-medium text-rock-200 mb-2">Work email</label>
            <input
              v-model="email"
              type="email"
              required
              placeholder="you@company.com"
              class="w-full bg-rock-800 border border-rock-700 rounded-lg px-4 py-3 text-sm text-white placeholder-rock-500 focus:outline-none focus:border-accent transition"
            />
          </div>

          <div class="flex items-start gap-3">
            <input id="terms" v-model="acceptedTerms" type="checkbox" required class="mt-1" />
            <label for="terms" class="text-sm text-rock-400">
              I accept the <a href="/legal" class="text-accent hover:underline">Terms of Service</a>.
            </label>
          </div>

          <div class="flex items-start gap-3">
            <input id="nda" v-model="acceptedNda" type="checkbox" required class="mt-1" />
            <label for="nda" class="text-sm text-rock-400">
              I accept the short NDA for sharing technical details.
            </label>
          </div>

          <div class="bg-rock-800/50 border border-rock-700 rounded-xl p-4">
            <h3 class="font-medium text-white mb-2 text-sm">{{ t('onboarding.security.title') }}</h3>
            <ul class="text-sm text-rock-400 space-y-1 list-disc list-inside">
              <li>{{ t('onboarding.security.item1') }}</li>
              <li>{{ t('onboarding.security.item2') }}</li>
              <li>{{ t('onboarding.security.item3') }}</li>
            </ul>
          </div>

          <button
            type="submit"
            :disabled="!canSubmit"
            class="w-full bg-accent hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium px-6 py-4 rounded-lg transition"
          >
            Start secure onboarding
          </button>
        </form>

        <div class="mt-6">
          <nuxt-link to="/chat" class="text-accent hover:text-accent-hover transition text-sm font-medium">
            ← Back to chat
          </nuxt-link>
        </div>
      </div>

      <!-- Step 2: Success -->
      <div v-else class="text-center">
        <div class="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
          ✓
        </div>
        <h1 class="text-3xl md:text-4xl font-bold mb-4">Account secured</h1>
        <p class="text-lg text-rock-400 mb-6">
          Welcome, {{ email }}. Your NDA is accepted and your data stays in the ITR data center.
        </p>

        <div class="bg-rock-900 border border-rock-700 rounded-xl p-6 text-left mb-8">
          <h3 class="font-medium text-white mb-4">What happens next</h3>
          <ul class="text-rock-400 space-y-2 list-disc list-inside">
            <li>Create your first case</li>
            <li>Choose response time</li>
            <li>Buy credits (mock checkout)</li>
            <li>We assign an operator via Telegram</li>
          </ul>
        </div>

        <nuxt-link
          to="/case/new"
          class="inline-block bg-accent hover:bg-accent-hover text-white font-medium px-8 py-4 rounded-lg transition"
        >
          Create first case →
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup>
const { t, initLocale } = useI18n()

const email = ref('')
const acceptedTerms = ref(false)
const acceptedNda = ref(false)
const step = ref('form')

const canSubmit = computed(() => {
  return email.value.includes('@') && acceptedTerms.value && acceptedNda.value
})

const handleSubmit = () => {
  // MOCK: In production this would create an account, store NDA acceptance, etc.
  step.value = 'success'
}

onMounted(() => {
  initLocale()
})
</script>
