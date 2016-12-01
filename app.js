var main = function () {
    "use strict";

    $("#lionAlert").hide();

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


        var day = currentDateTime.getDay();
        var daysofweek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];

        var today = daysofweek[day];
        $("#day").text(today);


    }, 500);


    function getLionAlerts() {
        //get the rss feed

        var rssURL = "http://www.getrave.com/rss/FHU/channel1";

        $.ajax({
            type: "GET",
            url: rssURL,
            dataType: "xml",
            error: function () {
                console.log("ERROR: Unable to load RSS feed. Check the URL and your connection status.");
            },
            success: function (xml) {

                var $items = $(xml).find("item");

                $items.each(function () {
                    // extract the alert title
                    var lionAlertTitle = $(this).find("title").text();
                    console.log(lionAlertTitle);

                    // extract the alert description 
                    var lionAlertDescription = $(this).find("description").text();
                    console.log(lionAlertDescription);

                    var lionAlertDateString = $(this).find("pubDate").text();

                    var lionAlertDate = Date(lionAlertDateString);

                    // display title and description on page
                    $("#lionAlert h1").html(lionAlertTitle);
                    $("#lionAlert h2").text(lionAlertDescription);

                    // show the alert 
                    $("#lionAlert").slideDown(1000);

                });

            }
        });

    }

    getLionAlerts();
}

$(document).ready(main);