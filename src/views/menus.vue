<template>
  <el-container>
    <el-header>
      <div class="img">
        <div class="header-left">和门禁管理系统</div>
      </div>

      <div class="header-right">
        <span>{{nowDate}}{{nowWeek}}{{nowTime}}</span>
        <span @click="changePasswordClick" class="tac-title-right-two">修改密码</span>
        <span @click="dropOutClick" class="tac-title-right-three">退出</span>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu :router="true" :default-active="$route.path" class="el-menu-vertical-demo">
          <el-menu-item index="/test/maps">
            <i class="el-icon-location"></i>
            <span slot="title">地图监控</span>
          </el-menu-item>

          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-grid"></i>
              <span>区域管理</span>
            </template>

            <el-menu-item index="/test/setting" style="padding-left:63px;">区域设置</el-menu-item>
            <el-menu-item index="/test/positioning" style="padding-left:63px;">设备点位</el-menu-item>
          </el-submenu>
          <el-menu-item index="/test/page">
            <i class="el-icon-cpu"></i>
            <span slot="title">设备管理</span>
          </el-menu-item>
          <el-menu-item index="/test/statistics">
            <i class="el-icon-s-data"></i>
            <span slot="title">统计分析</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <router-view />
        </el-main>

        <el-footer>
          <img src="../assets/img/logo.png" style="width:2.5%" />
          <span>重庆鲁控科技有限公司</span>
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
export default {
  name: "Menus",
  data() {
    return {
      fits: ["fill", "contain", "cover", "none", "scale-down"],
      nowDate: "", // 当前日期
      nowTime: "", // 当前时间
      nowWeek: "", // 当前星期
    };
  },
  methods: {
    changePasswordClick() {
      console.log("修改密码");
    },
    dropOutClick() {
      console.log("退出");
    },
    dealWithTime(data) {
      // 获取当前时间
      let formatDateTime;
      let Y = data.getFullYear();
      let M = data.getMonth() + 1;
      let D = data.getDate();
      let H = data.getHours();
      let Min = data.getMinutes();
      let S = data.getSeconds();
      let W = data.getDay();
      H = H < 10 ? "0" + H : H;
      Min = Min < 10 ? "0" + Min : Min;
      S = S < 10 ? "0" + S : S;
      switch (W) {
        case 0:
          W = "日";
          break;
        case 1:
          W = "一";
          break;
        case 2:
          W = "二";
          break;
        case 3:
          W = "三";
          break;
        case 4:
          W = "四";
          break;
        case 5:
          W = "五";
          break;
        case 6:
          W = "六";
          break;
        default:
          break;
      }
      this.nowDate = Y + "年" + M + "月" + D + "日 ";
      this.nowWeek = "周" + W;
      this.nowTime = H + ":" + Min + ":" + S;
      // formatDateTime = Y + "年" + M + "月" + D + "日 " + " 周" +W + H + ":" + Min + ":" + S;
    },
  },
  mounted() {
    // 页面加载完后显示当前时间
    this.dealWithTime(new Date());
    // 定时刷新时间
    this.timer = setInterval(() => {
      this.dealWithTime(new Date()); // 修改数据date
    }, 500);
  },
  destroyed() {
    if (this.timer) {
      // vue实例销毁前，清除定时器
      clearInterval(this.timer);
    }
  },
};
</script>
<style scoped>
.el-container {
  overflow: hidden;
  height: 100%;
  width: 100%;
}

.el-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eeeeee;
  color: #ffffff;
  background-color: #666666;
}
.el-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #eeeeee;
}
.el-footer span {
  margin-left: 10px;
}
.header-left {
  font-size: 39px;
  font-family: cursive;
}
.el-image {
  border-radius: 50%;
}
.header-right span {
  margin-left: 10px;
  font-family: cursive;
}
.tac-title-right-two {
  cursor: pointer;
}
.tac-title-right-two:hover {
  color: #cae0f5;
}
.tac-title-right-two:active {
  color: #409eff;
}
.tac-title-right-three {
  cursor: pointer;
}
.tac-title-right-three:hover {
  color: #cae0f5;
}
.tac-title-right-three:active {
  color: #409eff;
}
.el-footer {
  font-weight: bold;
}
</style>
