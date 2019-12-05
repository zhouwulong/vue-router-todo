<template>
  <div class="home-box">
     <el-container>
          <el-header>
              <el-row>
                <el-col :span="20"><p class="home-title">todo后台管理系统</p></el-col>
                <el-col :span="3"><P class="home-username">你好,{{username?username.substr(0,1)+"****":''}}</P></el-col>
                <!-- split('')reverse().join("") -->
                <el-col :span="1"><P class="home-drop"><i class="icon iconfont icon-dingbudaohang-zhangh"></i>退出</P></el-col>
              </el-row>
          </el-header>
          <el-container>
            <el-aside width="200px">
                <!-- 开始 -->
                <!-- 个人中心 -->
                <el-menu :router="true" :default-active="$route.fullPath" class="el-menu-vertical-demo" :collapse="isCollapse" :default-openeds="openeds">
                  <el-menu-item index="/home/personal">
                      <i class="icon iconfont icon-wenben"></i>
                      <!-- <router-link slot="title" to="personal" class="">个人中心</router-link> -->
                      <span slot="title">个人中心</span>
                  </el-menu-item>
                  <el-submenu index="2">
                    <template slot="title">
                      <i class="icon iconfont icon-wenben"></i>
                      <span slot="title">处理事件</span>
                    </template>
                    <el-menu-item-group>
                      <div v-if="objectData.data">
                        <p class="deal-p" v-for="(item,index) in objectData.data" :key='index'>
                          <el-menu-item :index="'/home/homeTable?index=' + index"><span slot="title">{{item.memu}}</span></el-menu-item>
                        </p>
                      </div>
                    </el-menu-item-group>
                  </el-submenu>
                </el-menu>
                <!-- 个人中心 -->
            </el-aside>
            <el-main>
              <router-view></router-view>
            </el-main>
          </el-container>
      </el-container>
  </div>
</template>

<script>
import '../../assets/element.css'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      path: '/home/personal',
      openeds: ['1'],
      isCollapse: false,
      index: 0,
      objectData: {},
      username: ''
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
    },
    personal () {

    },
    initial () {
      this.$store.dispatch('getToken')
      console.log(this.$route)
      // console.log('allData: ', this.allData)
      if (this.token === JSON.stringify(this.allData.token)) {
        this.objectData = this.allData
        this.username = this.objectData.username
      }
    }
  },
  mounted () {
    this.initial()
  },
  updated () {

  },
  computed: {
    ...mapGetters([
      'user',
      'token',
      'allData'
    ])
  },
  // beforeRouteEnter (to, from, next) {
  //   // 在当前路由改变，但是该组件被复用时调用
  //   // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
  //   // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
  //   // 可以访问组件实例 `this`
  // },
  components: {

  }
}
</script>

<style scoped lang="less">
.home-box{
  height: 100%;
  .home-title{
    color: #fff;
    font-size: 30px;
    margin: 0;
    margin-left: 30px;
    line-height: 60px;
  }
  .home-username{
    text-align: right;
    color: #fff;
    margin-right: 30px;
  }
  .home-drop{
    color: #fff;
  }
  .deal-p{
    margin: 0
  }
}
.personal-a{
  text-decoration: none;
  color: #303133;
}

</style>
