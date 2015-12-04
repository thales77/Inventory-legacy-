angular.module('app.controllers', [])
  
.controller('inventarioCtrl', function($scope, Database) {

    $scope.barcode = {checked: true};

    $scope.getItem = function (searchString, barcodeBool) {

        if(searchString) {
            if (barcodeBool) {
                Database.getItemFromBarcode(searchString).success(function () {
                    $scope.items = Database.itemList;
                    $scope.searchString = {value: ""};
                });
            } else {
                return;
            }
        }
    };

    $scope.removeItem = function (item, index) {
        //remove song from favorites
        Database.removeItemFromList(item, index);
    };
});
 