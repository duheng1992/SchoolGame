const app = getApp();

function inArray(arr, key, val) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key] === val) {
      return i;
    }
  }
  return -1;
}

// ArrayBuffer转16进度字符串示例
function ab2hex(buffer) {
  var hexArr = Array.prototype.map.call(new Uint8Array(buffer), function(bit) {
    return ("00" + bit.toString(16)).slice(-2);
  });
  return hexArr.join("");
}

Page({
  data: {
    devices: [],
    connected: false,
    chs: [],
  },
  openBluetoothAdapter() {
    wx.openBluetoothAdapter({
      success: (res) => {
        console.log("openBluetoothAdapter success", res);
        this.startBluetoothDevicesDiscovery();
      },
      fail: (res) => {
        if (res.errCode === 10001) {
          wx.onBluetoothAdapterStateChange(function(res) {
            console.log("onBluetoothAdapterStateChange", res);
            if (res.available) {
              this.startBluetoothDevicesDiscovery();
            }
          });
        }
      },
    });
  },
  getBluetoothAdapterState() {
    wx.getBluetoothAdapterState({
      success: (res) => {
        console.log("getBluetoothAdapterState", res);
        if (res.discovering) {
          this.onBluetoothDeviceFound();
        } else if (res.available) {
          this.startBluetoothDevicesDiscovery();
        }
      },
    });
  },
  startBluetoothDevicesDiscovery() {
    if (this._discoveryStarted) {
      return;
    }
    this._discoveryStarted = true;
    wx.startBluetoothDevicesDiscovery({
      allowDuplicatesKey: true,
      success: (res) => {
        console.log("startBluetoothDevicesDiscovery success", res);
        this.onBluetoothDeviceFound();
      },
    });
  },
  stopBluetoothDevicesDiscovery() {
    wx.stopBluetoothDevicesDiscovery();
  },
  onBluetoothDeviceFound() {
    wx.onBluetoothDeviceFound((res) => {
      res.devices.forEach((device) => {
        if (!device.name && !device.localName) {
          return;
        }
        const foundDevices = this.data.devices;
        const idx = inArray(foundDevices, "deviceId", device.deviceId);
        const data = {};
        if (idx === -1) {
          data[`devices[${foundDevices.length}]`] = device;
        } else {
          data[`devices[${idx}]`] = device;
        }
        this.setData(data);
      });
    });
  },
  createBLEConnection(e) {
    const ds = e.currentTarget.dataset;
    const deviceId = ds.deviceId;
    const name = ds.name;
    wx.createBLEConnection({
      deviceId,
      success: (res) => {
        this.setData({
          connected: true,
          name,
          deviceId,
        });
        this.getBLEDeviceServices(deviceId);
      },
    });
    this.stopBluetoothDevicesDiscovery();
  },
  closeBLEConnection() {
    wx.closeBLEConnection({
      deviceId: this.data.deviceId,
    });
    this.setData({
      connected: false,
      chs: [],
      canWrite: false,
    });
  },
  getBLEDeviceServices(deviceId) {
    wx.getBLEDeviceServices({
      deviceId,
      success: (res) => {
        for (let i = 0; i < res.services.length; i++) {
          if (res.services[i].isPrimary) {
            this.getBLEDeviceCharacteristics(deviceId, res.services[i].uuid);
            return;
          }
        }
      },
    });
  },
  getBLEDeviceCharacteristics(deviceId, serviceId) {
    //获取特征值
    wx.getBLEDeviceCharacteristics({
      deviceId,
      serviceId,
      success: (res) => {
        console.log("getBLEDeviceCharacteristics success", res.characteristics);
        for (let i = 0; i < res.characteristics.length; i++) {
          let item = res.characteristics[i];
          if (item.properties.read) {
            //读取低功耗蓝牙设备的特征值的二进制数据值。
            wx.readBLECharacteristicValue({
              deviceId,
              serviceId,
              characteristicId: item.uuid,
            });
          }
          if (item.properties.write) {
            this.setData({
              canWrite: true,
            });
            this._deviceId = deviceId;
            this._serviceId = serviceId;
            this._characteristicId = item.uuid;
            //向低功耗蓝牙设备特征值中写入二进制数据
            this.writeBLECharacteristicValue();
          }
          if (item.properties.notify || item.properties.indicate) {
            //启用低功耗蓝牙设备特征值变化时的 notify 功能，订阅特征值。注意：必须设备的特征值支持 notify 或者 indicate 才可以成功调用
            wx.notifyBLECharacteristicValueChange({
              deviceId,
              serviceId,
              characteristicId: item.uuid,
              state: true,
            });
          }
        }
      },
      fail(res) {
        console.error("getBLEDeviceCharacteristics", res);
      },
    });
    // 操作之前先监听，保证第一时间获取数据
    wx.onBLECharacteristicValueChange((characteristic) => {
      const idx = inArray(
        this.data.chs,
        "uuid",
        characteristic.characteristicId,
      );
      const data = {};
      if (idx === -1) {
        data[`chs[${this.data.chs.length}]`] = {
          uuid: characteristic.characteristicId,
          value: ab2hex(characteristic.value),
        };
      } else {
        data[`chs[${idx}]`] = {
          uuid: characteristic.characteristicId,
          value: ab2hex(characteristic.value),
        };
      }
      // data[`chs[${this.data.chs.length}]`] = {
      //   uuid: characteristic.characteristicId,
      //   value: ab2hex(characteristic.value)
      // }
      this.setData(data);
    });
  },
  writeBLECharacteristicValue() {
    // 向蓝牙设备发送一个0x00的16进制数据
    let buffer = new ArrayBuffer(1);
    let dataView = new DataView(buffer);
    dataView.setUint8(0, (Math.random() * 255) | 0);
    wx.writeBLECharacteristicValue({
      deviceId: this._deviceId,
      serviceId: this._serviceId,
      characteristicId: this._characteristicId,
      value: buffer,
    });
  },
  closeBluetoothAdapter() {
    wx.closeBluetoothAdapter();
    this._discoveryStarted = false;
  },
});
