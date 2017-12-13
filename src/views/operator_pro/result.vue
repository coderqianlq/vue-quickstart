<template>
<div id="operator_pro_result">
  <el-form>
    <el-row :gutter="24">
      <el-col :span="6">
        <el-form-item>
          <el-input v-model="userId" placeholder="请输入内容">
            <template slot="prepend">userId</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="18">
        <el-button type="primary" icon="search" style="float:right;" @click="handleSearch">搜索</el-button>
      </el-col>
    </el-row>
  </el-form>

  <el-table :data="baseInfoData" v-loading="loading" style="width: 100%">
    <el-table-column type="index" width="80">
    </el-table-column>
    <el-table-column prop="name" label="姓名" width="120">
    </el-table-column>
    <el-table-column prop="identityCard" label="身份证号" width="150">
    </el-table-column>
    <el-table-column prop="telNum" label="手机号码" width="120">
    </el-table-column>
    <el-table-column label="操作">
      <template scope="props">
      </template>
    </el-table-column>
  </el-table>

</div>
</template>

<script>
export default {
  name: 'operator_pro_result',
  data: function() {
    return {
      userId: '',
      loading: false
    }
  },
  methods: {
    handleSearch: function() {
      this.getData(this.userId);
    },
    getData: function(userId) {
      this.loading = true;
      this.$http.get('/getBaseInfoData', {
        params: {
          userId: userId
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
