Session.setDefault("connected_to_ros", false);
Template.ros_connect_button.events({
  'click #connect': function(e,t){
    console.log('Connecting to ROS');
    ros_connect(); 
  },
});

Template.ros_connect_button.helpers({
  connected_to_ros: function(){
    return Session.get("connected_to_ros")?"connected_to_ros":"not_connected_to_ros";
  },
  ros_url: function(){
    return Session.get("parameters").rosws_url; //"ee"; //getParams().rosws_url;
  }
});
