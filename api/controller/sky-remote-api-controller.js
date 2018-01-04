'use strict';
var SkyRemote = require('sky-remote');
var SkyQ = require('sky-q');


exports.send_a_command = function(req, res) {
        var remoteControl = new SkyRemote(req.params.Server);

                var box = new SkyQ({ip:req.params.Server})
                box.getPowerState().then(isOn=>{
                        if (req.params.Command == "on") {
                                if(!isOn){
                                        remoteControl.press("power",function() {
                                        res.end('{"status":"success"}');
                                        });
                                }else{
                                        res.end('{"status":"ignored"}');
                                }
                        } else if (req.params.Command == "off") {
                                if(isOn){
                                        remoteControl.press("power",function() {
                                        res.end('{"status":"success"}');
                                        });
                                }else{
                                        res.end('{"status":"ignored"}');
                                }

                        } else {
                                        remoteControl.press(req.params.Command,function() {
                                        res.end('{"status":"success"}');
                                        });
                        }
                }).catch(err=>{
						res.end('{"status":"error"}');
                        console.error("Unable to determine power state")
                        console.error("Perhaps looking at this error will help you figure out why", err)
                })



};
