'use strict';

/**
 * Signup controller - Focus on signup wizard scope handling
 *  @author Ben Diamant
 */
analocUsers.controller('signupCtrl', ['$scope', '$q', '$timeout', 'md5', 'analocUsersConsts', function ($scope, $q, $timeout, md5, analocUsersConsts) {

    $scope.countries = analocUsersConsts.countries;
    $scope.langs = analocUsersConsts.languages;
    $scope.hoursaday = analocUsersConsts.hoursaday;
    $scope.reports_s = analocUsersConsts.reportsSchedules;
    // For Development puposes
    $scope.analocSignup = {
        business: {
            name: "Analoc Co",
            address: {
                country: 'Israel',
                city: 'Tel Aviv',
                street: "Atidim 7",
                zip: 45000
            },
            opening: {
                from: '0',
                to: '0'
            }
        },
        lang: 'EN',
        report_s: 'NEVER',
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


