<template>
  <footer class="footer">
    <div class="footer-container">

      <!-- BRAND -->
      <div class="footer-brand">
        <h3>TaskAI</h3>
        <p>
          Stay organized. Work smarter.
          Boost productivity with AI.
        </p>
      </div>

      <!-- LINKS -->
      <div class="footer-links">
        <div>
          <h4>Product</h4>
          <a href="#features">Features</a>
          <a href="#faq">FAQ</a>
        </div>

        <div>
          <h4>Account</h4>
          <router-link to="/auth/login">Login</router-link>
          <router-link to="/auth/register">Sign up</router-link>
        </div>

        <div>
          <h4>Legal</h4>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>

    </div>

    <!-- BOTTOM -->
    <div class="footer-bottom">
      <p>© {{ new Date().getFullYear() }} TaskAI. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup>
// no logic needed
</script>

<style scoped>
/* FOOTER */
.footer {
  background: #000;
  color: #fff;
  border-top: 1px solid #1f1f1f;
}

/* CONTAINER */
.footer-container {
  max-width: 1100px;
  margin: auto;
  padding: 60px 20px;

  display: grid;
  grid-template-columns: 1.5fr 2fr;
  gap: 40px;
}

/* BRAND */
.footer-brand h3 {
  font-size: 22px;
  margin-bottom: 12px;
}

.footer-brand p {
  color: #aaa;
  max-width: 300px;
}

/* LINKS */
.footer-links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.footer-links h4 {
  margin-bottom: 14px;
  font-size: 14px;
}

.footer-links a {
  display: block;
  margin-bottom: 10px;
  color: #aaa;
  font-size: 14px;
  text-decoration: none;
}

.footer-links a:hover {
  color: #fff;
}

/* BOTTOM */
.footer-bottom {
  border-top: 1px solid #1f1f1f;
  text-align: center;
  padding: 20px;
  color: #777;
  font-size: 13px;
}

/* RESPONSIVE */
@media (max-width: 800px) {
  .footer-container {
    grid-template-columns: 1fr;
  }

  .footer-links {
    grid-template-columns: 1fr;
  }
}
</style>
