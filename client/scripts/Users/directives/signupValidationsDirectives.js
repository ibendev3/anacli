'use strict';

/**
 * Signup validations
 * @description The following directives are costumed validations to the signup wizard
 * @author Ben Diamant
 */

/**
 * @name validPasswordC
 * @description Validate repeat password input - check that repeated password match first one inserted
 * @author Ben Diamant
 */
analocUsers.directive('validPassword', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue, $scope) {
                scope.businessInfo.bPasswordR.$dirty = true;
            })
        }
    }
})
/**
 * @name validPasswordC
 * @description Validate repeat password input - check that repeated password match first one inserted
 * @author Ben Diamant
 */
analocUsers.directive('validPasswordRepeat', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            scope.$watch(attrs.ngModel, function(){

            });
            ctrl.$parsers.unshift(function (viewValue, $scope) {
                var noMatch = viewValue != scope.businessInfo.bPassword.$viewValue
                ctrl.$setValidity('noMatch', !noMatch)
            })
        }
    }
})