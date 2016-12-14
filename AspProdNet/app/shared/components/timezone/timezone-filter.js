define([],function(){
    var TimeDiffFilter = function(timezonefactory){        
        return function(date){
            return timezonefactory.getTimeDiffrence(date);
        };
    };
    return ['timezonefactory', TimeDiffFilter];
});