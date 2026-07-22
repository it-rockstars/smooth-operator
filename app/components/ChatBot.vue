<template>
  <div class="w-full max-w-2xl mx-auto bg-rock-900 border border-rock-700 rounded-2xl overflow-hidden flex flex-col" :class="{ 'h-[600px]': !compact, 'h-[400px]': compact }">
    <!-- Header -->
    <div class="bg-rock-800/80 px-6 py-4 border-b border-rock-700 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white font-bold">
          SO
        </div>
        <div>
          <h3 class="font-semibold text-white">{{ t('chatbot.title') }}</h3>
          <p class="text-xs text-rock-400">{{ t('chatbot.subtitle') }}</p>
        </div>
      </div>
      <button
        v-if="showReset"
        @click="resetChat"
        class="text-xs text-rock-400 hover:text-white transition"
      >
        {{ t('chatbot.reset') }}
      </button>
    </div>

    <!-- Messages -->
    <div ref="messagesContainer" class="flex-1 overflow-y-auto p-6 space-y-4">
      <div
        v-for="message in messages"
        :key="message.id"
        class="flex"
        :class="message.role === 'user' ? 'justify-end' : 'justify-start'"
      >
        <div
          class="max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed"
          :class="[
            message.role === 'user'
              ? 'bg-accent text-white rounded-br-none'
              : 'bg-rock-800 text-rock-100 rounded-bl-none',
            message.isEscalation ? 'border border-accent/50' : ''
          ]"
        >
          <p>{{ message.text }}</p>
          <div v-if="message.isEscalation" class="mt-3 flex flex-col gap-2">
            <nuxt-link
              to="/onboarding"
              class="inline-flex items-center justify-center bg-accent hover:bg-accent-hover text-white text-sm font-medium px-4 py-2 rounded-lg transition"
            >
              {{ t('chatbot.ctaOnboarding') }}
            </nuxt-link>
          </div>
        </div>
      </div>

      <!-- Typing indicator -->
      <div v-if="isTyping" class="flex justify-start">
        <div class="bg-rock-800 text-rock-400 px-4 py-3 rounded-2xl rounded-bl-none text-sm flex items-center gap-2">
          <span class="w-2 h-2 bg-rock-400 rounded-full animate-bounce" style="animation-delay: 0s"></span>
          <span class="w-2 h-2 bg-rock-400 rounded-full animate-bounce" style="animation-delay: 0.15s"></span>
          <span class="w-2 h-2 bg-rock-400 rounded-full animate-bounce" style="animation-delay: 0.3s"></span>
        </div>
      </div>
    </div>

    <!-- Input -->
    <div class="border-t border-rock-700 p-4 bg-rock-950/50">
      <form @submit.prevent="handleSubmit" class="flex gap-3">
        <input
          ref="inputRef"
          v-model="inputText"
          type="text"
          :placeholder="t('chatbot.placeholder')"
          class="flex-1 bg-rock-800 border border-rock-700 rounded-lg px-4 py-3 text-sm text-white placeholder-rock-500 focus:outline-none focus:border-accent transition"
          :disabled="isTyping"
        />
        <button
          type="submit"
          :disabled="!inputText.trim() || isTyping"
          class="bg-accent hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium px-5 py-3 rounded-lg transition"
        >
          {{ t('chatbot.send') }}
        </button>
      </form>
      <p class="text-xs text-rock-500 mt-2">{{ t('chatbot.disclaimer') }}</p>
    </div>
  </div>
</template>

<script setup>
import { nextTick, ref, watch } from 'vue'

const props = defineProps({
  compact: { type: Boolean, default: false },
  showReset: { type: Boolean, default: true }
})

const { t } = useI18n()
const { messages, isTyping, sendMessage, resetChat } = useChatBot()

const inputText = ref('')
const inputRef = ref(null)
const messagesContainer = ref(null)

const handleSubmit = async () => {
  const text = inputText.value
  inputText.value = ''
  await sendMessage(text)
}

// Auto-scroll to bottom on new messages
watch(messages, async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}, { deep: true })

// Focus input on mount
onMounted(() => {
  inputRef.value?.focus()
})
</script>
