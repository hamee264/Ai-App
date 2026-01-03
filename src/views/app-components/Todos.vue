<template>
  <div class="todos">

    <!-- HEADER -->
    <div class="todos-header">
      <h1>Your Tasks</h1>
      <p>Manage everything in one place</p>
    </div>

    <!-- ADD TASK -->
    <form class="add-task" @submit.prevent="addTask">
      <input
        v-model="newTask"
        placeholder="Add a new task..."
        required
      />
      <button :disabled="adding">
        {{ adding ? 'Adding...' : 'Add' }}
      </button>
    </form>

    <!-- TASK LIST -->
    <div class="task-list">

      <div
        v-for="task in tasks"
        :key="task.id"
        class="task"
        :class="{ done: task.completed }"
      >
        <label class="task-left">
          <input
            type="checkbox"
            :checked="task.completed"
            @change="toggleTask(task)"
          />
          <span>{{ task.title }}</span>
        </label>

        <button class="delete" @click="deleteTask(task.id)">
          ✕
        </button>
      </div>

      <!-- EMPTY -->
      <div v-if="!tasks.length && !loading" class="empty">
        <p>No tasks yet</p>
        <span>Add your first task above</span>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { supabase } from '/src/lib/supabase'

const tasks = ref([])
const newTask = ref('')
const loading = ref(true)
const adding = ref(false)
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

  if (!error) tasks.value = data || []

  loading.value = false
}

/* ---------------- ADD TASK ---------------- */
const addTask = async () => {
  if (!newTask.value.trim()) return

  adding.value = true

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return

  await supabase.from('tasks').insert({
    title: newTask.value.trim(),
    user_id: session.user.id,
    completed: false
  })

  newTask.value = ''
  adding.value = false
}

/* ---------------- TOGGLE TASK ---------------- */
const toggleTask = async task => {
  await supabase
    .from('tasks')
    .update({ completed: !task.completed })
    .eq('id', task.id)
}

/* ---------------- DELETE TASK ---------------- */
const deleteTask = async id => {
  await supabase.from('tasks').delete().eq('id', id)
}

/* ---------------- REALTIME ---------------- */
onMounted(async () => {
  await fetchTasks()

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return

  channel = supabase
    .channel(`tasks-${session.user.id}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'tasks',
        filter: `user_id=eq.${session.user.id}`
      },
      () => {
        fetchTasks()
      }
    )
    .subscribe()
})

onUnmounted(() => {
  if (channel) supabase.removeChannel(channel)
})
</script>

<style scoped>
.todos {
  max-width: 720px;
  margin: auto;
  padding: 2rem 1.25rem;
}

/* HEADER */
.todos-header {
  margin-bottom: 1.6rem;
}

.todos-header h1 {
  font-size: 2rem;
  font-weight: 700;
}

.todos-header p {
  color: #9ca3af;
}

/* ADD */
.add-task {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.75rem;
}

.add-task input {
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 14px;
  border: 1px solid #1f2937;
  background: #0f0f0f;
  color: white;
}

.add-task input:focus {
  outline: none;
  border-color: #6366f1;
}

.add-task button {
  padding: 0.75rem 1.4rem;
  border-radius: 14px;
  border: none;
  background: #6366f1;
  color: white;
  font-weight: 600;
  cursor: pointer;
}

/* LIST */
.task-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.task {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #0f0f0f;
  border: 1px solid #1f2937;
  padding: 0.9rem 1rem;
  border-radius: 14px;
}

.task-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.task input[type='checkbox'] {
  width: 18px;
  height: 18px;
  accent-color: #6366f1;
}

.task.done span {
  text-decoration: line-through;
  color: #6b7280;
}

.delete {
  background: transparent;
  border: none;
  color: #ef4444;
  font-size: 1.2rem;
  cursor: pointer;
}

/* EMPTY */
.empty {
  text-align: center;
  color: #6b7280;
  margin-top: 2rem;
}
</style>
