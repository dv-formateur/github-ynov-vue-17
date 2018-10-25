var accounts = ["Killy85", "Mokui", "LordInateur", "gfourny", "ClementCaillaud",  "sfongue", "BenoitCochet", "Nair0fl", "raphaelCharre", "mathiasLoiret", "thomaspich", "TeofiloJ" ,"Grigusky" ,"mael61" ,"Dakistos", "KevinPautonnier", "alixnzt", "benjaminbra", "rudy8530", "AlexDesvallees", "Coblestone", "etienneYnov", "AntoineGOSSET" ];
var projects = [];
var objects = [];

var app = new Vue({
    el: '#acc',
    data:{
        accounts : [],
        selected_account : null,
        projects : [],
        selected_project : null,
        objects : [],
        selected_project : null
    },
    watch: {
        selected_account : function (val){
            getDatas("https://api.github.com/users/"+ val +"/repos?access_token=a5dafe9418fb8eebd6c54cbc6b4aaf3793ea5672", setProjects)
        },
        selected_project : function (val){
            getDatas("https://api.github.com/repos/" + app.selected_account + "/" + val + "/commits?access_token=a5dafe9418fb8eebd6c54cbc6b4aaf3793ea5672", setCommits);
        }
    }
})

function onload(){
    app.accounts = accounts;
    app.projects = projects;
    app.objects = objects;
}

function setProjects(res){
    res = JSON.parse(res);
    res.forEach(obj => {
        projects.push(obj.name);       
    });
    app.projects = projects;
}

function setCommits (res){
    res = JSON.parse(res);
    res.forEach(obj => {
        objects.push(obj.commit);    
    });
    
    app.objects = objects;
    console.log(app.objects);
    
}

function getDatas(theUrl, callback)
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
