jQuery.validator.addMethod("natural-name", function(value, element) {
	return this.optional(element) || /^[a-z][\w\s\.\-_]+$/i.test(value);
}, "Letters, numbers, periods, hyphens, underscores and spaces only, and start with an alphabet please");