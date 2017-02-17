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
			    	    <th>Attack</th> \
			    	    <th>Unalerted</th> \
					    <th>Alerted</th> \
					    <th>Length</th> \
					    <th>Gold Price</th> \
		    	    </tr> \
	    	  	</thead> \
			  	<tbody> \
			    	<tr ng-repeat="entity in entities | orderBy:[\'attack_method.name\',\'-weapon_length\']"> \
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
			  	</tbody> \
	  		</table> \
	    </div> \
    </div> \
    ';
    $templateCache.put('weapons', multiStr);
});