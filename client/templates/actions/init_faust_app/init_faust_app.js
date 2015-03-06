update_faust_app_params = function(ip,port){
    params = getParams();
    params.faust_app.ip = ip;
    params.faust_app.port = parseInt(port);
    setParams(params);

};


