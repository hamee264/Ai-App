<template>
  <div class="ai-chat">

    <!-- HEADER -->
    <div class="chat-header">
      <div>
        <h1>AI Chat</h1>
        <p>Your personal AI assistant</p>
      </div>
    </div>

    <!-- CHAT BOX -->
    <div ref="chatBox" class="chat-box">

      <!-- EMPTY STATE -->
      <div v-if="messages.length === 0" class="chat-empty">
        <i class="fas fa-robot"></i>
        <h3>Start a conversation</h3>
        <p>Ask your AI assistant anything</p>
      </div>

      <!-- MESSAGES -->
      <div
        v-for="(msg, index) in messages"
        :key="index"
        class="message"
        :class="msg.role"
      >
        <div class="bubble">
          {{ msg.text }}
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
        type="text"
        placeholder="Type your message..."
      />
      <button :disabled="!input.trim()">
        <i class="fas fa-paper-plane"></i>
      </button>
    </form>

  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const input = ref('')
const messages = ref([])
const typing = ref(false)
const chatBox = ref(null)

function scrollToBottom() {
  nextTick(() => {
    chatBox.value.scrollTop = chatBox.value.scrollHeight
  })
}

function sendMessage() {
  if (!input.value.trim()) return

  // USER MESSAGE
  messages.value.push({
    role: 'user',
    text: input.value
  })

  input.value = ''
  scrollToBottom()

  // AI TYPING
  typing.value = true

  setTimeout(() => {
    typing.value = false

    messages.value.push({
      role: 'ai',
      text: 'Sure! I can help you with that. What would you like to do next?'
    })

    scrollToBottom()
  }, 1200)
}
</script>

<style scoped>
/* =====================
   BASE
===================== */
.ai-chat {
  background: #000;
  color: #fff;
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* =====================
   HEADER
===================== */
.chat-header {
  padding-bottom: 1.2rem;
}

.chat-header h1 {
  font-size: 2rem;
  font-weight: 700;
}

.chat-header p {
  font-size: 0.95rem;
  color: #bdbdbd;
}

/* =====================
   CHAT BOX
===================== */
.chat-box {
  flex: 1;
  background: #0f0f0f;
  border: 1px solid #1f1f1f;
  border-radius: 18px;
  padding: 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* EMPTY */
.chat-empty {
  margin: auto;
  text-align: center;
  color: #bdbdbd;
}

.chat-empty i {
  font-size: 2rem;
  margin-bottom: 0.8rem;
}

.chat-empty h3 {
  color: #fff;
  margin-bottom: 0.3rem;
}

/* =====================
   MESSAGES
===================== */
.message {
  display: flex;
}

.message.ai {
  justify-content: flex-start;
}

.message.user {
  justify-content: flex-end;
}

.bubble {
  max-width: 70%;
  padding: 0.9rem 1.2rem;
  border-radius: 16px;
  font-size: 0.95rem;
  line-height: 1.45;
}

/* AI */
.message.ai .bubble {
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
}

/* USER */
.message.user .bubble {
  background: #fff;
  color: #000;
}

/* =====================
   TYPING
===================== */
.typing span {
  animation: blink 1.4s infinite both;
}

.typing span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes blink {
  0% { opacity: .2; }
  20% { opacity: 1; }
  100% { opacity: .2; }
}

/* =====================
   INPUT
===================== */
.chat-input {
  display: flex;
  gap: 0.8rem;
  margin-top: 1.2rem;
}

.chat-input input {
  flex: 1;
  background: #000;
  border: 1px solid #333;
  border-radius: 14px;
  padding: 0.9rem 1rem;
  color: #fff;
}

.chat-input button {
  background: #fff;
  color: #000;
  border: none;
  padding: 0 1.2rem;
  border-radius: 14px;
  cursor: pointer;
}

.chat-input button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* =====================
   MOBILE
===================== */
@media (max-width: 600px) {
  .chat-header h1 {
    font-size: 1.6rem;
  }

  .bubble {
    max-width: 85%;
  }
}
</style>
