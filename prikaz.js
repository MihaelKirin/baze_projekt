const electron = require("electron");
const ipc = electron.ipcRenderer;
document.addEventListener("DOMContentLoaded", function(){
    ipc.send("mainWindowLoaded")
    ipc.on("resultSent", function(evt, result){
        console.log(result)
        let resultEl = document.getElementById("result");
        for(var i = 0; i < result.length;i++){
            resultEl.innerHTML += '<br> Tip aktivnosti: ' + result[i].activity_type_id.toString() + '<br> Naziv: ' + result[i].name.toString() + '<br> Opis: ' + result[i].description.toString()
            //console.log(resultEl)
        }
    });
});
