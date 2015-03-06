// Template.drivers.helpers({
//   drivers: function(){
//     driverList = [];
//     for(var path in drivers)
//       _.each(drivers[path], function(driver){
//         driverList.push(driver);
//     });
//     return driverList;
//   },
//   actions: function(){return actions;},
// 
// });

UI.registerHelper(
  "active_driver", function(param){
    return (Session.get("active_driver") === param.hash["driver"])?"active_driver":"";
  }
);

UI.registerHelper(
  "drivers", function(){
    return OSCDriver.find();
  }
);
UI.registerHelper(
  "actions", function(){
    return ActionDriver.find();
  }
);
UI.registerHelper(
  "driver_enabled", function(id){
    return "checked"; //OSCDriver.collection.findOne({_id:id}).enabled;
  }
);
Template.drivers.events({
  'click .enable_driver': function (e,t) {
    OSCDriver.enable(this.name);
  }
});
