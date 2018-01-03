<template>
<div id="ecommerce">
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
        <el-button type="primary" icon="el-icon-search" style="float:right;" @click="handleSearch">搜索</el-button>
      </el-col>
    </el-row>
  </el-form>

  <el-table :data="baseInfoData.slice((currentPage-1)*pageSize,currentPage*pageSize)" v-loading="loading" element-loading-text="拼命加载中" stripe="true" style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="baseInfoId">
            <span>{{ props.row.baseInfo.id }}</span>
          </el-form-item>
          <el-form-item label="userId">
            <span>{{ props.row.baseInfo.userId }}</span>
          </el-form-item>
          <el-form-item label="支付宝账户编号">
            <span>{{ props.row.baseInfo.alipayUserId }}</span>
          </el-form-item>
          <el-form-item label="支付宝账户类型">
            <span>{{ props.row.baseInfo.alipayAccountType }}</span>
          </el-form-item>
          <el-form-item label="支付宝账号">
            <span>{{ props.row.baseInfo.alipayAccount }}</span>
          </el-form-item>
          <el-form-item label="淘宝账号">
            <span>{{ props.row.baseInfo.taobaoAccount }}</span>
          </el-form-item>
          <el-form-item label="姓名">
            <span>{{ props.row.baseInfo.name }}</span>
          </el-form-item>
          <el-form-item label="登记邮箱">
            <span>{{ props.row.baseInfo.email }}</span>
          </el-form-item>
          <el-form-item label="登记手机">
            <span>{{ props.row.baseInfo.mobile }}</span>
          </el-form-item>
          <el-form-item label="支付宝余额">
            <span>{{ props.row.baseInfo.alipayBalance }}</span>
          </el-form-item>
          <el-form-item label="余额宝余额">
            <span>{{ props.row.baseInfo.yuebaoBalance }}</span>
          </el-form-item>
          <el-form-item label="花呗状态" class="important">
            <span>{{ handleHuabeiStatus(props.row.baseInfo.huabeiStatus) }}</span>
          </el-form-item>
          <el-form-item label="支付宝注册时间">
            <span>{{ handleAlipayRegistrationDatetime(props.row.baseInfo.alipayRegistrationDatetime) }}</span>
          </el-form-item>
          <el-form-item label="是否实名认证">
            <span>{{ handleStatus(props.row.baseInfo.isVerified) }}</span>
          </el-form-item>
          <el-form-item label="花呗额度" class="important">
            <span>{{ props.row.baseInfo.huabeiAmount }}</span>
          </el-form-item>
          <el-form-item label="花呗余额">
            <span>{{ props.row.baseInfo.huabeiBalance }}</span>
          </el-form-item>
          <el-form-item label="花呗罚息">
            <span>{{ props.row.baseInfo.huabeiPenaltyAmount }}</span>
          </el-form-item>
          <el-form-item label="花呗逾期天数">
            <span>{{ props.row.baseInfo.huabeiOverdueDays }}</span>
          </el-form-item>
          <el-form-item label="借呗额度" class="important">
            <span>{{ props.row.baseInfo.jiebeiAmount }}</span>
          </el-form-item>
          <el-form-item label="借呗余额">
            <span>{{ props.row.baseInfo.jiebeiBalance }}</span>
          </el-form-item>
          <el-form-item label="买家信用额度">
            <span>{{ props.row.baseInfo.creditLevelAsBuyer }}</span>
          </el-form-item>
          <el-form-item label="卖家信用额度">
            <span>{{ props.row.baseInfo.creditLevelAsSeller }}</span>
          </el-form-item>
          <el-form-item label="授权人和实际抓取信息是否一致">
            <span>{{ handleStatus(props.row.baseInfo.status) }}</span>
          </el-form-item>
          <el-form-item label="淘气值">
            <span>{{ props.row.baseInfo.taoScore }}</span>
          </el-form-item>
          <el-form-item label="花呗下月还款额">
            <span>{{ props.row.baseInfo.huabeiNextMonthPayment }}</span>
          </el-form-item>
          <el-form-item label="花呗当月还款额">
            <span>{{ props.row.baseInfo.huabeiCurrentMonthPayment }}</span>
          </el-form-item>
          <el-form-item label="花呗还款日">
            <span>{{ props.row.baseInfo.huabeiPayDay }}</span>
          </el-form-item>
          <el-form-item label="花呗的逾期账单数">
            <span>{{ props.row.baseInfo.huabeiOverdueBillCnt }}</span>
          </el-form-item>
          <el-form-item label="花呗原始信用额度">
            <span>{{ props.row.baseInfo.huabeiOriginalAmount }}</span>
          </el-form-item>
          <el-form-item label="支付宝余额支付开关">
            <span>{{ handleStatus(props.row.baseInfo.balancePaymentEnable)}}</span>
          </el-form-item>
          <el-form-item label="余额宝累计收益">
            <span>{{ props.row.baseInfo.yuebaoIncome }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column type="index" label="序号" width="80">
    </el-table-column>
    <el-table-column prop="baseInfo.name" label="姓名" width="100">
    </el-table-column>
    <el-table-column prop="baseInfo.identityCard" label="身份证号" width="180">
    </el-table-column>
    <el-table-column prop="baseInfo.mobile" label="手机号码" width="150">
    </el-table-column>
    <el-table-column prop="baseInfo.alipayAccount" label="支付宝账号" width="180">
    </el-table-column>
    <el-table-column prop="baseInfo.taobaoAccount" label="绑定的淘宝账号" width="180">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="small" :plain="true" type="info" @click="getResult(scope.row.baseInfo.userId)">storage</el-button>
        <el-button size="small" :plain="true" type="danger" @click="getDetailData(scope.row.baseInfo.userId, scope.row.baseInfo.id)">view</el-button>
      </template>
    </el-table-column>
  </el-table>

  <div align="right" style="margin-top: 20px" v-show="paginationVisible">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
    </el-pagination>
  </div>

  <el-dialog title="详细信息" :visible.sync="detailVisible" size="large">
    <el-form>
      <span>{{ detailData }}</span>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="detailVisible = false">确 认</el-button>
    </div>
  </el-dialog>

  <el-dialog title="详细信息" :visible.sync="resultVisible" size="large">
    <el-table :data="resultData" border max-height="600" stripe="true" style="width: 100%">
      <el-table-column type="index" label="序号" width="100">
      </el-table-column>
      <el-table-column prop="userId" label="userId" width="100">
      </el-table-column>
      <el-table-column prop="taskId" label="taskId" width="100">
      </el-table-column>
      <el-table-column prop="websiteId" label="websiteId" width="120">
      </el-table-column>
      <el-table-column prop="url" label="url" width="200" show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="resultType" label="resultType" width="150" show-overflow-tooltip="true" sortable>
      </el-table-column>
      <el-table-column prop="storagePath" label="storagePath" width="200" show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="remark" label="remark" width="150" show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column label="updatedAt" width="200">
        <template slot-scope="props">
          <span>{{ dateFormat(props.row.updatedAt) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="props">
          <el-button type="primary" size="small" @click="show(props.row.storagePath)" icon="el-icon-view"></el-button>
          <el-button type="primary" size="small" @click="download(props.row.storagePath)" icon="el-icon-download"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button @click="resultVisible = false">确 认</el-button>
    </div>
  </el-dialog>

  <el-dialog title="详细信息" :visible.sync="pageVisible" size="large">
    <el-form>
      <el-row :gutter="24">
        <el-col :span="4" v-for="(content, page) in pageData" :key="page" style="margin-bottom: 20px">
          <el-card :body-style="{ padding: '0px' }">
            <img src="~/@/assets/page.jpg" class="image">
            <div style="padding: 14px">
              <span>{{ page }}</span>
              <div class="bottom clearfix">
                <el-button type="text" class="button" @click="view(content)">查看</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="pageVisible = false">确 认</el-button>
    </div>
  </el-dialog>
  <!-- <router-view class="view"></router-view> -->

</div>
</template>

<script>
import format from '@/common/js/format.js';
import { getBaseInfoData, getDetailData, getResult, showResult, downloadResult } from '@/api/api.js';

export default {
  name: 'ecommerce',
  data: function() {
    return {
      merchantId: '',
      userId: '',
      name: '',
      idCard: '',
      mobile: '',
      authItem: 'ecommerce',
      baseInfoData: [],
      detailData: {},
      resultData: [],
      pageData: new Map(),
      currentPage: 1,
      pageSize: 10,
      totalCount: 100,
      loading: false,
      pageVisible: false,
      detailVisible: false,
      resultVisible: false,
      paginationVisible: false,
      baseUrl: 'http://172.19.44.24:8182/downloadExtractPage?key='
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
      this.loading = true;
      var obj = { merchantId: this.merchantId, userId: this.userId, name: this.name, idCard: this.idCard, mobile: this.mobile, authItem: this.authItem };
      let params = Object.assign({}, obj);
      getBaseInfoData(params).then(
        res => {
          this.baseInfoData = res.data;
          this.totalCount = this.baseInfoData.length;
          this.paginationVisible = true;
        },
        err => {
          this.$alert(err.message);
      });
      this.loading = false;
    },
    getDetailData: function(userId, baseInfoId) {
      var obj = { userId: userId, baseInfoId: baseInfoId, authItem: this.authItem, isReport: false };
      let params = Object.assign({}, obj);
      getDetailData(params).then(
        res => {
          this.detailData = res.data;
          this.detailVisible = true;
        },
        err => {
          this.$alert(err.message);
      });
    },
    getResult: function(userId) {
      var obj = { userId: userId, authItem: this.authItem };
      let params = Object.assign({}, obj);
      getResult(params).then(
        res => {
          this.resultData = res.data;
          this.resultVisible = true;
        },
        err => {
          this.$alert(err.message);
      });
    },
    show: function(key) {
      let params = Object.assign({}, {key: key});
      showResult(params).then(
        res => {
          this.pageData = res.data;
          this.pageVisible = true;
        },
        err => {
          this.$alert(err.message);
      });
    },
    download: function(key) {
      let params = Object.assign({}, {key: key});
      downloadResult(params).then(
        res => {
            window.open(this.baseUrl + key);
        },
        err => {
          this.$alert(err.message);
      });
    },
    view: function(content) {
      var OpenWindow = window.open();
      OpenWindow.document.write(content);
      OpenWindow.document.close();
    },
    handleAlipayRegistrationDatetime: function(alipayRegistrationDatetime) {
      return format.handleAlipayRegistrationDatetime(alipayRegistrationDatetime);
    },
    handleHuabeiStatus: function(huabeiStatus) {
      return format.handleHuabeiStatus(huabeiStatus);
    },
    handleStatus: function(status) {
      return format.handleStatus(status);
    },
    dateFormat: function(timestamp) {
      return format.dateFormat(timestamp);
    },
    handleSizeChange: function(val) {
      this.pageSize = val;
    },
    handleCurrentChange: function(val) {
      this.currentPage = val;
    }
  }
}
</script>

<style>
.important {
  color: red;
}

el-table-column {
  table-layout: fixed;
  overflow: hidden;
  text-overflow: ellipsis;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
</style>
