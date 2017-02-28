/* jshint multistr: true */
/* jshint node: true */
"use strict";

angular.module('restApp').run(function($templateCache) {
    var multiStr = ' \
    <basic-nav></basic-nav> \
    <div class="col-sm-9"> \
	    <div class="col-sm-12"> \
	    	<table class="table"> \
    			<thead> \
		    	    <tr> \
	    				<th class="head">Name</th> \
			    	    <th class="head">Vulnerability</th> \
	    				<th colspan=2 class="text-center">Light Side</th> \
						<th colspan=2 class="text-center">Dark Side</th> \
					    <th class="head text-center">Length</th> \
					    <th class="head text-center">Weapon</th> \
						<th colspan=2 class="text-center">Bounty</th> \
						<th class="head text-center">Notes</th> \
		    	    </tr> \
				    <tr> \
						<th class="sub"></th> \
					    <th class="sub"></th> \
					    <th class="sub text-center">Attack</th> \
					    <th class="sub text-center">Move</th> \
					    <th class="sub text-center">Attack</th> \
					    <th class="sub text-center">Move</th> \
					    <th class="sub"></th> \
    					<th class="sub"></th> \
					    <th class="sub text-center">Fame</th> \
					    <th class="sub text-center">Notoriety</th> \
					    <th class="sub"></th> \
				    </tr> \
	    	  	</thead> \
			  	<tbody> \
			    	<tr ng-repeat="entity in monsters | orderBy:[\'id\']"> \
        				<td ng-class="{section:$first, last:$last}">{{entity.name}}</td> \
				        <td ng-class="{section:$first, last:$last}"> \
							{{entity.vulnerability.harm_name}} \
							<span ng-if="isArmored(entity)"> & Armored</span> \
						</td> \
				        <td ng-class="{section:$first, last:$last}" class="text-center"> \
							<span ng-if="entity.unalerted_attack_weight.code != \'N\'"> \
    							{{entity.unalerted_attack_weight.code}}</span> \
							<span ng-if="entity.unalerted_attack_speed > 0">{{entity.unalerted_attack_speed}}</span> \
					    	<span ng-repeat="n in [].constructor(entity.unalerted_attack_stars) track by $index">*</span> \
    					</td> \
				        <td ng-class="{section:$first, last:$last}" class="text-center">{{entity.unalerted_move}}</td> \
				        <td ng-class="{section:$first, last:$last}" class="text-center"> \
							<span ng-if="entity.alerted_weight_class.code != \'N\'"> \
								{{entity.alerted_attack_weight.code}}</span> \
							<span ng-if="entity.alerted_attack_speed > 0">{{entity.alerted_attack_speed}}</span> \
					    	<span ng-repeat="n in [].constructor(entity.alerted_attack_stars) track by $index">*</span> \
						</td> \
					    <td ng-class="{section:$first, last:$last}" class="text-center">{{entity.alerted_move}}</td> \
				        <td ng-class="{section:$first, last:$last}" class="text-center"> \
    						<span ng-if="getWeaponLength(entity) > 0">{{getWeaponLength(entity)}}</span> \
    					</td> \
				        <td ng-class="{section:$first, last:$last}" class="text-center"> \
							<span ng-if="getWeaponType(entity).length > 0">{{getWeaponType(entity)}}</span> \
						</td> \
				        <td ng-class="{section:$first, last:$last}" class="text-center">{{entity.fame_bounty}}</td> \
        				<td ng-class="{section:$first, last:$last}" class="text-center">{{entity.notoriety}}</td> \
					    <td ng-class="{section:$first, last:$last}" class="text-center"> \
							<span ng-if="isFlier(entity)">flies</span> \
						</td> \
        			</tr> \
			  	</tbody> \
	  		</table> \
	    </div> \
    </div> \
    ';
    $templateCache.put('monsters', multiStr);
});