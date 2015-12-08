angular.module('app.controllers', [])
  
.controller('inventarioCtrl', function($scope, Database, $ionicModal, $ionicLoading, $ionicPopup) {

    // helper functions for loading
    var showLoading = function () {
        $ionicLoading.show({
            template: '<i class="ion-loading-b"></i>',
            noBackdrop: true
        });
    };

    var hideLoading = function () {
        $ionicLoading.hide();
    };

    $scope.form = {barcodeToggle : true, searchString : ''};

    //Create and load in the modal
    $ionicModal.fromTemplateUrl('templates/quantity.html', function(modal) {
        $scope.qtyModal = modal;
    }, {
        scope: $scope,
        animation: 'slide-in-up',
        focusFirstInput: true
    });

    $scope.getItem = function (searchString, barcodeBool) {

        showLoading();
        $scope.form.searchString = '';

        if(searchString !== "") {
            // if we are looking for an item using a barcode
            if (barcodeBool) {
                Database.getItemFromBarcode(searchString).then(
                    //on success
                    function () {
                        hideLoading();
                        $scope.qtyModal.show();
                },
                    //on error
                    function (){
                        hideLoading();
                        $ionicPopup.alert({
                            title: 'Errore',
                            template: 'Articolo non trovato'
                        });

                });
                // else looking for item with normal search string
            } else {
                Database.getItemFromBarcode(searchString).then(
                    //on success
                    function () {
                        //TODO
                        //popup itemList modal
                        hideLoading();
                    },
                    //on error
                    function (){
                        hideLoading();
                        $ionicPopup.alert({
                            title: 'Errore',
                            template: 'Articolo non trovato'
                        });

                    });
            }
        }
    };

    $scope.ModifyQty = function (index) {
        //modify item in list
        $scope.form.quantity = $scope.inventory[index].qty;

        //save the index value in the scope (is this the right way to do this?)
        $scope.index = index;

        $scope.qtyModal.show();
    };

    $scope.removeItem = function (item, index) {

        $ionicPopup.confirm({title: 'Cancella',
            template: 'Cancellare l\'articolo?'
        }).then(function(res) {
            if(res) {
                //remove item from list
                Database.removeItemFromList(item, index);
            }
        });
    };

    $scope.cancelQtyModal = function () {
        $scope.qtyModal.hide();
    };

    $scope.insertItemToInventory = function (index) {

        if(index) {
            //just updating
            $scope.inventory[index].qty = $scope.form.quantity;
        } else {
            //new item from server populate the item scope with data
            $scope.inventory = Database.inventoryList;

            $scope.inventory[0].qty = $scope.form.quantity;
        }

        //reset the quantity
        $scope.form.quantity = '';

        //reset the saved value for index
        $scope.index = null;

        $scope.qtyModal.hide();

    };


});
 