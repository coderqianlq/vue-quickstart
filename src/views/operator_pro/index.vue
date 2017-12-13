<template>
<div id="operator_pro">
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
    <el-table-column type="expand">
      <template scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="id">
            <span>{{ props.row.baseInfo.id }}</span>
          </el-form-item>
          <el-form-item label="userId">
            <span>{{ props.row.baseInfo.userId }}</span>
          </el-form-item>
          <el-form-item label="姓名">
            <span>{{ props.row.baseInfo.name }}</span>
          </el-form-item>
          <el-form-item label="身份证号">
            <span>{{ props.row.baseInfo.identityCard }}</span>
          </el-form-item>
          <el-form-item label="手机号">
            <span>{{ props.row.baseInfo.telNum }}</span>
          </el-form-item>
          <el-form-item label="账号归属省">
            <span>{{ props.row.baseInfo.telNumProvince }}</span>
          </el-form-item>
          <el-form-item label="账号归属市">
            <span>{{ props.row.baseInfo.telNumCity }}</span>
          </el-form-item>
          <el-form-item label="运营商等级">
            <span>{{ props.row.baseInfo.telCustomerLevel }}</span>
          </el-form-item>
          <el-form-item label="运营商类型">
            <span>{{ props.row.baseInfo.telNumAttribution }}</span>
          </el-form-item>
          <el-form-item label="入网时间">
            <span>{{ dateFormat(props.row.baseInfo.netJoinDate) }}</span>
          </el-form-item>
          <el-form-item label="当前开机状态">
            <span>{{ props.row.baseInfo.telNumStatus }}</span>
          </el-form-item>
          <el-form-item label="套餐名称">
            <span>{{ props.row.baseInfo.telPackage }}</span>
          </el-form-item>
          <el-form-item label="实名认证状态">
            <span>{{ handleStatus(props.row.baseInfo.status) }}</span>
          </el-form-item>
          <el-form-item label="创建时间">
            <span>{{ dateFormat(props.row.baseInfo.createDate) }}</span>
          </el-form-item>
          <el-form-item label="最近更新时间">
            <span>{{ dateFormat(props.row.baseInfo.lastUpdateDate) }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column type="index" width="80">
    </el-table-column>
    <el-table-column prop="baseInfo.userId" label="userId" width="120">
    </el-table-column>
    <el-table-column prop="baseInfo.name" label="姓名" width="100">
    </el-table-column>
    <el-table-column prop="baseInfo.telNum" label="手机号码" width="140">
    </el-table-column>
    <el-table-column prop="baseInfo.identityCard" label="身份证号" width="180">
    </el-table-column>
    <el-table-column prop="baseInfo.telNumProvince" label="省份" width="80">
    </el-table-column>
    <el-table-column prop="baseInfo.telNumAttribution" label="运营商" width="100">
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
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="账单信息" name="first">
        <el-table :data="billDetails" border max-height="600" stripe="true" style="width: 100%">
          <el-table-column type="index" width="100">
          </el-table-column>
          <el-table-column prop="billMonth" label="账单月份" width="200">
            <template scope="props">
              <span>{{ handleBillMonth(props.row.billMonth) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="baseFee" label="月基本费" width="200">
          </el-table-column>
          <el-table-column prop="totalFee" label="消费合计" width="200">
          </el-table-column>
          <el-table-column prop="payFee" label="实际应缴费用">
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="通话记录" name="second">
        <el-table :data="callDetails.slice((callPagenum-1)*callPagesize,callPagenum*callPagesize)" border max-height="600" stripe="true" style="width: 100%">
          <el-table-column label="序号" width="100">
            <template scope="props">
                <span>{{ (props.$index+1)+((callPagenum-1)*callPagesize) }}</span>
              </template>
          </el-table-column>
          <el-table-column prop="callMonth" label="通话月份" width="200">
            <template scope="props">
              <span>{{ handleBillMonth(props.row.callMonth) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="通话时间" width="200">
            <template scope="props">
              <span>{{ dateFormat(props.row.callStartTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="otherTelNum" label="通话号码" width="200">
          </el-table-column>
          <el-table-column label="呼叫类型" width="100">
            <template scope="props">
              <span>{{ handleType(props.row.callType, 1) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="callLocation" label="通话地点" width="100">
          </el-table-column>
          <el-table-column prop="callDuration" label="通话时长" width="100">
          </el-table-column>
          <el-table-column prop="fee" label="通话费用">
          </el-table-column>
        </el-table>
        <div align="right" style="margin-top: 20px">
          <el-pagination @size-change="callPagesizeChange" @current-change="callPagenumChange" :current-page="callPagenum" :page-sizes="[20, 30, 40]" :page-size="callPagesize" layout="total, sizes, prev, pager, next, jumper" :total="callCount">
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="短信记录" name="third">
        <el-table :data="shortMessageDetails.slice((smsPagenum-1)*smsPagesize,smsPagenum*smsPagesize)" border max-height="600" stripe="true" style="width: 100%">
          <el-table-column label="序号" width="100">
            <template scope="props">
                <span>{{ (props.$index+1)+((smsPagenum-1)*smsPagesize) }}</span>
              </template>
          </el-table-column>
          <el-table-column label="发送／接收时间" width="200">
            <template scope="props">
              <span>{{ dateFormat(props.row.smsTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="otherTelNum" label="对方号码" width="200">
          </el-table-column>
          <el-table-column label="收发类型" width="100">
            <template scope="props">
              <span>{{ handleType(props.row.smsType, 2) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="businessType" label="业务类型" width="200">
          </el-table-column>
          <el-table-column prop="fee" label="费用">
          </el-table-column>
        </el-table>
        <div align="right" style="margin-top: 20px">
          <el-pagination @size-change="smsPagesizeChange" @current-change="smsPagenumChange" :current-page="smsPagenum" :page-sizes="[20, 30, 40]" :page-size="smsPagesize" layout="total, sizes, prev, pager, next, jumper" :total="smsCount">
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div slot="footer" class="dialog-footer">
      <el-button @click="detailVisible = false">关 闭</el-button>
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
      <el-table-column prop="url" label="url" width="200">
      </el-table-column>
      <el-table-column prop="resultType" label="resultType" width="150" sortable>
      </el-table-column>
      <el-table-column prop="storagePath" label="storagePath" width="200">
      </el-table-column>
      <el-table-column prop="remark" label="remark" width="150">
      </el-table-column>
      <el-table-column label="updatedAt" width="200">
        <template scope="props">
          <span>{{ dateFormat(props.row.updatedAt) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template scope="props">
          <el-button type="primary" size="small" @click="show(props.row.storagePath)" icon="search"></el-button>
          <el-button type="primary" size="small" @click="download(props.row.storagePath)">↓</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button @click="resultVisible = false">关 闭</el-button>
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
      <el-button @click="pageVisible = false">关 闭</el-button>
    </div>
  </el-dialog>

</div>
</template>

<script>
import format from '@/common/js/format.js';
import { getBaseInfoData, getDetailData, getResult, showResult, downloadResult } from '@/api/api.js';

export default {
  name: 'operator_pro',
  data: function() {
    return {
      merchantId: '',
      userId: '',
      name: '',
      idCard: '',
      mobile: '',
      authItem: 'operator_pro',
      baseInfoData: [],
      detailData: {},
      resultData: [],
      billDetails: [],
      callDetails: [],
      shortMessageDetails: [],
      pageData: new Map(),
      loading: false,
      detailVisible: false,
      resultVisible: false,
      pageVisible: false,
      callPagenum: 1,
      callPagesize: 20,
      callCount: 100,
      smsPagenum: 1,
      smsPagesize: 20,
      smsCount: 100,
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
          this.billDetails = res.data.authResult.billDetails;
          this.callDetails = res.data.authResult.callDetails;
          this.callCount = res.data.authResult.callDetails.length;
          this.shortMessageDetails = res.data.authResult.shortMessageDetails;
          this.smsCount = res.data.authResult.shortMessageDetails.length;
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
      showResult(params).then(
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
    dateFormat: function(timestamp) {
      return format.dateFormat(timestamp);
    },
    handleStatus: function(status) {
      return format.handleStatus(status);
    },
    handleBillMonth: function(billMonth) {
      return format.handleBillMonth(billMonth);
    },
    handleType: function(callType, type) {
      return format.handleType(callType, type);
    },
    callPagesizeChange: function(val) {
      this.callPagesize = val;
    },
    callPagenumChange: function(val) {
      this.callPagenum = val;
    },
    smsPagesizeChange: function(val) {
      this.smsPagesize = val;
    },
    smsPagenumChange: function(val) {
      this.smsPagenum = val;
    }
  }
}
</script>


<style>

</style>
