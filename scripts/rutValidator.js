"use strict";

let RutValidator = (function () {
    let validate = function (value) {
        return validateRut(value);
    }
    let validateRut = function (string) {
        let formattedRUT = parseRUT(string);
        if (formattedRUT === null) {
            return false;
        };
        let [body,
            verificatorDigit] = formattedRUT;
        if (!validVerificatorDigit(verificatorDigit)) {
            return false;
        };
        let realVerificatorDigit = calculateVerificatorDigit(body);
        if (verificatorDigit != realVerificatorDigit) {
            return false;
        };
        return true;
    };

    let parseRUT = function (rawRUT) {
        if (!(/^[0-9]{1,3}(?:.?[0-9]{3})*\-{1}[0-9kK]{1}$/.test(rawRUT))) {
            return null;
        };
        let body = getCleanValue(rawRUT.slice(0, -2))
        let verificatorDigit = rawRUT
            .slice(-1)
            .toUpperCase();
        return [body, verificatorDigit];
    };

    let validVerificatorDigit = function (verificatorDigit) {
        if (!(/^[0-9kK]{1}$/ig.test(verificatorDigit))) {
            return false;
        };
        return true;
    };

    let calculateVerificatorDigit = function (RUTBody) {
        let sum = 0,
            mult = 2,
            result = 0,
            len = RUTBody.length;
        for (let i = 1; i <= len; i++) {
            result = mult * parseInt(RUTBody.charAt(len - i));
            sum += result;
            if (mult < 7) {
                mult += 1;
            } else {
                mult = 2;
            };
        };
        let dv = 11 - (sum % 11);
        if (dv == 11) {
            return "0"
        };
        if (dv == 10) {
            return "K"
        };
        return dv.toString();
    };

    function getCleanValue(value) {
        return value
            .replace(/\./g, "")
            .replace(/\-/g, "");
    }
    return {validate}
})();
