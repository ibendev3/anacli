'use strict';

/**
 * Signup controller - Focus on signup wizard scope handling
 *  @author Ben Diamant
 */
ngAnaloc.controller('signupCtrl', ['$scope', function($scope) {
    $scope.test = 'test';

}]);
ngAnaloc.controller('wizardFormCtrl', [
    '$scope', function ($scope) {
        $scope.wizard = {
            firstName: 'some name',
            lastName: '',
            email: '',
            password: '',
            age: '',
            address: ''
        };
        $scope.isValidateStep1 = function () {
            console.log($scope.wizard_step1);
            console.log($scope.wizard.firstName !== '');
            console.log($scope.wizard.lastName === '');
            return console.log($scope.wizard.firstName !== '' && $scope.wizard.lastName !== '');
        };
        return $scope.finishedWizard = function () {
            return console.log('yoo');
        };
    }
]);