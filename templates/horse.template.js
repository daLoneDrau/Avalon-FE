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
	        <hr> \
	    </div> \
	    <div class="col-sm-12"> \
	    	<table class="table"> \
    			<thead> \
		    	    <tr> \
	    				<th>Name</th> \
			    	    <th>Vulnerability</th> \
			    	    <th>Move Bonus</th> \
					    <th>Gallop</th> \
					    <th>Walk</th> \
					    <th>Gold Price</th> \
		    	    </tr> \
	    	  	</thead> \
			  	<tbody> \
			    	<tr ng-repeat="entity in entities | orderBy:[\'horse_type.id\',\'-price\']"> \
				        <td>{{entity.title}}</td> \
				        <td> \
    						{{entity.weight_class.harm_name}} \
    						<span ng-if="entity.horse_type.name == \'Warhorse\'"> & Armored</span> \
    					</td> \
    					<td> \
							<span ng-if="entity.horse_type.name == \'Pony\'">Double movement</span> \
							<span ng-if="entity.horse_type.name == \'Workhorse\'">Extra move phase</span> \
							<span ng-if="entity.horse_type.name == \'Warhorse\'">None</span> \
    					</td> \
				        <td> \
							<span ng-if="entity.alerted_weight_class.code != \'N\'">{{entity.alerted_weight_class.code}}</span> \
							<span ng-if="entity.alerted_speed > 0">{{entity.alerted_speed}}</span> \
					    </td> \
				        <td> \
    						<span ng-if="entity.unalerted_weight_class.code != \'N\'">{{entity.unalerted_weight_class.code}}</span> \
							<span ng-if="entity.unalerted_speed > 0">{{entity.unalerted_speed}}</span> \
					    </td> \
        				<td>{{entity.price}}</td> \
				    </tr> \
			  	</tbody> \
	  		</table> \
	    </div> \
    </div> \
    ';
    $templateCache.put('horses', multiStr);
});