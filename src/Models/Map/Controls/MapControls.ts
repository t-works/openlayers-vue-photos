import {Control} from "ol/control";
import AddPoints from "@/Models/Map/Controls/AddPoints";
import JControl from "@/Models/Map/Controls/JControl";
import Source from "ol/source/Source";
import Map from "ol/Map";
import SelectPoints from "@/Models/Map/Controls/SelectPoints";
import BaseEvent from "ol/events/Event";
import MovePoints from "@/Models/Map/Controls/MovePoints";
import JMap from "@/Models/Map/JMap";
export type CallbackFnInterface = (event: Event | BaseEvent)=> void;
export interface CallbackObjectInterface{
    listenEvent: string;
    context: any;
    callback: CallbackFnInterface
}

export default class MapControls{
    private _controls: JControl[];
    private _vectorSource: Source;
    private _map: Map;
    private _handlers: CallbackObjectInterface[];
    constructor(vectorSource: Source, map: Map) {
        this._vectorSource = vectorSource;
        this._map = map;
        this._controls = [];
        this._controls.push(new AddPoints(0, this));
        this._controls.push(new SelectPoints(1, this));
        this._controls.push(new MovePoints(2, this));
        this.setupInteractions();
        this._handlers = [];
    }
    getControls(): JControl[]{
        return this._controls;
    }
    setupInteractions(): void{
        for(let i=0; i<this._controls.length;i++){
            this._controls[i].setupInteractions(this._vectorSource);
        }
    }
    subscribe( payload: CallbackObjectInterface){
        console.log('subscribe');
        console.log(payload);
        // const handler: CallbackObjectInterface = {
        //     callback: callback,
        //     context: context,
        //     listenEvent: event
        // }
        this._handlers.push(payload);
        console.log(this._handlers);
    }
    unSubscribe<C>( event: string, callback: CallbackFnInterface, context: C){
        this._handlers = this._handlers.filter((item)=>{
            if(item.listenEvent!==event){
                return item;
            }
            if(item.callback!==callback){
                return item;
            }
            if(item.context!==context){
                return item;
            }
        })
    }
    handleSelectControl(controlName: string): void{
        console.log(this)
        for(let i=0; i<this._controls.length;i++){
            if(this._controls[i].getName()!==controlName){
                this._controls[i].setInactive();
            }else{
                this._controls[i].toggleActive();
            }
        }
    }
    getMap(): Map{
        return this._map;
    }
    getVectorSource(){
        return this._vectorSource
    }
    onInteraction(eventName: string,event: Event | BaseEvent){
        console.log('onInteraction')
        console.log(this._handlers)
        this._handlers.forEach(function (item) {
            if(item.listenEvent === eventName){
                item.callback.call(item.context, event);
            }
        });
    }
    // registerControl(control: Control){
    //     if(!this._controls.includes(control)){
    //         this._controls.push(control);
    //     }
    // }
}