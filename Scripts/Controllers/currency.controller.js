/**
 * 
 */
"use strict";

// scope syntax, not controller-as
angular.module('restApp').controller('BasicCurrencyController',
		function($scope, $window, basicCurrencyService, $q, $http) {
    $scope.newEntity = {
            code: "",
            name: "",
            exchange_rates: {},
            sort_order: 0
    };
    $scope.create = function() {
        console.log($scope.newEntity);
        if ($scope.entities.length > 0) {
            var msg = findEntity($scope.newEntity, $scope.entities);
            if (msg.length > 0) {
                $window.alert(msg);
            } else {
                postEntity();
                postElementEntity($scope.newEntity.name);
            }
        } else {
            postEntity();
            postElementEntity($scope.newEntity.name);
        }
    };
    $scope.update = function() {
        var found = "";
        console.log("UPDATE::");
        console.log($scope.entitySelect);
        for (var i = $scope.entities.length - 1; i >= 0; i--) {
            if ($scope.entities[i].id != $scope.entitySelect.id) {
                if ($scope.entities[i].name === $scope.entitySelect.name) {
                    found = "A currency with that name already exists";
                    break;
                }
                if ($scope.entities[i].description === $scope.entitySelect.description) {
                    found = "A currency with that description already exists";
                    break;
                }
                if ($scope.entities[i].code === $scope.entitySelect.code) {
                    found = "A currency with that code already exists";
                    break;
                }
            }
        }
        if (found.length > 0) {
            $window.alert(found);
        } else {
            putEntity();
        }
    };
    var findEntity = function(entity, entities) {
        var found = '';
        for (var i = entities.length - 1; i >= 0; i--) {
            if (entities[i].name === entity.name) {
                found = "A currency with that name already exists";
                break;
            }
            if (entities[i].sort_order === entity.sort_order) {
                found = "A currency with that sort order already exists";
                break;
            }
            if (entities[i].code === entity.code) {
                found = "A currency with that code already exists";
                break;
            }
        }
        return found;
    };
    var getAllEntities = function() {        
        var promise = basicCurrencyService.getEntities();
        promise.then(function(response) {
            console.log("GET::");
            console.log(response);
            if (response.status === 200) {
                $scope.entities = response.data;
                for (var i = $scope.entities.length - 1; i >= 0; i--) {
                    if (angular.isUndefined($scope.entities[i].id)) {
                        $scope.entities[i].id = 0;
                        break;
                    }
                }
            }
        });
    };
    /**
     * Posts an entity to the REST service.
     */
    var postEntity = function() {
        var promise = basicCurrencyService.insertEntity($scope.newEntity);
        promise.then(function(response) {
            if (response.status === 200) {
                $scope.newEntity.name = "";
                $scope.newEntity.description = "";
                $scope.newEntity.code = "";
                getAllEntities();
            }
        });
    };
    var postElementEntity = function(name) {
        var s = [];
        s.push("ELEMENT_");
        s.push(name.toUpperCase().replace(/\./g, "").replace(/ /g, "_"));
        s = s.join("");
        console.log("NEW ELEMENT::"+s);
        var promise = basicElementService.getEntities();
        promise.then(function(response) {
            if (response.status === 200) {
                var elements = response.data;
                console.log("ELEMENT LIST");
                console.log(elements);
                var found = false;
                var lastValue = -1;
                for (var i = elements.length - 1; i >= 0; i--) {
                    if (elements[i].code === s) {
                        found = true;
                    }
                    if (angular.isUndefined(elements[i].value)) {
                        elements[i].value = 0;
                    }
                    lastValue = Math.max(lastValue, elements[i].value);
                }
                lastValue++;
                if (!found) {
                    console.log("POST ELEMENT::"+s+","+lastValue);
                    console.log(elements);
                    var elPromise = basicElementService.insertEntity({
                        code: s,
                        value: lastValue
                    });
                    elPromise.then(function(response) {
                        console.log("INSERT ELEMENT::");
                        console.log(response);
                        if (response.status === 200) {
                            $window.alert("Created associated element " + s);
                        } else {                            
                            $window.alert("Unable to create associated element see console for details");
                            console.error(response);
                        }
                    });
                }
            }
        });
        
    };
    var putEntity = function() {
        console.log("POST::");
        console.log($scope.entitySelect);
        var promise = basicCurrencyService.updateEntity($scope.entitySelect);
            promise.then(function(response) {
            if (response.status === 200) {
                $scope.newEntity.name = "";
                $scope.newEntity.description = "";
                $scope.newEntity.code = "";
                getAllEntities();
            }
        });
    };
    var getElementEntity = function(code) {        
        var promise = basicElementService.getByCode(code);
        promise.then(function(response) {
            console.log("GET::");
            console.log(response);
            if (response.status === 200) {
                $scope.associatedElement = response.data;
            }
        });
    };
    getAllEntities();
});