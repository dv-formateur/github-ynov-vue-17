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
        date1 : new Date(),
        date2 : new Date(),
        all : false
    },
    methods:{
        call: function(){
            datetemp1 = new Date(app.date1).toISOString().substring(0,19) + "Z"
            datetemp2 = new Date(app.date2).toISOString().substring(0,19) + "Z"
            if(!app.all)
                getDatas("https://api.github.com/repos/" + app.selected_account + "/" + app.selected_project + "/commits?access_token=3e0e033292aba9670149be5c56efe67356404c4e&since=" + datetemp1 + "&until=" + datetemp2 , setCommits);
            else{
                app.accounts.forEach(function (use){
                    getDatas("https://api.github.com/repos/" + use + "/" + app.selected_project + "/commits?access_token=3e0e033292aba9670149be5c56efe67356404c4e&since=" + datetemp1 + "&until=" + datetemp2 , setCommitsCustom)
                })
            }
        }

    },
    watch: {
        selected_account : function (val){
            getDatas("https://api.github.com/users/"+ val +"/repos?access_token=3e0e033292aba9670149be5c56efe67356404c4e", setProjects)
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
    projects = [];
    res.forEach(obj => {
        projects.push(obj.name);       
    });
    app.projects = [];
    app.projects = projects;
}

function setCommits (res){
    res = JSON.parse(res);
    res.forEach(obj => {
        objects.push(obj.commit);    
    });
    
    app.objects = objects;
}

function setCommitsCustom(res){
    var myObjects = [];
    res = JSON.parse(res);
    res.forEach(obj => {
        myObjects.push(obj.commit);    
    });
    
    app.objects.push(myObjects);
}

function getDatas(theUrl, callback)
{
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() { 
        if (req.status == 200){
            callback(req.responseText);
        }   
    }
    req.open("GET", theUrl, true); // true for asynchronous 
    req.send();
}
