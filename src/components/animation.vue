<template>
  <div class="animation">
    <div class="header">
      <div>
        <div
          style="height: 350px; width: 100%; background: rgba(22,179,198, 1)"
        ></div>
        <svg
          class="waves"
          style="transform: rotate(180deg)"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shape-rendering="auto"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g class="parallax">
            <use
              xlink:href="#gentle-wave"
              x="48"
              y="0"
              fill="rgba(0,172,193,0.7)"
            />
            <use
              xlink:href="#gentle-wave"
              x="48"
              y="0"
              fill="rgba(0,172,193,0.5)"
            />
            <use
              xlink:href="#gentle-wave"
              x="48"
              y="0"
              fill="rgba(0,172,193,0.3)"
            />
            <use
              xlink:href="#gentle-wave"
              x="48"
              y="0"
              fill="rgba(0,172,193,0.1)"
            />
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
</script>

<style scoped>
@import url(http://fonts.googleapis.com/css?family=Lato:300:400);

.animation {
  height: 100%;
}

h1 {
  font-family: "Lato", sans-serif;
  font-weight: 300;
  letter-spacing: 2px;
  font-size: 48px;
}
p {
  font-family: "Lato", sans-serif;
  letter-spacing: 1px;
  font-size: 14px;
  color: #333333;
}

.header {
  position: relative;
  text-align: center;
  /* background: linear-gradient(60deg, rgba(84,58,183,1) 0%, rgba(0,172,193,1) 100%); */
}

.inner-header {
  height: 65vh;
  width: 100%;
  margin: 0;
  padding: 0;
}

.flex {
  /*Flexbox for containers*/
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.waves {
  position: relative;
  width: 100%;
  height: 15vh;
  margin-bottom: -7px; /*Fix for safari gap*/
  min-height: 100px;
  max-height: 150px;
}

.content {
  position: relative;
  height: 20vh;
  text-align: center;
  background-color: white;
}

/* Animation */

.parallax > use {
  animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
}
.parallax > use:nth-child(1) {
  animation-delay: -5s;
  animation-duration: 20s;
}
.parallax > use:nth-child(2) {
  animation-delay: -10s;
  animation-duration: 5s;
}
.parallax > use:nth-child(3) {
  animation-delay: -15s;
  animation-duration: 20s;
}
.parallax > use:nth-child(4) {
  animation-delay: 0s;
  animation-duration: 10s;
}
@keyframes move-forever {
  0% {
    transform: translate3d(-90px, 0, 0);
  }
  100% {
    transform: translate3d(85px, 0, 0);
  }
}
/*Shrinking for mobile*/
@media (max-width: 768px) {
  .waves {
    height: 40px;
    min-height: 40px;
  }
  .content {
    height: 30vh;
  }
  h1 {
    font-size: 24px;
  }
}
</style>
