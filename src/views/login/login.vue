<template>
  <div class="login-box">
     <login-Page></login-Page>
  </div>
</template>

<script>
import loginPage from '../login/componse/loginPage'
export default {
  data () {
    return {

    }
  },
  components: {
    'login-Page': loginPage
  }
}
</script>

<style scoped lang="less">
.login-box{
  height: 100%
}
</style>
