<template>
  <div class="test-page">
    <el-page-header @back="$router.back()" :content="$route.name"></el-page-header>

    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item class="right">
        <el-button type="primary" @click="add" icon="el-icon-plus">新增</el-button>
        <el-button type="success" @click="exportClick" icon="el-icon-document-checked">导出</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border style="width: 100%" class="table">
      <el-table-column type="index" label="序号" width="100" align="center"></el-table-column>
      <el-table-column prop="address" label="区域名称" width="280" align="center"></el-table-column>
      <el-table-column prop="map" label="地址" width="280" align="center"></el-table-column>
      <el-table-column prop="user" label="创建人" width="268" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" size="mini">修改</el-button>
          <el-button
            type="danger"
            size="mini"
            @click.native.prevent="deleteRow(scope.$index, tableData)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="新增" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="区域名称:"  :required="true">
          <el-input placeholder="区域名称" v-model="form.address" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="地址:"  :required="true">
          <el-input placeholder="地址" v-model="form.map" autocomplete="off" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="determine" :plain="true" v-on:keyup.13.native="submit">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改" :visible.sync="modify">
      <el-form :model="form">
        <el-form-item label="区域名称:"  :required="true">
          <el-input placeholder="区域名称" v-model="form.address" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="地址:"  :required="true">
          <el-input placeholder="地址" v-model="form.map" autocomplete="off" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="modifys" :plain="true" v-on:keyup.13.native="submits">确 定</el-button>
      </div>
    </el-dialog>

    <el-pagination
      layout="prev, pager, next"
      :total="tableCount"
      style="text-align: center;margin-top:16px;"
    ></el-pagination>
  </div>
</template>
<script>
import aaa from "../assets/data/aaa";
import FileSaver from "file-saver";
import XLSX from "xlsx";

export default {
  name: "setting",
  data() {
    return {
      title: "",
      formInline: {},
      index: {},
      dialogFormVisible: false,
      modify: false,
      form: {
        map: "",
        address: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "120px",
    };
  },
  computed: {
    tableData() {
      return this.$store.getters["test2/data"];
    },
    tableCount() {
      return this.$store.getters["test2/count"];
    },
  },
  mounted: function () {
    this.$store.commit("test2/pull", aaa);
  },
  created() {
    var _this = this;
    document.onkeydown = function (e) {
      let key = window.event.keyCode;
      if (key === 13 && _this.dialogFormVisible == true) {
        _this.submit();
      } else if (key === 13 && _this.modify == true) {
        _this.submits();
      }
    };
  },
  methods: {
    deleteRow(index, rows) {
      this.$confirm("此操作将永久删除该区域设置, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          rows.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!",
            duration: 1000,
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
            duration: 1000,
          });
        });
    },
    submit() {
      this.determine();
    },
    submits() {
      this.modifys();
    },
    exportClick() {
      // 设置当前日期
      let time = new Date();
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      let query = '区域设置';
      let hours = time.getHours();
      let minutes = time.getMinutes();
      let name = query  +' '+ year + '-' + month + '-' + day + ' '+ hours + '：' + minutes ;
      //  .table要导出的是哪一个表格
      var wb = XLSX.utils.table_to_book(document.querySelector(".table"));
      /* get binary string as output */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      });
      try {
        //  name+'.xlsx'表示导出的excel表格名字
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          name + ".xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    handleEdit(index, row) {
      this.modify = true;
      console.log(index);
      const set = index;
      this.form.address = set.address;
      this.form.map = set.map;
      this.index = set;
    },
    add() {
      this.dialogFormVisible = true;
    },
    cancel() {
      this.dialogFormVisible = false;
      this.modify = false;
      this.form.address = "";
      this.form.map = "";
    },
    modifys() {
      if (this.form.address === "" || this.form.map === "") {
        this.$message.error("操作失败！请将内容补充完整");
      } else {
        this.$message({
          message: "操作成功",
          type: "success",
          duration: 1000,
        });
        console.log(this.index);
        this.index.address = this.form.address;
        this.index.map = this.form.map;
        setTimeout(() => {
          this.modify = false;
          this.form.address = "";
          this.form.map = "";
        }, 500);
      }
    },
    determine() {
      if (this.form.address === "" || this.form.map === "") {
        this.$message.error("操作失败！请将内容补充完整");
      } else {
        this.$message({
          message: "操作成功",
          type: "success",
          duration: 1000,
        });
        this.$store.commit("test2/add", {
          address: this.form.address,
          map: this.form.map,
          user: "系统管理员",
        });
        setTimeout(() => {
          this.dialogFormVisible = false;
          this.form.address = "";
          this.form.map = "";
        }, 500);
      }
    },
  },
};
</script>
<style scoped>
.test-page {
  position: relative;
  background-color: #ffffff;
}

.el-page-header {
  top: -20px;
  z-index: 99;
  position: sticky;
  padding-top: 16px;
  padding-bottom: 16px;
  background-color: #ffffff;
}
.dialog-footer {
  text-align: center;
}
</style>