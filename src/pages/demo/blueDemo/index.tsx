import Taro, { Component, Config } from "@tarojs/taro";
import { View, Button, ScrollView } from "@tarojs/components";

import "./index.scss";

import { utils, inArray } from "@/utils/bluetooth";

type StateType = {
  [propName: string]: any;
};

type ComponentsProps = {
  [propName: string]: any;
};

interface _page {
  props: ComponentsProps;
  state: StateType;
}

class _page extends Component {
  constructor(props) {
    super(props);
  }

  state: StateType = {
    // token,
    devices: [],
    name: "", // 已连接的蓝牙名称
    deviceId: "", // 已连接的ID
    // chs: [],
  };

  config: Config = {
    navigationBarBackgroundColor: "#41403F",
  };

  openBluetoothAdapter = () => {
    const _this = this;
    //初始化蓝牙模块
    Taro.openBluetoothAdapter()
      .then((res) => {
        console.log("初始化蓝牙模块成功", res);
        _this.startBluetoothDevicesDiscovery();
      })
      .catch((res) => {
        if (res.errCode === 10001) {
          //监听蓝牙适配器状态变化事件
          Taro.onBluetoothAdapterStateChange(function(res) {
            console.log("监听蓝牙适配器状态变化了", res);
            if (res.available) {
              _this.startBluetoothDevicesDiscovery();
            }
          });
        }
      });
  };

  startBluetoothDevicesDiscovery = () => {
    const _this = this;
    // 开始搜寻附近的蓝牙外围设备;
    Taro.startBluetoothDevicesDiscovery({
      allowDuplicatesKey: true,
    }).then((res) => {
      console.log("搜寻设备成功", res);
      _this.onBluetoothDeviceFound();
    });
  };

  onBluetoothDeviceFound = () => {
    //监听寻找到新设备的事件
    console.log("开始监听寻找新设备");
    /*
      devices: Array(1)
        0:
        RSSI: -89
        advertisData: ArrayBuffer(29) {}
        advertisServiceUUIDs: []
        deviceId: "26:7E:22:91:06:5A"
        localName: ""
        name: ""
        serviceData: {}
    */
    Taro.onBluetoothDeviceFound((res) => {
      res.devices.forEach((device) => {
        if (!device.name && !device.localName) {
          return;
        }
        const { devices } = this.state;
        const foundDevices = devices;
        const idx = inArray(foundDevices, "deviceId", device.deviceId);
        if (idx === -1) {
          devices[foundDevices.length] = device;
        } else {
          devices[idx] = device;
        }
        //避免重复地插进去
        this.setState({
          devices,
        });
      });
    });
  };

  createBLEConnection = (e) => {
    //连接低功耗蓝牙设备
    const _this = this;
    const { deviceId, name } = e.target.dataset;

    Taro.createBLEConnection({
      deviceId,
    }).then((res) => {
      console.log("连接结果", res);
      _this.setState(
        {
          name,
          deviceId,
        },
        () => {
          _this.getBLEDeviceServices();
        },
      );
    });
    this.stopBluetoothDevicesDiscovery();
  };

  getBLEDeviceServices = () => {
    //获取蓝牙设备所有服务
    //这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
    const { deviceId } = this.state;
    console.log("蓝牙设备所有服务的 deviceId", deviceId);
    Taro.getBLEDeviceServices({ deviceId }).then((res) => {
      console.log("获取设备服务的结果", res);
    });
  };

  stopBluetoothDevicesDiscovery = () => {
    //停止搜寻
    Taro.stopBluetoothDevicesDiscovery();
  };

  closeBluetoothAdapter = () => {
    Taro.closeBluetoothAdapter();
  };

  render() {
    const { devices, name } = this.state;
    return (
      <View className="wrapper">
        <Button onClick={this.openBluetoothAdapter}>开始扫描</Button>
        <Button onClick={this.stopBluetoothDevicesDiscovery}>停止扫描</Button>
        <Button onClick={this.closeBluetoothAdapter}>结束流程</Button>
        <View className="devices_summary">
          已发现 {devices.length} 个外围设备：
        </View>

        <ScrollView className="device_list" scroll-y scroll-with-animation>
          {devices.map((item, index) => {
            return (
              <View className="item" key={index}>
                <View>{item.name}</View>
                <View>
                  信号强度: {item.RSSI}dBm ({utils.max(0, item.RSSI + 100)}%)
                </View>
                <View>UUID: {item.deviceId}</View>
                <View>Service数量: {utils.len(item.advertisServiceUUIDs)}</View>
                <Button
                  data-device-id={item.deviceId}
                  data-name={item.name || item.localName}
                  onClick={this.createBLEConnection}
                >
                  点击连接低功耗蓝牙
                </Button>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

export default _page;

//整体步骤大概如下

/**
 *1/ 初始化蓝牙模块  // Y:步骤二, N: 监听状态变化 2
    这里只能提醒用户打开蓝牙
    Taro.openBluetoothAdapter()

 *2/ 开始搜寻蓝牙外围设备
    Taro.startBluetoothDevicesDiscovery

 *3/ 监听寻找到新设备的事件
    Taro.onBluetoothDeviceFound
    搜寻到的结果进行筛选

 *4/ 连接低功耗蓝牙  需要 deviceId
    Taro.createBLEConnection

    同时 停止搜寻附近的蓝牙外围设备。
    Taro.stopBluetoothDevicesDiscovery

 *5/  获取蓝牙设备所有服务
      Taro.getBLEDeviceServices

 *6/  获取特征值
 *
 *7/ 读取低功耗蓝牙设备的特征值的二进制数据值
 *
 *8/ 传送交互
 *
 *
 */
