angular.module('app.controllers', [])
  
.controller('inventarioCtrl', function($scope, Database) {

    $scope.getItem = function (searchString, barcodeBool) {

        if (barcodeBool) {
            Database.getItemFromBarcode(searchString).success(function () {
                $scope.items = Database.itemList;
            });
        }
    };
});
 