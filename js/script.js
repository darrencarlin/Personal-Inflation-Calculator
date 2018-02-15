$(document).ready(function () {

    "use strict";

    let counterTotal = document.getElementById("counterTotal");
    let total = 0;
    let wage;
    let calculatedWeights = [];
    let counter;
    const coinHTML = "<div class='unit'><b><i aria-hidden='true' class='fas fa-euro-sign fa-2x'></i></b></div>";
    let obj = {};
    let newArr = [];
    let jsonData = [{
        "Jan": 0.99482768,
        "Feb": 1.002448943,
        "Mar": 0.998880735,
        "Apr": 1.005324257,
        "May": 1.000099037,
        "Jun": 0.999389381,
        "Jul": 1.000946324,
        "Aug": 1.002647255,
        "Sep": 1.001916043,
        "Oct": 1.003368431,
        "Nov": 0.999758556,
        "Dec": 1.006620653
    }, {
        "Jan": 1.019145958,
        "Feb": 1.001016596,
        "Mar": 1.00311856,
        "Apr": 0.995140471,
        "May": 1.007109039,
        "Jun": 1.000086543,
        "Jul": 0.994149667,
        "Aug": 0.9993684,
        "Sep": 1.002571778,
        "Oct": 0.998832278,
        "Nov": 0.999533796,
        "Dec": 1.007450577
    }, {
        "Jan": 1.025397783,
        "Feb": 1.001276134,
        "Mar": 1.000442315,
        "Apr": 0.999830767,
        "May": 1.00003044,
        "Jun": 1.00105987,
        "Jul": 1.002049876,
        "Aug": 1.004148044,
        "Sep": 1.002806112,
        "Oct": 1.000268363,
        "Nov": 1.000329593,
        "Dec": 1.012561416
    }, {
        "Jan": 0.892639749,
        "Feb": 1.082385608,
        "Mar": 1.026534744,
        "Apr": 1.003300132,
        "May": 1.002670949,
        "Jun": 0.958042312,
        "Jul": 0.948387713,
        "Aug": 1.067056237,
        "Sep": 1.028596714,
        "Oct": 1.010493414,
        "Nov": 0.999843383,
        "Dec": 0.986522288
    }, {
        "Jan": 1.001969727,
        "Feb": 1.01196195,
        "Mar": 1.002242788,
        "Apr": 0.992579257,
        "May": 0.99929164,
        "Jun": 0.996228671,
        "Jul": 1.002078603,
        "Aug": 1.000219143,
        "Sep": 1.007519814,
        "Oct": 1.006054685,
        "Nov": 1.004817035,
        "Dec": 1.003701083
    }, {
        "Jan": 0.944162,
        "Feb": 0.968511,
        "Mar": 0.999697,
        "Apr": 0.996503,
        "May": 0.996396,
        "Jun": 0.993231,
        "Jul": 0.993117,
        "Aug": 0.967655,
        "Sep": 0.983207,
        "Oct": 0.996364,
        "Nov": 1.009577,
        "Dec": 0.996375
    }, {
        "Jan": 0.995417514,
        "Feb": 1.007579853,
        "Mar": 1.002954418,
        "Apr": 1.001562083,
        "May": 1.004782158,
        "Jun": 0.98949311,
        "Jul": 0.998830285,
        "Aug": 1.011308582,
        "Sep": 1.00147361,
        "Oct": 1.017271417,
        "Nov": 0.998542262,
        "Dec": 0.997753258
    }, {
        "Jan": 1.007219771,
        "Feb": 1.0003655,
        "Mar": 0.999699778,
        "Apr": 0.998373685,
        "May": 0.999897184,
        "Jun": 1.000516351,
        "Jul": 1.000891713,
        "Aug": 0.997605385,
        "Sep": 0.999781401,
        "Oct": 0.997775221,
        "Nov": 0.998971458,
        "Dec": 1.000274286
    }, {
        "Jan": 1.027651054,
        "Feb": 1.010999093,
        "Mar": 1.012232655,
        "Apr": 1.012675828,
        "May": 0.995077844,
        "Jun": 0.98830439,
        "Jul": 0.99291723,
        "Aug": 1.016360595,
        "Sep": 1.013090334,
        "Oct": 0.994895157,
        "Nov": 0.98431485,
        "Dec": 0.992036274
    }, {
        "Jan": 0.949001474,
        "Feb": 1.088367712,
        "Mar": 1.143831601,
        "Apr": 0.912012611,
        "May": 0.996895856,
        "Jun": 1.087733076,
        "Jul": 1.093973817,
        "Aug": 1.005466026,
        "Sep": 0.904794063,
        "Oct": 0.900185645,
        "Nov": 0.973702308,
        "Dec": 1.034043881
    }, {
        "Jan": 1.002436743,
        "Feb": 1.001316475,
        "Mar": 0.999862927,
        "Apr": 0.993456494,
        "May": 0.993463239,
        "Jun": 0.997183815,
        "Jul": 0.996406098,
        "Aug": 0.995252873,
        "Sep": 0.993963946,
        "Oct": 0.992112024,
        "Nov": 0.989558103,
        "Dec": 0.989493415
    }, {
        "Jan": 0.995616981,
        "Feb": 0.999432784,
        "Mar": 1.00041632,
        "Apr": 1.001692019,
        "May": 0.993603943,
        "Jun": 0.999410509,
        "Jul": 0.995883132,
        "Aug": 1.003244278,
        "Sep": 0.997576645,
        "Oct": 1.005638234,
        "Nov": 1.00196609,
        "Dec": 0.999065523
    }, {
        "Jan": 0.994687468,
        "Feb": 1.002054095,
        "Mar": 1.005606956,
        "Apr": 1.004490466,
        "May": 1.003683519,
        "Jun": 1.009061039,
        "Jul": 1.003897987,
        "Aug": 1.002015432,
        "Sep": 0.994899813,
        "Oct": 1.002553663,
        "Nov": 0.989302892,
        "Dec": 0.998191845
    }, {
        "Jan": 1.00714953,
        "Feb": 1.004462319,
        "Mar": 1.021460871,
        "Apr": 1.015161982,
        "May": 0.998779619,
        "Jun": 1.001683985,
        "Jul": 0.999105434,
        "Aug": 0.99985894,
        "Sep": 0.995730578,
        "Oct": 1.007705749,
        "Nov": 0.999563858,
        "Dec": 1.006645227
    }];
    let coinsTotal = 100;
    let globalDiff
    let coinWeights = [11, 9, 3, 5, 5, 5, 11, 3, 14, 2, 3, 8, 11, 10];
    let coinsInUse = 0; // total number of coins in coinWeights 
    let nationalCPI = [99.5, 100.4, 101.4, 101.4, 101.4, 101.2, 101.1, 101.7, 101.6, 101.5, 101.1, 101.2];
    let personalCPI = [];
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const avg = coinWeights.map(function (x) {
        return x / 100.00
    });

    const returnAvg = avg.map(function (y) {
        return Math.round(y * 100.00)
    });

    // 0, Health Insurance
    const avgss = [
        0.126603656, // Food
        0.091050036, // Alcohol
        0, // Tobacco
        0.055633795, // Clothing
        0.178411073, // Rent
        0, // Mortage
        0, // Housing
        0.032617524, // Health
        0.13212786, // Car
        0.027006057, // Public Transport
        0.035881013, // Telecommunications
        0.036451821, // Education
        0.080588118, // Recreation
        0.122454034, // RestHotelCafe
        0.081175013 // Other
    ];

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
                personalCPI.push(calculateIndex(firstMonth));
                continue
            } else {
                for (let i = 0; i < data.length; i++) {
                    currMonth.push(data[i][currentMonth])
                    nextMonth.push(currMonth[i] * firstMonth[i]);
                }
                firstMonth = nextMonth;
                personalCPI.push(calculateIndex(nextMonth));
                if (i === 11) {
                    break
                }
            }
        }
        personalCPI = personalCPI.map(Number);
        renderHighchart();
    }

    function getSum(total, num) {
        return total + num;
    }

    function calculateIndex(arr) {
        // first 100 changed to whatever is in use at a given time
        console.log(coinsTotal)
        return ((arr.reduce(getSum) / 64) * 100).toFixed(2)
    }
    calculatePersonal(jsonData);
    console.log(personalCPI);
    // document.querySelector("#cartItem9"),
    let containers = [
        document.querySelector("#cartItem1"), document.querySelector("#cartItem2"), document.querySelector("#cartItem3"),
        document.querySelector("#cartItem4"), document.querySelector("#cartItem5"), document.querySelector("#cartItem6"),
        document.querySelector("#cartItem7"), document.querySelector("#cartItem8"),
        document.querySelector("#cartItem10"), document.querySelector("#cartItem11"), document.querySelector("#cartItem12"),
        document.querySelector("#cartItem13"), document.querySelector("#cartItem14"), document.querySelector("#cartItem15"),
        document.querySelector("#cartItem16")
    ];
    // using bind for 'this' (binds this to .minus)
    $(".minus").bind("click touchstart", function (e) {
        e.stopImmediatePropagation();
        e.preventDefault();
        let id = this.parentElement.id
        let counter = this.parentElement.firstElementChild;
        let counterNum = counter.innerHTML;
        this.nextElementSibling.style.pointerEvents = "auto";
        let lastChild = this.parentElement.lastChild.classList;
        let unit = this.parentElement.lastChild;
        if (lastChild == 'unit') {
            unit.remove();
            counter.innerHTML--;
            counterTotal.innerHTML++;
            total++;
        } else {
            let counterNum = parseInt(counter);
            if (counterNum <= 0) {
                $(".counter-feedback").text("Container Empty");
                $(".counter-feedback").css("opacity", "1");
                setTimeout(function () {
                    $(".counter-feedback").text("");
                    $(".counter-feedback").css("opacity", "0");
                }, 3000);
            }
        }
        // function to return coin weights to orginal value
        // re-update coin weights array by multiplying index by 100 and then re-update highcharts
        function calcDifferenceMinus(index) {
            let numDifMinus = coinWeights[index] / counterNum;
            globalDiff = numDifMinus;
            let val = coinWeights[index] -= numDifMinus;
            if (coinWeights[index] < 1) {
                coinWeights[index] = 0
            }
        }
        if (id === "cartItem1") {
            calcDifferenceMinus(0);
        } else if (id === "cartItem2") {
            calcDifferenceMinus(1);
        } else if (id === "cartItem3") {
            calcDifferenceMinus(2);
        } else if (id === "cartItem4") {
            calcDifferenceMinus(3);
        } else if (id === "cartItem5") {
            calcDifferenceMinus(4);
        } else if (id === "cartItem6") {
            calcDifferenceMinus(5);
        } else if (id === "cartItem7") {
            calcDifferenceMinus(6);
        } else if (id === "cartItem8") {
            calcDifferenceMinus(7);
        } else if (id === "cartItem9") {
            // do nothing - html currently commented out
        } else if (id === "cartItem10") {
            calcDifferenceMinus(9);
        } else if (id === "cartItem11") {
            calcDifferenceMinus(10);
        } else if (id === "cartItem12") {
            calcDifferenceMinus(11);
        } else if (id === "cartItem13") {
            calcDifferenceMinus(12);
        } else if (id === "cartItem14") {
            calcDifferenceMinus(13);
        } else if (id === "cartItem15") {
            calcDifferenceMinus(14);
        } else if (id === "cartItem16") {
            calcDifferenceMinus(15);
        }
        console.log(coinWeights);
        calculatePersonal(jsonData);
    });
    $(".plus").bind("click touchstart", function (e) {
        e.stopImmediatePropagation();
        e.preventDefault();
        let id = this.parentElement.id;
        let counter = this.parentElement.firstElementChild;
        let counterNum = counter.innerHTML;
        if (total > 0) {
            let counter = this.parentElement.firstElementChild;
            this.parentElement.insertAdjacentHTML("beforeend", coinHTML);
            counter.innerHTML++;
            let counterNum = parseInt(counter.innerHTML);
            if (counterNum === 9) {
                $(".counter-feedback").text("Container Full");
                $(".counter-feedback").css("opacity", "1");
                setTimeout(function () {
                    $(".counter-feedback").text("");
                    $(".counter-feedback").css("opacity", "0");
                }, 3000);
                this.style.pointerEvents = "none";
            }
            counterTotal.innerHTML--;
            total--;
        } else {
            $(".counter-feedback").text("Not Enough Coins");
            $(".counter-feedback").css("opacity", "1");
            setTimeout(function () {
                $(".counter-feedback").text("");
                $(".counter-feedback").css("opacity", "0");
            }, 3000);
        }

        function calcDifferencePlus(index) {
            [index] += globalDiff
        }
        if (id === "cartItem1") {
            calcDifferencePlus(0);
        } else if (id === "cartItem2") {
            calcDifferencePlus(1);
        } else if (id === "cartItem3") {
            calcDifferencePlus(2);
        } else if (id === "cartItem4") {
            calcDifferencePlus(3);
        } else if (id === "cartItem5") {
            calcDifferencePlus(4);
        } else if (id === "cartItem6") {
            calcDifferencePlus(5);
        } else if (id === "cartItem7") {
            calcDifferencePlus(6);
        } else if (id === "cartItem8") {
            calcDifferencePlus(7);
        } else if (id === "cartItem9") {
            // do nothing - html currently commented out
        } else if (id === "cartItem10") {
            calcDifferencePlus(9);
        } else if (id === "cartItem11") {
            calcDifferencePlus(10);
        } else if (id === "cartItem12") {
            calcDifferencePlus(11);
        } else if (id === "cartItem13") {
            calcDifferencePlus(12);
        } else if (id === "cartItem14") {
            calcDifferencePlus(13);
        } else if (id === "cartItem15") {
            calcDifferencePlus(14);
        } else if (id === "cartItem16") {
            calcDifferencePlus(15);
        }
        console.log(coinWeights);
        calculatePersonal(jsonData);
    });
    // Check toggle states
    $("input[type='radio']").change(changeState);
    console.log(coinWeights)

    function changeState() {
        if (this.value === "Mortgaged Owner Occupied Home") {
            $("#cartItem5").addClass("overlay");
            $("#cartItem6, #cartItem7").removeClass("overlay");
            coinWeights[4] = 0;
            coinsTotal = coinsTotal - 5;
        } else if (this.value === "Owner Occupied Home (No Mortgage)") {
            $("#cartItem5, #cartItem6").addClass("overlay");
            $("#cartItem7").removeClass("overlay");
            coinWeights[4] = 0;
            coinWeights[5] = 0;
            coinsTotal = coinsTotal - 10
        } else if (this.value === "Rental Accommodation") {
            $("#cartItem6").addClass("overlay");
            $("#cartItem5, #cartItem7").removeClass("overlay");
            coinWeights[5] = 0;
            coinsTotal = coinsTotal - 5;
        } else if (this.value === "Insurance-Yes") {
            $("#cartItem9").removeClass("overlay");
        } else if (this.value === "Insurance-No") {
            $("#cartItem9").addClass("overlay");
        } else if (this.value === "Car-Yes") {
            $("#cartItem10").removeClass("overlay");
        } else if (this.value === "Car-No") {
            $("#cartItem10").addClass("overlay");
            coinWeights[8] = 0;
            coinsTotal = coinsTotal - 14
        } else if (this.value === "Smoker-Yes") {
            $("#cartItem3").removeClass("overlay");
        } else if (this.value === "Smoker-No") {
            $("#cartItem3").addClass("overlay");
            coinWeights[2] = 0;
            coinsTotal = coinsTotal - 3
        } else if (this.value === "Drinker-Yes") {
            $("#cartItem2").removeClass("overlay");
        } else if (this.value === "Drinker-No") {
            $("#cartItem2").addClass("overlay");
            coinWeights[1] = 0;
            coinsTotal = coinsTotal - 9;
        }
        console.log(coinWeights);
        calculatePersonal(jsonData);
    }
    // Submit Button
    $("#questionSubmit").click(function () {
        let counterTotalNum = parseInt(counterTotal.innerHTML);
        if (counterTotalNum > 0) {
            $(".counter-feedback").text("You Still Have Coins To Use");
            $(".counter-feedback").css("opacity", "1");
            setTimeout(function () {
                $(".counter-feedback").text("");
                $(".counter-feedback").css("opacity", "0");
            }, 3000);
        }
    });
    wage = 2000;
    // Calculate average weights
    function calculateWeights(arr) {
        for (let i = 0; i < arr.length; i++) {
            calculatedWeights.push(arr[i] * wage);
        }
    }
    calculateWeights(avg);
    // Calculate coins based on €50 per coin
    function calculateCoins(index) {
        return Math.round(calculatedWeights[index] / 39);
    };
    // Populate containers with average weights, populate counters
    function populate() {
        let total = 0;
        for (let i = 0; i < containers.length; i++) {
            let item = containers[i];
            let span = item.firstElementChild;
            let num = calculateCoins(i);
            obj[item.title] = num
            for (let i = 1; i <= num; i++) {
                item.insertAdjacentHTML("beforeend", coinHTML);
            }
            span.innerHTML = num;
            total += num;
            newArr.push(num);
        }
    };
    populate();
    //$("#questionSubmit").click(function () {
    //    // Calculating a percentage 
    //    let output = [];
    //    for (let i = 0; i < newArr.length; i++) {
    //        let num = newArr[i] * 0.9;
    //        output.push(num.toFixed(2));
    //    }
    //    // Adding % sign
    //    function percentage(i) {
    //        for (let y = i; y < output.length; y++) {
    //            return (output[y] + "%");
    //        }
    //    }
    //    // Inserting into span
    //    for (let i = 0; i < containers.length; i++) {
    //        let item = containers[i]
    //        let span = item.firstElementChild;
    //        span.innerHTML = percentage(i);
    //    }
    //});
    // Reset Button
    $("#reset").click(function () {
        $("#select-housing, #select-smoker, #select-drink, #select-health, #select-car").prop('selectedIndex', 0).change();
        total = 0;
        counterTotal.innerHTML = 0;
        // remove overlays
        $("#cart *").removeClass("overlay");
        // reset counters
        let counter = $(".counter");
        for (let i = 0; i < counter.length; i++) {
            counter[i].innerHTML = "0"
        }
        // remove units/coins
        let elements = document.getElementsByClassName("unit");
        while (elements.length > 0) elements[0].remove();
        // clear array
        calculatedWeights = [];
        calculateWeights(avg);
        populate();
    });
    // Auto Adjust
    $("input[type='radio']").change(autoAdjust);

    function autoAdjust(event) {
        let currVal;
        let currVal2;
        // let arrSelect = event.currentTarget.children
        //var arrOption = [].slice.call(arrSelect);
        if ($(this).val() === "Mortgaged Owner Occupied Home") {
            currVal = document.querySelector("#cartItem5 > .counter").innerHTML
            if (currVal > 0) {
                for (let i = 0; i < currVal; i++) {
                    counterTotal.innerHTML++;
                    total++;
                    document.querySelector("#cartItem5 .unit").remove();
                }
                document.querySelector("#cartItem5 > .counter").innerHTML = 0;
            } else {
                // do nothing
            }
        } else if ($(this).val() === "Owner Occupied Home (No Mortgage)") {
            currVal = document.querySelector("#cartItem5 > .counter").innerHTML
            currVal2 = document.querySelector("#cartItem6 > .counter").innerHTML
            if (currVal > 0) {
                for (let i = 0; i < currVal; i++) {
                    counterTotal.innerHTML++;
                    total++;
                    document.querySelector("#cartItem5 .unit").remove();
                }
                document.querySelector("#cartItem5 > .counter").innerHTML = 0;
            } else {
                // do nothing
            }
            if (currVal2 > 0) {
                for (let i = 0; i < currVal2; i++) {
                    counterTotal.innerHTML++;
                    total++;
                    document.querySelector("#cartItem6 .unit").remove();
                }
                document.querySelector("#cartItem6 > .counter").innerHTML = 0;
            } else { }
        } else if ($(this).val() === "Rental Accommodation") {
            currVal = document.querySelector("#cartItem6 > .counter").innerHTML
            if (currVal > 0) {
                for (let i = 0; i < currVal; i++) {
                    counterTotal.innerHTML++;
                    total++;
                    document.querySelector("#cartItem6 .unit").remove();
                }
                document.querySelector("#cartItem6 > .counter").innerHTML = 0;
            } else {
                // do nothing
            }
        } else if ($(this).val() === "Smoker-Yes") {
            // select Smoker Yes
        } else if ($(this).val() === "Smoker-No") {
            currVal = document.querySelector("#cartItem3 > .counter").innerHTML
            if (currVal > 0) {
                for (let i = 0; i < currVal; i++) {
                    counterTotal.innerHTML++;
                    total++;
                    document.querySelector("#cartItem3 .unit").remove();
                }
                document.querySelector("#cartItem3 > .counter").innerHTML = 0;
            } else {
                // do nothing
            }
        } else if ($(this).val() === "Insurance-Yes") {
            // do nothing
        } else if ($(this).val() === "Insurance-No") {
            currVal = document.querySelector("#cartItem9 > .counter").innerHTML
            if (currVal > 0) {
                for (let i = 0; i < currVal; i++) {
                    counterTotal.innerHTML++;
                    total++;
                    document.querySelector("#cartItem9 .unit").remove();
                }
                document.querySelector("#cartItem9 > .counter").innerHTML = 0;
            } else {
                // do nothing
            }
        } else if ($(this).val() === "Drinker-Yes") {
            // select Alcohol Yes
        } else if ($(this).val() === "Drinker-No") {
            currVal = document.querySelector("#cartItem2 > .counter").innerHTML
            if (currVal > 0) {
                for (let i = 0; i < currVal; i++) {
                    counterTotal.innerHTML++;
                    total++;
                    document.querySelector("#cartItem2 .unit").remove();
                }
                document.querySelector("#cartItem2 > .counter").innerHTML = 0;
            } else {
                // do nothing
            }
        } else if ($(this).val() === "Car-Yes") {
            // select Car Yes
        } else if ($(this).val() === "Car-No") {
            currVal = document.querySelector("#cartItem10 > .counter").innerHTML
            if (currVal > 0) {
                for (let i = 0; i < currVal; i++) {
                    counterTotal.innerHTML++;
                    total++;
                    document.querySelector("#cartItem10 .unit").remove();
                }
                document.querySelector("#cartItem10 > .counter").innerHTML = 0;
            } else {
                // do nothing
            }
        }
        //  calculatePersonal(jsonData);
    }

    function renderHighchart() {
        Highcharts.chart('container', {
            title: {
                text: 'Personal Inflation 2012'
            },
            yAxis: {
                title: {
                    text: 'Percentage'
                }
            },
            xAxis: {
                categories: months
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    }
                }
            },
            series: [{
                name: 'Personal Inflation',
                data: personalCPI
            }, {
                name: 'National Inflation',
                data: nationalCPI
            }],
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }
        });
    }
    //console.log($(".unit").length)
});