<template>
  <section class="features-section">
    <div class="features-container">

      <!-- HEADER -->
      <div class="features-header">
        <h2>Features</h2>
        <p>
          Everything you need to stay productive and organized,
          built with simplicity in mind.
        </p>
      </div>

      <!-- FEATURES GRID -->
      <div class="features-grid">

        <div class="feature-card">
          <i class="fas fa-list-check"></i>
          <h3>Smart Todo Lists</h3>
          <p>
            Create, edit, and manage your tasks easily with
            a clean and focused interface.
          </p>
        </div>

        <div class="feature-card">
          <i class="fas fa-robot"></i>
          <h3>AI Assistant</h3>
          <p>
            Get help with ideas, summaries, and task planning
            using built-in AI tools.
          </p>
        </div>

        <div class="feature-card">
          <i class="fas fa-lock"></i>
          <h3>Secure Authentication</h3>
          <p>
            Your account and data are protected using
            modern authentication practices.
          </p>
        </div>

        <div class="feature-card">
          <i class="fas fa-bolt"></i>
          <h3>Fast & Lightweight</h3>
          <p>
            Optimized for speed so everything feels
            instant and smooth.
          </p>
        </div>

        <div class="feature-card">
          <i class="fas fa-mobile-screen"></i>
          <h3>Responsive Design</h3>
          <p>
            Works perfectly on desktop, tablet,
            and mobile devices.
          </p>
        </div>

        <div class="feature-card">
          <i class="fas fa-cloud"></i>
          <h3>Cloud Ready</h3>
          <p>
            Access your data anywhere without worrying
            about losing progress.
          </p>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
// no logic needed


</script>

<style scoped>
/* SECTION */
.features-section {
  background: #000;
  color: #fff;
  padding: 100px 20px;
  border-top: 1px solid #1f1f1f;
}

/* CONTAINER */
.features-container {
  max-width: 1100px;
  margin: auto;
}

/* HEADER */
.features-header {
  text-align: center;
  margin-bottom: 60px;
}

.features-header h2 {
  font-size: 36px;
  margin-bottom: 12px;
}

.features-header p {
  color: #aaa;
  max-width: 600px;
  margin: auto;
}

/* GRID */
.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

/* CARD */
.feature-card {
  border: 1px solid #1f1f1f;
  padding: 30px;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  border-color: #fff;
}

.feature-card i {
  font-size: 26px;
  margin-bottom: 16px;
}

.feature-card h3 {
  margin-bottom: 10px;
}

.feature-card p {
  color: #bbb;
  line-height: 1.6;
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .features-grid {
    grid-template-columns: 1fr;
  }

  .features-header h2 {
    font-size: 28px;
  }
}
</style>
