Template.world_parameters.rendered = function(){
  getParams = function(){return Session.get("parameters");};
  if(getParams !== undefined) {
    init_sliders();
  }
}

Template.world_parameters.helpers({
  params: function(){
    return Session.get("parameters");
  }

});


UI.registerHelper(
    "getRealSize", function(){
      try {
        params = Session.get("parameters"); 
        x = params.world.x * (params.sliders.x)/100;
        y = params.world.y * (params.sliders.y)/100;
        z = params.world.z * (params.sliders.z)/100;
      } catch(err){
        console.log(err);
      }
      return x.toFixed(2) + "m*" + y.toFixed(2) + "m*" + z.toFixed(2) +"m";

    }

    );




init_sliders = function(){

  sliderX = $("#sliderX").slider({
    min: 1,
          max: 100,
          value: getParams().sliders.x,
          slide: function(event, ui){
            v = ui.value;
            params = getParams();
            params.sliders.x = parseFloat(v);
            params.real_world.x = (params.world.x * (params.sliders.x)/100)/2;

            setParams(params);
          }

  });

  sliderY = $("#sliderY").slider({
    min: 1,
          max: 100,
          value: getParams().sliders.y,
          slide: function(event, ui){
            v = ui.value;
            params = getParams();
            params.sliders.y = parseFloat(v);
            params.real_world.y = (params.world.y * (params.sliders.y)/100)/2;
            setParams(params);
          }

  });

  sliderZ = $("#sliderZ").slider({
    min: 1,
          max: 100,
          value: getParams().sliders.z,
          slide: function(event, ui){
            v = ui.value;
            params = getParams();
            params.sliders.z = parseFloat(v);
            params.real_world.z = (params.world.z * (params.sliders.z)/100)/2;
            setParams(params);
          }

  });
};
