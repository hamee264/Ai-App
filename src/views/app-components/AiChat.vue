<template>
  <div class="ai-chat">

    <!-- HEADER -->
    <div class="chat-header">
      <h1>AI Assistant</h1>
      <p>Assignments • Coding • Explanations</p>
    </div>

    <!-- CHAT BOX -->
    <div ref="chatBox" class="chat-box">

      <!-- MESSAGES -->
      <div
        v-for="(msg, index) in visibleMessages"
        :key="index"
        class="message"
        :class="msg.role === 'user' ? 'user' : 'ai'"
      >
        <div class="bubble">
          {{ msg.content }}
        </div>
      </div>

      <!-- TYPING -->
      <div v-if="typing" class="message ai">
        <div class="bubble typing">
          AI is thinking<span>.</span><span>.</span><span>.</span>
        </div>
      </div>

    </div>

    <!-- INPUT -->
    <form class="chat-input" @submit.prevent="sendMessage">
      <input
        v-model="input"
        placeholder="Ask me anything..."
        :disabled="typing"
      />
      <button :disabled="!input.trim() || typing">
        Send
      </button>
    </form>

  </div>
</template>

<script setup>
import { ref, nextTick, computed } from 'vue'
import { supabase } from '/src/lib/supabase'

const input = ref('')
const typing = ref(false)
const chatBox = ref(null)

/* MESSAGE STATE */
const messages = ref([
  {
    role: 'system',
    content:
      'You are a smart AI assistant. You help with assignments, school work, coding, explanations, and problem solving. Explain clearly and step by step.'
  }
])

/* HIDE SYSTEM MESSAGE */
const visibleMessages = computed(() =>
  messages.value.filter(m => m.role !== 'system')
)

/* SCROLL */
function scrollToBottom () {
  nextTick(() => {
    if (chatBox.value) {
      chatBox.value.scrollTop = chatBox.value.scrollHeight
    }
  })
}

/* SEND MESSAGE */
async function sendMessage () {
  const text = input.value.trim()
  if (!text || typing.value) return

  // push user message
  messages.value.push({
    role: 'user',
    content: text
  })

  input.value = ''
  typing.value = true
  scrollToBottom()

  try {
    // IMPORTANT: send a COPY of messages
    const payload = messages.value.map(m => ({
      role: m.role,
      content: m.content
    }))

    const { data, error } = await supabase.functions.invoke('ai-chat', {
      body: { messages: payload }
    })

    if (error) throw error

    messages.value.push({
      role: 'assistant',
      content: data?.reply || 'No response from AI.'
    })

  } catch (err) {
    console.error('AI error:', err)

    messages.value.push({
      role: 'assistant',
      content: 'Something went wrong. Please try again.'
    })
  } finally {
    typing.value = false
    scrollToBottom()
  }
}
</script>

<style scoped>
.ai-chat {
  background: #000;
  color: #fff;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 2rem;
}

/* HEADER */
.chat-header h1 {
  font-size: 2rem;
  font-weight: 700;
}

.chat-header p {
  color: #9ca3af;
}

/* CHAT BOX */
.chat-box {
  flex: 1;
  background: #0f0f0f;
  border-radius: 18px;
  padding: 1.5rem;
  overflow-y: auto;
  margin: 1.2rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* MESSAGE */
.message {
  display: flex;
}

.message.user {
  justify-content: flex-end;
}

.message.ai {
  justify-content: flex-start;
}

.bubble {
  max-width: 70%;
  padding: 0.9rem 1.2rem;
  border-radius: 16px;
  line-height: 1.45;
}

/* USER */
.message.user .bubble {
  background: #fff;
  color: #000;
}

/* AI */
.message.ai .bubble {
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
}

/* TYPING */
.typing span {
  animation: blink 1.4s infinite both;
}

.typing span:nth-child(2) { animation-delay: 0.2s }
.typing span:nth-child(3) { animation-delay: 0.4s }

@keyframes blink {
  0% { opacity: .2 }
  20% { opacity: 1 }
  100% { opacity: .2 }
}

/* INPUT */
.chat-input {
  display: flex;
  gap: 0.8rem;
}

.chat-input input {
  flex: 1;
  padding: 0.9rem;
  border-radius: 14px;
  border: 1px solid #333;
  background: #000;
  color: #fff;
}

.chat-input button {
  background: #fff;
  color: #000;
  border-radius: 14px;
  padding: 0 1.2rem;
  cursor: pointer;
}

.chat-input button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
