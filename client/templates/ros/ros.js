// Connect to ROS via ws
ros_connect = function(){
  ros = new ROSLIB.Ros({
    //url : params.rosws_url
    url : 'ws://localhost:9090'
  });

  ros.on('connection', function() {
    console.log('Connected to websocket server.');
    Session.set("connected_to_ros", true);
    createTopic(); 
  });

  ros.on('error', function(error) {
    console.log('Error connecting to websocket server: ', error);
  });

  ros.on('close', function() {
    console.log('Connection to websocket server closed.');
    Session.set("connected_to_ros", false);
  });
}
// Needed topics :
createTopic = function(){
  // Publishing a Topic
  // ------------------

  ardrone_leds = new ROSLIB.Service({
    ros : ros,
      name : '/ardrone/setledanimation',
      serviceType : 'ardrone_autonomy/LedAnim'
  });





  ardrone_topic = new ROSLIB.Topic({
    ros:ros,
    name:"/tum_ardrone/com",
    messageType: "std_msgs/String"
  });

  ardrone_message = new ROSLIB.Message({data:"c goto 0 0 1 0"});




  turtle_sim = new ROSLIB.Topic({
    ros : ros,
         name : '/turtle2/cmd_vel',
         messageType : 'geometry_msgs/Twist'
  });

  twist = new ROSLIB.Message({
    linear : {
      x : 0.1,
        y : 0.2,
        z : 0.3
    },
        angular : {
          x : -0.1,
        y : -0.2,
        z : -0.3
        }
  });
}
