<template>
<div id="wechat">
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

  <el-table :data="baseInfoData" v-loading="loading" style="width: 100%">
    <el-table-column type="expand">
      <template scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="">
              <span>{{ props.row.jsonData }}</span>
            </el-form-item>
          </el-form>
        </template>
    </el-table-column>
    <el-table-column type="index" label="序号" width="80">
    </el-table-column>
    <el-table-column prop="name" label="姓名" width="120">
    </el-table-column>
    <el-table-column prop="identityCard" label="身份证号" width="150">
    </el-table-column>
    <el-table-column prop="telNum" label="手机号码" width="120">
    </el-table-column>
    <el-table-column label="操作">
      <template scope="props">
          <el-button type="text" size="small" style="color:red" @click="getStorage()">storage</el-button>
          <el-button type="text" size="small" @click="getDetailsData(props.row.jsonData.baseInfo.userId, props.row.jsonData.baseInfo.id)">view</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog title="详细信息" :visible.sync="detailFormVisible">
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
import eventHub from '../../assets/eventHub.js';

export default {
  name: 'wechat',
  data: function() {
    return {
      merchantId: '',
      name: '',
      idCard: '',
      mobile: '',
      authItem: 'wechat',
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
          authItem: authItem,
        }
      }).then(
        res => {
          this.$alert(res.data);
        },
        err => {
          this.$alert(err.message);
        });
        this.loading = false;
    }
  }
}
</script>

<style>

</style>
