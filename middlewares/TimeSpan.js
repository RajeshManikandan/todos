var TimeSpan = function(milliseconds) {
    milliseconds = Math.abs(milliseconds);
    var days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
    milliseconds -= days * (1000 * 60 * 60 * 24);

    var hours = Math.floor(milliseconds / (1000 * 60 * 60));
    milliseconds -= hours * (1000 * 60 * 60);

    var mins = Math.floor(milliseconds / (1000 * 60));
    milliseconds -= mins * (1000 * 60);

    var seconds = Math.floor(milliseconds / 1000);
    milliseconds -= seconds * 1000;
    return {
        getDays: function() {
            return days;
        },
        getHours: function() {
            return hours;
        },
        getMinuts: function() {
            return mins;
        },
        getSeconds: function() {
            return seconds;
        },
        toJson: function() {
            var timestamp = {
                days: days,
                hours: hours,
                mins: mins,
                seconds: seconds
            };
            return timestamp;
        },
        toMilliseconds: function(json) {
            var milliseconds =
                json.days * (1000 * 60 * 60 * 24) +
                json.hours * (1000 * 60 * 60) +
                json.mins * (1000 * 60) +
                json.seconds * 1000;
            return milliseconds;
        }
    };
};
module.exports = TimeSpan;
