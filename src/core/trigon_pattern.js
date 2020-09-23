//import Wad from 'web-audio-daw';
import Wad from './wad/main';
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
                this.addNote(null,"0")
            }
        }
        if(!pattern){
            return;
        }
        if(pattern._name=="trigon_pattern"){
            this.data=this.data.concat(pattern.data);
        }
        else{
            notes.forEach(note=>{
                this.addNote(pattern,note)
            })
        }
    }
    
    addNote(synth,note,hold,offset,args=null){
        if(offset>0){
            for(var i=0;i<offset;i++){
                this._addNote(null,"0")
            }
        }
        this._addNote(synth,note,args);
        if(hold>0){
            for(var i=0;i<hold;i++){
                this._addNote(null,"0")
            }
        }
    }
    addEvent(event){
        this.data.push({
            note:"_e",
            event:event
        })
    }
    _addNote(synth,note,args=null){
        let _t=note.split("/");
        var note_t=4;
        if(_t.length>1){
            note=_t[0];
            note_t=parseInt(_t[1]);
        }

        if(this.data.length>0&&this.data[this.data.length-1].note=="_e"){
            let _data=this.data[this.data.length-1];
            _data.note=note;
            _data.synth=synth;
            _data.args=args;
        }
        else{
            this.data.push({
                synth:synth,
                note:note,
                args:args
            })
        }

        for(let i=1;i<note_t;i++){
            this.data.push({
                synth:null,
                note:"-",
                args:null
            })
        }
    }

    play(step){
        var _data=this.data[step];
        if(!_data){
            return false;
        }
        let synth=_data.synth;
        let note=_data.note;
        let args=_data.args;
        if(_data.event){
            _data.event(_data);
        }

        if(note!="0"&&note!="-"){
            if(this.stopOnNext&&this._lastSynth){
                this._lastSynth.stop();
            }
            let notes=note.split("+");
            if(notes.length>1){
                notes.forEach(_n=>{
                    this._play(_n,synth,args);
                });
            }
            else{
                this._play(note,synth,args);
            }
            
            
            this._lastSynth=synth;
            console.log("track:"+this.name+" play:"+note);
            
        }

        return true;
    }

    _play(note,synth,args=null){
        if(args){
            synth.play({pitch : note, label : note,...args})
        }
        else{
            synth.play({pitch : note, label : note})
        }
    }
}