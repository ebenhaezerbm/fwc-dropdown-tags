(function ($) {
	
	$(document).ready(function(){
		$("#dropdown-tags").select2({
			ajax: {
				url: fwc_dropdown_tags.ajaxurl,
				dataType: 'json',
				data: function (term, page) {
					return {
						action: 'dropdown_tags',
						q: term,
						page: page,
						taxonomy: 'post_tag'
					};
				},
				results: function (data, page) {
					var per_page = data.data.item_per_page,
						total_count = data.data.total_count;

					var items = data.data;

					delete items.item_per_page;
					delete items.total_count;

					var more = (page * per_page) < total_count;

					return { 
						results: $.map(items, function (item) {
							return {
								id: item.id,
								text: item.name
							}
						}) 
					};
				},
				quietMillis: 1000, // wait 1000 milliseconds before triggering the request
				delay: 1000, // wait 1000 milliseconds before triggering the request
				cache: true
			},
			escapeMarkup: function (text) { 
				return text; 
			},
			initSelection: function (element, callback) {
				var id = $(element).val(),
					name = $(element).data('text');

				var data = { id: id, text: name };

				callback(data);
			},
			// minimumInputLength: 3,
			allowClear: true,
			formatNoMatches: 'Tags not found.',
			placeholder: "Select Tag"
		});
	});

}(jQuery));