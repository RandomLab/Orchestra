function sign(x) {
      return typeof x === 'number' ? x ? x < 0 ? -1 : 1 : x === x ? 0 : NaN : NaN;
}







last_cmd = "";
current_cmd = "";

hard_driver = {
  name: "Hard",
  path: "/accxyz",
  template: "driver_hard",
  enabled: true,
  transform: function(data, client){
    state = {x:false, y:false, z:false, signe:{x:1, y:1, z: 1}};
    try{
      th = getParams().drivers.hard.th;
      if(Math.abs(data[1]) > th) {state.x = true;};
      if(Math.abs(data[2]) > th) {state.y = true;};
      if(Math.abs(data[3]) > th) {state.z = true;};
    } catch(err){}
    state.signe.x = sign(data[1])
    state.signe.y = sign(data[2])
    state.signe.z = sign(data[3])
    return state; 
  },
  rendered: function(){
    sliderTh = $( "#hard_slider_th" ).slider({
      min: 0,
    max: 20,
    value: getParams().drivers.hard.th,
    step: 0.01,
    slide: function( event, ui ) {
      v = ui.value;
      params = getParams();
      params.drivers.hard.th = parseFloat(v);
      setParams(params);
    }
    }); 
  
  },
  events:{},
  helpers:{
    axisState: function(){
      state = {x:"", y:"", z:""};
      try{
        state.x = (this.data.x)?"green":"";
        state.y = (this.data.y)?"green":"";
        state.z = (this.data.z)?"green":"";
      } catch(err){
        return state;
      }
      return state;
    },
    getThValue: function(){return getParams().drivers.hard.th;},
    getHardDroneCMD: function(){
      target = {x:0, y:0, z:0, yaw:0};
      if(this.data){
        if(this.data.x) target.x = this.data.signe.x * getParams().real_world.x; 
        if(this.data.y) target.y = this.data.signe.y * getParams().real_world.y; 
        // z à retravailler en fonction de ce que souhaite Xavier
        if(this.data.z) target.z = this.data.signe.z * getParams().real_world.z; 
      }
      cmd = "c goto " + String(target.x) + " " + String(target.y) + " " + String(target.z) + " " + String(target.yaw);
      Session.set("current_cmd", cmd);

      if(Session.get("connected_to_ros")){
        // if(cmd != last_cmd){
        //   turtle_sim.publish(twist);
        //   last_cmd = cmd;
        // 
        // }
        // Send data to ros
        //cmdVel.publish(twist);
        // if(this.data.y){
        //   if(this.data.signe.y > 0) moveup();
        //   if(this.data.signe.y < 0) movedown();
        // } 
        // if(this.data.x){
        //   if(this.data.signe.x > 0) turnleft();
        //   if(this.data.signe.x < 0) turnright();
        // } 
      }
      return cmd;
    }
    
    },
    callback: function(message, data, client){
      //console.log(message, data, client);
      // Send data to ARDrone
      
    }
};


OSCDriver.registerDriver(hard_driver);

function moveup() { 
  twist.linear.x = 1.0;
  twist.angular.z = 0.0;
  cmdVel.publish(twist); 
};

function movedown() { 
  var linearX = -1.0;
  var angularZ = 0.0;
  twist.linear.x = linearX;
  twist.angular.z = angularZ;
  cmdVel.publish(twist); 
};

function turnleft() { 
  var linearX = 0.0;
  var angularZ = 1.570796;
  twist.linear.x = linearX;
  twist.angular.z = angularZ;
  cmdVel.publish(twist); 
};

function turnright() { 
  var linearX = 0.0;
  var angularZ = -1.570796;
  twist.linear.x = linearX;
  twist.angular.z = angularZ;
  cmdVel.publish(twist); 
};
