Template.osc_parameters.rendered = function(){
  $( "#rangeSlider" ).slider({
    min: 0,
  max: 20,
  value: getParams().osc.range,
  step: 0.01,
  slide: function( event, ui ) {
    v = ui.value;
    params = getParams();
    params.osc.range = parseFloat(v);
    setParams(params);
    sliderTh.slider("option", "max", v+1);
  }
  }); 
  Meteor.call("change_osc_port");

}


Template.osc_parameters.helpers({
  osc_port: function(){return getParams().osc.port},
  //osc_paths: function(){return Path.find();}
  getOscRAnge: function(){return "(-" + getParams().osc.range +","+getParams().osc.range+")";}
});


Template.osc_parameters.events({
  'change #osc_port': function(e,t){
    params = getParams();
    params.osc.port = parseInt(e.target.value);
    setParams(params);
    Meteor.call("change_osc_port");
  }

});
