var nodeListToArray = function (nodeList) {
    var arrayToReturn = []; 
    for (var index in nodeList) {
        if (nodeList.hasOwnProperty(index)) {
            arrayToReturn.push(nodeList[index]);
        }
    }
    return arrayToReturn;
}

var validationNS = validationNS || {};
validationNS.verifyIsNumber = function (number) {
    var pattern = /\d+/;
    if (pattern.test(number)) {
        return true;
    } else {
        return false;
    }
}
validationNS.verifyDate = function (inputDate, mode) {
    var dateInfo = {
        isFutureDate: false,
        isDate: false,
        isToday: false
    };
    var desiredData = validationNS.createDate(inputDate, mode);
    var today = new Date();
    if (desiredData) {
        dateInfo.isDate = true;
        if (desiredData.toDateString() === today.toDateString()) {
            dateInfo.isFutureDate = true;
        } else if (desiredData < today) {
            dateInfo.isToday = true;
        }
    }
    return dateInfo;
}
validationNS.createDate = function (inputDate, mode) {
    var returnDate;
    var pattern;
    var day, month, year, result;
    if (mode === 'br') {
        pattern = /([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0]?[1-9]|[1][0-2])[./-]([2][0-9]{3})/g;
        result = pattern.exec(inputDate);
        day = RegExp.$1;
        month = RegExp.$2;
        year = RegExp.$3;
    } else if (mode === 'us') {
        pattern = /([0]?[1-9]|[1][0-2])[./-]([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([2][0-9]{3})/g;
        result = pattern.exec(inputDate);
        day = RegExp.$2;
        month = RegExp.$1;
        year = RegExp.$3;
    } else {
        pattern = /([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0]?[1-9]|[1][0-2])[./-]([2][0-9]{3})/g;
        result = pattern.exec(inputDate);
        day = RegExp.$1;
        month = RegExp.$2;
        year = RegExp.$3;
    }
    if (result) {
        returnDate = new Date(month+'-'+day+'-'+year);
    }
    return returnDate;
}
validationNS.verifyIsPhonenumber = function (phoneNumber) {
    var result;
    var pattern = /\((\d{3})\)\s*(\d{4}(?:-|\s*)\d{4})/;
    if (pattern.test(phoneNumber)) {
        result = phoneNumber.match(pattern);
    }
    return result;
}
validationNS.verifyReachByPhone = function (phoneNumber) {
    try {
        var phoneValid = validationNS.verifyIsPhonenumber(phoneNumber);
        if (phoneValid) {
            var area = phoneValid[1];
            if (parseInt(area) > 40) {
                throw new ERRORNS.OutOfReachException();
            }
        } else {
            throw new ERRORNS.InvalidPhoneException();
        }
    } catch (e) {
        return e;
    }
}
var ERRORNS = (function () {
    var formError = function (message, id, businessRule) {
        this.message = message;
        this.id = id;
        this.businessRule = businessRule;
    }
    var invalidPhoneException = function () {
        var message = 'Invalid phone';
        formError.call(this, message, 1, false);
    }
    var outOfReachException = function () {
        var message = 'This are is out of our delivery reach';
        formError.call(this, message, 2, true);
        this.businessRule = true;
    }
    return { InvalidPhoneException: invalidPhoneException, OutOfReachException: outOfReachException };
})();
