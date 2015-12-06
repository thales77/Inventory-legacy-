angular.module('app.controllers', [])
  
.controller('inventarioCtrl', function($scope, Database) {

    $scope.form = {barcodeToggle : true, searchString : ''};

    $scope.getItem = function (searchString, barcodeBool) {

        $scope.form.searchString = '';

        if(searchString) {
            if (barcodeBool) {
                Database.getItemFromBarcode(searchString).success(function () {
                    //populate the scope with data
                    $scope.items = Database.itemList;
                    document.getElementById("searchField").focus();
                });
            } else {
                document.getElementById("searchField").focus();
                return;
            }
        }
    };

    $scope.removeItem = function (item, index) {
        //remove song from favorites
        Database.removeItemFromList(item, index);
    };
});
 