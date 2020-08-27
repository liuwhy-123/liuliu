<template>
  <div class="map">
    <baidu-map class="maps" :center="map.center" :zoom="map.zoom" @ready="handler">
      <!--缩放-->
      <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>
      <!--定位-->
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>

      <div v-for="(item,index) in maps" :key="index">
        <!--点-->
        <bm-marker
          :position="item.center"
          :dragging="item.dragging"
          animation="BMAP_ANIMATION_DROP"
          @click="liu(item)"
        >
          <!--提示信息-->
          <bm-info-window :show="item.isShow" value="查看详情">
            <div class="gps">
              <span>设备点位:&nbsp; {{item.set}}</span>
              <span>所属区域:&nbsp; {{item.map}}</span>
              <span>设备数:&nbsp; {{item.count}}</span>
            </div>
          </bm-info-window>
        </bm-marker>
      </div>
    </baidu-map>
  </div>
</template>
 
<script>
export default {
  name: "demo",
  data: () => ({
    maps: [
      {
        center: { lng: 106.505, lat: 29.6228 },
        zoom: 1000,
        isShow: false,
        dragging: true,
        set: "东1门",
        map: "数字产业园A1",

        count: 3,
      },
      {
        center: { lng: 106.504, lat: 29.62273 },
        zoom: 1000,
        isShow: false,
        dragging: true,
        set: "东2门",
        map: "数字产业园A2",

        count: 3,
      },
      {
        center: { lng: 106.5045, lat: 29.622735 },
        zoom: 1000,
        isShow: false,
        dragging: true,
        set: "东3门",
        map: "数字产业园A3",

        count: 3,
      },
      {
        center: { lng: 106.5047, lat: 29.622766 },
        zoom: 1000,
        isShow: false,
        dragging: true,
        set: "东4门",
        map: "数字产业园A4",

        count: 3,
      },
      {
        center: { lng: 106.504177, lat: 29.622788 },
        zoom: 1000,
        isShow: false,
        dragging: true,
        set: "东5门",
        map: "数字产业园A5",

        count: 3,
      },
      {
        center: { lng: 106.5055, lat: 29.622788 },
        zoom: 1000,
        isShow: false,
        dragging: true,
        set: "东6门",
        map: "数字产业园A6",
        address: "重庆市渝北区柳林",
        count: 3,
      },
    ],
    map: {
      center: { lng: 106.504199, lat: 29.622799 },
      zoom: 1000,

      dragging: true,
      set: "CS0001",
      map: "数字产业园A4",
      address: "重庆市渝北区柳林",
    },
    item: {},
  }),
  methods: {
    handler({ BMap, map }) {
      let me = this;
      //console.log(BMap, map);
      // 鼠标缩放
      map.enableScrollWheelZoom(true);

      //实景三维
      map.addControl(new BMap.MapTypeControl());
      // map.setHeading(64.5);
      // map.setTilt(73);
      // var marker = new BMapGL.Marker(new BMapGL.Point(116.280190, 40.049191))
      // map.addOverlay(marker);
      // 点击事件获取经纬度
      map.addEventListener("click", function (e) {
        console.log(e.point.lng, e.point.lat);
      });
    },
    liu(item) {
      this.maps.forEach((it) => {
        it.isShow = false;
      });

      item.isShow = !item.isShow;
    },
  },
};
</script>
 
<style  scoped>
.map {
  width: 100%;
  height: 100%;
}
.maps {
  width: 100%;
  height: 100%;
}

.gps {
  display: flex;
  flex-direction: column;
}
</style>