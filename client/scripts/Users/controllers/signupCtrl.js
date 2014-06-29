'use strict';

/**
 * Signup controller - Focus on signup wizard scope handling
 *  @author Ben Diamant
 */
analocUsers.controller('signupCtrl', ['$scope', '$q', '$timeout', '$upload', 'md5', 'analocUsersConsts', function ($scope, $q, $timeout, $upload, md5, analocUsersConsts) {

    $scope.countries = analocUsersConsts.countries;
    $scope.langs = analocUsersConsts.languages;
    $scope.hoursaday = analocUsersConsts.hoursaday;
    $scope.reports_s = analocUsersConsts.reportsSchedules;
    // For Development

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
    $scope.onFileSelect = function ($files) {
        //$files: an array of files selected, each file has name, size, and type.
        for (var i = 0; i < $files.length; i++) {
            var file = $files[i];
            $scope.upload = $upload.upload({
                url: 'http://localhost/client/upload_company_thumb', //upload.php script, node.js route, or servlet url
                method: 'POST',
                // headers: {'header-key': 'header-value'}, (Example for adding headers)
                // withCredentials: true, ?
                //data: {myObj: $scope.myModelObj}, (Example of add form data)
                file: file,
                fileFormDataName: 'logo_img'
            }).progress(function (evt) {
                //console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                $scope.loaderimg = '/images/ajax_loader.gif';
            }).success(function (data, status, headers, config) {
                // file is uploaded successfully
                angular.element('.loader_image').remove();

                $scope.logo_image = 'http://7e90426b4681c947d0cd-68e4c69d5aca1d8809a2cc8fbdcf76be.r66.cf1.rackcdn.com/' + data.filename;
            });
            //.error(...)
            //.then(success, error, progress);
            //.xhr(function(xhr){xhr.upload.addEventListener(...)})// access and attach any event listener to XMLHttpRequest.
        }
    }
}]);


