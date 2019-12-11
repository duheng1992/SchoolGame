/* eslint-disable no-self-assign */
/* eslint-disable react/no-unused-state */
import Taro, { Component, Config } from "@tarojs/taro";
import { View } from "@tarojs/components";

import {
  setBluetoothStatus,
  setBindResult,
  rebinding,
  setMeasureStatus,
} from "./tools";
import { ab2hex } from "@/utils/bluetooth";

import "./index.scss";

import Bluetooth from "./module/Bluetooth"; // 蓝牙未开启
import StepView from "./module/StepView"; // 绑定步骤
import BindFall from "./module/BindFall"; // 绑定失败
import BindSucceed from "./module/BindSucceed"; // 绑定成功
import Succeed from "./module/Succeed";
import { _allowStateChangesInsideComputed } from "mobx";

type StateType = {
  [propName: string]: any;
  measureStatus: 0 | 1 | 2;
  bindStatus: 0 | 1 | 2;
};
type ComponentsProps = {
  [propName: string]: any;
};

interface _page {
  props: ComponentsProps;
  state: StateType;
}

let timer; // 蓝牙搜索的防抖timer

class _page extends Component {
  constructor(props) {
    super(props);
  }

  state: StateType = {
    //设备信息
    name: "",
    deviceId: "",
    // token,
    bluetoothStatus: true, // 当前蓝牙的状态
    bindStatus: 2, // 绑定结果  0 未绑定 ; 1 绑定成功 ; 2 绑定失败
    measureStatus: 0, // 0 测量中 ; 1 - 测量成功 ; 2- 测量失败
  };

  componentDidShow() {
    const _this = this;
    Taro.openBluetoothAdapter()
      .then((BlueRes) => {
        console.log("初始化蓝牙模块成功", BlueRes);
        setBluetoothStatus(_this, true);
      })
      .catch((BlueRes) => {
        if (BlueRes.errCode === 10001) {
          //监听蓝牙适配器状态变化事件
          setBluetoothStatus(_this, false);
          Taro.onBluetoothAdapterStateChange((res) => {
            if (res.available) {
              console.log("初始化蓝牙模块成功", res);
              setBluetoothStatus(_this, true);
            } else {
              setBluetoothStatus(_this, false);
            }
          });
        }
      });
    // setTimeout(() => {
    //   _this.onStartBind();
    //   setTimeout(() => {
    //     _this.startMeasure();
    //   }, 3000);
    // }, 3000);
  }

  // 设置并同步蓝牙状态

  config: Config = {
    navigationBarBackgroundColor: "#41403F",
  };

  onStartBind = () => {
    const _this = this;
    // 开始搜寻附近的蓝牙外围设备;
    console.log("开始搜寻");

    Taro.startBluetoothDevicesDiscovery({
      services: [
        "0000ffc2-0000-1000-8000-00805f9b34fb",
        "0000ffc1-0000-1000-8000-00805f9b34fb",
        "0000ffc0-0000-1000-8000-00805f9b34fb",
      ],
    }).then((res) => {
      console.log("三个值搜寻设备成功", res);
      _this.onBluetoothDeviceFound();
    });

    // console.log("开始绑定");
    // const _this = this;
    // const bindResult = true;
    // setBindResult(_this, bindResult);
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
    const _this = this;
    clearTimeout(timer);

    Taro.onBluetoothDeviceFound((res) => {
      res.devices.forEach((device) => {
        console.log("找到一个设备", device);
        console.log("找到一个设备", device.name);
        // if (device.name === "Chipsea-BLE") {
        //   console.log("找到Chipsea设设备", device);
        //   timer = setTimeout(() => {
        //     _this.createBLEConnection(device);
        //   }, 300);
        // }
      });
    });
  };

  createBLEConnection = (device) => {
    //连接低功耗蓝牙设备
    const _this = this;
    const { deviceId, name } = device;
    console.log("开始连接设备");
    Taro.createBLEConnection({
      deviceId,
    }).then((res: any) => {
      if (res.errCode === 0) {
        console.log("连接成功!", res);
        _this.setState(
          {
            name,
            deviceId,
          },
          () => {
            _this.getBLEDeviceServices();
          },
        );
      }
    });
    this.stopBluetoothDevicesDiscovery();
  };

