<template>
  <div class="min-h-screen flex flex-col">
    <header class="border-b border-rock-800 bg-rock-950/80 backdrop-blur sticky top-0 z-50">
      <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <nuxt-link to="/" class="text-xl font-bold tracking-tight">
          Smooth <span class="text-accent">Operator</span>
        </nuxt-link>
        <nav class="hidden md:flex items-center gap-8 text-sm text-rock-300">
          <a href="#services" class="hover:text-white transition">{{ t('nav.services') }}</a>
          <a href="#operators" class="hover:text-white transition">{{ t('nav.operators') }}</a>
          <a href="#pricing" class="hover:text-white transition">{{ t('nav.pricing') }}</a>
          <a href="#contact" class="hover:text-white transition">{{ t('nav.contact') }}</a>
          <nuxt-link to="/legal" class="hover:text-white transition">{{ t('nav.legal') }}</nuxt-link>
        </nav>
        <LangSwitcher />
      </div>
    </header>

    <main class="flex-1">
      <slot />
    </main>

    <footer class="border-t border-rock-800 bg-rock-900 py-8">
      <div class="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-rock-400">
        <p>{{ t('footer.copyright') }}</p>
        <nuxt-link to="/legal" class="hover:text-white transition">{{ t('footer.legal') }}</nuxt-link>
      </div>
    </footer>
  </div>
</template>

<script setup>
const { t } = useI18n()
</script>
