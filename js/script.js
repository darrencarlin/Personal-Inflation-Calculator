$(document).ready(function ready() {
  "use strict";
  let prev;
  let id;
  let counterTotal = $("#counterTotal");
  let counter;
  var coinsRemaining;
  let coinsInUse;
  const coinHTML =
    "<div class='unit'><b><i aria-hidden='true' class='fas fa-euro-sign'></i></b></div>";
  let coinWeights = [5, 4, 1, 2, 2, 2, 5, 1, 6, 1, 1, 4, 5, 5];

  let nationalCPI = [];
  let personalCPI = [];
  let percentageChangePersonal = [];
  let percentageChangeNational = [
    1.009045226,
    1.009960159,
    1,
    1,
    0.998027613,
    0.999011858,
    1.005934718,
    0.999016716,
    0.999015748,
    0.996059113,
    1.00098912
  ];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  let containers = [
    "#cartItem1", // 0 Food
    "#cartItem2", // 1 Alcohol
    "#cartItem3", // 2 Tobacco
    "#cartItem4", // 3 Clothing
    "#cartItem5", // 4 Rent
    "#cartItem6", // 5 Mortage
    "#cartItem7", // 6 Housing
    "#cartItem8", // 7 Health
    // 9 is skipped
    "#cartItem10", // 8 Car
    "#cartItem11", // 9 Public Transport
    "#cartItem12", // 10 Telecommunications
    "#cartItem13", // 11 Education
    "#cartItem14", // 12 Recreation
    // 15 is skipped
    "#cartItem16" // 13 Other
  ];

  // set default values based on radio buttons
  coinWeights[5] = 0;
  coinWeights[2] = 0;
  coinsRemaining = 3;
  counterTotal.innerHTML = 3;



  let jsonData2017=[{Jan:1.002516197,Feb:0.994717694,Mar:1.002591672,Apr:0.998833398,May:1.003574107,Jun:0.99704037,Jul:1.002495552,Aug:1.002386626,Sep:0.995666937,Oct:1.002872263,Nov:0.998230732,Dec:0.997250818},{Jan:1.009986398,Feb:0.996407316,Mar:0.998585272,Apr:1.001910795,May:1.008030492,Jun:1.002539172,Jul:1.004662713,Aug:0.996273628,Sep:1.00179676,Oct:1.000662597,Nov:0.990004203,Dec:0.995657296},{Jan:1.000034963,Feb:1.000641358,Mar:1.000607736,Apr:1.005077481,May:1.003500094,Jun:1.003573303,Jul:1.001840049,Aug:1.000521693,Sep:0.999518158,Oct:1.020727649,Nov:1.023143658,Dec:1.001432256},{Jan:0.910373945,Feb:1.063033512,Mar:1.018893992,Apr:0.993537526,May:0.999660956,Jun:0.972216248,Jul:0.932814594,Aug:1.06113683,Sep:1.030971241,Oct:0.988230563,Nov:1.019876552,Dec:0.981016292},{Jan:1.000146989,Feb:1.009992859,Mar:0.999092676,Apr:1.004522196,May:1.000949432,Jun:1.013284097,Jul:1.003127239,Aug:1.006473134,Sep:1.010578315,Oct:1.004824612,Nov:0.999984447,Dec:1.005680497},{Jan:0.996892,Feb:1.000683,Mar:1.000772,Apr:0.99713,May:1.001,Jun:1.001154,Jul:1.001454,Aug:1.001649,Sep:0.998198,Oct:1.002346,Nov:0.987096,Dec:1.002697},{Jan:0.989649673,Feb:1.007258532,Mar:1.000590575,Apr:0.997015731,May:0.997498638,Jun:0.997798682,Jul:0.991170196,Aug:1.004124448,Sep:1.000934629,Oct:1.005397517,Nov:1.009019376,Dec:0.998893132},{Jan:1.001494757,Feb:1.016487619,Mar:1.002380677,Apr:1.006825641,May:1.011778826,Jun:1.000208172,Jul:0.999457233,Aug:0.992988159,Sep:0.999281409,Oct:0.998630836,Nov:0.996733408,Dec:0.999084432},{Jan:1.007313488,Feb:1.002733713,Mar:1.001367482,Apr:1.003449918,May:0.989008068,Jun:0.996667116,Jul:0.98683035,Aug:1.012954578,Sep:0.993328843,Oct:0.997468899,Nov:1.004633262,Dec:0.998110345},{Jan:0.969647729,Feb:1.036217259,Mar:1.108889572,Apr:1.106603203,May:0.848976866,Jun:1.044878929,Jul:1.165578912,Aug:0.962731454,Sep:0.846285944,Oct:0.945423279,Nov:0.991968565,Dec:1.058369581},{Jan:1.003838626,Feb:1.000150863,Mar:0.99943995,Apr:1.003500213,May:1.014481934,Jun:1.000494459,Jul:0.999116142,Aug:1.001021494,Sep:0.977095862,Oct:1.005390571,Nov:0.998603296,Dec:0.998216518},{Jan:0.990368309,Feb:1.008164744,Mar:1.015472696,Apr:1.007878453,May:1.016491798,Jun:1.011395274,Jul:1.011239657,Aug:1.004839492,Sep:0.983920636,Oct:0.983362931,Nov:0.978009639,Dec:0.996668131},{Jan:1.000058071,Feb:1.000005272,Mar:1,Apr:1.000359642,May:1,Jun:1,Jul:1.000223362,Aug:1,Sep:1,Oct:1.013902229,Nov:1.001001982,Dec:1},{Jan:0.999398101,Feb:1.000843633,Mar:1.001165084,Apr:0.997885836,May:0.996226478,Jun:0.998400488,Jul:0.992474943,Aug:1.001850724,Sep:0.998143195,Oct:1.001601577,Nov:0.995336614,Dec:0.998366473}];

  /***************************************************************************/
  /*                      Functions                                          */
  /***************************************************************************/

  // Adding sum of all coins in coinWeights (This variable varies)

  coinsInUse = coinWeights.reduce(function(a, b) { return a + b; }, 0);

  // Gets 2017 National CPI from statbank data

  let url = "https://dev-incubator.cso.ie/personalinflationcalculator/js/CPM01.json";

  function getNationalCPI() {
    var urlCPM01 = url;
    JSONstat(urlCPM01, function() {
      var ds = this.Dataset(0);
      var year = 2017;
      for (let i = 1; i < 13; i++) {
        if (i <= 9) {
          var month = year + "M0" + i;
        } else {
          var month = year + "M" + i;
        }
        var index = ds.Data({
          "Commodity Group": "-",
          Month: month.toString(),
          Statistic: "CPM01C01"
        }).value;
        nationalCPI.push(index);
      }
      calculatePersonal(jsonData2017);
    });
  }
  getNationalCPI();

  /****************** 
   * Overlays Start *
   ******************/

  // Initial Overlays
  $("#cartItem6 img").attr("src", "images/mortgage_64_off.gif");
  $("#cartItem6").addClass("pointer-events-none");
  $("#cartItem3 img").attr("src", "images/tobacco_64_off.gif");
  $("#cartItem3").addClass("pointer-events-none");

  // Add Overlays

  function addOverlay(ids) {
    // Housing
    if (ids === "#cartItem5") {
      $("#cartItem5 img").attr("src", "images/rent_64_off.gif");
      $("#cartItem5").addClass("pointer-events-none");
    }

    if (ids === "#cartItem6") {
      $("#cartItem5 img").attr("src", "images/mortgage_64_off.gif");
      $("#cartItem5").addClass("pointer-events-none");
    }

    if (ids === "#cartItem5, #cartItem6") {
      $("#cartItem5 img").attr("src", "images/rent_64_off.gif");
      $("#cartItem6 img").attr("src", "images/mortgage_64_off.gif");
      $("#cartItem5, #cartItem6").addClass("pointer-events-none");
    }

    // Recreation
    if (ids === "#cartItem3") {
      $("#cartItem3 img").attr("src", "images/tobacco_64_off.gif");
      $("#cartItem3").addClass("pointer-events-none");
    }
    if (ids === "#cartItem2") {
      $("#cartItem2 img").attr("src", "images/alcohol_64_off.gif");
      $("#cartItem2").addClass("pointer-events-none");
    }

    // Driving
    if (ids === "#cartItem10") {
      $("#cartItem10 img").attr("src", "images/car_64_off.gif");
      $("#cartItem10").addClass("pointer-events-none");
    }
  }

  // Remove Overlays

  function removeOverlay(ids) {
    
    // Housing
    if (ids === "#cartItem5, #cartItem7") {
      $("#cartItem5 img").attr("src", "images/rent_64.gif");
      $("#cartItem7 img").attr("src", "images/housing_costs_64.gif");
      $("#cartItem5, #cartItem7").removeClass("pointer-events-none");
    }

    if (ids === "#cartItem6, #cartItem7") {
      $("#cartItem6 img").attr("src", "images/mortgage_64.gif");
      $("#cartItem7 img").attr("src", "images/housing_costs_64.gif");
      $("#cartItem6, #cartItem7").removeClass("pointer-events-none");
    }

    if (ids === "#cartItem5, #cartItem6") {
      $("#cartItem5 img").attr("src", "images/rent.gif");
      $("#cartItem6 img").attr("src", "images/housing_costs_64.gif");
      $("#cartItem5, #cartItem6").removeClass("pointer-events-none");
    }

    // Recreation
    if (ids === "#cartItem3") {
      $("#cartItem3 img").attr("src", "images/tobacco_64.gif");
      $("#cartItem3").removeClass("pointer-events-none");
    }

    if (ids === "#cartItem2") {
      $("#cartItem2 img").attr("src", "images/alcohol_64.gif");
      $("#cartItem2").removeClass("pointer-events-none");
    }

    // Driving
    if (ids === "#cartItem10") {
      $("#cartItem10 img").attr("src", "images/car_64.gif");
      $("#cartItem10").removeClass("pointer-events-none");
    }
  }

   // Add initial 44 coins to the coin basket

   function displayCoins() {
    for (let i = 1; i <= 44; i++) {
      $(".cart-theme-remaining").append(coinHTML);
    }
  }
  displayCoins();

  // Add inital coins to category baskets based on coinWeights variable above.

  function populate(elements) {
    let total = 0;

    for (let i = 0; i < elements.length; i++) {
      let item = elements[i];
      let basket = $(elements[i] + " .basket");
      let spanCounter = $(elements[i] + " .counter");
      let num = coinWeights[i];

      for (let i = 1; i <= num; i++) {
        basket.append(coinHTML);
      }

      spanCounter.html(num);
      total += num;
    }
  }

  populate(containers);

  // Update the coins in the 'coin basket' either 'grey' or 'gold' based on plus / minus clicks

  function updateCoins(string) {


    let unit = $(".cart-theme-remaining .unit");

    let remaining = parseInt(44 - coinsRemaining);

    for (let i = 0; i < remaining; i++) {
      unit[i].style.backgroundColor = "#919191";
    }

    for (let i = 44 - coinsRemaining; i < 44; i++) {
      unit[i].style.backgroundColor = "#faa320";
    }

    if (string === "plus") {
      for (let i = 0; i < 44 - parseInt(coinsRemaining); i++) {
        unit[i].style.backgroundColor = "#919191";
      }
    } else if (string === "minus") {
      unit[44 - coinsRemaining].style.backgroundColor = "#faa320";
    }
  }

  updateCoins();

  /*************************
   * CPI Calculation Start *
   *************************/

  function calculateIndex(arr) {
    return arr.reduce(getSum) / coinsInUse * 100.0;
  }

  // Calculate Sum
  function getSum(total, num) {
    return total + num;
  }

  function calculatePersonal(data) {
    personalCPI = [];
    let currMonth = [];
    let nextMonth = [];
    let firstMonth = [];
    for (let i = 0; i < data.length; i++) {
      nextMonth = [];
      currMonth = [];
      let currentMonth = months[i];
      if (i === 0) {
        for (let i = 0; i < data.length; i++) {
          firstMonth.push(data[i][currentMonth] * coinWeights[i]);
        }
        personalCPI.push(calculateIndex(firstMonth).toFixed(4));
        continue;
      } else {
        for (let i = 0; i < data.length; i++) {
          currMonth.push(data[i][currentMonth]);
          nextMonth.push(currMonth[i] * firstMonth[i]);
        }
        firstMonth = nextMonth;
        personalCPI.push(calculateIndex(nextMonth).toFixed(4));
        if (i === 11) {
          break;
        }
      }
    }
    personalCPI = personalCPI.map(Number);
    
    renderHighchart(
      personalCPI,
      nationalCPI,
      "Personal Inflation",
      "National Inflation"
    );
  }

  // Calculate CPI Percentage

  function calculatePercentage(arr1) {
    percentageChangePersonal = [];
    let firstIndex;
    let secondIndex;
    for (let i = 0; i < arr1.length - 1; i++) {
      firstIndex = arr1[i];
      secondIndex = arr1[i + 1];
      percentageChangePersonal.push(secondIndex / firstIndex);
    }

    let index,
      avg,
      above = 0,
      below = 0;

    for (let i = 0; i < personalCPI.length; i++) {
      index = personalCPI[i] / nationalCPI[i];

      if (index > 1) {
        above += 1;
      } else if (index < 1) {
        below += 1;
      }
    }

    if (above > below) {
      above = true;
      below = false;
    } else if ((above >= 5 && above < 7) || (below >= 5 && below < 7)) {
      avg = true;
      above = false;
      below = false;
    } else {
      below = true;
      above = false;
    }

    if (avg) {
      $(".output-text").html(
        "Inflation is affecting you close to the National Average \
         <i class='fas fa-arrows-alt-h fa-2x'></i>"
      );
      $(".output-text").css("border", "2px solid #17a2b8");
      $(".fa-arrow-up").css("color", "#17a2b8");
    } else if (below) {
      $(".output-text").html(
        "Inflation is affecting you below the National Average \
         <i class='fas fa-arrow-down fa-2x'></i>"
      );
      $(".output-text").css("border", "2px solid #28a745");
      $(".fa-arrow-down").css("color", "#28a745");
    } else if (above) {
      $(".output-text").html(
        "Inflation is affecting you above the National Average \
         <i class='fas fa-arrow-up fa-2x'></i>"
      );
      $(".output-text").css("border", "2px solid #dc3545");
      $(".fa-arrow-up").css("color", "#dc3545");
    }
  }

  /***********************
   * CPI Calculation End *
   ***********************/

  // Calculate Pie Chart Data

  function calculatePieChart(numbers, index) {
    let num;
    for (let i = index; i < index + 1; i++) {
      num = (numbers[index] / numbers.length * 100).toFixed(2);
      if (num == 0.0) {
        return null;
      } else {
        return parseInt(num);
      }
    }
  }

  // functions to update coinweights and coins in use based on clicking minus / plus

  function calcDifferenceMinus(btn, index) {
    let currCoins = coinsInUse;
    coinWeights[index] -= 1;
    coinsInUse -= 1;
    if (coinWeights[index] <= 0) {
      btn.css("pointer-events", "none");
    }
  }

  function calcDifferencePlus(btn, index) {
    if (coinsInUse < 44) {
      coinWeights[index] += 1;
      coinsInUse += 1;
      if (coinsInUse == 44) {
        btn.css("pointer-events", "none");
      }
    }
  }

  // Plus and Minus button functions

  $(".minus").bind("click touchstart", function(e) {
    $(".plus").css("pointer-events", "initial");
    var btn = $(this);
    e.stopImmediatePropagation();
    e.preventDefault();
    let id = this.parentElement.parentElement.id;
    let counter = this.parentElement.parentElement.firstElementChild;
    let counterNum = counter.innerHTML;
    this.nextElementSibling.style.pointerEvents = "auto";
    let lastChild = this.parentElement.nextElementSibling.lastChild.classList;
    let unit = this.parentElement.nextElementSibling.lastChild;
    if (lastChild == "unit") {
      unit.remove();
      counter.innerHTML--;
      counterTotal.innerHTML++;
      coinsRemaining++;
      updateCoins("minus");
    } else {
     
    }

    // e.g if you click minus on cartItem1, run calcDifferenceMinus() with the parameters (btd.id, coinweights[index]) 


    switch (id) {
      case "cartItem1":
        calcDifferenceMinus(btn, 0);
        break;
      case "cartItem2":
        calcDifferenceMinus(btn, 1);
        break;
      case "cartItem3":
        calcDifferenceMinus(btn, 2);
        break;
      case "cartItem4":
        calcDifferenceMinus(btn, 3);
        break;
      case "cartItem5":
        calcDifferenceMinus(btn, 4);
        break;
      case "cartItem6":
        calcDifferenceMinus(btn, 5);
        break;
      case "cartItem7":
        calcDifferenceMinus(btn, 6);
        break;
      case "cartItem8":
        calcDifferenceMinus(btn, 7);
        break;
      case "cartItem9":
        // Do Nothing - Category Removed
        break;
      case "cartItem10":
        calcDifferenceMinus(btn, 8);
        break;
      case "cartItem11":
        calcDifferenceMinus(btn, 9);
        break;
      case "cartItem12":
        calcDifferenceMinus(btn, 10);
        break;
      case "cartItem13":
        calcDifferenceMinus(btn, 11);
        break;
      case "cartItem14":
        calcDifferenceMinus(btn, 12);
        break;
      case "cartItem15":
        // Do Nothing - Category Removed
        break;
      case "cartItem16":
        calcDifferenceMinus(btn, 13);
        break;
    }

    calculatePersonal(jsonData2017);
    //calculatePercentage(personalCPI);
  });

  $(".plus").bind("click touchstart", function(e) {
    var btn = $(this);
    btn.prev().css("pointer-events", "initial");
    e.stopImmediatePropagation();
    e.preventDefault();
    let id = this.parentElement.parentElement.id;
    let counter = this.parentElement.parentElement.firstElementChild;
    let counterNum = counter.innerHTML;
    if (coinsRemaining > 0) {
      let counter = this.parentElement.parentElement.firstElementChild;
      this.parentElement.nextElementSibling.insertAdjacentHTML(
        "beforeend",
        coinHTML
      );
      counter.innerHTML++;
      let counterNum = parseInt(counter.innerHTML);
      counterTotal.innerHTML--;
      coinsRemaining--;
      updateCoins("plus");
    } else {
      
    }

    // e.g if you click minus on cartItem1, run calcDifferencePlus() with the parameters (btd.id, coinweights[index])  

    switch (id) {
      case "cartItem1":
        calcDifferencePlus(btn, 0);
        break;
      case "cartItem2":
        calcDifferencePlus(btn, 1);
        break;
      case "cartItem3":
        calcDifferencePlus(btn, 2);
        break;
      case "cartItem4":
        calcDifferencePlus(btn, 3);
        break;
      case "cartItem5":
        calcDifferencePlus(btn, 4);
        break;
      case "cartItem6":
        calcDifferencePlus(btn, 5);
        break;
      case "cartItem7":
        calcDifferencePlus(btn, 6);
        break;
      case "cartItem8":
        calcDifferencePlus(btn, 7);
        break;
      case "cartItem9":
        // Do Nothing - Category Removed
        break;
      case "cartItem10":
        calcDifferencePlus(btn, 8);
        break;
      case "cartItem11":
        calcDifferencePlus(btn, 9);
        break;
      case "cartItem12":
        calcDifferencePlus(btn, 10);
        break;
      case "cartItem13":
        calcDifferencePlus(btn, 11);
        break;
      case "cartItem14":
        calcDifferencePlus(btn, 12);
        break;
      case "cartItem15":
        // Do Nothing - Category Removed
        break;
      case "cartItem16":
        calcDifferencePlus(btn, 13);
        break;
    }
    calculatePersonal(jsonData2017);
    //calculatePercentage(personalCPI);
  });

  // Check toggle states & update coin weights on radio button quesitons

  $("input[type='radio']").change(updateWeights);

  function updateWeights() {
    let currWeight = 0;

    switch (this.value) {
      case "Mortgaged Owner Occupied Home":
        addOverlay("#cartItem5");
        removeOverlay("#cartItem6, #cartItem7");
        currWeight = coinWeights[4];
        coinWeights[4] = 0;
        coinsInUse -= currWeight;
        currWeight = coinWeights[5];
        coinWeights[5] = 2;
        coinsInUse -= currWeight - 2;
        $("#cartItem5 .unit").remove();
        rePopulate("#cartItem6 .basket", 2);
        break;

      case "Owner Occupied Home (No Mortgage)":
        addOverlay("#cartItem5, #cartItem6");
        removeOverlay("#cartItem7");
        currWeight = coinWeights[4];
        coinWeights[4] = 0;
        coinsInUse -= currWeight;
        currWeight = coinWeights[5];
        coinWeights[5] = 0;
        coinsInUse -= currWeight;
        $("#cartItem5 .unit, #cartItem6 .unit").remove();
        break;

      case "Rental Accommodation":
        addOverlay("#cartItem6");
        removeOverlay("#cartItem5, #cartItem7");
        currWeight = coinWeights[4];
        coinWeights[4] = 2;
        coinsInUse -= currWeight - 2;
        rePopulate("#cartItem5 .basket", 2);
        currWeight = coinWeights[5];
        coinWeights[5] = 0;
        coinsInUse -= currWeight;
        break;

      case "Car-Yes":
        removeOverlay("#cartItem10");
        currWeight = coinWeights[8];
        coinWeights[8] = 6;
        coinsInUse -= currWeight - 6;
        rePopulate("#cartItem10 .basket", 6);
        break;

      case "Car-No":
        addOverlay("#cartItem10");
        currWeight = coinWeights[8];
        coinWeights[8] = 0;
        coinsInUse -= currWeight;
        break;

      case "Smoker-Yes":
        removeOverlay("#cartItem3");
        currWeight = coinWeights[2];
        coinWeights[2] = 1;
        coinsInUse -= currWeight - 1;
        rePopulate("#cartItem3 .basket", 1);
        break;

      case "Smoker-No":
        addOverlay("#cartItem3");
        currWeight = coinWeights[2];
        coinWeights[2] = 0;
        coinsInUse -= currWeight;
        break;

      case "Drinker-Yes":
        removeOverlay("#cartItem2");
        currWeight = coinWeights[1];
        coinWeights[1] = 4;
        coinsInUse -= currWeight - 4;
        rePopulate("#cartItem2 .basket", 4);
        break;

      case "Drinker-No":
        addOverlay("#cartItem2");
        currWeight = coinWeights[1];
        coinWeights[1] = 0;
        coinsInUse -= currWeight;
        break;
    }

    calculatePersonal(jsonData2017);
    calculatePercentage(personalCPI);
    updateCoins();
  }

  // Based on radio button questions rePopulate certain boxes if needed

  function rePopulate(selector, num) {
    let unit = document.querySelector(".unit");
    let location = $(selector);
    let nodelist = $(selector).children().length;
    if (nodelist == 0) {
      for (let i = 1; i <= num; i++) {
        $(selector).append(coinHTML);
      }
    }

    if (selector === "#cartItem6") {
      $("#cartItem5 .unit").remove();
    } else if (selector === "#cartItem5") {
      $("#cartItem6 .unit").remove();
    }
  }

  // Get previous selection

  $("label").on("mousedown", function() {
    prev = $("input[type=radio]:checked").val();
    id = $("input[type=radio]:checked").attr("id");
  });

  // Auto Adjust Table Visually & update counters

  $("input[type='radio']").change(autoAdjust);

  function autoAdjust() {
    coinsRemaining = counterTotal.innerHTML;
    if (coinsRemaining > 2) {
      $("#plus").css("pointer-events", "initial");
    } else if (coinsRemaining == 0) {
      $("#plus").css("pointer-events", "none");
      return;
    }

    let currVal;
    let currVal2;

    if ($(this).val() === "Mortgaged Owner Occupied Home") {
      if (prev === "Owner Occupied Home (No Mortgage)" && coinsRemaining < 2) {
        displayErr("Not Enough Coins - Owner => Mortage");
        $("#OwnerOccupiedHome").prop("checked", true);
      } else if (prev === "Rental Accommodation") {
        // do nothing
      } else {
        for (let i = 0; i < 2; i++) {
          counterTotal.innerHTML--;
        }
        // fixes issues with coins going into minusg
        coinsRemaining = counterTotal.innerHTML;
      }

      if (currVal > 0) {
        for (let i = 0; i < currVal; i++) {
          counterTotal.innerHTML++;
          coinsRemaining++;
          $("#cartItem5 .unit").remove();
        }

        $("#cartItem5 > .counter").html("0");
      } else {
        // do nothing
      }
    } else if ($(this).val() === "Owner Occupied Home (No Mortgage)") {
      currVal = $("#cartItem5 > .counter").html();
      currVal2 = $("#cartItem6 > .counter").html();
      if (coinsRemaining < 2) {
        $("#plus").css("pointer-events", "auto");
      }
      if (
        prev === "Rental Accommodation" ||
        prev === "Mortgaged Owner Occupied Home"
      ) {
        for (let i = 0; i < 2; i++) {
          counterTotal.innerHTML++;
        }
      }

      for (let i = 0; i < currVal; i++) {
        counterTotal.innerHTML--;
      }
      if (currVal > 0) {
        for (let i = 0; i < currVal; i++) {
          counterTotal.innerHTML++;
          coinsRemaining++;
          $("#cartItem5 .unit").remove();
        }
        $("#cartItem5 > .counter").html("0");
      } else {
        // do nothing
      }
      if (currVal2 > 0) {
        for (let i = 0; i < currVal2; i++) {
          counterTotal.innerHTML++;
          coinsRemaining++;
          $("#cartItem6 .unit").remove();
        }
        $("#cartItem6 > .counter").html("0");
      } else {
      }
    } else if ($(this).val() === "Rental Accommodation") {
      if (prev === "Owner Occupied Home (No Mortgage)") {
        for (let i = 0; i < 2; i++) {
          counterTotal.innerHTML--;
        }
        // fixes issues with coins going into minus
        coinsRemaining = counterTotal.innerHTML;
      } else {
        // do nothing
      }
      currVal = $("#cartItem6 > .counter").html();
      if (currVal > 0) {
        for (let i = 0; i < currVal; i++) {
          counterTotal.innerHTML++;
          coinsRemaining++;
          $("#cartItem6 .unit").remove();
        }
        $("#cartItem6 > .counter").html("0");
      } else {
        // do nothing
      }
      coinsRemaining = counterTotal.innerHTML;
    } else if ($(this).val() === "Smoker-Yes") {
      if (coinsRemaining >= 1) {
        currVal = $("#cartItem3 > .counter").html("1");
        for (let i = 0; i < 1; i++) {
          counterTotal.innerHTML--;
          coinsRemaining--;
        }
      } else {
        displayErr("Not Enough Coins smoking");
      }
    } else if ($(this).val() === "Smoker-No") {
      currVal = $("#cartItem3 > .counter").html();
      if (currVal > 0) {
        for (let i = 0; i < currVal; i++) {
          counterTotal.innerHTML++;
          coinsRemaining++;
          $("#cartItem3 .unit").remove();
        }
        $("#cartItem3 > .counter").html("0");
      } else {
        // do nothing
      }
    } else if ($(this).val() === "Insurance-Yes") {
      // not in use
      // do nothing
    } else if ($(this).val() === "Insurance-No") {
      currVal = $("#cartItem9 > .counter").html();
      if (currVal > 0) {
        for (let i = 0; i < currVal; i++) {
          counterTotal.innerHTML++;
          coinsRemaining++;
          $("#cartItem9 .unit").remove();
        }
        $("#cartItem9 > .counter").html("0");
      } else {
        // do nothing
      }
    } else if ($(this).val() === "Drinker-Yes") {
      if (coinsRemaining >= 4) {
        currVal = $("#cartItem2 > .counter").html("4");
        for (let i = 0; i < 4; i++) {
          counterTotal.innerHTML--;
        }
      } else {
        displayErr("Not Enough Coins drinking");
      }
    } else if ($(this).val() === "Drinker-No") {
      currVal = $("#cartItem2 > .counter").html();
      if (currVal > 0) {
        for (let i = 0; i < currVal; i++) {
          counterTotal.innerHTML++;
          coinsRemaining++;
          $("#cartItem2 .unit").remove();
        }
        $("#cartItem2 > .counter").html("0");
      } else {
        // do nothing
      }
    } else if ($(this).val() === "Car-Yes") {
      if (coinsRemaining >= 6) {
        currVal = $("#cartItem10 > .counter").html("6");
        for (let i = 0; i < 6; i++) {
          counterTotal.innerHTML--;
        }
      } else {
        displayErr("Not Enough Coins car");
      }
    } else if ($(this).val() === "Car-No") {
      currVal = $("#cartItem10 > .counter").html();
      if (currVal > 0) {
        for (let i = 0; i < currVal; i++) {
          counterTotal.innerHTML++;
          coinsRemaining++;
          $("#cartItem10 .unit").remove();
        }
        $("#cartItem10 > .counter").html("0");
      } else {
        // do nothing
      }
    }
    coinsRemaining = counterTotal.innerHTML;
    updateCoins();
  }

  // Render Highcharts (Line, Pie)

  function renderHighchart(data1, data2, text1, text2) {
    Highcharts.chart("container", {
      title: {
        text: ""
      },
      yAxis: {
        title: {
          text: ""
        }
      },
      xAxis: {
        categories: months
      },
      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "middle"
      },
      plotOptions: {
        series: {
          label: {
            connectorAllowed: false
          }
        }
      },
      series: [
        {
          name: text1,
          data: data1
        },
        {
          name: text2,
          data: data2
        }
      ],
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 1000
            },
            chartOptions: {
              legend: {
                layout: "horizontal",
                align: "center",
                verticalAlign: "bottom"
              }
            }
          }
        ]
      }
    });

    Highcharts.chart("container2", {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie"
      },
      title: {
        text: "Percentage Breakdown"
      },
      tooltip: {
        pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: true,
            format: "<b>{point.name}</b>: {point.percentage:.1f} %",
            style: {
              color:
                (Highcharts.theme && Highcharts.theme.contrastTextColor) ||
                "black"
            }
          }
        }
      },
      series: [
        {
          name: "Catergories",
          colorByPoint: true,
          data: [
            {
              name: "Food",
              y: calculatePieChart(coinWeights, 0)
            },
            {
              name: "Alcohol",
              y: calculatePieChart(coinWeights, 1)
            },
            {
              name: "Tobacco",
              y: calculatePieChart(coinWeights, 2)
            },
            {
              name: "Clothing",
              y: calculatePieChart(coinWeights, 3)
            },
            {
              name: "Rent",
              y: calculatePieChart(coinWeights, 4)
            },
            {
              name: "Mortage",
              y: calculatePieChart(coinWeights, 5)
            },
            {
              name: "Housing",
              y: calculatePieChart(coinWeights, 6)
            },
            {
              name: "Health",
              y: calculatePieChart(coinWeights, 7)
            },
            {
              name: "Car",
              y: calculatePieChart(coinWeights, 8)
            },
            {
              name: "Public Transport",
              y: calculatePieChart(coinWeights, 9)
            },
            {
              name: "Telecommunications",
              y: calculatePieChart(coinWeights, 10)
            },

            {
              name: "Education",
              y: calculatePieChart(coinWeights, 11)
            },
            {
              name: "Recreation",
              y: calculatePieChart(coinWeights, 12)
            },
            {
              name: "Other",
              y: calculatePieChart(coinWeights, 13)
            }
          ]
        }
      ],
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 1000
            },
            chartOptions: {
              legend: {
                layout: "horizontal",
                align: "center",
                verticalAlign: "bottom"
              }
            }
          }
        ]
      }
    });
  }
});
