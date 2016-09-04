$(document).ready(function () {
   var firstName = document.getElementById('firstName');
    firstName.addEventListener('blur', function () {
        var name = this.value;
        if (name.length < 3 || name.length > 15) {
            this.value = '';
            this.placeholder = 'At least 3 and less than 15 letters';
        }
    });

    var lastName = document.getElementById('lastName');
    lastName.onfocus = function () {
        $(this).css('color', 'green');
    }
    lastName.onblur = function () {
        $(this).css('color', 'black');
    }

    var phoneNumber = document.getElementById('phoneNumber');
    phoneNumber.onblur = function () {
        var phoneError = validationNS.verifyReachByPhone(this.value);
        if (phoneError) {
            this.value = '';
            if (phoneError instanceof ERRORNS.OutOfReachException || phoneError instanceof ERRORNS.InvalidPhoneException) {
                this.placeholder = phoneError.message;
            } else {
                $(this).css('border', '1px solid red');
                this.placeholder = '';
            }
        }
       
    }

    var deliveryDate = $('#deliveryDate');
    deliveryDate.blur(function () {
        var dateInfo = validationNS.verifyDate($(this).val());
       
        if (dateInfo.isDate) {
            if (dateInfo.isFutureDate) {
                $(this).val('');
                this.placeholder = 'must be in the future.';
            }
        }
        else {
            $(this).val('');
            this.placeholder = 'type a valid date.';
        }
    });

    var addressNumber = $('#number');
    addressNumber.keypress(function(e) {
       return validationNS.verifyIsNumber(e.key);
    });

    // unnecessary trip wtinin the element, was done that way just to proof I can :)
    var zip = addressNumber.parent().siblings().eq(4).find('input');
    zip.blur(function () {
        var zipCode = $(this).val();
        if (zipCode.length !== 5 || !validationNS.verifyIsNumber(zipCode)) {
            $(this).val('');
            this.placeholder = 'invalid zip code number';
        }
    });
    var city = $('.box').find('#city');
    city.blur(function() {
        var name = $(this).val();
        if (name.length < 3 || name.length > 21) {
            $(this).val('');
            this.placeholder = 'At least 3 and less than 21 letters';
        }
    });
});