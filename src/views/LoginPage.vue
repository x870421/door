<template>
  <div class="login-header">
    <div
      class="inner-header d-flex justify-content-center align-items-center flex-column"
      ref="header"
    >
      <h1 class="login-title">Welcome</h1>

      <form class="loginform animate__animated" ref="loginForm">
        <div class="position-relative">
          <input
            class="input username invalid"
            :disabled="successLogin"
            type="text"
            placeholder="Username"
            autocomplete="off"
            required
            v-model="user.email"
            @focus="showEye = false"
            @blur="showEye = true"
          />
          <span class="tooltiptext position-absolute d-none">請輸入此欄位</span>
        </div>
        <div class="position-relative">
          <input
            class="input password"
            :disabled="successLogin"
            required
            :type="[eyeActive ? 'password' : 'text']"
            placeholder="Password"
            autocomplete="off"
            v-model="user.password"
            @focus="showEye = false"
            @blur="showEye = true"
          />
          <span class="tooltiptext position-absolute d-none">請輸入此欄位</span>
          <eye-filled
            v-if="showEye && !eyeActive"
            class="password-eye"
            :style="{ color: 'rgba(84, 58, 183, 1)', fontSize: '16px' }"
            @click="eyeActive = !eyeActive"
          />
          <eye-invisible-filled
            v-else-if="showEye && eyeActive"
            class="password-eye"
            :style="{ color: 'rgba(84, 58, 183, 1)', fontSize: '16px' }"
            @click="eyeActive = !eyeActive"
          />
        </div>
        <a-spin :spinning="loginActive">
          <button type="button" @click="signIn">Login</button>
        </a-spin>
      </form>
    </div>
    <div class="wrapper" v-if="successLogin">
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
    </div>
    <div>
      <svg
        class="waves"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
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
            fill="rgba(255,255,255,0.7"
          />
          <use
            xlink:href="#gentle-wave"
            x="48"
            y="3"
            fill="rgba(255,255,255,0.5)"
          />
          <use
            xlink:href="#gentle-wave"
            x="48"
            y="5"
            fill="rgba(255,255,255,0.3)"
          />
          <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff" />
        </g>
      </svg>
    </div>

    <!--Waves end-->
    <!-- bubbles -->
  </div>
  <!--Header ends-->
</template>

<script>
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons-vue'
export default {
  components: { EyeFilled, EyeInvisibleFilled },
  data () {
    return {
      successLogin: false,
      user: { email: 'user123456', password: 'password' },
      eyeActive: true,
      loginActive: false,
      showEye: true
    }
  },
  methods: {
    signIn () {
      this.loginActive = true
      for (let i = 0; i < 2; i++) {
        if (!this.$refs.loginForm[i].checkValidity()) {
          this.$refs.loginForm.children[i].children[1].classList.remove(
            'd-none'
          )
        } else {
          this.$refs.loginForm.children[i].children[1].classList.add('d-none')
        }
      }
      if (!this.$refs.loginForm.checkValidity()) {
        return
      }

      this.loginActive = false
      this.$refs.header.classList.add('form-success')
      this.$refs.loginForm.classList.add('animate__fadeOut')
      this.successLogin = true
      setTimeout(() => {
        this.$router.push('/home')
      }, 3000)
    }
  },
  mounted () {}
}
</script>
<style lang="scss">
body ::-webkit-input-placeholder {
  color: white;
  font-weight: 400;
}
.r-100 {
  right: 100px !important;
}
.login-title {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 400;
  letter-spacing: 2px;
  font-size: 48px;
}

.login-header {
  position: relative;
  text-align: center;
  background: linear-gradient(
    60deg,
    rgba(84, 58, 183, 1) 0%,
    rgba(0, 172, 193, 1) 100%
  );
  color: white;
}

.inner-header {
  height: 65vh;
  width: 100%;
  margin: 0;
  padding: 0;
}

.waves {
  position: relative;
  width: 100%;
  height: 15vh;
  margin-bottom: -7px;
  min-height: 100px;
  max-height: 150px;
}

/* Animation */
.parallax > use {
  animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
}
.parallax > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}
.parallax > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}
.parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}
.parallax > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}

