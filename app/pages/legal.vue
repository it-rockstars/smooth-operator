<template>
  <div class="max-w-3xl mx-auto px-6 py-16">
    <h1 class="text-4xl font-bold mb-10">{{ t('nav.legal') }}</h1>

    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Impressum / Legal Notice</h2>
      <div class="bg-rock-800/30 border border-rock-800 rounded-xl p-6 text-rock-300 space-y-2">
        <p class="font-semibold text-white">IT-Rockstars Services S.L.</p>
        <p>NIF: B98537681</p>
        <p>Calle Conde de Salvatierra 21</p>
        <p>E-46004 Valencia</p>
        <p>Spain</p>
        <p class="pt-2">E-Mail: operator@smooth-operator.io</p>
      </div>
    </section>

    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Datenschutz / Privacy</h2>
      <div class="prose prose-invert max-w-none text-rock-300">
        <p>
          Diese Seite befindet sich in der geschützten Vorschau. Es werden nur technisch notwendige Daten verarbeitet.
          Bei einer Bestellung über Telegram oder Stripe gelten die Datenschutzbestimmungen der jeweiligen Anbieter.
        </p>
        <p>
          Verantwortlicher für die Datenverarbeitung:
        </p>
        <p>IT-Rockstars Services S.L., Calle Conde de Salvatierra 21, E-46004 Valencia, Spain</p>
      </div>
    </section>

    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">AGB / Terms</h2>
      <div class="prose prose-invert max-w-none text-rock-300">
        <p><strong>1. Leistungsgegenstand</strong></p>
        <p>Smooth Operator bietet On-Demand-Technik-Support für Startups und KMUs. Die Leistungen werden in Credits abgerechnet.</p>

        <p><strong>2. Credits & Garantie</strong></p>
        <p>Credits sind im Voraus zu erwerben. Die 30-Minuten-Antwortgarantie gilt während der Geschäftszeiten (EU, Mo–Fr 9–18 Uhr) für Kunden mit positivem Credit-Guthaben.</p>

        <p><strong>3. Vertragspartner</strong></p>
        <p>Vertragspartner ist IT-Rockstars Services S.L., Spanien. Ausführende Operatoren handeln im Auftrag der IT-Rockstars Services S.L.</p>

        <p><strong>4. Haftung</strong></p>
        <p>Die Haftung beschränkt sich auf Vorsatz und grobe Fahrlässigkeit. Für Datenverluste liegt die Haftung beim Auftraggeber, soweit keine gesetzlichen Zwingungsgründe entgegenstehen.</p>
      </div>
    </section>
  </div>
</template>

<script setup>
const { t, initLocale } = useI18n()

onMounted(() => {
  initLocale()
})
</script>
