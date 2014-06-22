'use strict';

/**
 * Signup controller - Focus on signup wizard scope handling
 *  @author Ben Diamant
 */
analocUsers.controller('signupCtrl', ['$scope', '$q', '$timeout', function($scope, $q, $timeout) {

    //
    $scope.business = {};

    $scope.saveState = function() {
        var deferred = $q.defer();

        $timeout(function() {
            deferred.resolve();
        }, 5000);

        return deferred.promise;
    };

    $scope.completeWizard = function() {
        alert('Completed!');
    }
}]);
