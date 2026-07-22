<template>
  <div class="min-h-screen py-12 md:py-20">
    <div class="max-w-4xl mx-auto px-6">
      <div class="mb-8">
        <nuxt-link to="/" class="text-accent hover:text-accent-hover text-sm font-medium">
          ← Back to homepage
        </nuxt-link>
      </div>

      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 class="text-3xl font-bold">Mission #{{ caseId }}</h1>
          <p class="text-rock-400">Kubernetes pod keeps crashing · Priority (30 min)</p>
        </div>
        <div class="px-4 py-2 bg-accent/10 border border-accent rounded-lg">
          <span class="text-accent font-medium">Status: In Progress</span>
        </div>
      </div>

      <div class="grid md:grid-cols-3 gap-6 mb-8">
        <div class="bg-rock-900 border border-rock-700 rounded-xl p-6">
          <div class="text-sm text-rock-400 mb-1">Operator</div>
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-rock-700 rounded-full flex items-center justify-center text-white font-bold">F</div>
            <div class="font-medium text-white">Fahad</div>
          </div>
        </div>

        <div class="bg-rock-900 border border-rock-700 rounded-xl p-6">
          <div class="text-sm text-rock-400 mb-1">Remaining credits</div>
          <div class="text-2xl font-bold text-white">3.0</div>
        </div>

        <div class="bg-rock-900 border border-rock-700 rounded-xl p-6">
          <div class="text-sm text-rock-400 mb-1">Response timer</div>
          <div class="text-2xl font-bold text-accent">18:42</div>
        </div>
      </div>

      <div class="bg-rock-900 border border-rock-700 rounded-xl p-6 mb-8">
        <h2 class="text-xl font-bold mb-4">Activity log (mock)</h2>
        <div class="space-y-4"
        >
          <div class="flex gap-4">
            <div class="text-xs text-rock-500 w-16">10:02</div>
            <div class="text-rock-200">Case created</div>
          </div>
          <div class="flex gap-4">
            <div class="text-xs text-rock-500 w-16">10:03</div>
            <div class="text-rock-200">Credits purchased: 5 Credits</div>
          </div>
          <div class="flex gap-4">
            <div class="text-xs text-rock-500 w-16">10:04</div>
            <div class="text-rock-200">Telegram notification sent to 3 operators</div>
          </div>
          <div class="flex gap-4">
            <div class="text-xs text-rock-500 w-16">10:05</div>
            <div class="text-rock-200">Fahad accepted the case</div>
          </div>
        </div>
      </div>

      <div class="bg-rock-900 border border-rock-700 rounded-xl p-6">
        <h2 class="text-xl font-bold mb-4">Secure chat</h2>
        <div class="space-y-3 mb-4">
          <div class="bg-rock-800 rounded-lg p-3">
            <div class="text-xs text-rock-500 mb-1">Fahad · 10:06</div>
            <div class="text-sm text-rock-200">Hi, I'm on it. Can you share the pod logs or a screenshot of the events?</div>
          </div>
        </div>
        <div class="flex gap-3"
        >
          <input
            type="text"
            placeholder="Type a secure message..."
            class="flex-1 bg-rock-800 border border-rock-700 rounded-lg px-4 py-3 text-sm text-white placeholder-rock-500 focus:outline-none focus:border-accent transition"
          />
          <button class="bg-accent hover:bg-accent-hover text-white font-medium px-5 py-3 rounded-lg transition">Send</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const caseId = route.params.id

const { initLocale } = useI18n()

onMounted(() => {
  initLocale()
})
</script>
