<template>
  <div class="test-page">
    <el-page-header @back="$router.back()" :content="$route.name"></el-page-header>
    <el-table
      :data="wx_attention_list"
      border
      stripe
      show-summary
      :summary-method="getTotal"
      style="width: 100%"
    >
      <el-table-column type="index" label="序号" width="100" align="center"></el-table-column>
      <el-table-column prop="name" label="区域" width="300" align="center"></el-table-column>
      <el-table-column prop="address" label="点位数" width="300" align="center"></el-table-column>
      <el-table-column prop="set" label="设备数" width="300" align="center"></el-table-column>
      <el-table-column prop="num" label="出入人次" align="center"></el-table-column>
    </el-table>
    <div class="window">
      <div id="myChart" class="myChart"></div>
      <div id="myOption" class="line"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "statistics",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      wx_attention_list: [
        {
        
          name: "数字产业园A1",
          num: 5,
          set: 3,
          address: "东1门",
        },
        {
         
          name: "数字产业园A2",
          num: 4,
          set: 3,
          address: "东2门",
        },
        {
         
          name: "数字产业园A3",
          num: 2,
          set: 3,
          address: "东3门",
        },
        {
          
          name: "数字产业园A4",
          num: 4,
          set: 3,
          address: "东4门",
        },
        {
          
          name: "数字产业园A5",
          num: 5,
          set: 3,
          address: "东5门",
        },
        {
         
          name: "数字产业园A6",
          num: 6,
          set: 3,
          address: "东6门",
        },
      ],
      heji: [{}],
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      let myOption = this.$echarts.init(document.getElementById("myOption"));

      myOption.setOption({
        title: { text: "进出时间段" },
        tooltip: {},
        xAxis: {
          name: "时间",
          type: "category",
          boundaryGap: false,
          data: [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22,
            23,
          ],
        },
        yAxis: {
          name: "人次",
        },
        series: [
          {
            name: "人次",
            type: "line",
            data: [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              10,
              20,
              30,
              40,
              30,
              20,
              10,
              10,
              20,
              10,
              10,
              10,
              0,
              0,
              0,
              0,
            ],
          },
        ],
      });
      let myChart = this.$echarts.init(document.getElementById("myChart"));

      myChart.setOption({
        title: {
          text: "按进出人次统计 top5",
          subtext: "日期: xx - xx 默认前一天",
        },
        tooltip: {},
        xAxis: {
          data: ["CS001", "CS002", "CS006", "CS009", "CS010"],
        },
        yAxis: {},
        series: [
          {
            name: "人次",
            type: "bar",
            data: [250, 200, 300, 150, 100],
          },
        ],
      });
    },
    getTotal(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        const values = data.map((item) => Number(item[column.property]));
        if (column.property === "num") {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index];
        } else if (column.property === "set") {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index];
        } else {
          sums[index] = "--";
        }
      });

      return sums;
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
.myChart {
  width: 500px;
  height: 450px;
}
.window {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
}
.line {
  width: 500px;
  height: 450px;
}
.el-table {
  margin-top: 30px;
  margin-bottom: 10px;
}
</style>