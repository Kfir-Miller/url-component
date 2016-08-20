app.service("validationService", [function validationService() {
        var validate = {};

        validate.isNumber = function (val) {
            return typeof val === "number";
        };

        validate.isNumeric = function (val) {
            return !isNaN(parseFloat(val));
        };

        validate.isEmptyObject = function (val) {
            for (var name in val) {
                return false;
            }
            return true;
        };

        validate.isEmptyString = function (val) {
            return val === "";
        };

        validate.isObject = function (val) {
            return (!!val) && (val.constructor === Object);
        };

        validate.isString = function (val) {
            return typeof val === "string";
        };

        validate.isUndefined = function (val) {
            if (typeof val === "undefined") {
                return true;
            }
            return false;
        };

        validate.isEmpty = function (val) {
            if (validate.isUndefined(val) || val === null) {
                return true;
            }

            if (typeof val === "boolean" || typeof val === "number") {
                return false;
            }

            if (typeof val === "string" && validate.isEmptyString(val)) {
                return true;
            }

            if (typeof val === "object" && validate.isEmptyObject(val)) {
                return true;
            }

            return false;
        };

        return validate;
    }]);