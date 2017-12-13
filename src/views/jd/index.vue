<template>
<div id="jd">
  <el-form>
    <el-row :gutter="24">
      <el-col :span="4">
        <el-form-item>
          <el-input v-model="merchantId" placeholder="请输入内容">
            <template slot="prepend">商户号</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item>
          <el-input v-model="userId" placeholder="请输入内容">
            <template slot="prepend">userId</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item>
          <el-input v-model="name" placeholder="请输入内容">
            <template slot="prepend">姓 名</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item>
          <el-input v-model="mobile" placeholder="请输入内容">
            <template slot="prepend">手机号</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item>
          <el-input v-model="idCard" placeholder="请输入内容">
            <template slot="prepend">身份证</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" icon="search" style="float:right;" @click="handleSearch">搜索</el-button>
      </el-col>
    </el-row>
  </el-form>

  <el-table :data="baseInfoData" v-loading="" style="width: 100%">
    <el-table-column type="index" width="80">
    </el-table-column>
    <el-table-column prop="baseInfo.userId" label="userId" width="120">
    </el-table-column>
    <el-table-column prop="baseInfo.userName" label="用户名" width="160">
    </el-table-column>
    <el-table-column prop="baseInfo.nickName" label="昵称" width="150">
    </el-table-column>
    <el-table-column prop="baseInfo.userGrade" label="用户等级" width="100">
    </el-table-column>
    <el-table-column prop="baseInfo.btBlance" label="白条余额" width="120">
    </el-table-column>
    <el-table-column prop="baseInfo.jtBlance" label="金条余额" width="120">
    </el-table-column>
    <el-table-column label="最近更新时间" width="200">
      <template scope="props">
        <span>{{ dateFormat(props.row.baseInfo.lastUpdateDate) }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template scope="scope">
        <el-button size="small" :plain="true" type="info" @click="getResult(scope.row.baseInfo.userId)">storage</el-button>
        <el-button size="small" :plain="true" type="danger" @click="getDetailData(scope.row.baseInfo.userId, scope.row.baseInfo.id)">view</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog title="详细信息" :visible.sync="detailVisible" size="large">
    <el-form>
      <span>{{ detailData }}</span>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="detailVisible = false">确 认</el-button>
    </div>
  </el-dialog>

</div>
</template>

<script>
import format from '@/common/js/format.js';
export default {
  name: 'jd',
  data: function() {
    return {
      merchantId: '',
      userId: '',
      name: '',
      idCard: '',
      mobile: '',
      authItem: 'jd',
      baseInfoData: [],
      detailData: {},
      loading: false,
      detailVisible: false,
    }
  },
  methods: {
    handleSearch: function() {
      if(!format.checkParams(this.merchantId, this.userId, this.name, this.idCard, this.mobile)) {
        this.$message({
          message: 'merchantId,userId,name,idCard,mobile不能同时为空',
          type: 'warning'
        });
        return;
      }
      this.getData(this.merchantId, this.userId, this.name, this.idCard, this.mobile, this.authItem);
    },
    getData: function(merchantId, userId, name, idCard, mobile, authItem) {
      this.loading = true;
      this.$http.get('/getBaseInfoData', {
        params: {
          merchantId: merchantId,
          userId: userId,
          name: name,
          idCard: idCard,
          mobile: mobile,
          authItem: authItem,
        }
      }).then(
        res => {
          this.baseInfoData = res.data;
        },
        err => {
          this.$alert(err.message);
        });
      this.loading = false;
    },
    getDetailData: function(userId, baseInfoId) {
      this.$http.get('/getDetailInfoData', {
        params: {
          userId: userId,
          baseInfoId: baseInfoId,
          authItem: this.authItem,
          isReport: false,
        }
      }).then(
        res => {
          this.detailData = res.data;
          this.detailVisible = true;
        },
        err => {
          this.$alert(err.message);
        });
    },
    getResult: function(userId) {
      // this.$http.get('/api/getExtractResult', {
      //   params: {
      //     userId: userId,
      //     authItem: this.authItem
      //   }
      // }).then(
      //   res => {
      //     this.resultData = res.data;
      //     this.resultVisible = true;
      //   },
      //   err => {
      //     this.$alert(err.message);
      //   });
    },
    dateFormat: function(timestamp) {
      return format.dateFormat(timestamp);
    }
  }
}
</script>

<style>

</style>
