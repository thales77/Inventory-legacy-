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
                fasciaSconto:3,
                user: 'Inventory'
            }
        }).success(function (data) {
                //merge the data into the inventory array
                o.inventoryList.unshift(data);
        });
    };


    o.getItemFromSearchString = function (searchString) {

        //reset
        o.searchList = [];

        //options required by server API to return results
        var itemSearchOptions = JSON.stringify(['descrizione', 'codiceSider', 'codiceForn']),
            listOffset = 0,
            perPage = 30;

        return $http({
            method: 'GET',
            url: SERVER.url + '/',
            params: {action : 'searchItem',
                searchTerm : searchString,
                fasciaSconto : 3,
                itemSearchOptions : itemSearchOptions,
                perPage: perPage,
                listOffset: listOffset,
                user: 'Inventory'
            }
        }).success(function (data) {
            //merge the data into the queue
            if(data.record) {
                o.searchList = data.record;
            }
        });
    };

    o.selectItem = function (index) {
        //merge the data into the inventory array
        o.inventoryList.unshift(o.searchList[index]);
    };

    o.removeItemFromInventory = function (item, index) {
        // make sure there's an item to remove
        if (!item) return false;

        // remove from inventory
        o.inventoryList.splice(index, 1);
    };

    o.saveInventoryToServer = function (inventory) {
        //persist favorites to the server
        /*return $http.post(SERVER.url + '/inventory', {});*/
        //TODO
    };

    return o;
});

