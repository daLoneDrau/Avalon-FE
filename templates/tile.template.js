/* jshint multistr: true */
/* jshint node: true */
"use strict";

angular.module('restApp').run(function($templateCache) {
    var multiStr = ' \
    <basic-nav></basic-nav> \
    <div class="col-sm-9"> \
	    <div class="col-sm-12"> \
        <div class="form-group"> <!-- Select Entity --> \
            <label for="selEntity" class="control-label col-sm-4">Select a tile to view:</label> \
            <div class="col-sm-8"> \
                <select class="form-control" name="selEntity" id="selEntity" \
                    ng-model="entitySelect" ng-options="entity as entity.name | uppercase for entity in entities track by entity.id" \
                    ng-change="showTile()"> \
                    <option value="">---Please select---</option> <!-- not selected / blank option --> \
                </select> \
            </div> \
            <div class="col-sm-12"> \
                <button type="button" class="btn btn-default" \
                    ng-disabled="entitySelect==null" \
                    ng-click="rotateTile()">Rotate</button> \
                <button type="button" class="btn btn-default" ng-disabled="entitySelect==null">Enchant</button> \
            </div> \
        </div> \
        <div class="tile_space" ng-bind-html="tile_markup"></div> \
    </div> \
    ';
    $templateCache.put('tiles', multiStr);
});