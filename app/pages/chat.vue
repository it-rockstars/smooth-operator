<template>
  <div class="min-h-screen py-12 md:py-20">
    <div class="max-w-6xl mx-auto px-6">
      <div class="text-center mb-10">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ t('chatbotPage.headline') }}</h1>
        <p class="text-lg text-rock-400 max-w-2xl mx-auto">{{ t('chatbotPage.description') }}</p>
      </div>

      <ChatBot />

      <div class="mt-12 max-w-2xl mx-auto text-center">
        <p class="text-sm text-rock-500 mb-4">{{ t('chatbotPage.hint') }}</p>
        <nuxt-link to="/" class="text-accent hover:text-accent-hover transition text-sm font-medium">
          ← {{ t('chatbotPage.back') }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup>
const { t, initLocale } = useI18n()

onMounted(() => {
  initLocale()
})
</script>
