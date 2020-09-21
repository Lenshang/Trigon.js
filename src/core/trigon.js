import Wad from 'web-audio-daw';
import Instrument from './trigon_instrument';
var STATE={
    INIT:0,
    RUNNING:1,
    PAUSE:2,
    STOP:3
}
export default class{
    constructor(){
        this.tracks=[]
        this.interval=null;
        this.step=0;
        this.bpm=60;
        this.state=STATE.INIT;
        this._frameCount=0;
        this._skipFrame=60;
        this._stopMark=false;
        this._name="trigon";
    }

    sine(args){
        return new Wad({ source : 'sine',...args});
    }
    sawtooth(args){
        return new Wad({ source : 'sawtooth',...args});
    }
    square(args){
        return new Wad({ source : 'square',...args});
    }
    triangle(args){
        return new Wad({ source : 'triangle',...args});
    }
    baseDrum(args){
        var inst=new Instrument();
        var map={
            "kick":new Wad({source : './samples/drum/kick.wav',...args}),
            "snare":new Wad({source : './samples/drum/snare.wav',...args}),
            "ohh":new Wad({source : './samples/drum/openhh.wav',...args}),
            "chh":new Wad({source : './samples/drum/closehh.wav',...args}),
        }
        inst.setMap(map);
        inst.onTrigger=args=>{
            var notes=args["pitch"].split("+");
            notes.forEach(note=>{
                inst._play(note,args);
            });
        }
        return inst;
    }
    addTrack(pattern){
        this.tracks.push(pattern)
    }
    setBpm(bpm){
        this.bpm=bpm;
        this._skipFrame=Math.round(60*60/bpm/2)
        console.log(this._skipFrame)
    }
    play(){
        if(this.state==STATE.INIT){
            this.stop();
        }
        if(this.state!=STATE.RUNNING){
            this._stopMark=false;
            this.state=STATE.RUNNING;
            requestAnimationFrame(()=>{
                this._onFrame();
            })
        }
    }
    _onFrame(){
        if(!this._stopMark){
            requestAnimationFrame(()=>{
                this._onFrame();
            })
        }
        else{
            return;
        }
        this._frameCount+=1;
        if (this._frameCount % (1 + this._skipFrame) != 0) {
            return;
        }
        let isStop=true;
        this.tracks.forEach(track=>{
            //console.log("play:"+track.name)
            if(track.play(this.step)){
                isStop=false;
            }
        });
        this.step+=1;
        if(isStop){
            this.stop();
        }
        
    }
    pause(){
        this._stopMark=true;
        this.state=STATE.PAUSE;
    }
    stop(){
        this._frameCount=0;
        this.step=0;
        this._stopMark=true;
        this.state=STATE.STOP;
    }
}