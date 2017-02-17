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
			    	    <th>Weight and Vulnerability</th> \
			    	    <th>Protects against</th> \
					    <th>Intact Price</th> \
					    <th>Damaged Price</th> \
					    <th>Destroyed Price Price</th> \
		    	    </tr> \
	    	  	</thead> \
			  	<tbody> \
			    	<tr ng-repeat="entity in entities | orderBy:[\'types[1].flag\']"> \
				        <td>{{entity.title}}</td> \
				        <td>{{entity.weight_class.harm_name}}</td> \
				        <td> \
    						<span ng-repeat="protection in entity.protections"><span ng-show="!$first">, </span>{{protection.name}}</span> \
    					</td> \
				        <td>{{entity.price}}</td> \
				        <td>{{entity.price_damaged}}</td> \
        				<td><span ng-if="entity.price_destroyed==0">-</span><span ng-if="entity.price_destroyed>0">{{entity.price_destroyed}}</span></td> \
				    </tr> \
			  	</tbody> \
	  		</table> \
	    </div> \
    </div> \
    ';
    $templateCache.put('armor', multiStr);
});