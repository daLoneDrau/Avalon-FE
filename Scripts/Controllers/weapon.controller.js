/*jshint multistr: true */
/* jshint node: true */
"use strict";

// scope syntax, not controller-as
angular.module('restApp').controller('WeaponController', function($scope, $window, itemService, $q, $http) {
    $scope.newEntity = {
    		title: "",
    		attack_method: {},
    		unalerted_weight_class: {},
    		unalerted_speed: 0,
    		unalerted_sharpness: 0,
    		alerted_weight_class: {},
    		alerted_speed: 0,
    		alerted_sharpness: 0,
	        weapon_length: 0,
	        price: 0
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
                    found = "An attribute with that name already exists";
                    break;
                }
                if ($scope.entities[i].description === $scope.entitySelect.description) {
                    found = "An attribute with that description already exists";
                    break;
                }
                if ($scope.entities[i].code === $scope.entitySelect.code) {
                    found = "An attribute with that code already exists";
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
                found = "An attribute with that name already exists";
                break;
            }
            if (entities[i].description === entity.description) {
                found = "An attribute with that description already exists";
                break;
            }
            if (entities[i].code === entity.code) {
                found = "An attribute with that code already exists";
                break;
            }
        }
        return found;
    };
    var getAllEntities = function() {        
        var promise = itemService.getEntities();
        promise.then(function(response) {
            console.log("GET::");
            console.log(response);
            if (response.status === 200) {
                $scope.entities = [];
                for (var i = response.data.length - 1; i >= 0; i--) {
                	var obj = response.data[i]
                    if (angular.isUndefined(obj.types)) {
                        continue;
                    }
                	var isWeapon = false;
                	for (var j = obj.types.length - 1; j >= 0; j--) {
                		if (obj.types[j].code === "OBJECT_TYPE_WEAPON") {
                			isWeapon = true;
                			break;
                		}
                	}
                	if (!isWeapon) {
                		continue;
                	}
                    if (angular.isUndefined(obj.id)) {
                        obj.id = 0;
                    }
                    if (angular.isUndefined(obj.unalerted_speed)) {
                        obj.unalerted_speed = 0;
                    }
                    if (angular.isUndefined(obj.unalerted_sharpness)) {
                        obj.unalerted_sharpness = 0;
                    }
                    if (angular.isUndefined(obj.alerted_speed)) {
                        obj.alerted_speed = 0;
                    }
                    if (angular.isUndefined(obj.alerted_sharpness)) {
                        obj.alerted_sharpness = 0;
                    }
                    $scope.entities.push(obj);
                    obj = null;
                }
            }
        });
    };
    /**
     * Posts an entity to the REST service.
     */
    var postEntity = function() {
        var promise = itemService.insertEntity($scope.newEntity);
        promise.then(function(response) {
            if (response.status === 200) {
                $scope.newEntity.name = "";
                $scope.newEntity.description = "";
                $scope.newEntity.code = "";
                getAllEntities();
            }
        });
    };
    var putEntity = function() {
        console.log("POST::");
        console.log($scope.entitySelect);
        var promise = itemService.updateEntity($scope.entitySelect);
            promise.then(function(response) {
            if (response.status === 200) {
                $scope.newEntity.name = "";
                $scope.newEntity.description = "";
                $scope.newEntity.code = "";
                getAllEntities();
            }
        });
    };
    getAllEntities();
});