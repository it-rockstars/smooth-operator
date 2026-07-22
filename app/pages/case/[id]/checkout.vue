<template>
  <div class="min-h-screen py-12 md:py-20">
    <div class="max-w-2xl mx-auto px-6">
      <div v-if="step === 'checkout'" class="text-center">
        <h1 class="text-3xl md:text-4xl font-bold mb-4">Buy credits</h1>
        <p class="text-rock-400 mb-8">Mock Stripe checkout. No real payment today.</p>

        <div class="bg-rock-900 border border-rock-700 rounded-xl p-6 text-left mb-6">
          <h3 class="font-medium text-white mb-4">Choose a credit package</h3>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              v-for="pkg in packages"
              :key="pkg.id"
              type="button"
              @click="selected = pkg.id"
              :class="[
                'border rounded-lg p-4 text-left transition',
                selected === pkg.id
                  ? 'border-accent bg-accent/10'
                  : 'border-rock-700 bg-rock-800 hover:border-rock-600'
              ]"
            >
              <div class="font-medium text-white">{{ pkg.name }}</div>
              <div class="text-accent font-bold">{{ pkg.price }}</div>
              <div class="text-xs text-rock-400">{{ pkg.credits }} Credits</div>
            </button>
          </div>
        </div>

        <button
          @click="pay"
          class="w-full bg-accent hover:bg-accent-hover text-white font-medium px-6 py-4 rounded-lg transition"
        >
          Pay with Stripe (mock)
        </button>
      </div>

      <div v-else class="text-center">
        <div class="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
          ✓
        </div>
        <h1 class="text-3xl md:text-4xl font-bold mb-4">Payment successful</h1>
        <p class="text-lg text-rock-400 mb-6">
          {{ selectedPackage.credits }} Credits added. Case <strong class="text-white">#{{ caseId }}</strong> is now live.
        </p>

        <div class="bg-rock-900 border border-rock-700 rounded-xl p-6 text-left mb-8">
          <h3 class="font-medium text-white mb-4">Operator assignment (mock)</h3>
          <div v-if="!assigned" class="space-y-3">
            <p class="text-rock-400 text-sm">Notifying operators via Telegram bot...</p>
            <div class="flex items-center gap-2 text-sm text-rock-400">
              <span class="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
              Waiting for an operator to accept...
            </div>
          </div>
          <div v-else class="space-y-3">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-rock-700 rounded-full flex items-center justify-center text-white font-bold">F</div>
              <div>
                <div class="font-medium text-white">Fahad accepted your case</div>
                <div class="text-sm text-rock-400">K8s · AWS · Debug · Reputation: 4.9★</div>
              </div>
            </div>
          </div>
        </div>

        <nuxt-link
          :to="`/case/${caseId}`"
          class="inline-block bg-accent hover:bg-accent-hover text-white font-medium px-8 py-4 rounded-lg transition"
        >
          Open mission dashboard →
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const caseId = route.params.id

const { initLocale } = useI18n()

const step = ref('checkout')
const selected = ref('growth')
const assigned = ref(false)

const packages = [
  { id: 'starter', name: 'Starter', credits: '1', price: '~€299' },
  { id: 'growth', name: 'Growth', credits: '5', price: '~€1.249' },
  { id: 'scale', name: 'Scale', credits: '15', price: '~€3.499' }
]

const selectedPackage = computed(() => packages.find(p => p.id === selected.value))

const pay = () => {
  step.value = 'success'
  // MOCK: simulate Telegram operator assignment after 2 seconds
  setTimeout(() => {
    assigned.value = true
  }, 2000)
}

onMounted(() => {
  initLocale()
})
</script>
