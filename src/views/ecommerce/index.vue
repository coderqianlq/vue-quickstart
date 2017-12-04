<template>
<div id="ecommerce">
  <el-form>
    <el-row :gutter="24">
      <el-col :span="5">
        <el-form-item>
          <el-input v-model="merchantId" placeholder="请输入内容">
            <template slot="prepend">商户号</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item>
          <el-input v-model="name" placeholder="请输入内容">
            <template slot="prepend">姓 名</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
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
      <el-col :span="3">
        <el-button type="primary" icon="search" style="float:right;" @click="handleSearch">搜索</el-button>
      </el-col>
    </el-row>
  </el-form>

  <el-table :data="baseInfoData.slice((currentPage-1)*pageSize,currentPage*pageSize)" v-loading="loading" element-loading-text="拼命加载中" style="width: 100%">
    <el-table-column type="expand">
      <template scope="props">
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
            <span>{{ handleIsVerified(props.row.baseInfo.isVerified) }}</span>
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
            <span>{{ handleBalancePaymentEnable(props.row.baseInfo.balancePaymentEnable)}}</span>
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
    <el-table-column prop="baseInfo.taobaoAccount" label="绑定的淘宝账号" width="150">
    </el-table-column>
    <el-table-column label="操作">
      <template scope="scope">
        <el-button size="small" :plain="true" type="info" @click="getStorage">storage</el-button>
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

  <el-dialog title="详细信息" :visible.sync="storageVisible" size="large">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="paymentAccounts" name="first">
        <template scope="props">
          <el-button v-for="i in num" :key="num" @click="showStorage(i)">{{ i }}</el-button>
        </template>
      </el-tab-pane>
      <el-tab-pane label="bankConsumeRecords" name="second">bankConsumeRecords</el-tab-pane>
      <el-tab-pane label="trades" name="third">trades</el-tab-pane>
      <el-tab-pane label="taoTrades" name="fourth">taoTrades</el-tab-pane>
    </el-tabs>
    <div slot="footer" class="dialog-footer">
      <el-button @click="storageVisible = false">确 认</el-button>
    </div>
  </el-dialog>
  <!-- <router-view class="view"></router-view> -->

</div>
</template>

<script>
export default {
  name: 'ecommerce',
  data: function() {
    return {
      merchantId: '',
      name: '',
      idCard: '',
      mobile: '',
      authItem: 'ecommerce',
      baseInfoData: [],
      detailData: {},
      currentPage: 1,
      pageSize: 10,
      totalCount: 100,
      loading: false,
      detailVisible: false,
      storageVisible: false,
      paginationVisible: false
    }
  },
  methods: {
    handleSearch: function() {
      this.getData(this.merchantId, this.name, this.idCard, this.mobile, this.authItem);
    },
    getData: function(merchantId, name, idCard, mobile, authItem) {
      this.loading = true;
      this.$http.get('/api/getBaseInfoData', {
        params: {
          merchantId: merchantId,
          name: name,
          idCard: idCard,
          mobile: mobile,
          authItem: authItem
        }
      }).then(
        res => {
          this.baseInfoData = res.data;
          this.loading = false;
          this.totalCount = this.baseInfoData.length;
          this.paginationVisible = true;
        },
        err => {
          this.loading = false;
          this.$alert(err.message);
        });
    },
    getDetailData: function(userId, baseInfoId) {
      this.$http.get('/api/getDetailInfoData', {
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
    getStorage: function() {
      this.storageVisible = true;
    },
    handleIsVerified: function(isVerified) {
      return isVerified == true ? "是" : "否";
    },
    handleAlipayRegistrationDatetime: function(alipayRegistrationDatetime) {
      return new Date(parseInt(alipayRegistrationDatetime)).toLocaleString().replace(/:\d{1,2}$/, ' ');
    },
    handleHuabeiStatus: function(huabeiStatus) {
      return huabeiStatus == 0 ? "未冻结" : "冻结";
    },
    handleStatus: function(status) {
      return status == 1 ? "是" : "否";
    },
    handleBalancePaymentEnable: function(halancePaymentEnable) {
      return halancePaymentEnable == 1 ? "是" : "否";
    },
    handleSizeChange: function(val) {
      this.pageSize = val;
    },
    handleCurrentChange: function(val) {
      this.currentPage = val;
    },
  }
}
</script>

<style>
.important {
  color: red;
}
</style>
