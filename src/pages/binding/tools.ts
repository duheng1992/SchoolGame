import { setTopColor } from "@/utils/utils";

export const setBluetoothStatus = (_this, status) => {
  _this.setState(
    {
      bluetoothStatus: status,
    },
    () => {
      if (status) {
        setTopColor("#627D6B");
      } else {
        setTopColor("#41403F");
      }
    },
  );
};

export const setBindResult = (_this, bindResult) => {
  if (bindResult) {
    _this.setState(
      {
        bindStatus: 1,
      },
      () => {
        setTopColor("#627D6B");
      },
    );
  } else {
    _this.setState(
      {
        bindStatus: 2,
      },
      () => {
        setTopColor("#41403F");
      },
    );
  }
};

export const rebinding = (_this) => {
  _this.setState(
    {
      bluetoothStatus: true,
      bindStatus: 0,
    },
    () => {
      setTopColor("#627D6B");
    },
  );
};

//设置测量状态

export const setMeasureStatus = (_this, measureResult) => {
  if (measureResult) {
    _this.setState({
      measureStatus: 1,
    });
  } else {
    _this.setState({
      measureStatus: 2,
    });
  }
};
