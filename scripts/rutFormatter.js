"use strict";

let RutFormatter = (function () {
    function enable(inputSelector) {
        let input = document.querySelector(inputSelector);
        input.setAttribute("pattern", "^[0-9]{1,3}(?:.?[0-9]{3})*\-{1}[0-9kK]{1}$");
        input.setAttribute("maxlength", "12");
        input.setAttribute("data-autoformat", "true");
        input.addEventListener("keydown", inputHandler);
        input.addEventListener("keyup", inputFormatter);
        console.log("Automatic RUT formatter enabled for " + inputSelector);
    }
    function disable(inputSelector) {
        let input = document.querySelector(inputSelector);
        input.removeAttribute("pattern");
        input.removeAttribute("maxlength");
        input.removeAttribute("data-autoformat");
        input.removeEventListener('keydown', inputHandler);
        input.removeEventListener('keyup', inputFormatter);
        console.log("Automatic RUT formatter disabled for " + inputSelector);
    }

    function inputHandler(e) {
        let charCode = charCodeFromEvent(e);
        // Allow: backspace, delete, tab, escape, enter
        let allowedKeys = [46, 8, 9, 27, 13];
        if (allowedKeys.includes(charCode) ||
        // Allow: Ctrl+A, Command+A
        (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: home, end, left, right, down, up
        (e.keyCode >= 35 && e.keyCode <= 40)) {
            return
        };
        // numpad numbers
        if (charCode >= 96 && charCode <= 105) {
            charCode -= 48
        };
        // reject characters other than 0-9 and k
        if ((charCode >= 48 && charCode <= 57) || charCode == 75) {
            return;
        };
        e.preventDefault();
        e.stopPropagation();
        return false;
    }

    function inputFormatter() {
        let inputObject = this;
        let cleanInput = cleanValue(inputObject);
        if (!hasEnoughDigits(cleanInput)) {
            inputObject.value = cleanInput;
            return;
        };
        let verificatorDigit = cleanInput.slice(-1);
        let body = cleanInput.slice(0, -1);
        let formattedBody = addThousandsSeparator(body);
        inputObject.value = formattedBody + "-" + verificatorDigit;
    }

    function charCodeFromEvent(e) {
        e = e || window.event;
        return e.keyCode || e.which;
    }

    function addThousandsSeparator(number, separator = ".") {
        return number
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    }

    function cleanValue(input) {
        let value = input.value;
        return value
            .replace(/\./g, "")
            .replace(/\-/g, "");
    }

    function hasEnoughDigits(rutInput) {
        return rutInput.length > 1;
    };

    return {enable, disable}
})();
