<template>
  <div class="test-page">
    <el-page-header @back="$router.back()" :content="$route.name"></el-page-header>

    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="所属区域:">
        <el-select v-model="formInline.region" placeholder="所属区域" clearable>
          <el-option
            v-for="(item,index) in setData"
            :key="index"
            :label="item.address"
            :value="item.address"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="info" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item class="right">
        <el-button type="primary" @click="add" icon="el-icon-plus">新增</el-button>
        <el-button type="success" @click="exportClick" icon="el-icon-document-checked">导出</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border style="width: 100%" class="table">
      <el-table-column type="index" label="序号" width="100" align="center"></el-table-column>
      <el-table-column prop="name" label="设备点位" width="300" align="center"></el-table-column>
      <el-table-column prop="address" label="所属区域" width="300" align="center"></el-table-column>
      <el-table-column prop="user" label="创建人" width="300" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" size="mini">修改</el-button>
          <el-button
            type="danger"
            size="mini"
            @click.native.prevent="deleteRow(scope.$index, tableData)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      layout="prev, pager, next"
      :total="tableCount"
      style="text-align: center;margin-top:16px;"
    ></el-pagination>

    <el-dialog title="新增" :visible.sync="dialogFormVisible">
      <el-form :model="form" label-width="100px">
        <el-form-item label="设备点位:" :required="true">
          <el-input placeholder="设备点位" v-model="form.name" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="所属区域:" :required="true">
          <el-select v-model="formInline.add" placeholder="所属区域" clearable style="width:100%;">
            <el-option
              v-for="(item,index) in setData"
              :key="index"
              :label="item.address"
              :value="item.address"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="坐标:" :required="true">
          <el-button type="info" icon="el-icon-plus" size="small" @click="addClick">添加</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="determine" :plain="true" v-on:keyup.13.native="submit">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改" :visible.sync="modify">
      <el-form :model="form" label-width="100px">
        <el-form-item label="设备点位:" :required="true">
          <el-input placeholder="设备定点位" v-model="form.name" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="所属区域:" :required="true">
          <el-select v-model="formInline.add" placeholder="所属区域" clearable style="width:100%;">
            <el-option
              v-for="(item,index) in setData"
              :key="index"
              :label="item.address"
              :value="item.address"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="坐标:" :required="true">
          <el-button type="info" icon="el-icon-plus" size="small" @click="addClick">添加</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="modifys" :plain="true" v-on:keyup.13.native="submits">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import ddd from "../assets/data/ddd";
import aaa from "../assets/data/aaa";
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  name: "positioning",
  data() {
    return {
      data: "",
      index: {},
      formInline: {
        user: "",
        region: "",
        add: "",
      },
      formQuery: {
        user: "",
        region: "",
        add: "",
      },
      dialogFormVisible: false,
      modify: false,
      form: {
        name: "",
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
      const pos = this.$store.getters["test/data"];
      const region = this.formQuery.region;
      const reg = new RegExp(region);
      for (var i = 0; i < pos.length; i++) {
        if (region === pos[i].address) {
          return pos.filter(function (e) {
            return Object.keys(e).some(function (key) {
              return e.address.match(reg);
            });
          });
        }
      }
      return pos;
    },
    tableCount() {
      return this.$store.getters["test/count"];
    },
    setData() {
      return this.$store.getters["test2/data"];
    },
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
      this.$confirm("此操作将永久删除该设备点位, 是否继续?", "提示", {
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
    onSubmit() {
      this.formQuery.region = this.formInline.region;
    },
    add() {
      this.dialogFormVisible = true;
    },
    addClick() {
      this.$message({
        type: "success",
        message: "添加成功!",
        duration: 500,
      });
    },
    cancel() {
      this.dialogFormVisible = false;
      this.modify = false;
      this.form.name = "";
      this.formInline.add = "";
    },
    exportClick() {
      let time = new Date();
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      let query = '设备点位';
      let hours = time.getHours();
      let minutes = time.getMinutes();
      let name = query  +' '+ year + '-' + month + '-' + day + ' '+ hours + '：' + minutes ;
      var wb = XLSX.utils.table_to_book(document.querySelector(".table"));
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          name + ".xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    determine() {
      if (this.form.name === "" || this.formInline.add === "") {
        this.$message.error("添加失败！请将内容补充完整");
      } else {
        this.$message({
          message: "添加成功",
          type: "success",
          duration: 1000,
        });
        this.$store.commit("test/add", {
          name: this.form.name,
          address: this.formInline.add,
          user: "系统管理员",
        });
        setTimeout(() => {
          this.dialogFormVisible = false;
          this.form.name = "";
          this.formInline.add = "";
        }, 500);
      }
      console.log(this.formInline.add);
    },
    modifys() {
      if (this.form.name === "" || this.formInline.add === "") {
        this.$message.error("操作失败！请将内容补充完整");
      } else {
        this.$message({
          message: "操作成功",
          type: "success",
          duration: 1000,
        });
        this.index.address = this.formInline.add;
        this.index.name = this.form.name;
        setTimeout(() => {
          this.modify = false;
          this.form.name = "";
          this.formInline.add = "";
        }, 500);
      }
    },
    handleClick(index, row) {
      this.modify = true;
      console.log(index);
      const set = index;
      this.form.name = set.name;
      this.formInline.add = set.address;
      this.index = set;
    },
    submit() {
      this.determine();
    },
    submits() {
      this.modifys();
    },
  },
  mounted: function () {
    this.$store.commit("test/pull", ddd);
    this.$store.commit("test2/pull", aaa);
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
.window {
  text-align: center;
}
</style>