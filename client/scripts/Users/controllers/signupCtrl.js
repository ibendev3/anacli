'use strict';

/**
 * Signup controller - Focus on signup wizard scope handling
 *  @author Ben Diamant
 */
analocUsers.controller('signupCtrl', ['$scope', '$q', '$timeout', 'analocUsersConsts', function($scope, $q, $timeout, analocUsersConsts) {

    // For Development puposes
//    $scope.business = {
//        name: "Analoc Co",
//        address: {
//            city: "Tel Aviv",
//            street: "Atidim 7",
//            zip: 45000
//        }
//    };
    $scope.countries = analocUsersConsts.countries;
    $scope.langs = analocUsersConsts.languages;
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
