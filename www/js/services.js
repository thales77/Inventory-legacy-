angular.module('app.services', [])

.factory('Database', function($http, $q, SERVER) {

    var o = {
        itemList : []
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

            if(data.codiceArticolo){
                //merge the data into the queue
                o.itemList.unshift(data);
            }

        });
    };

    o.removeItemFromList = function (item, index) {
        // make sure there's an item to remove
        if (!item) return false;

        // add to favorites array
        o.itemList.splice(index, 1);
    };

    return o;
});

