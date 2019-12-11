export const genderList = [
  {
    label: "男",
    value: 1,
  },
  {
    label: "女",
    value: 2,
  },
];

export const heightList: Array<any> = [];

for (let index = 100; index < 300; index++) {
  const Obj = {
    label: index,
    value: index,
  };
  heightList.push(Obj);
}
