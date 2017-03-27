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
                        var path = obj.edges[j].path.nodes;
                        for (var k = path.length - 1; k >= 0; k--) {
                            if (angular.isUndefined(path[k].id)) {
                                path[k].id = 0;
                            }
                            if (angular.isUndefined(path[k].sort_order)) {
                                path[k].sort_order = 0;
                            }
                            if (angular.isUndefined(path[k].node.x)) {
                                path[k].node.x = 0;
                            }
                            if (angular.isUndefined(path[k].node.y)) {
                                path[k].node.y = 0;
                            }
                            if (angular.isUndefined(path[k].node.z)) {
                                path[k].node.z = 0;
                            }
                        }
                        // sort
                        path.sort(function (a, b) {
                            return a.sort_order - b.sort_order;
                        });
                        path = null;
                    }
                    for (var j = obj.side_edges.length - 1; j >= 0; j--) {
                        var side_edge = obj.side_edges[j];
                        if (angular.isUndefined(side_edge.id)) {
                            side_edge.id = 0;
                        }
                        if (angular.isUndefined(side_edge.clearing_from.location.x)) {
                            side_edge.clearing_from.location.x = 0;
                        }
                        if (angular.isUndefined(side_edge.clearing_from.location.y)) {
                            side_edge.clearing_from.location.y = 0;
                        }
                        if (angular.isUndefined(side_edge.clearing_from.location.z)) {
                            side_edge.clearing_from.location.z = 0;
                        }
                        if (angular.isUndefined(side_edge.side)) {
                            side_edge.side = 0;
                        }
                        for (var k = side_edge.path.nodes.length - 1; k >= 0; k--) {
                            var node = side_edge.path.nodes[k];
                            if (angular.isUndefined(node.sort_order)) {
                                node.sort_order = 0;
                            }
                            if (angular.isUndefined(node.node.x)) {
                                node.node.x = 0;
                            }
                            if (angular.isUndefined(node.node.y)) {
                                node.node.y = 0;
                            }
                            if (angular.isUndefined(node.node.z)) {
                                node.node.z = 0;
                            }
                            node = null;
                        }
                        // sort
                        side_edge.path.nodes.sort(function (a, b) {
                            return a.sort_order - b.sort_order;
                        });
                        side_edge = null;
                    } 
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
                        terrain = null;
                    }
                    console.log(obj);
                    // keep a pristine copy of the graph, in case we need to start over
                    var pristine = new MagicRealmGraph(0);
                    var util = new HexSetupUtility();
                    var tile = util.loadHexTile(obj, pristine);
                    $scope.entities.push(tile);
                    obj = null;
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