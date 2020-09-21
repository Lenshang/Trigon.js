import demo1 from './songs/demo1';
import clannad from './songs/clannad';
var trigon=null;
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
    {name:"潮鸣り",song:clannad}
]


var dom_list=document.querySelector("#list")

dom_list.innerHTML="";

for(let index=0;index<list.length;index++){
    let new_dom=document.createElement('a');
    new_dom.setAttribute("href","javascript:void(0);");
    let _index=index;
    new_dom.onclick=()=>{
        document.querySelector("h3").innerText=list[_index].name;
        trigon=list[_index].song;
    }
    new_dom.innerHTML=list[index].name;
    let new_li=document.createElement('li');
    new_li.appendChild(new_dom);
    dom_list.appendChild(new_li);
}

document.querySelector("h3").innerText=list[1].name;
trigon=list[1].song;