<template>
  <div class="dashboard">

    <!-- HEADER -->
    <div class="dashboard-header">
      <div>
        <h1>Dashboard</h1>
        <p>Welcome back 👋 Here’s what’s happening today</p>
      </div>
    </div>

    <!-- STATS -->
    <section class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-list-check"></i>
        </div>
        <div class="stat-info">
          <h3>Tasks</h3>
          <span>0</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-robot"></i>
        </div>
        <div class="stat-info">
          <h3>AI Chats</h3>
          <span>0</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-clock"></i>
        </div>
        <div class="stat-info">
          <h3>Pending</h3>
          <span>0</span>
        </div>
      </div>
    </section>

    <!-- QUICK ACTIONS -->
    <section class="quick-actions">
      <h2>Quick Actions</h2>

      <div class="actions-grid">
        <router-link to="/todos" class="action-card">
          <i class="fas fa-plus"></i>
          <span>Create Task</span>
        </router-link>

        <router-link to="/ai-chat" class="action-card">
          <i class="fas fa-comment-dots"></i>
          <span>Ask AI</span>
        </router-link>
      </div>
    </section>

  </div>
</template>

<script setup>
</script>

<style scoped>
/* =====================
   DASHBOARD BASE
===================== */
.dashboard {
  background: #000;
  color: #fff;
  /* min-height: 100vh; */
  padding: 2rem 2.25rem;
}

/* =====================
   HEADER
===================== */
.dashboard-header {
  margin-bottom: 2.5rem;
}

.dashboard-header h1 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.4rem;
  color: #fff;
}

.dashboard-header p {
  color: #bdbdbd;
  font-size: 0.95rem;
}

/* =====================
   STATS
===================== */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.75rem;
  margin-bottom: 3.5rem;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.6rem 1.75rem;
  border-radius: 16px;
  background: #0f0f0f;
  border: 1px solid #1f1f1f;
  transition: all 0.25s ease;
}

.stat-card:hover {
  border-color: #ffffff;
  transform: translateY(-3px);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: #ffffff;
  color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.stat-info h3 {
  font-size: 0.9rem;
  font-weight: 500;
  color: #bdbdbd;
  margin-bottom: 0.25rem;
}

.stat-info span {
  font-size: 1.6rem;
  font-weight: 700;
  color: #ffffff;
}

/* =====================
   QUICK ACTIONS
===================== */
.quick-actions h2 {
  font-size: 1.25rem;
  margin-bottom: 1.25rem;
  color: #ffffff;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.75rem;
}

.action-card {
  background: transparent;
  border: 1px solid #ffffff;
  padding: 1.5rem 1.2rem;
  border-radius: 16px;
  text-align: center;
  text-decoration: none;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  font-weight: 500;
  transition: all 0.25s ease;
}

.action-card i {
  font-size: 1.4rem;
}

.action-card:hover {
  background: #ffffff;
  color: #000000;
  transform: translateY(-3px);
}

/* =====================
   MOBILE
===================== */
@media (max-width: 600px) {
  .dashboard-header h1 {
    font-size: 1.6rem;
  }

  .stats-grid {
    gap: 1.2rem;
  }
}
</style>
