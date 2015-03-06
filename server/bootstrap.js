// Default params
params = {
  world: {x:10, y:10, z:10},
  sliders: {x:1,y:1,z:1},
  real_world:{x:10, y:10, z:10},
  rosws_url : "ws://localhost:9090",
  osc:{port:5510, range:1},
  pilotage:{th:5},
  osc_data: {x:0, y:0, z:0},
  faust_app:{ip:"192.168.0.13",port:9000},
  drivers:{
    hard:{th:5}
  }
}

Meteor.publish("parameters", function(){
  return Params.find();
});

Meteor.startup(function(){
  p = Params.findOne();
  console.log(p);
  if(!p)
    Params.insert(params);

});

Meteor.methods({
  update_parameters: function(newParams){
    console.log("Bootsrap : ", newParams);
    Params.update({_id:newParams._id}, newParams);
  }

});


