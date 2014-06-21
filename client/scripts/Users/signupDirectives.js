'use strict';

ngAnaloc.directive('uiWizardForm', [
    function () {
        return {
            link: function (scope, ele) {
                return ele.steps();
            }
        };
    }
]);