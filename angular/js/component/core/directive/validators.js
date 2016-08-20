app.service("validator",["config","$timeout", 'validationService', function(config,$timeout, validationService){
        var ngModelObj;
    return {
        validateOnTimeout: function(elem,ngModel){
            var timer;
            ngModelObj = ngModel;
            elem.bind("input",function(){

                $timeout.cancel(timer);
                if(!ngModel.$timesUp){
                    timer = $timeout(function(){

                        ngModel.$setViewValue(ngModel.$viewValue);
                        if(ngModel.$dirty){
                            ngModel.$timesUp = true;
                        }
                        
                    }, config.validateTimeout);
                }
            });
        },
        validateRegex:function(regex,elem){
            return function (modelValue, viewValue) {
                if(!elem[0].attributes['required'] && validationService.isEmpty(ngModelObj.$viewValue)){
                    return true;
                }
                var value = modelValue || viewValue;
                return (regex).test(value);
            };
        }
    }
}]);
app.directive('validate', ['config','validator', function (config,validator) {
        return {
            require: 'ngModel',
            link: function (scope, elem, attr, ngModel) {
                validator.validateOnTimeout(elem,ngModel);
            }
        };
    }]);
app.directive('validatePostcode', ['config','validator', function (config,validator) {
        return {
            require: 'ngModel',
            link: function (scope, elem, attr, ngModel) {
                ngModel.$validators.postcode = validator.validateRegex(config.regex.zipcode,elem);
                validator.validateOnTimeout(elem,ngModel);
            }
        };
    }]);
app.directive('validateDate', ['config','validator', function (config,validator) {
        return {
            require: 'ngModel',
            link: function (scope, elem, attr, ngModel) {
                
                ngModel.$validators.date = validator.validateRegex(config.regex.date,elem);
                validator.validateOnTimeout(elem,ngModel);
            }
        };
    }]);
app.directive('validateYear', ['config','validator', function (config,validator) {
        return {
            require: 'ngModel',
            link: function (scope, elem, attr, ngModel) {
                
                ngModel.$validators.year = validator.validateRegex(config.regex.year,elem);
                validator.validateOnTimeout(elem,ngModel);
            }
        };
    }]);

app.directive('validateEmail',['validator', function(validator) {
    return {
        require: 'ngModel',
        link: function(scope, elem, attr, ngModel) {
                validator.validateOnTimeout(elem,ngModel);
        }
    };
}]);
app.directive('validatePhone',['config','validator', function(config,validator) {
	return {
		require: 'ngModel',
		link: function(scope, elem, attr, ngModel) {
			
			ngModel.$validators.phone=validator.validateRegex(config.regex.phone,elem);
			validator.validateOnTimeout(elem,ngModel);
		}
	};
}]);
app.directive('validateWebsite',['config','validator', function(config,validator) {
	return {
		require: 'ngModel',
		link: function(scope, elem, attr, ngModel) {
			
			ngModel.$validators.website=validator.validateRegex(config.regex.website,elem);
                        validator.validateOnTimeout(elem,ngModel);
		}
	}
}]);

app.directive('validateImage', ['config', function(config) {
	return {
		 require: 'ngModel',
	        link: function (scope, el, attrs, ngModel) {
                ngModel.$validated = false;
	        	
	            ngModel.$render = function () {
	                ngModel.$setViewValue(el.val());
	            };

	            el.bind('change', function (changeEvent) {
	                scope.$apply(function () {
	                    ngModel.$validated = true;
	                    ngModel.$render();
	                });
	                
	                var reader = new FileReader();
					reader.onload = function(loadEvent) {
						scope.$apply(function() {
							scope.fileread = changeEvent.target.files[0].name;
							
							var isValid = (config.regex.image).test(scope.fileread);
							var isGoodSize = changeEvent.target.files[0].size < (1024 * 1512);
							ngModel.$setValidity("size",isGoodSize);
							ngModel.$setValidity("image",isValid);
							
							if(isValid && isGoodSize){
								ngModel.$setViewValue({name:scope.fileread,file:loadEvent.target.result});
							}
						});
					}
					reader.readAsDataURL(changeEvent.target.files[0]);
	            });
	            
	        }
	}
}]);
app.directive("validatePasswordRepeatTo",function() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=validatePasswordRepeatTo"
        },
        link: function(scope, element, attributes, ngModel) {
             
            ngModel.$validators.compareTo = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };
 
            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
});


app.directive('myDate',["dateFilter","$parse",function(dateFilter,$parse){
  return{
    restrict:'EAC',
    require:'?ngModel',
    link:function(scope,element,attrs,ngModel,ctrl){
      ngModel.$parsers.push(function(viewValue){
        return dateFilter(viewValue,'dd-MM-yyyy');
      });
    }
  }
}]);