.login-title {
  color: white;
  font-size: 40px;
  transition-duration: 1s;
  transition-timing-function: ease-in- put;
  font-weight: 400;
}
.form-success .login-title {
  transform: translateY(180px);
}
.loginform {
  padding: 20px 0;
  position: relative;
  z-index: 2;
}
.loginform .input {
  appearance: none;
  outline: 0;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background-color: rgba(255, 255, 255, 0.2);
  width: 250px;
  border-radius: 3px;
  padding: 10px 15px;
  margin: 0 auto 10px auto;
  display: block;
  text-align: center;
  font-size: 18px;
  color: white;
  -webkit-transition-duration: 0.25s;
  transition-duration: 0.25s;
  font-weight: 00;
}
.loginform .input:hover {
  background-color: rgba(255, 255, 255, 0.4);
}
.password-eye {
  position: absolute;
  top: calc(50% - 7px);
  right: 20px;
  cursor: pointer;
}

.loginform .input:focus {
  background-color: white;
  width: 400px;
  color: rgba(84, 58, 183, 1);
}
.tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  top: calc(50% - 17px);
  left: 105%;
}

.tooltiptext::after {
  content: '';
  position: absolute;
  top: 50%;
  right: 100%;
  margin-top: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent black transparent transparent;
}
.tooltiptext {
  visibility: visible;
}
.loginform button {
  appearance: none;
  outline: 0;
  background-color: white;
  border: 0;
  padding: 10px 15px;
  color: rgba(84, 58, 183, 1);
  border-radius: 3px;
  width: 250px;
  cursor: pointer;
  font-size: 18px;
  transition-duration: 0.25s;
}
.loginform button:hover {
  background-color: #f5f7f9;
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
  .login-title {
    font-size: 24px;
  }
}
@-webkit-keyframes fadeOut {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}
@keyframes fadeOut {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}
.animate__fadeOut {
  -webkit-animation-name: fadeOut;
  animation-name: fadeOut;
}
.animate__animated {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-duration: var(--animate-duration);
  animation-duration: var(--animate-duration);
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

//bubbles

.wrapper {
  width: 100%;
  position: absolute;
  border: 1px;
  background: transparent;
}

.wrapper div {
  height: 60px;
  width: 60px;
  border: 2px solid rgba(255, 255, 255, 0.7);
  border-radius: 50px;
  position: absolute;
  top: 10%;
  left: 10%;
  animation: 6s linear infinite;
}
.dot {
  height: 10px;
  width: 10px;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.5);
  position: absolute;
  top: 20%;
  right: 20%;
}
.wrapper div:nth-child(1) {
  top: 20%;
  left: 20%;
  animation: animate 8s linear infinite;
}
.wrapper div:nth-child(2) {
  top: 60%;
  left: 80%;
  animation: animate 10s linear infinite;
}
.wrapper div:nth-child(3) {
  top: 40%;
  left: 40%;
  animation: animate 3s linear infinite;
}
.wrapper div:nth-child(4) {
  top: 66%;
  left: 30%;
  animation: animate 7s linear infinite;
}
.wrapper div:nth-child(5) {
  top: 90%;
  left: 10%;
  animation: animate 9s linear infinite;
}
.wrapper div:nth-child(6) {
  top: 30%;
  left: 60%;
  animation: animate 5s linear infinite;
}
.wrapper div:nth-child(7) {
  top: 70%;
  left: 20%;
  animation: animate 8s linear infinite;
}
.wrapper div:nth-child(8) {
  top: 75%;
  left: 60%;
  animation: animate 10s linear infinite;
}
.wrapper div:nth-child(9) {
  top: 50%;
  left: 50%;
  animation: animate 6s linear infinite;
}
.wrapper div:nth-child(10) {
  top: 45%;
  left: 20%;
  animation: animate 10s linear infinite;
}
.wrapper div:nth-child(11) {
  top: 10%;
  left: 90%;
  animation: animate 9s linear infinite;
}
.wrapper div:nth-child(12) {
  top: 20%;
  left: 70%;
  animation: animate 7s linear infinite;
}
.wrapper div:nth-child(13) {
  top: 20%;
  left: 20%;
  animation: animate 8s linear infinite;
}
.wrapper div:nth-child(14) {
  top: 60%;
  left: 5%;
  animation: animate 6s linear infinite;
}
.wrapper div:nth-child(15) {
  top: 90%;
  left: 80%;
  animation: animate 9s linear infinite;
}
@keyframes animate {
  0% {
    transform: scale(0) translateY(0) rotate(70deg);
  }
  100% {
    transform: scale(0.5) translateY(-300px) rotate(360deg);
  }
}
</style>
