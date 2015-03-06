OSCDriver.registerDriver({
  name: "Visualisation",
  path: "/accxyz",
  template: "driver_visualisation",
  enabled: true,
  transform: function(data, client){
    return {
      x:data[1], y:data[2], z:data[3], 
      roll: Math.atan2(data[2], data[3]) * 180/Math.PI, 
      pitch: Math.atan2(data[1], data[3]) * 180/Math.PI,
      client: client
    }
  }
});

