Template.main.events({
  'click .params_slider':function(e,t){
    console.log("click");
    e.preventDefault();
    if($("#panel").hasClass("visible")){
      $("#panel").removeClass("visible");
    } else {
      $("#panel").addClass("visible");
    }
  }
});

