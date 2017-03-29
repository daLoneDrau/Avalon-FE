/* jshint multistr: true */
/* jshint node: true */
"use strict";

angular.module('restApp').run(function($templateCache) {
    var multiStr = ' \
	    <basic-nav></basic-nav> \
	    <div class="col-sm-9"> \
		    <!-- -------------------- --> \
		    <!-- Select PC --> \
		    <!-- -------------------- --> \
    		<div class="col-sm-12"> \
		        <div class="form-group"> <!-- Select Entity --> \
			        <label for="selEntity" class="control-label col-sm-4">Select a character to view:</label> \
					<div class="col-sm-8"> \
			        	<select class="form-control" name="selEntity" id="selEntity" ng-model="entitySelect" ng-options="entity as entity.name | uppercase for entity in entities track by entity.id"> \
			            	<option value="">---Please select---</option> <!-- not selected / blank option --> \
			        	</select> \
					</div> \
				</div> \
    		</div> \
		    <!-- -------------------- --> \
		    <!-- View PC --> \
		    <!-- -------------------- --> \
    		<div class="col-sm-4">&nbsp;</div> \
			<div class="col-sm-4"> \
				<h3 style="float:left;margin-right:5px;padding-top:6px;" ng-if="entitySelect!=null"><em>The</em></h3> \
    			<h2 style="float:left;">{{entitySelect.name}}</h2> \
			</div> \
			<div class="col-sm-6"> \
				<div class="col-sm-12 text-center"> \
					<span class="{{entitySelect.glyph}} charicon"></span> \
				</div> \
				<div class="col-sm-12" ng-if="entitySelect!=null"> \
					<strong>Weight/Vulnerability:</strong> {{entitySelect.vulnerability.harm_name}} \
				</div> \
				<div class="col-sm-12" ng-if="entitySelect!=null"><strong>Special Advantages:</strong></div> \
				<div class="col-sm-12" ng-if="entitySelect!=null"> \
		    		<strong>{{entitySelect.advantage_one.name}}:</strong> {{entitySelect.advantage_one.description}} \
				</div> \
				<div class="col-sm-12" ng-if="entitySelect!=null"> \
					<strong>{{entitySelect.advantage_two.name}}:</strong> {{entitySelect.advantage_two.description}} \
				</div> \
				<div class="col-sm-12" ng-if="entitySelect!=null"><strong>Trading Relationship:</strong></div> \
				<div class="col-sm-12" ng-if="entitySelect.ally!=null">Ally: <span ng-repeat="group in entitySelect.ally"><span ng-if="!$first">, </span>{{group.name}}</span></div> \
    			<div class="col-sm-12" ng-if="entitySelect.friendly!=null">Friendly: <span ng-repeat="group in entitySelect.friendly"><span ng-if="!$first">, </span>{{group.name}}</span></div> \
				<div class="col-sm-12" ng-if="entitySelect.unfriendly!=null">Unfriendly: <span ng-repeat="group in entitySelect.unfriendly"><span ng-if="!$first">, </span>{{group.name}}</span></div> \
				<div class="col-sm-12" ng-if="entitySelect.enemy!=null">Enemy: <span ng-repeat="group in entitySelect.enemy"><span ng-if="!$first">, </span>{{group.name}}</span></div> \
    		</div> \
			<div class="col-sm-6"> \
				<div class="col-sm-12" ng-if="entitySelect!=null"> \
					<em>{{entitySelect.evaluation}}</em> \
				</div> \
    			<div class="col-sm-12" ng-if="entitySelect!=null"> \
    				<strong>Starting Location:</strong> <span ng-repeat="loc in entitySelect.starting_location"><span ng-if="!$first">, </span>{{loc}}</span> \
    			</div> \
				<div class="col-sm-12" ng-if="entitySelect!=null" style="margin-bottom: 10px;"> \
					<strong>Development/Combat Chits:</strong> \
				</div> \
				<div class="col-sm-12" ng-if="entitySelect!=null"> \
    				<div class="col-sm-3"">{{entitySelect.stage_one_name}}</div> \
    				<div class="box text-center" \
    						ng-class="{move: action.type.name==\'MOVE\', magic: action.type.name==\'MAGIC\', fight: action.type.name==\'FIGHT\' || action.type.name==\'BERSERK\' || action.type.name==\'DUCK\'}" \
    						ng-repeat="action in entitySelect.stage_one_actions track by $index"> \
    					<span class="smallest">{{action.type.name}}</span><br> \
    					<span class="pill">{{action.strength.code}}{{action.magic_type.code}}{{action.speed}}</span><br> \
    					<span ng-repeat="star in action.fatigue" class="glyphicon glyphicon-asterisk"> </span> \
    				</div> \
    				<span style="float: left;" class="smaller" ng-repeat="(key, value) in entitySelect.stage_one_equipped_items"> \
						{{value.name}}<span ng-if="!$last">,&nbsp;</span> \
    				</span> \
					<span style="float: left;" class="smaller" ng-if="entitySelect.stage_one_spells > 0"> \
						<span ng-if="entitySelect.stage_one_spells > 1">{{entitySelect.stage_one_spells}}</span> Spell<span ng-if="entitySelect.stage_one_spells > 1">s</span> \
					</span> \
    			</div> \
				<div class="col-sm-12" ng-if="entitySelect!=null"> \
					<div class="col-sm-3"">{{entitySelect.stage_two_name}}</div> \
					<div class="box text-center" \
							ng-class="{move: action.type.name==\'MOVE\', magic: action.type.name==\'MAGIC\', fight: action.type.name==\'FIGHT\' || action.type.name==\'BERSERK\' || action.type.name==\'DUCK\'}" \
							ng-repeat="action in entitySelect.stage_two_actions track by $index"> <!-- track by index to avoid duplicate keys error --> \
						<span class="smallest">{{action.type.name}}</span><br> \
						<span class="pill">{{action.strength.code}}{{action.magic_type.code}}{{action.speed}}</span><br> \
						<span ng-repeat="star in action.fatigue" class="glyphicon glyphicon-asterisk"> </span> \
					</div> \
					<span style="float: left;" class="smaller" ng-repeat="(key, value) in entitySelect.stage_two_equipped_items"> \
    					{{value.name}}<span ng-if="!$last">,&nbsp;</span> \
    				</span> \
					<span style="float: left;" class="smaller" ng-if="entitySelect.stage_two_spells > 0"> \
						<span ng-if="entitySelect.stage_two_spells > 1">{{entitySelect.stage_two_spells}}</span> Spell<span ng-if="entitySelect.stage_two_spells > 1">s</span> \
					</span> \
				</div> \
				<div class="col-sm-12" ng-if="entitySelect!=null"> \
					<div class="col-sm-3"">{{entitySelect.stage_three_name}}</div> \
					<div class="box text-center" \
							ng-class="{move: action.type.name==\'MOVE\', magic: action.type.name==\'MAGIC\', fight: action.type.name==\'FIGHT\' || action.type.name==\'BERSERK\' || action.type.name==\'DUCK\'}" \
							ng-repeat="action in entitySelect.stage_three_actions track by $index"> \
						<span class="smallest">{{action.type.name}}</span><br> \
						<span class="pill">{{action.strength.code}}{{action.magic_type.code}}{{action.speed}}</span><br> \
						<span ng-repeat="star in action.fatigue" class="glyphicon glyphicon-asterisk"> </span> \
					</div> \
					<span style="float: left;" class="smaller" ng-repeat="(key, value) in entitySelect.stage_three_equipped_items"> \
						{{value.name}}<span ng-if="!$last">,&nbsp;</span> \
					</span> \
					<span style="float: left;" class="smaller" ng-if="entitySelect.stage_three_spells > 0"> \
    					<span ng-if="entitySelect.stage_three_spells > 1">{{entitySelect.stage_three_spells}}</span> Spell<span ng-if="entitySelect.stage_three_spells > 1">s</span> \
					</span> \
				</div> \
				<div class="col-sm-12" ng-if="entitySelect!=null"> \
					<div class="col-sm-3"">{{entitySelect.name}}</div> \
					<div class="box text-center" \
							ng-class="{move: action.type.name==\'MOVE\', magic: action.type.name==\'MAGIC\', fight: action.type.name==\'FIGHT\' || action.type.name==\'BERSERK\' || action.type.name==\'DUCK\'}" \
							ng-repeat="action in entitySelect.stage_four_actions track by $index"> \
						<span class="smallest">{{action.type.name}}</span><br> \
						<span class="pill">{{action.strength.code}}{{action.magic_type.code}}{{action.speed}}</span><br> \
						<span ng-repeat="star in action.fatigue" class="glyphicon glyphicon-asterisk"> </span> \
					</div> \
					<span style="float: left;" class="smaller" ng-repeat="(key, value) in entitySelect.stage_four_equipped_items"> \
						{{value.name}}<span ng-if="!$last">,&nbsp;</span> \
					</span> \
					<span style="float: left;" class="smaller" ng-if="entitySelect.stage_four_spells > 0"> \
						<span ng-if="entitySelect.stage_four_spells > 1">{{entitySelect.stage_four_spells}}</span> Spell<span ng-if="entitySelect.stage_four_spells > 1">s</span> \
					</span> \
				</div> \
    		</div> \
    	</div> \
    </div> \
    ';
    $templateCache.put('characters', multiStr);
});