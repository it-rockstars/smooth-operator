<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden py-24 md:py-32">
      <div class="max-w-6xl mx-auto px-6 text-center">
        <h1 class="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          {{ t('hero.headline') }}
        </h1>
        <p class="text-xl md:text-2xl text-rock-300 mb-4">
          {{ t('hero.subheadline') }}
        </p>
        <p class="text-lg text-rock-400 max-w-2xl mx-auto mb-10">
          {{ t('hero.description') }}
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <a
            href="#contact"
            class="bg-accent hover:bg-accent-hover text-white font-semibold px-8 py-4 rounded-lg transition"
          >
            {{ t('hero.ctaPrimary') }}
          </a>
          <a
            href="https://t.me/smoothoperator_bot"
            target="_blank"
            rel="noopener"
            class="bg-rock-800 hover:bg-rock-700 text-white font-semibold px-8 py-4 rounded-lg transition"
          >
            {{ t('hero.ctaSecondary') }}
          </a>
        </div>
        <p class="text-sm text-rock-500">{{ t('hero.trust') }}</p>
      </div>
    </section>

    <!-- How it works -->
    <section class="py-20 bg-rock-900">
      <div class="max-w-6xl mx-auto px-6">
        <h2 class="text-3xl font-bold mb-12 text-center">{{ t('how.title') }}</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div
            v-for="(step, idx) in steps"
            :key="idx"
            class="bg-rock-800/50 border border-rock-700 rounded-xl p-8 text-center"
          >
            <div class="w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
              {{ idx + 1 }}
            </div>
            <h3 class="text-xl font-semibold mb-2">{{ step.title }}</h3>
            <p class="text-rock-400">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Services -->
    <section id="services" class="py-20">
      <div class="max-w-6xl mx-auto px-6">
        <h2 class="text-3xl font-bold mb-12 text-center">{{ t('services.title') }}</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="service in services"
            :key="service.key"
            class="bg-rock-800/30 border border-rock-800 rounded-xl p-6 hover:border-accent/50 transition"
          >
            <h3 class="text-xl font-semibold mb-2">{{ service.title }}</h3>
            <p class="text-rock-300 mb-3">{{ service.desc }}</p>
            <p class="text-sm text-rock-500">{{ service.detail }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Operators -->
    <section id="operators" class="py-20 bg-rock-900">
      <div class="max-w-6xl mx-auto px-6">
        <h2 class="text-3xl font-bold mb-12 text-center">{{ t('operators.title') }}</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div
            v-for="op in operators"
            :key="op.key"
            class="bg-rock-800/50 border border-rock-700 rounded-xl p-8 text-center"
          >
            <div class="w-20 h-20 bg-rock-700 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl">
              {{ op.avatar }}
            </div>
            <h3 class="text-2xl font-semibold mb-1">{{ op.name }}</h3>
            <p class="text-accent text-sm font-medium mb-3">{{ op.role }}</p>
            <p class="text-rock-400">{{ op.bio }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing -->
    <section id="pricing" class="py-20">
      <div class="max-w-6xl mx-auto px-6">
        <h2 class="text-3xl font-bold mb-4 text-center">{{ t('pricing.title') }}</h2>
        <p class="text-rock-400 text-center mb-12">{{ t('pricing.subtitle') }}</p>

        <div class="grid md:grid-cols-3 gap-8">
          <div
            v-for="plan in plans"
            :key="plan.key"
            :class="[
              'rounded-xl p-8 border transition',
              plan.featured
                ? 'bg-rock-800 border-accent'
                : 'bg-rock-800/30 border-rock-800'
            ]"
          >
            <div v-if="plan.badge" class="text-xs font-bold text-accent uppercase tracking-wider mb-2">{{ plan.badge }}</div>
            <h3 class="text-xl font-semibold mb-2">{{ plan.name }}</h3>
            <p class="text-3xl font-bold mb-1">{{ plan.price }}</p>
            <p class="text-accent font-medium mb-4">{{ plan.credits }}</p>
            <p class="text-rock-400 text-sm mb-6">{{ plan.desc }}</p>

            <a
              href="#contact"
              :class="[
                'block text-center font-semibold px-6 py-3 rounded-lg transition',
                plan.featured
                  ? 'bg-accent hover:bg-accent-hover text-white'
                  : 'bg-rock-700 hover:bg-rock-600 text-white'
              ]"
            >
              {{ t('pricing.cta') }}
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Proof of Value -->
    <section class="py-20 bg-rock-900">
      <div class="max-w-4xl mx-auto px-6 text-center">
        <h2 class="text-3xl font-bold mb-4">{{ t('proof.title') }}</h2>
        <p class="text-rock-400 text-lg">{{ t('proof.desc') }}</p>
      </div>
    </section>

    <!-- Differentiators -->
    <section class="py-20">
      <div class="max-w-6xl mx-auto px-6">
        <h2 class="text-3xl font-bold mb-12 text-center">{{ t('different.title') }}</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div
            v-for="diff in differentiators"
            :key="diff.key"
            class="bg-rock-800/30 border border-rock-800 rounded-xl p-6"
          >
            <h3 class="text-xl font-semibold mb-2">{{ diff.title }}</h3>
            <p class="text-rock-400">{{ diff.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact -->
    <section id="contact" class="py-20 bg-rock-900">
      <div class="max-w-6xl mx-auto px-6">
        <h2 class="text-3xl font-bold mb-12 text-center">{{ t('contact.title') }}</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-rock-800/50 border border-rock-700 rounded-xl p-6">
            <h3 class="text-xl font-semibold mb-2">{{ t('contact.chat.title') }}</h3>
            <p class="text-rock-400">{{ t('contact.chat.desc') }}</p>
          </div>
          <a
            href="https://t.me/smoothoperator_bot"
            target="_blank"
            rel="noopener"
            class="bg-rock-800/50 border border-rock-700 rounded-xl p-6 hover:border-accent/50 transition"
          >
            <h3 class="text-xl font-semibold mb-2">{{ t('contact.telegram.title') }}</h3>
            <p class="text-rock-400">{{ t('contact.telegram.desc') }}</p>
          </a>
          <a
            href="mailto:operator@smooth-operator.io"
            class="bg-rock-800/50 border border-rock-700 rounded-xl p-6 hover:border-accent/50 transition"
          >
            <h3 class="text-xl font-semibold mb-2">{{ t('contact.email.title') }}</h3>
            <p class="text-rock-400">{{ t('contact.email.desc') }}</p>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { t, initLocale } = useI18n()

const steps = computed(() => [
  { title: t('how.step1.title'), desc: t('how.step1.desc') },
  { title: t('how.step2.title'), desc: t('how.step2.desc') },
  { title: t('how.step3.title'), desc: t('how.step3.desc') }
])

const services = computed(() => [
  { key: 'bugfinder', title: t('services.bugfinder.title'), desc: t('services.bugfinder.desc'), detail: t('services.bugfinder.detail') },
  { key: 'bugfixer', title: t('services.bugfixer.title'), desc: t('services.bugfixer.desc'), detail: t('services.bugfixer.detail') },
  { key: 'kickstarter', title: t('services.kickstarter.title'), desc: t('services.kickstarter.desc'), detail: t('services.kickstarter.detail') },
  { key: 'enabler', title: t('services.enabler.title'), desc: t('services.enabler.desc'), detail: t('services.enabler.detail') },
  { key: 'healthcheck', title: t('services.healthcheck.title'), desc: t('services.healthcheck.desc'), detail: t('services.healthcheck.detail') }
])

const operators = computed(() => [
  { key: 'fahad', name: t('operators.fahad.name'), role: t('operators.fahad.role'), bio: t('operators.fahad.bio'), avatar: 'F' },
  { key: 'flo', name: t('operators.flo.name'), role: t('operators.flo.role'), bio: t('operators.flo.bio'), avatar: 'F' },
  { key: 'rainer', name: t('operators.rainer.name'), role: t('operators.rainer.role'), bio: t('operators.rainer.bio'), avatar: 'R' }
])

const plans = computed(() => [
  { key: 'starter', name: t('pricing.starter.name'), price: t('pricing.starter.price'), credits: t('pricing.starter.credits'), desc: t('pricing.starter.desc'), featured: false },
  { key: 'growth', name: t('pricing.growth.name'), price: t('pricing.growth.price'), credits: t('pricing.growth.credits'), desc: t('pricing.growth.desc'), featured: true, badge: t('pricing.growth.badge') },
  { key: 'scale', name: t('pricing.scale.name'), price: t('pricing.scale.price'), credits: t('pricing.scale.credits'), desc: t('pricing.scale.desc'), featured: false }
])

const differentiators = computed(() => [
  { key: 'qa', title: t('different.qa.title'), desc: t('different.qa.desc') },
  { key: 'requirements', title: t('different.requirements.title'), desc: t('different.requirements.desc') },
  { key: 'ai', title: t('different.ai.title'), desc: t('different.ai.desc') }
])

onMounted(() => {
  initLocale()
})
</script>
