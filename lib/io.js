notifications = new Meteor.Stream("server-notifications");

ActionDriver = new function(){
  this.collection = new Mongo.Collection(null);
  this.registerAction = function(action){
    this.collection.insert(action);
    Template[action.template].events(action.events);
    Template[action.template].helpers(action.helpers);
    Template[action.template].rendered = action.rendered;
    //console.log(action.server_calls);
    //Meteor.call("add_methods", action.server_calls);
    //Meteor.methods(action.server_calls);
  };
  this.find = function(){
    return this.collection.find();
  };
  this.getActionByName = function(name){return this.collection.findOne({name:name});}
};

OSCDriver = new function(){
  this.collection = new Mongo.Collection(null);
  this.registerDriver = function(driver){
    this.collection.insert(driver);
    if(driver.template){
      Template[driver.template].events(driver.events);
      Template[driver.template].helpers(driver.helpers);
      Template[driver.template].rendered = driver.rendered;
    }
  };
  this.update = function(message, client){
    self = this;
    path = message[0];
    //console.log(message);
    existing = this.collection.find({path:path}).fetch();
    if(existing){
      // Update existing drivers
      _.each(existing, function(driver){
        if(driver.enabled) self.collection.update({_id:driver._id},{$set:{data:driver.transform(message, client)}});
        if(driver.callback) driver.callback(message, driver.data, client);
        if(driver.update_actions){
          data = driver.transform(message, client);
          _.each(driver.update_actions, function(action){
            tmp = ActionDriver.getActionByName(action);
            if(tmp){
              ActionDriver.collection.update({_id:tmp._id},{$set:{data:data}});
            }
          });
        }
      });
    } 
  };
  this.find = function(){
    return this.collection.find();
  };
  this.enable = function(driver_name){
    if(tmp = this.collection.findOne({name:driver_name})) {
      tmp.enabled = !tmp.enabled;
      this.collection.update({_id:tmp._id}, tmp);
    }
  };
  this.getDriverByName = function(name){
    return this.collection.findOne({name:name});
  };
};


if (Meteor.isClient){
  notifications.on('message', function(message, rinfo){
    OSCDriver.update(message, rinfo);
  });
}

if (Meteor.isServer){
  osc = Meteor.npmRequire('node-osc');
  oscServer = null;
  notifications.permissions.read(function(e) {
    return true;
  });
  notifications.permissions.write(function(e) {
    return true;
  });


  Meteor.methods({
    change_osc_port: function () {
    if(oscServer)
      oscServer.kill();
    port = Params.findOne().osc.port;
    oscServer = new osc.Server(port, '0.0.0.0');
    oscServer.on("message", Meteor.bindEnvironment(function (msg, rinfo) {
      notifications.emit('message', msg, rinfo); 
    }));
    },
    init_faust_app: function(ip,port){
      var client = new osc.Client(ip, port);
      client.send('/1/fader1', 1);
      //client.send('/0x00/x', 0);
      //client.send('/get');
    },
    // TODO : put it in register...
    action_set_fader: function(ip, port, value){
        if(!Meteor.isSimulation){
          var client = new osc.Client(ip, port);
          client.send('/1/fader1', value);
        }
      },
      test: function(){console.log("Test");}
  });




}
