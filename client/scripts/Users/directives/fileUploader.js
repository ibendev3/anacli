
analocUsers.directive('uiFileUpload', [
    function () {
        return {
            restrict: 'A',
            link: function (scope, ele) {
                return ele.bootstrapFileInput();
            }
        };
    }
])