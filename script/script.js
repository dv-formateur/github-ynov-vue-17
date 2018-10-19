var accounts = ["Killy85", "Mokui", "LordInateur", "gfourny", "ClementCaillaud",  "sfongue", "BenoitCochet", "Nair0fl", "raphaelCharre", "mathiasLoiret", "thomaspich", "TeofiloJ" ,"Grigusky" ,"mael61" ,"Dakistos", "KevinPautonnier", "alixnzt", "benjaminbra", "rudy8530", "AlexDesvallees", "Coblestone", "etienneYnov", "AntoineGOSSET" ];
var projects = [];

var app = new Vue({
    el: '#acc',
    data:{
        accounts : [],
        selected_account : null,
        projects : [],
        selected_project : null
    }
})

function affiche(res){
    res = JSON.parse(res);
    res.forEach(obj => {
        projects.push(obj.name);       
    });
    app.projects = projects;
    app.accounts = accounts;
}

function getProject(theUrl, callback)
{
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() { 
        if (req.status == 200){
            callback(req.responseText);
          }   
        else{
            console.log("Error");
            console.log(req);
        }
    }
    req.open("GET", theUrl, true); // true for asynchronous 
    req.send();
}

getProject("https://api.github.com/users/killy85/repos?access_token=c452a730577fe6cdfd62dc0c51f5662a9e9f92b9", affiche);

console.log(app.accounts);
