'use strict';

define(['moment'], function (moment) {
    var DateTimeUtilityService = function () {
        this.getTwelveHoursTime = function (time) {
            var twelveHoursTime = moment(time).format('hh:mm a');
            return twelveHoursTime;
        };
        this.getDateFromDateTime = function (dateTime) {
            var date = moment(dateTime).format('YYYY-MM-DD');
            return date;
        };
        this.getLocalDateTime = function (dateTime) {
            var date = moment(dateTime).format("YYYY-MM-DDTHH:mm:ss.SSSSZ")
            return date;
        };
        this.getUtcTime = function (date, time) {
            date = moment(date).format('YYYY-MM-DD');
            time = moment(time, ["h:mm A"]).format("HH:mm:ss");
            var utcTime = moment(date + " " + time).utc().format('HH:mm');
            return utcTime;
        };
        this.getUtcDate = function (date) {
            var utcDate = moment(date).utc().format();
            return utcDate;
        };
        this.momentTime = function (time) {
            var m_time = moment(time, 'hh:mm a');
            return m_time;
        };
        this.timeDiffInSecond = function (s_time, e_time) {
            var duration = e_time.diff(s_time);
            return duration;
        };

        this.timeDiffInMin = function (s_time, e_time) {
            var duration = moment.duration(e_time.diff(s_time));
            return duration.minutes();
        };
        this.getDateFormat = function (dateString) {
            var dateObj = {};
            var moment_date = moment(dateString);
            dateObj.year = moment_date.format('YYYY');
            dateObj.month = moment_date.format('M');
            dateObj.day = moment_date.format('D');
            return dateObj;
        };

        this.getDayOfDate = function (date) {
            return moment(date).day();
        };

        this.getLocalDateToUtcString = function (utcDateTime) {
            var localDate = moment(utcDateTime).format('YYYY-MM-DD');
            return localDate;
        };

        this.getLocalTimeToUtcString = function (utcDateTime) {
            var localTime = moment(utcDateTime).format('hh:mm a');
            return localTime;
        };

        //time will be 9:30am or 12:30pm
        this.getDateFromTime = function (time) {
            var dt = new Date();

            var timeSplit = time.split(":");
            var hours = _.first(timeSplit);
            var minutesSplit = timeSplit[1];
            var minutes = minutesSplit.substring(0, 2);
            var amIndex = minutesSplit.indexOf("am");
            if (amIndex === -1) {
                amIndex = minutesSplit.indexOf("AM");
            }
            var date;
            if (amIndex !== -1) {
                date = new Date(dt.getFullYear(), dt.getMonth(), dt.getDay(), hours, minutes, 0);
            } else if (hours == 12) {
                date = new Date(dt.getFullYear(), dt.getMonth(), dt.getDay(), hours, minutes, 0);
            } else {
                var pmHours = parseInt(hours, 10) + 12;
                date = new Date(dt.getFullYear(), dt.getMonth(), dt.getDay(), pmHours, minutes, 0);
            }
            return date;
        };

        this.getLocalTime = function (utcDateTime) {
            return moment(utcDateTime).format('LT');
        };

        this.getDurationInMinutes = function (startTime, endTime) {
            var startDate = this.getDateFromTime(startTime);
            var endDate = this.getDateFromTime(endTime);
            var difference = endDate.getTime() - startDate.getTime(); // This will give difference in milliseconds
            return Math.round(difference / 60000);
        };

        this.getYesterdaysDate = function () {
            return moment().add(-1, 'days');
        };

        this.getUpdateTime = function (oldTime, duration) { //duration in mintue and add in old time for get new time
            var momentTime = moment(oldTime, ['hh:mm a']).format("HH:mm");
            momentTime = moment(momentTime, "HH:mm").toDate();
            var momentDateTime = moment(momentTime).add(duration, 'm').format();
            var updateTime = moment(momentDateTime).format('hh:mm a');
            return updateTime;
        };

        //validate the months
        this.daysInMonth = function daysInMonth(m) { // m is 1 indexed: 1-12
            return new Date(new Date().getFullYear(), m, 0).getDate();
        };

        this.getWeekStartDate = function (currentDateTime) {
            var weekStartFromSunday = 0;
            return moment(currentDateTime).isoWeekday(weekStartFromSunday);
        };

        this.getWeekEndDate = function (currentDateTime) {
            var weekEndToSaturday = 6;
            return moment(currentDateTime).isoWeekday(weekEndToSaturday);
        };

        this.getLastWeekDate = function () {
            return moment().add(-7, 'days');
        };

        this.getLastMonthDate = function () {
            return moment().add(-1, 'month');
        };

        this.getNextPreviousDateOfCurrentDate = function (currentDateTime, number, duration) {
            //duration could be seconds/min/hours/day/month/year
            return moment(currentDateTime).add(number, duration);
        };

        this.getDateObjectFromDate = function (date) {
            var date = moment(date).format('YYYY-MM-DD');
            return moment(date);
        };

    };
    return [DateTimeUtilityService];
});