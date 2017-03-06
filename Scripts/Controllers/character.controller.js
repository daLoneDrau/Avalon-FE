/*jshint multistr: true */
/* jshint node: true */
"use strict";

// scope syntax, not controller-as
angular.module('restApp').controller('CharacterController',
		function($scope, $window, characterService, itemService, $q, $http) {
	$scope.getWeaponType = function(entity) {
    	var t = "";
        if (!angular.isUndefined(entity)) {
            if (!angular.isUndefined(entity.natural_weapon_type)) {
            	t = entity.natural_weapon_type.name;
            } else if (!angular.isUndefined(entity.equipped_items)
            		&& !angular.isUndefined(entity.equipped_items.EQUIP_SLOT_WEAPON)) {
            	t = entity.equipped_items.EQUIP_SLOT_WEAPON.attack_method.name;
            }
        }
        return t;
    };
    var getItemEntity = function(native, slot, name) {       
        var promise = itemService.getEntityByName(name);
        promise.then(function(response) {
            if (response.status === 200) {
            	native.equipped_items[slot] = response.data[0];
            }
        });
    };
    var getAllEntities = function() {        
        var promise = characterService.getEntities();
        promise.then(function(response) {
            if (response.status === 200) {
                $scope.entities = [];
                for (var i = response.data.length - 1; i >= 0; i--) {
                	var entity = response.data[i];
                    if (angular.isUndefined(entity.id)) {
                    	entity.id = 0;
                    }
                    if (!angular.isUndefined(entity.stage_one_equipped_items)) {
                    	for (var slot in entity.stage_one_equipped_items) {
                    		(function(entity, slot) {
                    			itemService.getEntityByName(entity.stage_one_equipped_items[slot])
                    			.then(function(response) {
                        			if (response.status === 200) {
                        				entity.stage_one_equipped_items[slot] = response.data[0];
                        			}
                        		});
                    		})(entity, slot);
                    	}
                    }
                    if (!angular.isUndefined(entity.stage_two_equipped_items)) {
                    	for (var slot in entity.stage_two_equipped_items) {
                    		(function(entity, slot) {
                    			itemService.getEntityByName(entity.stage_two_equipped_items[slot])
                    			.then(function(response) {
                        			if (response.status === 200) {
                        				entity.stage_two_equipped_items[slot] = response.data[0];
                        			}
                        		});
                    		})(entity, slot);
                    	}
                    }
                    if (!angular.isUndefined(entity.stage_three_equipped_items)) {
                    	for (var slot in entity.stage_three_equipped_items) {
                    		(function(entity, slot) {
                    			itemService.getEntityByName(entity.stage_three_equipped_items[slot])
                    			.then(function(response) {
                        			if (response.status === 200) {
                        				entity.stage_three_equipped_items[slot] = response.data[0];
                        			}
                        		});
                    		})(entity, slot);
                    	}
                    }
                    if (!angular.isUndefined(entity.stage_four_equipped_items)) {
                    	for (var slot in entity.stage_four_equipped_items) {
                    		(function(entity, slot) {
                    			itemService.getEntityByName(entity.stage_four_equipped_items[slot])
                    			.then(function(response) {
                        			if (response.status === 200) {
                        				entity.stage_four_equipped_items[slot] = response.data[0];
                        			}
                        		});
                    		})(entity, slot);
                    	}
                    }
                    for (var j = entity.stage_one_actions.length - 1; j >= 0; j--) {
                        if (!angular.isUndefined(entity.stage_one_actions[j].fatigue_asterisk)) {
                        	entity.stage_one_actions[j].fatigue = [];
                        	for (var k = entity.stage_one_actions[j].fatigue_asterisk - 1; k >= 0; k--) {
                        		entity.stage_one_actions[j].fatigue.push(k);
                        	}                	
                        }
                    }
                    for (var j = entity.stage_two_actions.length - 1; j >= 0; j--) {
                        if (!angular.isUndefined(entity.stage_two_actions[j].fatigue_asterisk)) {
                        	entity.stage_two_actions[j].fatigue = [];
                        	for (var k = entity.stage_two_actions[j].fatigue_asterisk - 1; k >= 0; k--) {
                        		entity.stage_two_actions[j].fatigue.push(k);
                        	}                	
                        }
                    }
                    for (var j = entity.stage_three_actions.length - 1; j >= 0; j--) {
                        if (!angular.isUndefined(entity.stage_three_actions[j].fatigue_asterisk)) {
                        	entity.stage_three_actions[j].fatigue = [];
                        	for (var k = entity.stage_three_actions[j].fatigue_asterisk - 1; k >= 0; k--) {
                        		entity.stage_three_actions[j].fatigue.push(k);
                        	}                	
                        }
                    }
                    for (var j = entity.stage_four_actions.length - 1; j >= 0; j--) {
                        if (!angular.isUndefined(entity.stage_four_actions[j].fatigue_asterisk)) {
                        	entity.stage_four_actions[j].fatigue = [];
                        	for (var k = entity.stage_four_actions[j].fatigue_asterisk - 1; k >= 0; k--) {
                        		entity.stage_four_actions[j].fatigue.push(k);
                        	}                	
                        }
                    }
                	$scope.entities.push(entity);
                	entity = null;
                }
            }
        });
    };
    getAllEntities();
});