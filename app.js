var main = function () {
    "use strict";

    var useMilitaryTime = false;

    setInterval(function () {
        var currentDateTime = new Date();
        var hour = currentDateTime.getHours();
        var min = currentDateTime.getMinutes();

        if (hour >= 12) {
            var meridiem = "pm";
        } else {
            var meridiem = "am";
        }

        if (!useMilitaryTime) {
            if (hour > 12) {
                hour = hour - 12;
            }
        }

        $("#time").text(hour + ":" + min + meridiem);

    }, 500);
}

$(document).ready(main);