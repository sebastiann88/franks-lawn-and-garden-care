/* 
Copyright 2012 DesignedByDash.com | License required for use.
*/
(function($) {
	
	var smoothieFilter = function(element, options, total) {
		
		var defaults = $.extend({}, $.fn.smoothiefilter.defaults, options);

		var $mainElement = $('#filterSection');
		var $menuElement = $('#filterSection_menu');
		var $param = 'all';
		var $active = false;
		var $faddedElems = 0;
		var $totalElems = 0;
		
		$totalElems = $mainElement.find('div.filterable').length;
		
		var filter = function() {
			
			$faddedElems = 0;
			
			$menuElement.find('button').each(function(index, element) {
				
				var elem = $(this);
                if(elem.data('filter') == $param) {
					elem.addClass('active-filter-btn');	
				} else {
					if(elem.hasClass('active-filter-btn')) {
						elem.removeClass('active-filter-btn');
					}
				}
            });
			
			$mainElement.find('div.filterable').fadeOut(defaults.animTime, function() {
				
				$faddedElems++;
				
				if($faddedElems == $totalElems) {
					if($param == '') {
						$param = 'filterable';
					}
					
					applySpacingClasses($param);
				
					$mainElement.find('div.' + $param).fadeIn(defaults.animTime, function() {
						$active = false;	
					});
				}
			});
				
		}
		
		var applySpacingClasses = function(param) {
			
			var perrow = $mainElement.data('perrow');
			var firstSelector = perrow + 'n+1';
			var lastSelector = perrow + 'n+' + perrow;
			
			var activeElems = new Array();
			var inactiveElems = new Array();
			
			$mainElement.find('div.filterable').each(function(index, element) {
				var $elem = $(element);
				
                if($elem.hasClass(param)) {
					activeElems.push($elem.clone());
				} else {
					inactiveElems.push($elem.clone());
				}
            });
			
			var newFilterDiv = $(document.createElement('div'))
			newFilterDiv.addClass('row');
			$mainElement.html('');
			
			var count = 1;
			
			for(x = 1; x <= activeElems.length; x++) {
				newFilterDiv.append(activeElems[x - 1]);
				
				if(count % perrow == 0) {
					$mainElement.append(newFilterDiv);
					newFilterDiv = undefined;
					var newFilterDiv = $(document.createElement('div'))
					newFilterDiv.addClass('row');
				}
				
				count++;
			}
			
			for(x = 1; x <= inactiveElems.length; x++) {
				newFilterDiv.append(inactiveElems[x - 1]);
				
				if(count % perrow == 0) {
					$mainElement.append(newFilterDiv);
					newFilterDiv = undefined;
					var newFilterDiv = $(document.createElement('div'))
					newFilterDiv.addClass('row');
				}
				
				count++;
				
			}
			
			if(newFilterDiv != undefined) {
				$mainElement.append(newFilterDiv);
			}
			
		}

		$menuElement.find('button').bind({
			click: function() {
				
				$totalElems = $mainElement.find('div.filterable').length;
				
				if(!$active && $(this).data('filter') != $param) {
					$param = $(this).data('filter');
					$active = true;
					
					filter();
				}
			}
		});
		
		
	}
	
	$.fn.smoothiefilter = function(options) {
		var sf = new smoothieFilter(this, options);
	}
	
	$.fn.smoothiefilter.defaults = {
		animTime: 1000	
	};
	
})(jQuery);

jQuery(document).ready(function(e) {
	
	if(jQuery('#filterSection').length == 1 && jQuery('#filterSection_menu').length == 1) {
    	jQuery(document).smoothiefilter();
	}
	
});