// eslint-disable-next-line complexity
export const errMsg = (code) => {
  let str = "蓝牙连接失败请重试";
  switch (Number(code)) {
    case 10001:
      str = "当前蓝牙适配器不可用";
      break;
    case 10002:
      str = "没有找到指定设备";
      break;
    case 10003:
      str = "连接失败";
      break;
    case 10004:
      str = "没有找到指定服务";
      break;
    case 10005:
      str = "没有找到指定特征值";
      break;
    case 10006:
      str = "当前连接已断开";
      break;
    case 10007:
      str = "当前特征值不支持此操作";
      break;
    case 10008:
      str = "其余所有系统上报的异常";
      break;
    case 10009:
      str = "系统版本低于 4.3 不支持 BLE";
      break;
    case 10012:
      str = "连接超时";
      break;
    case 10013:
      str = "连接 deviceId 为空或者是格式不正确";
      break;
    default:
      break;
  }
  return str;
};

export const inArray = (arr, key, val) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key] === val) {
      return i;
    }
  }
  return -1;
};

// ArrayBuffer转16进度字符串示例
export const ab2hex = (buffer) => {
  const hexArr = Array.prototype.map.call(new Uint8Array(buffer), function(
    bit,
  ) {
    return `00${bit.toString(16)}`.slice(-2);
  });
  return hexArr.join(""); 
};

export const utils = {
  max(n1, n2) {
    return Math.max(n1, n2);
  },
  len(arr) {
    const arr_return = arr || [];
    return arr_return.length;
  },
};
