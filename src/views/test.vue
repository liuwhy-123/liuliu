<template>
  <div class="test-page">
    <el-page-header @back="$router.back()" :content="$route.name"></el-page-header>

    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="设备编码">
        <el-input v-model="formInline.user" placeholder="设备编码" clearable></el-input>
      </el-form-item>
      <el-form-item label="设备区域">
        <el-select v-model="formInline.region" placeholder="设备区域" clearable>
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
      <el-table-column prop="name" label="设备点位" width="200" align="center"></el-table-column>
      <el-table-column prop="codding" label="设备编码" width="200" align="center"></el-table-column>
      <el-table-column prop="address" label="所属区域" width="250" align="center"></el-table-column>
      <el-table-column prop="user" label="创建人" width="200" align="center"></el-table-column>
      <el-table-column prop="address" label="操作" align="center">
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

    <el-dialog title="新增设备" :visible.sync="dialogFormVisible">
      <el-form :model="form" label-width="100px" class="from-window">
        <el-form-item prop="region" label="设备点位:" :required="true">
          <el-select v-model="form.region" placeholder="请选择设备点位" style="width:100%;">
            <el-option
              v-for="(item,index) in posData"
              :key="index"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="name" label="设备编码:" :required="true">
          <el-input placeholder="设备编码" v-model="form.name" autocomplete="off" style="width:100%;"></el-input>
        </el-form-item>
        <el-form-item prop="regions" label="所属区域:" :required="true">
          <el-select v-model="form.regions" placeholder="请选择所属区域" style="width:100%;">
            <el-option
              v-for="(item,index) in setData"
              :key="index"
              :label="item.address"
              :value="item.address"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="names" label="设备名称:" :required="true">
          <el-input placeholder="设备名称" v-model="form.names" autocomplete="off" style="width:100%;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>

        <el-button type="primary" @click="determine" v-on:keyup.13.native="submit">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改" :visible.sync="modify">
      <el-form :model="form" label-width="100px" class="from-window">
        <el-form-item label="设备定点位:" :required="true">
          <el-select v-model="form.region" placeholder="请选择设备点位" style="width:100%;">
            <el-option
              v-for="(item,index) in posData"
              :key="index"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备编码:" :required="true">
          <el-input placeholder="设备编码" v-model="form.name" autocomplete="off" style="width:100%;"></el-input>
        </el-form-item>
        <el-form-item label="所属区域:" :required="true">
          <el-select v-model="form.regions" placeholder="请选择所属区域" style="width:100%;">
            <el-option
              v-for="(item,index) in setData"
              :key="index"
              :label="item.address"
              :value="item.address"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备名称:" :required="true">
          <el-input placeholder="设备名称" v-model="form.names" autocomplete="off" style="width:100%;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="modifys" v-on:keyup.13.native="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import ddd from "../assets/data/ddd";
import eee from "../assets/data/eee";
import aaa from "../assets/data/aaa";
import FileSaver from "file-saver";
import XLSX from "xlsx";

export default {
  name: "TestPage",
  data() {
    return {
      formInline: {
        user: "",
        region: "",
      },
      formQuery: {
        user: "",
        region: "",
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
        names: "",
        region: "",
        regions: "",
      },
      formLabelWidth: "120px",
      index: {},
    };
  },
  computed: {
    tableData() {
      const region = this.formQuery.region || "";
      const user = this.formQuery.user || "";

      return this.$store.getters["test1/data"].filter((item) => {
        if (region && (!item.address || item.address.indexOf(region) < 0)) {
          return false;
        }

        if (user && (!item.codding || item.codding.indexOf(user) < 0)) {
          return false;
        }

        return true;
      });
    },
    tableCount() {
      return this.$store.getters["test1/count"];
    },
    setData() {
      return this.$store.getters["test2/data"];
    },
    posData() {
      return this.$store.getters["test/data"];
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
      this.$confirm("此操作将永久删除该设备管理, 是否继续?", "提示", {
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
    cancel() {
      this.dialogFormVisible = false;
      this.modify = false;
      this.form.region = "";
      this.form.name = "";
      this.form.regions = "";
      this.form.names = "";
    },
    onSubmit() {
      this.formQuery.user = this.formInline.user;
      this.formQuery.region = this.formInline.region;
    },
    add() {
      this.dialogFormVisible = true;
    },
    exportClick() {
      // 设置当前日期
      let time = new Date();
      let query = "设备管理";
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      let hours = time.getHours();
      let minutes = time.getMinutes();
      let name =
        query +
        " " +
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hours +
        "：" +
        minutes;
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
    handleClick(index, row) {
      this.modify = true;
      console.log(index);
      const set = index;
      this.form.region = set.name;
      this.form.name = set.codding;
      this.form.regions = set.address;
      this.form.names = set.names;
      this.index = set;
    },
    modifys() {
      if (
        this.form.region === "" ||
        this.form.name === "" ||
        this.form.regions === "" ||
        this.form.names === ""
      ) {
        this.$message.error("操作失败！请将内容补充完整");
      } else {
        this.$message({
          message: "操作成功",
          type: "success",
          duration: 1000,
        });
        this.index.name = this.form.region;
        this.index.codding = this.form.name;
        this.index.address = this.form.regions;
        this.index.names = this.form.names;
        setTimeout(() => {
          this.modify = false;
          this.form.name = "";
          this.form.codding = "";
          this.form.address = "";
          this.form.names = "";
        }, 500);
      }
    },
    determine() {
      if (
        this.form.region === "" ||
        this.form.name === "" ||
        this.form.regions === "" ||
        this.form.names === ""
      ) {
        this.$message.error("添加失败！请将内容补充完整");
      } else {
        this.$message({
          message: "添加成功",
          type: "success",
          duration: 1000,
        });
        this.$store.commit("test1/add", {
          name: this.form.region,
          codding: this.form.name,
          address: this.form.regions,
          names: this.form.names,
          user: "系统管理员",
        });
        setTimeout(() => {
          this.dialogFormVisible = false;
          this.form.region = "";
          this.form.name = "";
          this.form.regions = "";
          this.form.names = "";
        }, 500);
      }
      //console.log(this.formInline.add);
    },
  },
  mounted: function () {
    this.$store.commit("test1/pull", eee);
    this.$store.commit("test/pull", ddd);
    this.$store.commit("test2/pull", aaa);
    // console.log(this.tableData);
    // console.log(this.setData);
    // console.log(this.posData);
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