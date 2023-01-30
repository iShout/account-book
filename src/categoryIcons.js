const categoriesIconRoute = './images/categoryIcons/';
const account = require(`${categoriesIconRoute}account.png`);
const celebration = require(`${categoriesIconRoute}celebration.png`);
const gift = require(`${categoriesIconRoute}gift.png`);
const health = require(`${categoriesIconRoute}health.png`);
const laundry = require(`${categoriesIconRoute}laundry.png`);
const money = require(`${categoriesIconRoute}money.png`);
const restaurant = require(`${categoriesIconRoute}restaurant.png`);
const saving = require(`${categoriesIconRoute}saving.png`);
const selfImprovement = require(`${categoriesIconRoute}self-improvement.png`);
const shopping = require(`${categoriesIconRoute}shopping.png`);
const sports = require(`${categoriesIconRoute}sports.png`);
const vehicle = require(`${categoriesIconRoute}vehicle.png`);

const incomeIcons = [
  {icon: money, label: '工资'},
  {icon: account, label: '理财'},
];
const disburseIcons = [
  {icon: shopping, label: '购物'},
  {icon: vehicle, label: '交通'},
  {icon: restaurant, label: '饮食'},
  {icon: celebration, label: '聚会'},
  {icon: saving, label: '存款'},
  {icon: gift, label: '赠礼'},
  {icon: health, label: '医疗'},
  {icon: laundry, label: '洗衣'},
  {icon: selfImprovement, label: '学习'},
  {icon: sports, label: '运动'},
];

export {incomeIcons, disburseIcons};
