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
    // Average Weighting
    const avg = [
        0.126603656, // Food
        0.091050036, // Alcohol
        0, // Tobacco
        0.055633795, // Clothing
        0.178411073, // Rent
        0, // Mortage
        0, // Housing
        0.032617524, // Health
        0, // Health Insurance
        0.13212786, // Car
        0.027006057, // Public Transport
        0.035881013, // Telecommunications
        0.036451821, // Education
        0.080588118, // Recreation
        0.122454034, // RestHotelCafe
        0.081175013 // Other
    ];
    let containers = [
        document.querySelector("#cartItem1"), document.querySelector("#cartItem2"), document.querySelector("#cartItem3"),
        document.querySelector("#cartItem4"), document.querySelector("#cartItem5"), document.querySelector("#cartItem6"),
        document.querySelector("#cartItem7"), document.querySelector("#cartItem8"), document.querySelector("#cartItem9"),
        document.querySelector("#cartItem10"), document.querySelector("#cartItem11"), document.querySelector("#cartItem12"),
        document.querySelector("#cartItem13"), document.querySelector("#cartItem14"), document.querySelector("#cartItem15"),
        document.querySelector("#cartItem16")
    ];
    // using bind for 'this' (binds this to .minus)

    $(".minus").bind("click touchstart", function (e) {
        e.stopImmediatePropagation();
        e.preventDefault();
        let counter = this.parentElement.firstElementChild;
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
    });


    $(".plus").bind("click touchstart", function (e) {
        e.stopImmediatePropagation();
        e.preventDefault();
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

    });

    // Check toggle states
    $("input[type='radio']").change(changeState);

    function changeState() {
        if (this.value === "Mortgaged Owner Occupied Home") {
            $("#cartItem5").addClass("overlay");
            $("#cartItem6, #cartItem7").removeClass("overlay");
        } else if (this.value === "Owner Occupied Home (No Mortgage)") {
            $("#cartItem5, #cartItem6").addClass("overlay");
            $("#cartItem7").removeClass("overlay");
        } else if (this.value === "Rental Accommodation") {
            $("#cartItem6").addClass("overlay");
            $("#cartItem5, #cartItem7").removeClass("overlay");
        } else if (this.value === "Insurance-Yes") {
            $("#cartItem9").removeClass("overlay");
        } else if (this.value === "Insurance-No") {
            $("#cartItem9").addClass("overlay");
        } else if (this.value === "Car-Yes") {
            $("#cartItem10").removeClass("overlay");
        } else if (this.value === "Car-No") {
            $("#cartItem10").addClass("overlay");
        } else if (this.value === "Smoker-Yes") {
            $("#cartItem3").removeClass("overlay");
        } else if (this.value === "Smoker-No") {
            $("#cartItem3").addClass("overlay");
        } else if (this.value === "Drinker-Yes") {
            $("#cartItem2").removeClass("overlay");
        } else if (this.value === "Drinker-No") {
            $("#cartItem2").addClass("overlay");
        }
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
        return Math.round(calculatedWeights[index] / 50);
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
        console.log(obj)
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
    $("input[type=radio]").change(autoAdjust);

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
    }



    Highcharts.chart('container', {

        title: {
            text: 'Personal Inflation 2012'
        },

        yAxis: {
            title: {
                text: 'Percentage'
            }
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
                },
                pointStart: 2012
            }
        },

        series: [{
            name: 'Inflation',
            data: [-0.888, -0.332, -0.212, -0.003, 0.333, 0.400, 0.545, 0.662, 0.878, 0.929, 0.862, 0.888]
        }, {
            name: 'Personal Inflation',
            data: [-0.788, -0.232, -0.112, -0.103, 0.233, 0.300, 0.645, 0.762, 0.778, 0.829, 0.762, 0.788]
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

  

});