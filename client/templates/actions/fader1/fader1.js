OSCDriver.registerDriver({
  name:"fader1",
  path:"/1/fader1",
  enabled: true,
  transform: function(message, client){ return message[1];},
  callback: function(message, client){fader1.slider("value", message[1]);},
  update_actions: ["Set /1/fader1 value"]

});
ActionDriver.registerAction({
  name: "Set /1/fader1 value",
  template:"action_set_fader",
  events:{
    'click #set_fader_to_one': function(e,t){
      this.send("192.168.0.13", 9000, 1);
    },
    'click #set_fader_to_zero': function(e,t){
      this.send("192.168.0.13", 9000, 0);
    }
  },
  rendered: function(){
    self = this;
    //console.log(OSCDriver.getByName("fader1"));
    fader1 = $( "#fader1" ).slider({
      min: 0,
    max: 1,
    value: 0,  //getParams().drivers.hard.th,
    step: 0.01,
    slide: function( event, ui ) {
      v = ui.value;
      Meteor.call("action_set_fader", "172.17.1.192", 9000, parseFloat(v));
    }
    }); 
  },
  helpers:{
    show_me: function(){return Session.get("current_cmd");},
    value: function(){return this.data;}
  },
  send: function(ip,port, value){
      Meteor.call("action_set_fader", ip, port, value);
  }, 
  //data: function(){return },
  // TODO : Server's methods
  server_calls:{
    action_set_fader: function(ip, port, value){
      if(!Meteor.isSimulation){
        var client = new osc.Client(ip, port);
        client.send('/1/fader1', value);
      }
    },
    test: function(){console.log("Test");}
  }
});

// Need server methods !
// Meteor.methods({
//   // TODO : put it in register...
//   action_set_fader: function(ip, port, value){
//     var client = new osc.Client(ip, port);
//     client.send('/1/fader1', value);
// 
//   }
// });
