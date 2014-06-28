'use strict';

/**
 * Signup controller - Focus on signup wizard scope handling
 *  @author Ben Diamant
 */
analocUsers.controller('signupCtrl', ['$scope', '$q', '$timeout', 'md5', 'analocUsersConsts', function ($scope, $q, $timeout, md5, analocUsersConsts) {

    $scope.countries = analocUsersConsts.countries;
    $scope.langs = analocUsersConsts.languages;
    $scope.hoursaday = analocUsersConsts.hoursaday;
    // For Development puposes
    $scope.analocSignup = {
        business: {
            name: "Analoc Co",
            address: {
//                country: 'Israel',
                city: md5.createHash(angular.lowercase("Admin@admin.com")),
                street: "Atidim 7",
                zip: 45000
            },
            opening: {
                from: '0',
                to: '0'
            }

        },
        lang: 'EN',
        user: {
            email: 'ben@analoc.com',
            password: '123456'
        }
    };

//    $scope.business = {
//        lang: 'EN'
//    };

    $scope.saveState = function () {
        var deferred = $q.defer();

        $timeout(function () {
            deferred.resolve();
        }, 1000);

        return deferred.promise;
    };

    $scope.completeWizard = function () {
        alert('Completed!');
    }
}]);


