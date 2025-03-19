angular.module('calendarApp', [])
.controller('CalendarController', function($scope) {
    const currentDate = new Date();
    
    $scope.monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];

    $scope.daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    $scope.month = currentDate.getMonth();
    $scope.year = currentDate.getFullYear();
    $scope.monthName = $scope.monthNames[$scope.month];

    // Load events from localStorage
    $scope.loadEvents = function() {
        let storedEvents = localStorage.getItem('calendarEvents');
        if (storedEvents) {
            $scope.events = JSON.parse(storedEvents);
        } else {
            $scope.events = {};
        }
    };

    $scope.saveEvents = function() {
        localStorage.setItem('calendarEvents', JSON.stringify($scope.events));
    };

    // Generate the calendar for the current month
    $scope.generateCalendar = function() {
        let firstDayOfMonth = new Date($scope.year, $scope.month, 1);
        let lastDateOfMonth = new Date($scope.year, $scope.month + 1, 0);
        let lastDayOfMonth = lastDateOfMonth.getDate();
        let firstDayOfWeek = firstDayOfMonth.getDay();

        // Generate dates for the calendar grid
        $scope.dates = [];
        let day = 1;
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDayOfWeek) {
                    $scope.dates.push({});
                } else if (day <= lastDayOfMonth) {
                    let dateObj = {
                        day: day,
                        month: $scope.month + 1,
                        year: $scope.year,
                        events: $scope.events[`${$scope.year}-${$scope.month + 1}-${day}`] || []
                    };
                    $scope.dates.push(dateObj);
                    day++;
                }
            }
        }
    };

    // Select a date to add an event
    $scope.selectDate = function(date) {
        if (date.day) {
            $scope.selectedDate = date;
        }
    };

    // Add an event to the selected date
    $scope.addEvent = function() {
        if ($scope.selectedDate && $scope.newEvent) {
            let eventKey = `${$scope.selectedDate.year}-${$scope.selectedDate.month}-${$scope.selectedDate.day}`;
            if (!$scope.events[eventKey]) {
                $scope.events[eventKey] = [];
            }
            $scope.events[eventKey].push($scope.newEvent);
            $scope.newEvent = '';
            $scope.saveEvents();
            $scope.generateCalendar();
        }
    };

    // Handle month navigation
    $scope.prevMonth = function() {
        if ($scope.month === 0) {
            $scope.month = 11;
            $scope.year--;
        } else {
            $scope.month--;
        }
        $scope.monthName = $scope.monthNames[$scope.month];
        $scope.generateCalendar();
    };

    $scope.nextMonth = function() {
        if ($scope.month === 11) {
            $scope.month = 0;
            $scope.year++;
        } else {
            $scope.month++;
        }
        $scope.monthName = $scope.monthNames[$scope.month];
        $scope.generateCalendar();
    };

    // Initialize
    $scope.loadEvents();
    $scope.generateCalendar();
});