  getBLEDeviceServices = () => {
    //获取蓝牙设备所有服务
    //这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
    const _this = this;
    const { deviceId } = this.state;
    console.log("蓝牙设备所有服务的 deviceId", deviceId);
    Taro.getBLEDeviceServices({ deviceId }).then((res) => {
      /**
         *
         *{
          errMsg: "getBLEDeviceServices:ok"
            services:[
              {uuid: "0000180A-0000-1000-8000-00805F9B34FB", isPrimary: true}
              {uuid: "00001803-0000-1000-8000-00805F9B34FB", isPrimary: true}
              {uuid: "00001802-0000-1000-8000-00805F9B34FB", isPrimary: true}
              {uuid: "00001804-0000-1000-8000-00805F9B34FB", isPrimary: true}
              {uuid: "0000180F-0000-1000-8000-00805F9B34FB", isPrimary: true}
              {uuid: "0000180D-0000-1000-8000-00805F9B34FB", isPrimary: true}
              {uuid: "0000FFF0-0000-1000-8000-00805F9B34FB", isPrimary: true}
              {uuid: "0000FFF3-0000-1000-8000-00805F9B34FB", isPrimary: true}
              {uuid: "00001800-0000-1000-8000-00805F9B34FB", isPrimary: true}
            ]
         *
         *
         *
         */
      console.log("获取设备服务的结果", res);
      if (res.services.length > 0) {
        for (let index = 0; index < res.services.length; index++) {
          const el = res.services[index];
          const { uuid } = el;
          _this.getBLEDeviceCharacteristics(uuid);
        }
      }
    });
  };

  getBLEDeviceCharacteristics = (serviceId) => {
    const { deviceId } = this.state;
    //获取蓝牙设备某个服务中所有特征值
    Taro.getBLEDeviceCharacteristics({
      deviceId,
      serviceId,
    }).then((res) => {
      /**
       *
       *
       *characteristics:[
            properties: {read: true, write: false, notify: false, indicate: false}
            uuid: "00002A24-0000-1000-8000-00805F9B34FB"
            properties: {read: true, write: false, notify: false, indicate: false}
            uuid: "00002A25-0000-1000-8000-00805F9B34FB"
            properties: {read: true, write: false, notify: false, indicate: false}
            uuid: "00002A27-0000-1000-8000-00805F9B34FB"
            properties: {read: true, write: false, notify: false, indicate: false}
            uuid: "00002A26-0000-1000-8000-00805F9B34FB"
            properties: {read: true, write: false, notify: false, indicate: false}
            uuid: "00002A28-0000-1000-8000-00805F9B34FB"
        ]

        特征值的意义不明白
       *
       *
       */
      console.log("获取蓝牙设备某个服务中所有特征值", res);
      const idArr = res.characteristics;
      for (let i = 0; i < idArr.length; i++) {
        const el = idArr[i];
        console.log("characteristicId", el);
        this.readBLECharacteristicValue({
          characteristicId: el.uuid,
          serviceId,
        });
      }
    });
  };

  readBLECharacteristicValue = ({ characteristicId, serviceId }) => {
    //读取低功耗蓝牙设备的特征值的二进制数据值。
    const { deviceId } = this.state;
    /**
     *
     *
     * {
     *    characteristicId: "00002A28-0000-1000-8000-00805F9B34FB"
        deviceId: "C8:B2:1E:5A:CF:8F"
        serviceId: "0000180A-0000-1000-8000-00805F9B34FB"
        value: ArrayBuffer(5) {}
      }
     *
     *
     */
    Taro.onBLECharacteristicValueChange((characteristic) => {
      console.log("二进制数据", characteristic);
      console.log("二进制数据解析结果", ab2hex(characteristic.value));
    });
    Taro.readBLECharacteristicValue({
      deviceId,
      // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
      serviceId,
      // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
      characteristicId,
    }).then((res) => {
      console.log("读取二进制数据状态", res);
    });
  };

  stopBluetoothDevicesDiscovery = () => {
    //停止搜寻
    console.log("立马停止搜寻");
    Taro.stopBluetoothDevicesDiscovery();
  };

  rebinding = () => {
    rebinding(this);
  };

  //开始测量
  startMeasure = () => {
    const _this = this;
    this.setState(
      {
        measureStatus: 0,
      },
      () => {
        setTimeout(() => {
          const measureResult = true; // 假装成功
          setMeasureStatus(_this, measureResult);
        }, 3000);
      },
    );
  };

  //重新测量
  resetMeasure = () => {
    this.startMeasure();
  };

  // eslint-disable-next-line complexity
  render() {
    const { bluetoothStatus, bindStatus, measureStatus } = this.state;
    let Bluetooth_show = false;
    if (!bluetoothStatus) {
      Bluetooth_show = true;
    }

    let StepView_show = false;
    if (bluetoothStatus && bindStatus === 0) {
      StepView_show = true;
    }

    // let BindSucceed_show = false;
    // if (bindStatus === 1) {
    //   BindSucceed_show = true;
    // }

    // let Succeed_show = false;
    // if (bindStatus === 1 && measureStatus === 1) {
    //   Succeed_show = true;
    //   BindSucceed_show = false;
    // }

    return (
      <View className="page">
        {Bluetooth_show ? (
          <Bluetooth />
        ) : (
          <StepView onStartBind={this.onStartBind} />
        )}
        {/* {StepView_show && <StepView onStartBind={this.onStartBind} />} */}
        {/* {bindStatus === 2 && <BindFall onRebinding={this.rebinding} />} */}
        {/* {BindSucceed_show && (
          <BindSucceed
            measureStatus={measureStatus}
            onResetMeasure={this.resetMeasure}
          />
        )} */}
        {/* {Succeed_show && <Succeed weight={38} />} */}
      </View>
    );
  }
}

export default _page;
