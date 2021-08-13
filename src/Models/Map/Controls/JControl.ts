import {Control, defaults as defaultControls} from 'ol/control';
import {Options} from 'ol/control/Control';
import MapControls from "@/Models/Map/Controls/MapControls";
import Source from "ol/source/Source";
import Map from "ol/Map";
import {Modify} from "ol/interaction";
import PointerInteraction from "ol/interaction/Pointer";
import VectorSource from "ol/source/Vector";
import Interaction from "ol/interaction/Interaction";
export interface InteractionsInterface{
    interaction: PointerInteraction,
    name: string
}
export default class JControl{
    protected _control: _JControl;
    protected _sequence: number;
    protected _isActive: boolean;
    protected _button: HTMLElement;
    protected _name: string;
    // private _handleSelectControl: (controlName: string)=>void;
    protected _mapControls: MapControls;
    protected _interactions:  Interaction[]; //PointerInteraction[] |

    // constructor(sequence: number, handleSelectControl: (controlName: string)=>void, button: HTMLElement, name: string) {
    constructor(sequence: number, mapControls: MapControls, button: HTMLElement, name: string) {
        console.log(mapControls)
        this._interactions = [];
        this._button = button;
        this._isActive = false;
        // this._handleSelectControl = handleSelectControl;
        this._mapControls = mapControls;
        this._sequence = sequence;
        this._name = name;
        this._control = new _JControl(this._button,this._sequence, this.handleClick.bind(this), name );
    }

    toggleActive(): void{
        console.log('toggleActive')
        // this.getMap().getView().setRotation(0);
        this._isActive = !this._isActive
        if(this._isActive){
            this.setActive();
        }else{
            this.setInactive();
        }
    }
    getName(): string{
        return this._name;
    }
    public getControl(): Control{
        return this._control;
    }
    setInactive(): void{
        this._isActive = false;
        this._button.style.backgroundColor = 'rgba(0,60,136,0.7)';
        this.removeInteractions()
        console.log('after remove interactions:');
        console.log(this.getControl().getMap().getInteractions());
        console.log(this._mapControls.getMap().getInteractions());

    }
    setActive( ): void{
        this._isActive = true;
        this._button.style.backgroundColor = '#333333';
        this.addInteractions()
        console.log('after add interactions:');
        console.log(this.getControl().getMap().getInteractions());
        console.log(this._mapControls.getMap().getInteractions());
    }
    handleClick(): void{
        console.log('handle click')
        // console.log(this._handleSelectControl)
        this._mapControls.handleSelectControl(this._name);
        // var scope = thisObj || window;
    }
    setupInteractions(vectorSource: Source): void{
        // const modify = new Modify({source: vectorSource as VectorSource<any>});
    }
    addInteractions(): void{
        console.log('addInteractions')
        console.log(this._interactions);
        for(let i=0; i<this._interactions.length; i++){
            console.log(this._interactions[i])
            this.getControl().getMap().addInteraction(this._interactions[i]);
            // this._mapControls.getMap().addInteraction(this._interactions[i]);
        }
    }
    removeInteractions(): void{
        console.log('removeInteractions')
        for(let i=0; i<this._interactions.length; i++){
            console.log(this._interactions[i])
            this.getControl().getMap().removeInteraction(this._interactions[i]);
            // this._mapControls.getMap().removeInteraction(this._interactions[i]);
        }
    }
}

class _JControl extends Control{
    private _isActive: boolean;
    private _button: HTMLElement;
    public name: string;
    /**
     * @param button
     * @param sequence
     * @param callback
     * @param name
     * @param {Object} [opt_options] Control options.
     */
    constructor(button: HTMLElement, sequence: number, callback:  ()=>void, name: string, opt_options?: Options) {
        const options = opt_options || {};

        // const button = document.createElement('button');
        // button.innerHTML = 'N';

        const element = document.createElement('div');
        element.className = 'j-button-'+sequence+' ol-unselectable ol-control';
        element.appendChild(button);

        super({
            element: element,
            target: options.target,
        });

        // button.addEventListener('click', this.handleClick.bind(this), false);
        button.addEventListener('click', callback.bind(this), false);
        this._isActive = false;
        this._button = button;
        this.name  = name;
    }
    //
    // handleClick(): void {
    //     console.log('onclick')
    //     // this.getMap().getView().setRotation(0);
    //     this._isActive = !this._isActive
    //     if(this._isActive){
    //         this._button.style.backgroundColor = '#333333';
    //     }else{
    //         this._button.style.backgroundColor = 'rgba(0,60,136,0.7)';
    //     }
    // }
}