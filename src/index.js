import demo1 from './songs/demo1';
import clannad from './songs/clannad';
import performance_test from './songs/performance_test';
import resserections from './songs/resserections';
var trigon=null;
function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

document.getElementById("bt").onclick = function () {
    if(trigon==null){
        alert("Please select songs");
        return;
    }
    trigon.play();
}
document.getElementById("btStop").onclick = function () {
    if(trigon==null){
        alert("Please select songs");
        return;
    }
    trigon.stop();
}
document.getElementById("btPause").onclick = function () {
    if(trigon==null){
        alert("Please select songs");
        return;
    }
    trigon.pause();
}

var list=[
    {name:"demo1",song:demo1},
    {name:"潮鸣り",song:clannad},
    {name:"performance-test",song:performance_test},
    {name:"Resserections",song:resserections}
]


var dom_list=document.querySelector("#list")

dom_list.innerHTML="";

for(let index=0;index<list.length;index++){
    let new_dom=document.createElement('a');
    new_dom.setAttribute("name","song");
    new_dom.setAttribute("href","javascript:void(0);");
    let _index=index;
    new_dom.onclick=()=>{
        document.querySelector("#control").innerHTML="";
        document.querySelector("h3").innerText=list[_index].name;
        trigon=list[_index].song;
        if(list[_index].song.customDom){
            list[_index].song.customDom(document.querySelector("#control"));
        }
    }
    new_dom.innerHTML=list[index].name;
    let new_li=document.createElement('li');
    new_li.appendChild(new_dom);
    dom_list.appendChild(new_li);
}


let urlparam=getQueryVariable("id");
if(urlparam){
    document.querySelectorAll("a[name='song']")[parseInt(urlparam)-1].click();
}
//document.querySelector("#bt").click()
// document.querySelector("h3").innerText=list[1].name;
// trigon=list[1].song;