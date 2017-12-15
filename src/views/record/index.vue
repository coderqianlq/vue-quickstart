<template>
<div id="record">
  <el-form>
    <el-row :gutter="24">
      <el-col :span="6">
        <el-form-item>
          <el-input v-model="userId" placeholder="请输入内容">
            <template slot="prepend">userId</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item>
          <el-input v-model="baseInfoId" placeholder="请输入内容">
            <template slot="prepend">baseInfoId</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-button type="primary" icon="search" style="float:right;" @click="handleSearch">搜索</el-button>
      </el-col>
    </el-row>
  </el-form>

  <el-table :data="recordData.slice((pagenum-1)*pagesize,pagenum*pagesize)" v-loading="loading" element-loading-text="拼命加载中" stripe="true" style="width: 100%">
    <el-table-column type="index" width="60">
    </el-table-column>
    <el-table-column prop="id" label="ID" width="120">
    </el-table-column>
    <el-table-column prop="userId" label="UserID" width="100">
    </el-table-column>
    <el-table-column prop="name" label="姓名" width="100">
    </el-table-column>
    <el-table-column prop="mobile" label="手机号" width="150">
    </el-table-column>
    <el-table-column prop="taobaoAccount" label="淘宝账号" width="180">
    </el-table-column>
    <el-table-column prop="alipayAccount" label="支付宝账号" width="200">
    </el-table-column>
    <el-table-column label="最近更新时间" width="200">
      <template scope="scope">
        <span>{{ dateFormat(scope.row.lastUpdateDate) }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template scope="scope">
          <el-button size="small" @click="getRecord(scope.row.userId, scope.row.id)">view</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog title="详细信息" :visible.sync="recordFormVisible" size="large">
    <el-table :data="detailData.slice((currentpagenum-1)*currentpagesize,currentpagenum*currentpagesize)" border max-height="600" style="width: 100%">
      <el-table-column label="序号" width="100">
        <template scope="props">
            <span>{{ (props.$index+1)+((currentpagenum-1)*currentpagesize) }}</span>
          </template>
      </el-table-column>
      <el-table-column prop="baseInfoId" label="baseInfoId" width="150">
      </el-table-column>
      <el-table-column prop="userId" label="userId" width="150">
      </el-table-column>
      <el-table-column prop="title" label="title" width="300">
      </el-table-column>
      <el-table-column prop="amount" label="amount" width="100">
      </el-table-column>
      <el-table-column prop="tradeNo" label="tradeNo" width="300">
      </el-table-column>
      <el-table-column label="tradeTime" width="200">
        <template scope="props">
            <span>{{ dateFormat(props.row.tradeTime) }}</span>
          </template>
      </el-table-column>
      <el-table-column prop="tradeStatus" label="tradeStatus" width="150">
      </el-table-column>
      <el-table-column prop="tradeType" label="tradeType" width="150">
      </el-table-column>
      <el-table-column prop="otherSide" label="otherSide" width="300">
      </el-table-column>
      <el-table-column prop="txTpyeId" label="txTpyeId" width="100">
      </el-table-column>
      <el-table-column prop="behaviorLableId" label="behaviorLableId" width="150">
      </el-table-column>
      <el-table-column prop="tradeDateilUrl" label="tradeDateilUrl" width="300">
      </el-table-column>
      <el-table-column prop="otherSideAccount" label="otherSideAccount" width="200">
      </el-table-column>
      <el-table-column prop="otherSideName" label="otherSideName" width="200">
      </el-table-column>
      <el-table-column prop="status" label="status" width="100">
      </el-table-column>
    </el-table>
    <div align="right" style="margin-top: 20px">
      <el-pagination @size-change="pagesizeChange" @current-change="pagenumChange" :current-page="currentpagenum" :page-sizes="[10, 15, 20, 25, 30]" :page-size="currentpagesize" layout="total, sizes, prev, pager, next, jumper" :total="recordCount">
      </el-pagination>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="recordFormVisible = false">关 闭</el-button>
    </div>
  </el-dialog>

  <div align="right" style="margin-top: 20px" v-show="paginationVisible">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum" :page-sizes="[5, 10, 15, 20]" :page-size="pagesize" layout="sizes, prev, pager, next, jumper" :total="totalCount">
    </el-pagination>
  </div>

</div>
</template>

<script>
import format from '@/common/js/format.js';
import { getTaobaoBaseInfo, getTaobaoRecord } from '@/api/api.js';

export default {
  name: 'record',
  data: function() {
    return {
      userId: '',
      baseInfoId: '',
      pagenum: 1,
      pagesize: 10,
      currentpagenum: 1,
      currentpagesize: 10,
      recordData: [],
      detailData: [],
      loading: false,
      recordFormVisible: false,
      paginationVisible: false,
      totalCount: 100,
      recordCount: 100
    }
  },
  methods: {
    handleSearch: function() {
      this.getData(this.userId, this.baseInfoId, this.pagenum, this.pagesize);
    },
    getData: function(userId, baseInfoId, pagenum, pagesize) {
      this.loading = true;
      let obj = { userId: userId, baseInfoId: baseInfoId, pageNum: pagenum, pageSize: pagesize };
      let params = Object.assign({}, obj);
      getTaobaoBaseInfo(params).then(
        res => {
          this.recordData = res.data;
          this.loading = false;
          this.paginationVisible = true;
        },
        err => {
          this.loading = false;
          this.$alert(err.message);
      });
    },
    getRecord: function(userId, baseInfoId) {
      let obj = { userId: userId, baseInfoId: baseInfoId };
      let params = Object.assign({}, obj);
      getTaobaoRecord(params).then(
        res => {
          this.detailData = res.data;
          this.recordCount = this.detailData.length;
          this.recordFormVisible = true;
        },
        err => {
          this.$alert(err.message);
        });
    },
    handleSizeChange: function(val) {
      this.pagesize = val;
      this.getData(this.userId, this.baseInfoId, this.currentPage, val);
    },
    handleCurrentChange: function(val) {
      this.currentPage = val;
      this.getData(this.userId, this.baseInfoId, val, this.pagesize);
      this.currentPage = 1;
    },
    pagesizeChange: function(val) {
      this.currentpagesize = val;
    },
    pagenumChange: function(val) {
      this.currentpagenum = val;
    },
    dateFormat: function(timestamp) {
      return format.dateFormat(timestamp);
    }
  }
}
</script>

<style>

</style>
