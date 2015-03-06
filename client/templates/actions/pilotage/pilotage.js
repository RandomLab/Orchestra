


Template.init_faust_app.events({
  'change .active_driver': function(e,t){
    Session.set("active_driver", e.target.value);
  },
  'click #init_faust_app': function(e,t){
    Meteor.call("init_faust_app", getParams().faust_app.ip, getParams().faust_app.port );
  },
  'change #faust_app_ip': function(e,t){
    ip = $("#faust_app_ip").val();
    port = $("#faust_app_port").val();
    update_faust_app_params(ip, port);
  },
  'change #faust_app_port': function(e,t){
    ip = $("#faust_app_ip").val();
    port = $("#faust_app_port").val();
    update_faust_app_params(ip, port);
  }
});

// Template.init_faust_app.helpers({
//   getThValue: function(){return getParams().pilotage.th;},
//   osc_data: function(){return Session.get("osc_data");},
//   getHardDroneCMD: function(){
//     switch(Session.get("active_driver")){
//       case "hard":
//         cmd = "hard";
//         break;
//       case "soft":
//         cmd = "soft";
//         break;
//       default:
//         cmd = "hard";
//     }
//     return cmd;
//   },
//   active_driver: function(param){
//     return (Session.get("active_driver") === param.hash["driver"])?"active_driver":"";
//   },
//   getFaustAppParams: function(){
//     data = getParams().faust_app; 
//     return data;
//   }
// 
// });
