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
                this.addNote(null,"0")
            }
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

    _addNote(synth,note,args=null){
        let _t=note.split("/");
        var note_t=4;
        if(_t.length>1){
            note=_t[0];
            note_t=parseInt(_t[1]);
        }

        this.data.push({
            synth:synth,
            note:note,
            args:args
        })
    }

    getLength(){
        return this.data.length;
    }
    play(step){
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