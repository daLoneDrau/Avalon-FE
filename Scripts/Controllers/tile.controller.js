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
                var nextWorldId = 0, nextPhysicalId = 0, nextVertexId = 0;
                for (var i = response.data.length - 1; i >= 0; i--) {
                	var obj = response.data[i];
                    if (angular.isUndefined(obj.id)) {
                        obj.id = 0;
                    }
                    for (var j = obj.clearings.length - 1; j >= 0; j--) {
                    	if (angular.isUndefined(obj.clearings[j].location.x)) {
                    		obj.clearings[j].location.x = 0;
                    	}
                    	if (angular.isUndefined(obj.clearings[j].location.y)) {
                    		obj.clearings[j].location.y = 0;
                    	}
                    	if (angular.isUndefined(obj.clearings[j].location.z)) {
                    		obj.clearings[j].location.z = 0;
                    	}
                    }
                    for (var j = obj.edges.length - 1; j >= 0; j--) {
                        var path = obj.edges[j].path;
                        for (var k = path.path.length - 1; k >= 0; k--) {
                            if (angular.isUndefined(path[k].id)) {
                                path[k].id = 0;
                            }
                            if (angular.isUndefined(path[k].x)) {
                                path[k].x = 0;
                            }
                            if (angular.isUndefined(path[k].y)) {
                                path[k].y = 0;
                            }
                            if (angular.isUndefined(path[k].z)) {
                                path[k].z = 0;
                            }
                        }
                        path = null;
                    }
                    var tile = new HexTile(nextWorldId++, obj.name, TileEnum[obj.type.code]);
                    // add clearings
                    for (var j = obj.clearings.length - 1; j >= 0; j--) {
                    	tile.addClearing(new TileClearing(
                    			obj.clearings[j].code,						// clearing name
                    			nextVertexId++,								// clearing id
                    			ClearingEnum[obj.clearings[j].type.code])); // clearing type
                    }
                    // add terrain
                    for (var j = obj.terrain.length - 1; j >= 0; j--) {
                    	var terrain = obj.terrain[j];
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
                        tile.addHex(hexagon);
                        physicalGrid.addHexagon(hexagon);
                        hexagon = null;
                        terrain = null;
                    }
                    // assign clearings to inner hexagons
                    for (var j = obj.clearings.length - 1; j >= 0; j--) {
                    	var hexagon = tile.getHexagon(
                    			obj.clearings[j].location.x, obj.clearings[j].location.y,
                    			obj.clearings[j].location.z);
                    	console.log("get clearing "
                    			+obj.clearings[j].location.x+","
                    			+obj.clearings[j].location.y+","
                    			+obj.clearings[j].location.z)
                    	console.log(tile.getClearing(obj.clearings[j].code))
                    	hexagon.setClearing(tile.getClearing(obj.clearings[j].code));
                    	hexagon = null;
                    	console.log(tile.getHexagon(
                    			obj.clearings[j].location.x, obj.clearings[j].location.y, obj.clearings[j].location.z)
                    			.getClearing().getType())
                    }                    
                    $scope.entities.push(tile);
                    obj = null;
                    tile = null;
                }
                console.log($scope.entities);
                $scope.tile_markup = $sce.trustAsHtml(physicalGrid.printView(
                		$scope.entities[0].getCenterHexagon()).replace(/\n/g,"<br>"));
                console.log(physicalGrid.printView($scope.entities[0].getCenterHexagon()));
            }
        });
    };
    getAllEntities();
});