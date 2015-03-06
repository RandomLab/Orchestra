debug = function(){

    //$('.debug').text(msg);
  d = "";
  _.each(arguments, function(arg){
    console.log(arg);
    d += JSON.stringify(arg) + "|"; 
  });
    $('.debug').text(d);
}


Router.route('/', function(){
  this.wait(Meteor.subscribe("parameters"));
  getParams = function(){
    return Session.get("parameters");
  }

  setParams = function(p){
    Meteor.call("update_parameters", p);
    Session.set("parameters", p);
    
  }
  if (this.ready()) {
    params = Params.findOne();
    Session.set("parameters", params);
    this.render("main");
  } else {
    this.render('Loading');
  }

});
