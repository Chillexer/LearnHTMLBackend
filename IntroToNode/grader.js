
function average(numbers) {
  var wholeNum = 0;
  for (var i = 0; i < numbers.length; i++) {
    wholeNum += numbers[i];
  }
  wholeNum = round(wholeNum / numbers.length);
}

var scores = [90, 98, 89, 100, 100, 86, 94];
average(scores);

var scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];
average(scores2);
