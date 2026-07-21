<template>
  <div class="flex items-center gap-2">
    <button
      v-for="loc in locales"
      :key="loc"
      @click="setLocale(loc)"
      :class="[
        'text-xs font-medium px-2 py-1 rounded transition',
        locale === loc
          ? 'bg-accent text-white'
          : 'text-rock-400 hover:text-white hover:bg-rock-800'
      ]"
    >
      {{ loc.toUpperCase() }}
    </button>
  </div>
</template>

<script setup>
const { locale, locales, setLocale } = useI18n()
</script>
