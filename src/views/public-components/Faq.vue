<template>
  <section class="faq-section">
    <div class="faq-container">

      <!-- HEADER -->
      <div class="faq-header">
        <h2>Frequently Asked Questions</h2>
        <p>Everything you need to know before getting started.</p>
      </div>

      <!-- FAQ ITEMS -->
      <div class="faq-list">
        <div
          v-for="(item, index) in faqs"
          :key="index"
          class="faq-item"
        >
          <button class="faq-question" @click="toggle(index)">
            <span>{{ item.question }}</span>
            <i
              class="fas"
              :class="openIndex === index ? 'fa-minus' : 'fa-plus'"
            ></i>
          </button>

          <div
            class="faq-answer"
            :class="{ open: openIndex === index }"
          >
            <p>{{ item.answer }}</p>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const openIndex = ref(null)

const toggle = (index) => {
  openIndex.value = openIndex.value === index ? null : index
}

const faqs = [
  {
    question: 'What is TaskAI?',
    answer:
      'TaskAI is a productivity platform that helps you manage tasks, use AI assistance, and stay organized.'
  },
  {
    question: 'Is TaskAI free to use?',
    answer:
      'Yes. TaskAI offers a free plan with essential features to get you started.'
  },
  {
    question: 'Do I need to install anything?',
    answer:
      'No installation is required. TaskAI works directly in your browser.'
  },
  {
    question: 'Is my data secure?',
    answer:
      'Yes. We follow modern security practices to protect your data.'
  },
  {
    question: 'Can I access TaskAI on mobile?',
    answer:
      'Absolutely. TaskAI is fully responsive and works on all devices.'
  }
]
</script>

<style scoped>
/* SECTION */
.faq-section {
  background: #000;
  color: #fff;
  padding: 100px 20px;
  border-top: 1px solid #1f1f1f;
}

/* CONTAINER */
.faq-container {
  max-width: 900px;
  margin: auto;
}

/* HEADER */
.faq-header {
  text-align: center;
  margin-bottom: 60px;
}

.faq-header h2 {
  font-size: 36px;
  margin-bottom: 12px;
}

.faq-header p {
  color: #aaa;
}

/* LIST */
.faq-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* ITEM */
.faq-item {
  border: 1px solid #1f1f1f;
}

/* QUESTION */
.faq-question {
  width: 100%;
  background: transparent;
  border: none;
  color: #fff;
  padding: 20px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.faq-question i {
  font-size: 14px;
}

/* ANSWER */
.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.faq-answer.open {
  max-height: 200px;
}

.faq-answer p {
  padding: 0 20px 20px;
  color: #bbb;
  line-height: 1.6;
}

/* RESPONSIVE */
@media (max-width: 600px) {
  .faq-header h2 {
    font-size: 28px;
  }
}
</style>
