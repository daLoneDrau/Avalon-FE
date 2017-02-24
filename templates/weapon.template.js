/* jshint multistr: true */
/* jshint node: true */
"use strict";

angular.module('restApp').run(function($templateCache) {
    var multiStr = ' \
    <basic-nav></basic-nav> \
    <div class="col-sm-9"> \
	    <!------------------------------> \
	    <!-- Table of Current Entities --> \
	    <!------------------------------> \
	    <div class="col-sm-12"> \
	    	<table class="table"> \
    			<thead> \
		    	    <tr> \
	    				<th>Name</th> \
			    	    <th>Attack</th> \
			    	    <th>Unalerted</th> \
					    <th>Alerted</th> \
					    <th>Length</th> \
					    <th>Gold Price</th> \
		    	    </tr> \
	    	  	</thead> \
			  	<tbody> \
					<!-- ------------------------------ --> \
					<!-- MISSILE WEAPONS (NON-MAGICAL)  --> \
					<!-- ------------------------------ --> \
			    	<tr ng-repeat="entity in entities | filter: missileFilter | orderBy:[\'-weapon_length\',\'title\']"> \
				        <td>{{entity.name}}</td> \
				        <td>{{entity.attack_method.name}}</td> \
				        <td> \
    						<span ng-if="entity.unalerted_weight_class.code != \'N\'">{{entity.unalerted_weight_class.code}}</span> \
							<span ng-if="entity.unalerted_speed > 0">{{entity.unalerted_speed}}</span> \
					    	<span ng-repeat="n in [].constructor(entity.unalerted_sharpness) track by $index">*</span> \
    					</td> \
				        <td> \
							<span ng-if="entity.alerted_weight_class.code != \'N\'">{{entity.alerted_weight_class.code}}</span> \
							<span ng-if="entity.alerted_speed > 0">{{entity.alerted_speed}}</span> \
					    	<span ng-repeat="n in [].constructor(entity.alerted_sharpness) track by $index">*</span> \
						</td> \
				        <td>{{entity.weapon_length}}</td> \
        				<td>{{entity.price}}</td> \
				    </tr> \
    				<!-- ------------------------------ --> \
					<!-- MELEE WEAPONS (NON-MAGICAL)    --> \
					<!-- ------------------------------ --> \
			    	<tr ng-repeat="entity in entities | filter: meleeFilter | orderBy:[\'-weapon_length\',\'title\']"> \
				        <td ng-class="{section:$first}">{{entity.name}}</td> \
				        <td ng-class="{section:$first}">{{entity.attack_method.name}}</td> \
				        <td ng-class="{section:$first}"> \
							<span ng-if="entity.unalerted_weight_class.code != \'N\'">{{entity.unalerted_weight_class.code}}</span> \
							<span ng-if="entity.unalerted_speed > 0">{{entity.unalerted_speed}}</span> \
					    	<span ng-repeat="n in [].constructor(entity.unalerted_sharpness) track by $index">*</span> \
						</td> \
				        <td ng-class="{section:$first}"> \
							<span ng-if="entity.alerted_weight_class.code != \'N\'">{{entity.alerted_weight_class.code}}</span> \
							<span ng-if="entity.alerted_speed > 0">{{entity.alerted_speed}}</span> \
					    	<span ng-repeat="n in [].constructor(entity.alerted_sharpness) track by $index">*</span> \
						</td> \
				        <td ng-class="{section:$first}">{{entity.weapon_length}}</td> \
						<td ng-class="{section:$first}">{{entity.price}}</td> \
				    </tr> \
					<!-- ------------------------------ --> \
					<!-- MAGICAL WEAPONS                --> \
					<!-- ------------------------------ --> \
			    	<tr ng-repeat="entity in entities | filter: magicFilter | orderBy:[\'-weapon_length\',\'title\']"> \
				        <td ng-class="{section:$first, last:$last}">{{entity.name}}</td> \
				        <td ng-class="{section:$first, last:$last}">{{entity.attack_method.name}}</td> \
				        <td ng-class="{section:$first, last:$last}"> \
							<span ng-if="entity.unalerted_weight_class.code != \'N\'">{{entity.unalerted_weight_class.code}}</span> \
							<span ng-if="entity.unalerted_speed > 0">{{entity.unalerted_speed}}</span> \
					    	<span ng-repeat="n in [].constructor(entity.unalerted_sharpness) track by $index">*</span> \
						</td> \
				        <td ng-class="{section:$first, last:$last}"> \
							<span ng-if="entity.alerted_weight_class.code != \'N\'">{{entity.alerted_weight_class.code}}</span> \
							<span ng-if="entity.alerted_speed > 0">{{entity.alerted_speed}}</span> \
					    	<span ng-repeat="n in [].constructor(entity.alerted_sharpness) track by $index">*</span> \
						</td> \
				        <td ng-class="{section:$first, last:$last}">{{entity.weapon_length}}</td> \
						<td ng-class="{section:$first, last:$last}">{{entity.price}}</td> \
				    </tr> \
			  	</tbody> \
	  		</table> \
	    </div> \
    </div> \
    ';
    $templateCache.put('weapons', multiStr);
});