/*jshint multistr: true */
/* jshint node: true */
"use strict";

// scope syntax, not controller-as
angular.module('restApp').controller('TileController', function($scope, $window, $sce, tileService, $q, $http) {
    $scope.missileFilter = function(item) {
    	var is = false;
        if (item.attack_method.name === "Missile") {
            is = true;
        }
        return is;
    };
    $scope.meleeFilter = function(item) {
    	var is = false;
        if (item.attack_method.name === "Striking"
        		&& angular.isUndefined(item.groups)) {
            is = true;
        }
        return is;
    };
    $scope.magicFilter = function(item) {
    	var is = false;
        if (!angular.isUndefined(item.groups)) {
            is = true;
        }
        return is;
    };
    var getAllEntities = function() {        
        var promise = tileService.getEntities();
        promise.then(function(response) {
            if (response.status === 200) {
                $scope.entities = [];
                var physicalGrid = new HexCoordinateSystem(HexCoordinateSystem.EVEN_Q);
                var nextWorldId = 0, nextPhysicalId = 0;
                for (var i = response.data.length - 1; i >= 0; i--) {
                    var hex = new CompoundHexagon(nextWorldId++);
                	var obj = response.data[i];
                    if (angular.isUndefined(obj.id)) {
                        obj.id = 0;
                    }
                    for (var i = obj.terrain.length - 1; i >= 0; i--) {
                    	var terrain = obj.terrain[i];
                    	if (angular.isUndefined(terrain.location.x)) {
                    		terrain.location.x = 0;
                    	}
                    	if (angular.isUndefined(terrain.location.y)) {
                    		terrain.location.y = 0;
                    	}
                    	if (angular.isUndefined(terrain.location.z)) {
                    		terrain.location.z = 0;
                    	}
                        var hexagon = new TerrainHexagon(nextPhysicalId++);
                        hexagon.setCoordinates(
                        		terrain.location.x, terrain.location.y, terrain.location.z);
                        hexagon.setTerrain(TerrainEnum[terrain.type.code]);
                        hex.addHex(hexagon);
                        physicalGrid.addHexagon(hexagon);
                        hexagon = null;
                    }
                    $scope.entities.push(hex);
                    obj = null;
                    hex = null;
                }
                console.log($scope.entities);
                $scope.tile_markup = $sce.trustAsHtml(physicalGrid.printView($scope.entities[0].getCenterHexagon()).replace(/\n/g,"<br>"));
                console.log(physicalGrid.printView($scope.entities[0].getCenterHexagon()));
            }
        });
    };
    getAllEntities();
});