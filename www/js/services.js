angular.module('app.services', [])

.factory('Database', function($http, $q, SERVER) {

    var o = {
        itemList: []
    };

    o.getItemFromBarcode = function (barcode) {
        var item = {};

        return $http({
            method: 'GET',
            url: SERVER.url + '/',
            params: {action:'getItemByBarcode',
                barcode:barcode,
                fasciaSconto:3
            }
        }).success(function (data) {
            //merge the data into the queue
            item = data;
            o.itemList.push(item);
        });
    };

    return o;
});

