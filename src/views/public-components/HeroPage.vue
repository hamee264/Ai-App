<template>
  <section class="hero">
    <div class="hero-container">

      <!-- HERO TEXT -->
      <div class="hero-text">
        <h1>
          Organize your life.<br />
          Build smarter with AI.
        </h1>

        <p>
          Manage your todos, stay productive, and chat with AI —
          all in one simple, secure platform.
        </p>

        <div class="hero-actions">
          <router-link to="/auth/register" class="btn-primary">
            Get Started
          </router-link>

          <router-link to="/features" class="btn-secondary">
            Learn More
          </router-link>
        </div>
      </div>

      <!-- HERO IMAGE -->
      <div class="hero-image">
        <div class="image-placeholder">
          <!-- Replace later with real image -->
          <span>App Preview</span>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
export default {}
</script>

<style>
/* =========================
   HERO SECTION
========================= */
.hero {
  background-color: #000;
  color: #fff;
  padding: 80px 20px;
  /* height: 100vh; */
}

/* =========================
   CONTAINER
========================= */
.hero-container {
  max-width: 1200px;
  margin: 0 auto;

  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

/* =========================
   HERO TEXT
========================= */
.hero-text h1 {
  font-size: 44px;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 20px;
}

.hero-text p {
  font-size: 16px;
  color: #bdbdbd;
  max-width: 480px;
  margin-bottom: 30px;
}

/* =========================
   BUTTONS
========================= */
.hero-actions {
  display: flex;
  gap: 16px;
}

.btn-primary {
  padding: 12px 22px;
  background-color: #ffffff;
  color: #000;
  border-radius: 6px;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s ease;
}

.btn-primary:hover {
  background-color: #e5e5e5;
}

.btn-secondary {
  padding: 12px 22px;
  border: 1px solid #1f1f1f;
  color: #ffffff;
  border-radius: 6px;
  text-decoration: none;
  transition: background 0.2s ease;
}

.btn-secondary:hover {
  background-color: #0f0f0f;
}

/* =========================
   HERO IMAGE
========================= */
.hero-image {
  display: flex;
  justify-content: center;
}

.image-placeholder {
  width: 100%;
  max-width: 420px;
  height: 280px;

  border: 1px dashed #2a2a2a;
  border-radius: 12px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #6b6b6b;
  font-size: 14px;
}

/* =========================
   RESPONSIVE
========================= */
@media (max-width: 900px) {
  .hero-container {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero-text p {
    margin-left: auto;
    margin-right: auto;
  }

  .hero-actions {
    justify-content: center;
    flex-wrap: wrap;
  }
}
</style>
