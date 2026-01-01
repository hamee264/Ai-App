<template>
  <div class="todos">

    <!-- HEADER -->
    <div class="todos-header">
      <div>
        <h1>Tasks</h1>
        <p>Manage and organize your tasks</p>
      </div>

      <button class="add-btn">
        <i class="fas fa-plus"></i>
        New Task
      </button>
    </div>

    <!-- TASK LIST -->
    <section class="task-list">

      <!-- EMPTY STATE -->
      <div class="empty-state">
        <i class="fas fa-clipboard-list"></i>
        <h3>No tasks yet</h3>
        <p>Create your first task to get started</p>
      </div>

      <!-- TASK ITEM (sample, for later use) -->
      <!--
      <div class="task-card">
        <div class="task-left">
          <input type="checkbox" />
          <span class="task-title">Finish dashboard UI</span>
        </div>

        <div class="task-actions">
          <button><i class="fas fa-pen"></i></button>
          <button><i class="fas fa-trash"></i></button>
        </div>
      </div>
      -->

    </section>

  </div>
</template>

<script setup>
</script>

<style scoped>
/* =====================
   BASE
===================== */
.todos {
  background: #000;
  color: #fff;
  padding: 2rem 2.25rem;

}

/* =====================
   HEADER
===================== */
.todos-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
}

.todos-header h1 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.4rem;
}

.todos-header p {
  font-size: 0.95rem;
  color: #bdbdbd;
}

.add-btn {
  background: #fff;
  color: #000;
  border: none;
  padding: 0.65rem 1.2rem;
  border-radius: 10px;
  font-weight: 600;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  cursor: pointer;
  transition: 0.2s;
}

.add-btn:hover {
  background: #e5e5e5;
}

/* =====================
   TASK LIST
===================== */
.task-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* =====================
   EMPTY STATE
===================== */
.empty-state {
  border: 1px dashed #333;
  border-radius: 16px;
  padding: 3rem 2rem;
  text-align: center;
  color: #bdbdbd;
}

.empty-state i {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.empty-state h3 {
  color: #fff;
  margin-bottom: 0.4rem;
}

/* =====================
   TASK CARD (READY)
===================== */
.task-card {
  background: #0f0f0f;
  border: 1px solid #1f1f1f;
  padding: 1.2rem 1.5rem;
  border-radius: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task-left {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.task-title {
  font-size: 0.95rem;
}

.task-actions {
  display: flex;
  gap: 0.6rem;
}

.task-actions button {
  background: transparent;
  border: 1px solid #fff;
  color: #fff;
  padding: 0.35rem 0.6rem;
  border-radius: 6px;
  cursor: pointer;
}

.task-actions button:hover {
  background: #fff;
  color: #000;
}

/* =====================
   MOBILE
===================== */
@media (max-width: 600px) {
  .todos-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.2rem;
  }

  .add-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
