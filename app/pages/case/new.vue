<template>
  <div class="min-h-screen py-12 md:py-20">
    <div class="max-w-2xl mx-auto px-6">
      <div class="mb-8">
        <nuxt-link to="/onboarding" class="text-accent hover:text-accent-hover text-sm font-medium">
          ← Back to onboarding
        </nuxt-link>
      </div>

      <h1 class="text-3xl md:text-4xl font-bold mb-4">Create a case</h1>
      <p class="text-rock-400 mb-8">Describe what burns. Logs and credentials are safe under your accepted NDA.</p>

      <form @submit.prevent="handleSubmit" class="bg-rock-900 border border-rock-700 rounded-xl p-6 space-y-6">
        <div>
          <label class="block text-sm font-medium text-rock-200 mb-2">Title</label>
          <input
            v-model="form.title"
            type="text"
            required
            placeholder="e.g. Kubernetes pod keeps crashing"
            class="w-full bg-rock-800 border border-rock-700 rounded-lg px-4 py-3 text-sm text-white placeholder-rock-500 focus:outline-none focus:border-accent transition"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-rock-200 mb-2">Description</label>
          <textarea
            v-model="form.description"
            rows="4"
            required
            placeholder="What happened? What did you try?"
            class="w-full bg-rock-800 border border-rock-700 rounded-lg px-4 py-3 text-sm text-white placeholder-rock-500 focus:outline-none focus:border-accent transition"
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-rock-200 mb-2">Affected systems</label>
          <select
            v-model="form.system"
            class="w-full bg-rock-800 border border-rock-700 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-accent transition"
          >
            <option value="kubernetes">Kubernetes</option>
            <option value="aws">AWS</option>
            <option value="azure">Azure</option>
            <option value="cicd">CI/CD</option>
            <option value="monitoring">Monitoring</option>
            <option value="auth">Auth / SSO</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-rock-200 mb-3">Response time</label>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label
              v-for="tier in tiers"
              :key="tier.id"
              :class="[
                'cursor-pointer border rounded-lg p-4 transition',
                form.tier === tier.id
                  ? 'border-accent bg-accent/10'
                  : 'border-rock-700 bg-rock-800 hover:border-rock-600'
              ]"
            >
              <input v-model="form.tier" type="radio" :value="tier.id" class="sr-only" />
              <div class="flex justify-between items-center">
                <span class="font-medium text-white">{{ tier.label }}</span>
                <span class="text-accent font-bold">{{ tier.price }}</span>
              </div>
              <p class="text-xs text-rock-400 mt-1">{{ tier.time }}</p>
            </label>
          </div>
        </div>

        <div class="bg-rock-800/50 border border-rock-700 rounded-lg p-4">
          <p class="text-sm text-rock-400">
            <span class="text-accent">MOCK:</span> File upload is simulated. In production logs go to encrypted S3 in eu-central-1.
          </p>
          <input type="file" class="mt-3 w-full text-sm text-rock-400" />
        </div>

        <button
          type="submit"
          class="w-full bg-accent hover:bg-accent-hover text-white font-medium px-6 py-4 rounded-lg transition"
        >
          Continue to credits →
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
const { initLocale } = useI18n()

const form = ref({
  title: '',
  description: '',
  system: 'kubernetes',
  tier: 'standard'
})

const tiers = [
  { id: 'standard', label: 'Standard', time: '4 hours', price: '1 Credit' },
  { id: 'express', label: 'Express', time: '1 hour', price: '1.5 Credits' },
  { id: 'priority', label: 'Priority', time: '30 minutes', price: '2 Credits' },
  { id: 'emergency', label: 'Emergency', time: '15 minutes', price: '3 Credits' }
]

const handleSubmit = () => {
  // MOCK: store case in local state/session, navigate to mock checkout
  const caseId = Math.random().toString(36).slice(2, 10).toUpperCase()
  navigateTo(`/case/${caseId}/checkout`)
}

onMounted(() => {
  initLocale()
})
</script>
