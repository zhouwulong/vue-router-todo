<template>
  <div class="homeTable-box">
      <div class="table-head-div">
        <p class="table-head-add">
          <i class="el-icon-plus" @click="addTable()"></i>
          <input class="table-head-add-input" v-model="addInput" placeholder="请输入" type="text" />
        </p>
      </div>
      <el-table :data="tableData?tableData:[]" style="width: 100%" :show-header="false">
        <el-table-column width="35">
          <!-- 开始 -->
          <template slot-scope="scope">
            <el-checkbox
              v-model="scope.row.check"
              @change="clickChange(scope.row.check,scope.$index)"
            ></el-checkbox>
          </template>
          <!-- 结束 -->
        </el-table-column>
        <el-table-column label="备忘语">
          <template slot-scope="scope">
            <!-- <div v-for="item in todos" v-bind:key="item.id">{{item.title}}</div> -->
            <span style="margin-right:20px" :class="{classred:scope.row.check}" v-show="scope.$index != modifyindex">{{scope.row.mome}}</span>
            <input style="margin-right:20px;width:auto" class="inputMemo" v-model="scope.row.mome" type="text" v-show="scope.$index == modifyindex" />
            <el-link
              @click="editLink(scope.row,scope.$index)"
              v-if="!scope.row.check && scope.$index != modifyindex"
              class="leftMmargin"
              icon="el-icon-edit"
            ></el-link>
            <el-button type="primary" size="mini" v-show="scope.$index == modifyindex" @click="determineBtn(scope.$index,scope.row.mome)">确定</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      userData: [],
      tableData: [],
      modifyindex: null,
      tableIndex: 0,
      addInput: '',
      eventData: {}
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.tableIndex = to.query.index
    this.initial()
    next()
  },
  methods: {
    initial () {
      this.tableData = []
      this.$store.dispatch('getToken')
      for (let j = 0; j < this.allData.data[this.tableIndex].list.length; j++) {
        this.tableData.push(this.allData.data[this.tableIndex].list[j])
      }
    },
    clickChange (check, indexChange) {
      this.$store.dispatch('clickChange', { 'index': this.tableIndex, 'check': check, 'indexChange': indexChange })
    },
    determineBtn (indexModify, mome) {
      console.log(111)
      this.$store.dispatch('modifyTableData', { 'index': this.tableIndex, 'mome': mome, 'indexModify': indexModify })
      this.modifyindex = null
    },
    editLink (row, index) {
      this.modifyindex = index
    },
    handleDelete (index) {
      this.$store.dispatch('delTableData', { 'index': this.tableIndex, 'delindex': index })
      this.initial()
    },
    addTable () {
      // console.log('this.allData.data[this.tableIndex].list: ', this.allData.data[this.tableIndex].list)
      console.log(999999)
      let addTabledate = { 'mome': this.addInput, 'check': false }
      // this.allData.data[this.tableIndex].list.push({ 'mome': this.addInput, 'check': false })
      this.$store.dispatch('addTableData', { 'index': this.tableIndex, 'data': addTabledate })
      this.initial()
    }
  },
  computed: {
    ...mapGetters([
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
.table-head-div{
  .table-head-add-input{
    margin-left: 20px;
    height: 30px;
    border:1px solid #ddd;
    width: 200px;
    padding-left: 5px;
    border-radius: 5px;
  }
  border-bottom:1px solid #ddd;
}
.classred {
  text-decoration: line-through;
}

</style>
