OSCDriver.registerDriver({
  name: "XY",
  path: "/3/xy",
  enabled: true,
  template: "driver_test",
  transform: function(data, client){
    return {x:data[1], y:data[2], client: client};
  }
});
