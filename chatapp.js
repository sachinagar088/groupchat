var server=require('ws').Server;
var s =new server({port:3000});
s.on('connection',function(ws){
   ws.on('message',function(message){
       message =JSON.parse(message);
       
       if(message.type=="name"){
         ws.personName=message.data;
           return;
       }
       
       if(message.type=="typing"){
               s.clients.forEach(function (client){
           if(client!=ws)
               client.send(JSON.stringify({
                   name:message.data,
                   data:"typing"
               
           }));
       });
           return;
       }
       s.clients.forEach(function (client){
           if(client!=ws)
               client.send(JSON.stringify({
                   name:ws.personName,
                   data:message.data
               
           }));
       });
   });
    ws.on('close',function(){
       console.log(" client disconnected"); 
    });
});
