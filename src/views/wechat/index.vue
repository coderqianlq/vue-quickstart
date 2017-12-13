<template>
<div id="wechat">
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

  <el-table :data="baseInfoData" v-loading="loading" style="width: 100%">
    <el-table-column type="index" width="80">
    </el-table-column>
    <el-table-column prop="baseInfo.userId" label="userId" width="150">
    </el-table-column>
    <el-table-column prop="baseInfo.nickName" label="昵称" width="150">
    </el-table-column>
    <el-table-column prop="baseInfo.remarkName" label="备注名" width="120">
    </el-table-column>
    <el-table-column label="性别" width="80">
      <template scope="props">
        <span>{{ handleSex(props.row.baseInfo.sex) }}</span>
      </template>
    </el-table-column>
    <el-table-column label="个人号/公众号" width="150">
      <template scope="props">
        <span>{{ handleVerifyFlag(props.row.baseInfo.verifyFlag) }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="baseInfo.signature" label="签名" width="300">
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
      <el-button @click="detailFormVisible = false">确 认</el-button>
    </div>
  </el-dialog>

</div>
</template>

<script>
import format from '@/common/js/format.js';

export default {
  name: 'wechat',
  data: function() {
    return {
      merchantId: '',
      userId: '',
      name: '',
      idCard: '',
      mobile: '',
      authItem: 'wechat',
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
    handleSex: function(sex) {
      if (0 != sex) {
        return sex == 1 ? "男" : "女";
      }
      return "未知";
    },
    handleVerifyFlag: function(verifyFlag) {
      return verifyFlag == 0 ? "个人号" : "公众号";
    }
  }
}
</script>

<style>

</style>
