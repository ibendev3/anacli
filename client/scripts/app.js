'use strict';


/**
 * @ngdoc Module
 * @name ngAnaloc
 * @description
 * Analoc Client main module creation. The application is declared and dependencies(3rd part libs) are injected
 * @Author Ben Diamant
 */

var ngAnaloc = angular.module('ngAnaloc', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'easypiechart', 'textAngular', 'ui.tree', 'analocCore', 'analocUsers']);

/**
 * @name Main configuration block
 * @method block is executed during the module bootstrap. only providers (angular's services) and constants can be injected.
 * @params Providers and constants
 *
 */
ngAnaloc.config(['$routeProvider', function ($routeProvider) {
    return $routeProvider.when('/', {
        redirectTo: '/signup'
    }).when('/signup', {
        templateUrl: 'views/users/signup.html'
    }).otherwise({
        redirectTo: '/signup'
    });

}
]);
