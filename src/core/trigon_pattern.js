import Wad from 'web-audio-daw';

export default class{
    constructor(name=null){
        this.data=[];
        this._name="trigon_pattern";
        this._lastSynth=null;
        this.name=name;
        this.stopOnNext=false;
    }
    addPattern(pattern,notes=null,offset=0){
        if(offset>0){
            for(var i=0;i<offset;i++){
                this.data.push({
                    synth:null,
                    note:"0"
                })
            }
        }
        if(pattern._name=="trigon_pattern"){
            this.data=this.data.concat(pattern.data);
        }
        else{
            notes.forEach(note=>{
                this.data.push({
                    synth:pattern,
                    note:note
                })
            })
        }
    }

    addNote(synth,note,hold,offset,args=null){
        if(offset>0){
            for(var i=0;i<offset;i++){
                this.data.push({
                    synth:null,
                    note:"0"
                })
            }
        }
        this.data.push({
            synth:synth,
            note:note,
            args:args
        })
        if(hold>0){
            for(var i=0;i<hold;i++){
                this.data.push({
                    synth:null,
                    note:"0"
                })
            }
        }
    }

    getLength(){
        return this.data.length;
    }
    play(step){
        // var item=null;
        // var _push=[]
        // while(item=this.playedQueue.pop()){
        //     if(!item.hold){
        //         item.synth.stop();
        //     }
        // }
        // let item=this.playedQueue.pop();
        // if(item){
        //     item.hold-=1;
        //     debugger
        //     if(item.hold<=0){
        //         item.synth.stop();
        //     }
        //     else{
        //         this.playedQueue.push(item);
        //     }
        // }
        // let _q=this.playedQueue;
        // _q.forEach(item=>{
        //     item.hold-=1;
        //     if(item.hold<=0){
        //         this.playedQueue.splice(this.playedQueue.indexOf(item),1);
        //         item.synth.stop();
        //     }
        // });
        if(step>=this.data.length){
            return false;
        }
        let synth=this.data[step].synth;
        let note=this.data[step].note;
        let args=this.data[step].args;
        if(note!="0"){
            if(this.stopOnNext&&this._lastSynth){
                this._lastSynth.stop();
            }
            if(args){
                synth.play({pitch : note, label : note,...args})
            }
            else{
                synth.play({pitch : note, label : note})
            }
            
            this._lastSynth=synth;
            console.log("track:"+this.name+" play:"+note);
        }
        return true;
    }
}