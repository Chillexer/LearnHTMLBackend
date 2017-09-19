function items(number) {
  var faker = require('faker')
  console.log("==================================")
  console.log("W E L C O M E  T O  M Y  S H O P !")
  console.log("==================================")
  for (var i = 0; i <= number; i++) {
      console.log(faker.commerce.productName() + " - $" + faker.commerce.price());
  }
}
items(100000);
