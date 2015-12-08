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
                //merge the data into the queue
                o.inventoryList.unshift(data);
        });
    };


    o.getItemFromSearchString = function (searchString) {

        //reset
        o.searchList = [];

        //options required by server API to return results
        var itemSearchOptions = JSON.stringify(['descrizione', 'codiceSider', 'codiceForn']),
            listOffset = 0,
            perPage = 20;

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
            o.searchList = data.record;
        });
    };

    o.removeItemFromInventory = function (item, index) {
        // make sure there's an item to remove
        if (!item) return false;

        // add to favorites array
        o.itemList.splice(index, 1);
    };

    return o;
});

