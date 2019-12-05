<template>
  <div class="loginPage-box">
     <div class="loginPage-table">
        <p class="loginPage-table-title">todo11系统登录</p>
        <div class="loginPage-form">
            <el-form ref="form" :rules="rules" :model="form">
              <el-form-item prop="name">
                <el-input type="text" class="input-name" prefix-icon="icon iconfont icon-renbudaiwaiquan" v-model="form.name"></el-input>
              </el-form-item>
               <el-form-item prop="password" class="form-item-yj">
                <el-input :type="passwordtype" class="input-paw" prefix-icon="icon iconfont icon-mima" v-model="form.password"></el-input>
                <i @click="passwordShow" :class="passwordtype === 'password' ? 'icon iconfont icon-yanjing' : 'icon iconfont icon-yanjing1'"></i>
              </el-form-item>
            </el-form>
            <el-button class="login-btn" type="primary" @click="loginBtn('form')">登录</el-button>
            <p class="register-btn">未注册？点击注册</p>
            <el-button class="login-btn" type="primary" @click="databtn">数据</el-button>
        </div>
     </div>

  </div>
</template>

<script>
import '../../../assets/element.css'
import { mapGetters } from 'vuex'

export default {

  data () {
    let username = (rule, value, callback) => {
      let has = false

      if (this.allData.username === this.form.name) {
        this.userName = this.allData.username
        this.loginToken = this.allData.token
        // this.$store.dispatch('getuserName', this.userName)
        localStorage.setItem('token', JSON.stringify(this.loginToken))
        has = true
      }

      if (has) {
        callback()
      } else {
        callback(new Error('用户名不存在'))
      }
    }
    let userpassword = (rule, value, callback) => {
      let haspassword = false

      if (this.allData.username === this.form.name) {
        if (this.allData.password === this.form.password) {
          haspassword = true
        }
      }

      if (haspassword) {
        callback()
      } else {
        callback(new Error('密码不正确'))
      }
    }
    return {
      passwordtype: 'password',
      // pawHide: false,
      form: {
        name: '',
        password: '',
        userName: '',
        loginToken: ''
      },
      rules: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' },
          { validator: username, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' },
          { validator: userpassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    passwordShow () {
      if (this.passwordtype === 'password') {
        this.passwordtype = ''
      } else {
        this.passwordtype = 'password'
      }
    },
    loginBtn (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$router.push({ name: 'home' })
        } else {
          this.$message({
            showClose: true,
            message: '请输入正确的账号密码',
            type: 'error',
            offset: 300,
            duration: 1500
          })
          return false
        }
      })
    },
    initial () {
      this.$store.dispatch('getUserData')
    },
    databtn () {
      localStorage.setItem('user', JSON.stringify([
        { username: 'admin',
          token: '11111111',
          password: '666666',
          data: [
            { memu: '日常事件',
              list: [{ 'mome': '水饺', 'check': true }, { 'mome': '吃饭', 'check': false }, { 'mome': '玩游戏', 'check': false }]
            },
            { memu: '训练事件',
              list: [{ 'mome': '吃鸡', 'check': true }, { 'mome': '英雄联盟', 'check': false }, { 'mome': '打球', 'check': false }]
            },
            { memu: '学习事件',
              list: [{ 'mome': 'vue', 'check': true }, { 'mome': 'js', 'check': false }, { 'mome': 'php', 'check': false }]
            }
          ]
        },
        { username: 'zhouwulong',
          token: '22222222',
          password: '888888',
          data: [
            { memu: '日常事件',
              list: [{ 'mome': '121212', 'check': true }, { 'mome': '343434', 'check': false }, { 'mome': '454545', 'check': false }]
            },
            { memu: '训练事件',
              list: [{ 'mome': '151515', 'check': true }, { 'mome': '161616', 'check': false }, { 'mome': '181818', 'check': false }]
            },
            { memu: '学习事件',
              list: [{ 'mome': '787878', 'check': true }, { 'mome': '686868', 'check': false }, { 'mome': '494949', 'check': false }]
            }
          ]
        }
      ]
      ))
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'token',
      'allData'
    ])
  },
  mounted () {
    this.initial()
  },
  components: {

  }
}
</script>

<style scoped lang="less">
p,table,input{
  margin: 0;
  padding: 0;
}
.loginPage-box{
  height: 100%;
  background: url("../../../assets/bj.jpeg") no-repeat;
  background-size: 100% 100%;
  position: relative;
  .loginPage-table{
    width: 400px;
    height: 320px;
    background-color:rgba(253, 253, 251, 0.1);
    position: absolute;
    top: 50%;
    left: 50%;
    transform:translate(-50%,-50%);
    .loginPage-table-title{
      height:40px;
      line-height: 40px;
      text-align: center;
      background-color: rgba(253, 253, 251, 0.1);
      color: #fff;
    }
    .loginPage-form{
      padding-top: 40px
    }
    .register-btn{
      width: 350px;
      margin: 0 auto;
      text-align: center;
      color:#fff;
      margin-top:20px;
    }
    .form-item-yj{
      position: relative;
      .icon-yanjing{
        position: absolute;
        top: 0px;
        right: 15px;
        color: #fff;
        cursor:pointer;
      }
      .icon-yanjing1{
        position: absolute;
        top: 0px;
        right: 15px;
        color: #fff;
        cursor:pointer;
      }
    }
  }
}

</style>
