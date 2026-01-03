<template>
  <div class="dashboard">

    <!-- HEADER -->
    <div class="dashboard-header">
      <h1>Dashboard</h1>
      <p>Overview of your productivity</p>
    </div>

    <!-- STATS -->
    <section v-if="!loading" class="stats-grid">
      <div class="stat-card">
        <h3>Total Tasks</h3>
        <span>{{ total }}</span>
      </div>

      <div class="stat-card">
        <h3>Completed</h3>
        <span>{{ completed }}</span>
      </div>

      <div class="stat-card">
        <h3>Pending</h3>
        <span>{{ pending }}</span>
      </div>
    </section>

    <!-- LOADING SKELETON -->
    <section v-else class="stats-grid">
      <div class="stat-card skeleton"></div>
      <div class="stat-card skeleton"></div>
      <div class="stat-card skeleton"></div>
    </section>

    <!-- PROGRESS -->
    <section v-if="!loading" class="progress-card">
      <h3>Task Completion</h3>

      <div class="progress-bar">
        <div
          class="progress-fill"
          :style="{ width: progress + '%' }"
        ></div>
      </div>

      <small>{{ progress }}% completed</small>
    </section>

    <!-- RECENT TASKS -->
    <section class="recent">
      <h2>Recent Tasks</h2>

      <div v-if="!tasks.length && !loading" class="empty">
        No tasks yet
      </div>

      <div
        v-for="task in recentTasks"
        :key="task.id"
        class="recent-task"
      >
        <span :class="{ done: task.completed }">
          {{ task.title }}
        </span>

        <small>
          {{ task.completed ? 'Completed' : 'Pending' }}
        </small>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { supabase } from '/src/lib/supabase'

const tasks = ref([])
const loading = ref(true)
let channel = null

/* ---------------- FETCH TASKS ---------------- */
const fetchTasks = async () => {
  loading.value = true

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    loading.value = false
    return
  }

  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false })

  if (!error) {
    tasks.value = data || []
  }

  loading.value = false
}

/* ---------------- STATS ---------------- */
const total = computed(() => tasks.value.length)

const completed = computed(() =>
  tasks.value.filter(t => t.completed).length
)

const pending = computed(() =>
  tasks.value.filter(t => !t.completed).length
)

const progress = computed(() => {
  if (!total.value) return 0
  return Math.round((completed.value / total.value) * 100)
})

const recentTasks = computed(() =>
  tasks.value.slice(0, 5)
)

/* ---------------- REALTIME ---------------- */
onMounted(async () => {
  await fetchTasks()

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return

  channel = supabase
    .channel(`dashboard-tasks-${session.user.id}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'tasks',
        filter: `user_id=eq.${session.user.id}`
      },
      fetchTasks
    )
    .subscribe()
})

onUnmounted(() => {
  if (channel) supabase.removeChannel(channel)
})
</script>

<style scoped>
.dashboard {
  background: #000;
  color: #fff;
  min-height: 100vh;
  padding: 2rem 2.25rem;
}

/* HEADER */
.dashboard-header {
  margin-bottom: 2rem;
}

.dashboard-header h1 {
  font-size: 2rem;
  font-weight: 700;
}

.dashboard-header p {
  color: #9ca3af;
}

/* STATS */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.stat-card {
  background: #0f0f0f;
  border: 1px solid #1f1f1f;
  border-radius: 16px;
  padding: 1.5rem;
}

.stat-card h3 {
  font-size: 0.9rem;
  color: #9ca3af;
  margin-bottom: 0.4rem;
}

.stat-card span {
  font-size: 2rem;
  font-weight: 700;
}

/* PROGRESS */
.progress-card {
  background: #0f0f0f;
  border: 1px solid #1f1f1f;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 3rem;
}

.progress-bar {
  height: 10px;
  background: #1f1f1f;
  border-radius: 999px;
  overflow: hidden;
  margin: 0.8rem 0;
}

.progress-fill {
  height: 100%;
  background: #6366f1;
  transition: width 0.3s ease;
}

/* RECENT */
.recent h2 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.recent-task {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #0f0f0f;
  border: 1px solid #1f1f1f;
  border-radius: 12px;
  padding: 0.9rem 1rem;
  margin-bottom: 0.6rem;
}

.recent-task span.done {
  text-decoration: line-through;
  color: #9ca3af;
}

.recent-task small {
  font-size: 0.75rem;
  color: #9ca3af;
}

.empty {
  color: #6b7280;
  margin-top: 1rem;
}

/* SKELETON */
.skeleton {
  height: 90px;
  background: linear-gradient(
    90deg,
    #1f1f1f 25%,
    #2a2a2a 37%,
    #1f1f1f 63%
  );
  background-size: 400% 100%;
  animation: shimmer 1.4s infinite;
}

@keyframes shimmer {
  0% { background-position: 100% 0 }
  100% { background-position: -100% 0 }
}

/* MOBILE */
@media (max-width: 600px) {
  .dashboard {
    padding: 1.5rem 1.2rem;
  }
}
</style>
