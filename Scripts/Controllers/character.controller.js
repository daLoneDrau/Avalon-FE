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
                for (var i = 0, len = response.data.length; i < len; i++) {
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
                    var r = [];
                    for (var j = entity.stage_one_actions.length - 1; j >= 0; j--) {
                    	var o = entity.stage_one_actions[j].action;
                        if (!angular.isUndefined(o.fatigue_asterisk)) {
                        	o.fatigue = [];
                        	for (var k = o.fatigue_asterisk - 1; k >= 0; k--) {
                        		o.fatigue.push(k);
                        	}                	
                        }
                        for (var k = entity.stage_one_actions[j].quantity - 1; k >= 0; k--) {
                        	r.push(o);
                        }
                    }
                    entity.stage_one_actions = r;
                    r = [];
                    for (var j = entity.stage_two_actions.length - 1; j >= 0; j--) {
                    	var o = entity.stage_two_actions[j].action;
                        if (!angular.isUndefined(o.fatigue_asterisk)) {
                        	o.fatigue = [];
                        	for (var k = o.fatigue_asterisk - 1; k >= 0; k--) {
                        		o.fatigue.push(k);
                        	}                	
                        }
                        for (var k = entity.stage_two_actions[j].quantity - 1; k >= 0; k--) {
                        	r.push(o);
                        }
                    }
                    entity.stage_two_actions = r;
                    r = [];
                    for (var j = entity.stage_three_actions.length - 1; j >= 0; j--) {
                    	var o = entity.stage_three_actions[j].action;
                        if (!angular.isUndefined(o.fatigue_asterisk)) {
                        	o.fatigue = [];
                        	for (var k = o.fatigue_asterisk - 1; k >= 0; k--) {
                        		o.fatigue.push(k);
                        	}                	
                        }
                        for (var k = entity.stage_three_actions[j].quantity - 1; k >= 0; k--) {
                        	r.push(o);
                        }
                    }
                    entity.stage_three_actions = r;
                    r = [];
                    for (var j = entity.stage_four_actions.length - 1; j >= 0; j--) {
                    	var o = entity.stage_four_actions[j].action;
                        if (!angular.isUndefined(o.fatigue_asterisk)) {
                        	o.fatigue = [];
                        	for (var k = o.fatigue_asterisk - 1; k >= 0; k--) {
                        		o.fatigue.push(k);
                        	}                	
                        }
                        for (var k = entity.stage_four_actions[j].quantity - 1; k >= 0; k--) {
                        	r.push(o);
                        }
                    }
                    entity.stage_four_actions = r;
                    if (angular.isUndefined(entity.stage_one_spells)) {
                    	entity.stage_one_spells = 0;
                    }
                    if (angular.isUndefined(entity.stage_two_spells)) {
                    	entity.stage_two_spells = 0;
                    }
                    if (angular.isUndefined(entity.stage_three_spells)) {
                    	entity.stage_three_spells = 0;
                    }
                    if (angular.isUndefined(entity.stage_four_spells)) {
                    	entity.stage_four_spells = 0;
                    }
                    console.log(entity);
                	$scope.entities.push(entity);
                	entity = null;
                }
            }
        });
    };
    getAllEntities();
});