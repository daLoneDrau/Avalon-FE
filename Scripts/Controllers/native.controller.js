/*jshint multistr: true */
/* jshint node: true */
"use strict";

// scope syntax, not controller-as
angular.module('restApp').controller('NativeController',
		function($scope, $window, npcService, itemService, $q, $http) {
	function checkNative(group) {
		var is = false;
		if (group.name === "NATIVE") {
			is = true;
		}
		return is;
	}
	$scope.nativeFilter = function(npc) {
    	var is = false;
        if (!angular.isUndefined(npc.groups)) {
        	is = npc.groups.some(checkNative);
        }
        return is;
    };
	$scope.hasHorse = function(entity) {
    	var has = false;
        if (!angular.isUndefined(entity)
        		&& !angular.isUndefined(entity.inventory_items)) {
        	for (var i = entity.inventory_items.length - 1; i >= 0; i--) {
        		if (!angular.isUndefined(entity.inventory_items[i].horse_type)) {
        			has = true;
        			break;
        		}
        	}
        }
        return has;
    };
	$scope.getHorseTitle = function(entity) {
    	var t = "";
        if (!angular.isUndefined(entity)
        		&& !angular.isUndefined(entity.inventory_items)) {
        	for (var i = entity.inventory_items.length - 1; i >= 0; i--) {
        		if (!angular.isUndefined(entity.inventory_items[i].horse_type)) {
        			t = entity.inventory_items[i].title;
        			break;
        		}
        	}
        }
        return t;
    };
	$scope.getUnalertedHorseWeight = function(entity) {
    	var t = "";
        if (!angular.isUndefined(entity)
        		&& !angular.isUndefined(entity.inventory_items)) {
        	for (var i = entity.inventory_items.length - 1; i >= 0; i--) {
        		if (!angular.isUndefined(entity.inventory_items[i].horse_type)) {
        			t = entity.inventory_items[i].unalerted_weight_class.code;
        			break;
        		}
        	}
        }
        return t;
    };
	$scope.getUnalertedHorseSpeed = function(entity) {
    	var t = 0;
        if (!angular.isUndefined(entity)
        		&& !angular.isUndefined(entity.inventory_items)) {
        	for (var i = entity.inventory_items.length - 1; i >= 0; i--) {
        		if (!angular.isUndefined(entity.inventory_items[i].horse_type)) {
        			t = entity.inventory_items[i].unalerted_speed;
        			break;
        		}
        	}
        }
        return t;
    };
	$scope.getAlertedHorseWeight = function(entity) {
    	var t = "";
        if (!angular.isUndefined(entity)
        		&& !angular.isUndefined(entity.inventory_items)) {
        	for (var i = entity.inventory_items.length - 1; i >= 0; i--) {
        		if (!angular.isUndefined(entity.inventory_items[i].horse_type)) {
        			t = entity.inventory_items[i].alerted_weight_class.code;
        			break;
        		}
        	}
        }
        return t;
    };
	$scope.getAlertedHorseSpeed = function(entity) {
    	var t = 0;
        if (!angular.isUndefined(entity)
        		&& !angular.isUndefined(entity.inventory_items)) {
        	for (var i = entity.inventory_items.length - 1; i >= 0; i--) {
        		if (!angular.isUndefined(entity.inventory_items[i].horse_type)) {
        			t = entity.inventory_items[i].alerted_speed;
        			break;
        		}
        	}
        }
        return t;
    };
    var getItemEntity = function(native, slot, name) {       
        var promise = itemService.getEntityByName(name);
        promise.then(function(response) {
            console.log("GET::"+name);
            console.log(native);
            console.log(response);
            if (response.status === 200) {
            	native.equipped_items[slot] = response.data[0];
            }
        });
    };
    var getAllNativesByType = function() {        
        var promise = npcService.getEntities();
        promise.then(function(response) {
            console.log("GET::");
            console.log(response);
            if (response.status === 200) {
                $scope.types = [];
                var types = {};
                for (var i = response.data.length - 1; i >= 0; i--) {
                	var obj = response.data[i];
                    if (angular.isUndefined(obj.id)) {
                        obj.id = 0;
                    }
                    if (angular.isUndefined(obj.groups)) {
                         continue;
                    }
                    if (!obj.groups.some(checkNative)) {
                    	continue;
                    }
                    if (!angular.isUndefined(types[obj.title])) {
                        continue;
                    }
                    if (!angular.isUndefined(obj.equipped_items)) {
                        if (!angular.isUndefined(obj.equipped_items.EQUIP_SLOT_WEAPON)) {
                        	obj.equipped_items.EQUIP_SLOT_WEAPON =
                        		getItemEntity(obj, "EQUIP_SLOT_WEAPON",
                        				obj.equipped_items.EQUIP_SLOT_WEAPON);
                        }
                    }
                    types[obj.title] = obj;
                }
                console.log(types);
                for (var i in types) {
                	$scope.types.push(types[i]);
                }
            }
        });
    };
    var getAllNatives = function() {        
        var promise = npcService.getEntities();
        promise.then(function(response) {
            console.log("GET::");
            console.log(response);
            if (response.status === 200) {
                $scope.entities = [];
                for (var i = response.data.length - 1; i >= 0; i--) {
                	var obj = response.data[i];
                    if (angular.isUndefined(obj.groups)) {
                         continue;
                    }
                    if (!obj.groups.some(checkNative)) {
                    	continue;
                    }
                    if (angular.isUndefined(obj.id)) {
                        obj.id = 0;
                    }
                    if (!angular.isUndefined(obj.equipped_items)) {
                        if (!angular.isUndefined(obj.equipped_items.EQUIP_SLOT_WEAPON)) {
                        	obj.equipped_items.EQUIP_SLOT_WEAPON =
                        		getItemEntity(obj, "EQUIP_SLOT_WEAPON",
                        				obj.equipped_items.EQUIP_SLOT_WEAPON);
                        }
                    }
                	$scope.entities.push(obj);
                }
            }
        });
    };
    getAllNativesByType();
    getAllNatives();
});