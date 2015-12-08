angular.module('app.services', [])

.factory('Database', function($http, $q, SERVER) {

    var o = {
        inventoryList : [],
        searchList : []
    };


    o.getItemFromBarcode = function (barcode) {

        return $http({
            method: 'GET',
            url: SERVER.url + '/',
            params: {action:'getItemByBarcode',
                barcode:barcode,
                fasciaSconto:3
            }
        }).success(function (data) {
                //merge the data into the queue
                o.inventoryList.unshift(data);
        });
    };


    o.getItemFromSearchString = function () {
        //TODO
    };

    o.removeItemFromList = function (item, index) {
        // make sure there's an item to remove
        if (!item) return false;

        // add to favorites array
        o.itemList.splice(index, 1);
    };

    return o;
});

