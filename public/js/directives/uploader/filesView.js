angular
    .module('Tracker')

    .directive('filesView', function () {
        return {
            restrict: 'A',
            templateUrl: 'js/directives/uploader/views/files-view.html',
            controller: function ($scope) {
                $scope.isImage = function (file) {
                    return /\.(jpg|png|gif|jpeg|bmp)$/.test(file);
                };
            },
            scope: {
                newTask: "=files"
            }
        }
    });