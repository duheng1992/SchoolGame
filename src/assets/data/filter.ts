import { dictionaries_icon } from "@/images/load";
import { pureData } from "@/utils/utils";

export const dictionaries = {
  weight: {
    label: "体重",
    name: "weight",
    des: "体重",
    unit: "KG",
    icon: dictionaries_icon.weight,
  },
  fat: {
    label: "体脂",
    name: "fat",
    des: "体脂率",
    unit: "%",
    icon: dictionaries_icon.fat,
  },
  bmi: {
    label: "BIM",
    name: "bmi",
    des: "BIM",
    unit: "",
    icon: dictionaries_icon.bmi,
  },
  muscle: {
    label: "肌肉",
    name: "muscle",
    des: "肌肉量",
    unit: "KG",
    icon: dictionaries_icon.muscle,
  },
  water: {
    label: "水分",
    name: "water",
    des: "水分率",
    unit: "%",
    icon: dictionaries_icon.water,
  },
  protein: {
    label: "蛋白质",
    name: "protein",
    des: "蛋白质",
    unit: "%",
    icon: dictionaries_icon.protein,
  },
  metabolic: {
    label: "基础代谢",
    name: "metabolic",
    des: "基础代谢量",
    unit: "Kcal",
    icon: dictionaries_icon.metabolic,
  },
  visceral: {
    label: "内脏脂肪",
    name: "visceral",
    des: "内脏脂肪等级",
    unit: "",
    icon: dictionaries_icon.visceral,
  },
  bone: {
    label: "骨盐量",
    name: "bone",
    des: "骨盐量",
    unit: "KG",
    icon: dictionaries_icon.bone,
  },
};

export const homeData_filter = (data) => {
  const arr: Array<any> = [];

  for (const key in dictionaries) {
    if (dictionaries.hasOwnProperty(key)) {
      const el = dictionaries[key];
      if (data) {
        const des = data[`${key}Des`];
        const obj: any = {
          label: el.label,
          icon: el.icon,
          unit: el.unit,
          value: data[key] || 0,
          name: key,
          str: des.desc,
        };
        const ratio = (obj.value / des.max) * 100;
        obj.ratio = Math.round(ratio);
        if (key === "metabolic") {
          if (obj.value >= des.max) {
            obj.ratio = 100;
          } else {
            obj.ratio = 0;
          }
        }
        arr.push(obj);
      } else {
        const obj: any = {
          label: el.label,
          icon: el.icon,
          unit: el.unit,
          value: 0,
          name: key,
          str: "尚未检测",
          ratio: 0,
        };
        arr.push(obj);
      }
    }
  }

  return arr;
};

export const date_filter = (time) => {
  const time_split = time.split(" ");
  const day = time_split[0];
  const sec = time_split[1];
  const day_split = day.split("-");
  const dayStr = `${Number(day_split[0])}年${Number(day_split[1])}月${Number(
    day_split[2],
  )}日`;
  return `${dayStr} ${sec}`;
};
export const weightLine_filter = (data) => {
  const { chartList, lastTime } = data;
  const num = lastTime - chartList.length;
  const list = chartList.reverse();
  const xAxis: Array<any> = [];
  const series: Array<any> = [];
  for (let i = 0; i < list.length; i++) {
    const el = list[i];
    series.push(el.value);
    const xAxisValue = `${date_filter(el.time)} 第${i + num + 1}次上传`;
    xAxis.push(xAxisValue);
  }
  return {
    xAxis,
    series,
  };
};

export const reference_filter = (data) => {
  const standardList = data.standardList;
  if (standardList) {
    //
  } else {
    return {
      list: [],
      value: 0,
      value_ra: 0,
    };
  }
  //数据补全
  const lastObj = standardList[standardList.length - 1];
  lastObj.max = lastObj.min * 2;
  standardList[standardList.length - 1] = lastObj;
  //数据补全 -- end

  //比例尺转化算法 按照 0 - 100 区间进行每个数组的比例转化
  const max = 100;
  const min = 0;
  const ratio_bas = max - min; //比例基础值
  const list = pureData(standardList); // 原数组
  const returnArr: Array<any> = []; //output
  const value = data.value; // value
  const ratio = ratio_bas / list.length;
  let value_ra = 0;
  const colorArr = ["#D7D7D7", "#B0AFAF", "#888886", "#61605E", "#393836"];
  const colorArr_ra = 100 / colorArr.length;

  for (let i = 0; i < list.length; i++) {
    const el = list[i];
    const obj = {
      ...el,
      ratio,
    };
    const ra_l = i * ratio;
    if (value < el.max && value >= el.min) {
      const ra = (value - el.min) / (el.max - el.min);
      const ra_b = ra * ratio;
      value_ra = ra_l + ra_b;
    }
    obj.bgColor = colorArr[Math.ceil(ra_l / colorArr_ra)];

    returnArr.push(obj);
  }

  return {
    list: returnArr,
    value,
    value_ra,
  };
};

export const filter_rule = (name) => {
  let label = "";
  switch (name) {
    case "jz":
      label = "减脂";
      break;
    case "ph":
      label = "平衡";
      break;
    case "zj":
      label = "增肌";
      break;
    default:
      label = "";
      break;
  }
  return label;
};
