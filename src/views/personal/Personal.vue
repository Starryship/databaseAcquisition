<template>
  <div class="bg">
    <form class="form login">
    <span class="input-span">
      <label for="email" class="label">账号</label>
      <input type="email" name="email" id="email"
    /></span>
    <span class="input-span">
      <label for="password" class="label">密码</label>
      <input type="password" name="password" id="password"
    /></span>
    <input class="submit" type="submit" value="登录" />
  </form>
  </div>
</template>

<script setup>
// 可以根据需要在这里添加逻辑
</script>

<style scoped>


.bg {
  width: 100vw;
  height: 100vh;
  background-image: url(https://digicol.dpm.org.cn/images/bg2.jpg);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;
  z-index: 1;
}




.login {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f5f5f5;
  border-radius: 25px;
  padding: 40px 50px;
  box-sizing: border-box;
}


.form {
--bg-light: #efefef;
--bg-dark: #707070;
--clr: #58bc82;
--clr-alpha: #9c9c9c60;
display: flex;
flex-direction: column;
align-items: center;
gap: 2rem;
width: 100%;
max-width: 400px;
}

.form .input-span {
width: 100%;
display: flex;
flex-direction: column;
gap: 0.5rem;
}

.form input[type='email'],
.form input[type='password'] {
border-radius: 0.5rem;
padding: 1rem 0.75rem;
border: none;
display: flex;
align-items: center;
gap: 0.5rem;
background-color: #d5d5d560;
outline: 2px solid grey;
}

.form input[type='email']:focus,
.form input[type='password']:focus {
outline: 2px solid #5b2528;
}

.label {
align-self: flex-start;
color: #5b2528;
font-weight: 600;
}

.form .submit {
padding: 1rem 0.75rem;
width: 88%;
border-radius: 3rem;
background-color: #5b2528;
color: var(--bg-light);
border: none;
cursor: pointer;
transition: all 300ms;
font-weight: 600;
font-size: 0.9rem;
}

.form .submit:hover {
background-color: #8d6371;
color: white;
}

.span {
text-decoration: none;
color: var(--bg-dark);
}

.span a {
color: var(--clr);
}
</style>
