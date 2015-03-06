OSCDriver.registerDriver({
  name:"leds",
  path:"/2/push1",
  enabled: true,
  transform: function(message, client){ return message[1];},
  callback: function(message, client){
    //console.log(message);
    v = message[1];
    d = new Date();
    if(v == 1){ n = d.getMilliseconds(); }
    if(v == 0){ 
      m = d.getMilliseconds() - n; 
      r1 = new ROSLIB.ServiceRequest({type:8, freq: 60, duration: 1});
      r2 = new ROSLIB.ServiceRequest({type:7, freq: 60, duration: 1});
    
      ardrone_leds.callService(r1, function(result) {
        ardrone_leds.callService(r2, function(result) {
        });
      });
    
    }
  },
  //update_actions: ["Set /1/fader1 value"]

});

