<template>
<div id="jd">
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

  <el-table :data="tableData" v-loading="" style="width: 100%">
    <el-table-column type="index" label="序号" width="100">
    </el-table-column>
    <el-table-column prop="nickName" label="昵称" width="150">
    </el-table-column>
    <el-table-column prop="sex" label="性别" width="100">
    </el-table-column>
    <el-table-column prop="signature" label="签名" width="350">
    </el-table-column>
    <el-table-column label="操作">
      <template scope="scope">
        <el-button type="text" size="small">下载</el-button>
      </template>
    </el-table-column>
  </el-table>

</div>
</template>

<script>
export default {
  name: 'jd',
  data: function() {
    return {
      merchantId: '',
      name: '',
      idCard: '',
      mobile: '',
      authItem: 'jd',
      baseInfoData: [],
      detailData: "",
      loading: false,
      detailFormVisible: false,
      storageVisible: false,
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
