<template>
  <div class="personal-box">
    <div>
      <!-- <el-row>
        <el-col :span="8">
          <p>全部事件({{datalength}})</p>
        </el-col>
        <el-col :span="8">
          <p>未处理事件({{unprocessedlength}})</p>
        </el-col>
        <el-col :span="8">
          <p>已处理事件({{datalength-unprocessedlength}})</p>
        </el-col>
      </el-row> -->
      <template>
        <el-tabs v-model="activeName">
          <el-tab-pane :label="'全部事件('+ datalength + ')'" name='first'>
            <!-- 全部事件 -->
            <div class="table-zt">
              <el-table :data="eventData" style="width: 100%" :show-header="false">
                <el-table-column width="35">
                  <!-- 开始 -->
                  <template slot-scope="scope">
                    <el-checkbox
                      v-model="scope.row.check"
                    ></el-checkbox>
                  </template>
                  <!-- 结束 -->
                </el-table-column>
                <el-table-column label="备忘语">
                  <template slot-scope="scope">
                    <span style="margin-right:20px">{{scope.row.mome}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <!-- 全部事件 -->
          </el-tab-pane>
          <el-tab-pane :label="'未处理事件('+ unprocessedlength +')'" name="second">
            <div class="table-zt">
              <el-table :data="falseCheck" style="width: 100%" :show-header="false">
                <el-table-column width="35">
                  <!-- 开始 -->
                  <template slot-scope="scope">
                    <el-checkbox
                      v-model="scope.row.check"
                    ></el-checkbox>
                  </template>
                  <!-- 结束 -->
                </el-table-column>
                <el-table-column label="备忘语">
                  <template slot-scope="scope" >
                    <span style="margin-right:20px">{{scope.row.mome}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane :label="'已处理事件('+ (datalength-unprocessedlength) +')'" name="third">
            <div class="table-zt">
              <el-table :data="trueCheck" style="width: 100%" :show-header="false">
                <el-table-column width="35">
                  <!-- 开始 -->
                  <template slot-scope="scope">
                    <el-checkbox
                      v-model="scope.row.check"
                    ></el-checkbox>
                  </template>
                  <!-- 结束 -->
                </el-table-column>
                <el-table-column label="备忘语">
                  <template slot-scope="scope" >
                    <span style="margin-right:20px">{{scope.row.mome}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      eventData: [],
      index: 0,
      datalength: 0,
      unprocessedlength: 0,
      activeName: 'second',
      falseCheck: [],
      trueCheck: []
    }
  },
  methods: {
    initial () {
      this.$store.dispatch('getToken')
      //  判断
      for (let j = 0; j < this.allData.data.length; j++) {
        this.datalength += this.allData.data[j].list.length
        for (let m = 0; m < this.allData.data[j].list.length; m++) {
          this.eventData.push(this.allData.data[j].list[m])
          if (this.allData.data[j].list[m].check === false) {
            this.unprocessedlength += 1
            this.falseCheck.push(this.allData.data[j].list[m])
          }
          if (this.allData.data[j].list[m].check === true) {
            this.trueCheck.push(this.allData.data[j].list[m])
          }
        }
      }
      //  判断
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

</style>
