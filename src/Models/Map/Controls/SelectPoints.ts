import {Control, defaults as defaultControls} from 'ol/control';
import {Options} from 'ol/control/Control';
import JControl from "@/Models/Map/Controls/JControl";
import MapControls from "@/Models/Map/Controls/MapControls";
import PointerInteraction from "ol/interaction/Pointer";
import Source from "ol/source/Source";
import Map from "ol/Map";
import {Draw, Modify, Select, Snap} from "ol/interaction";
import VectorSource from "ol/source/Vector";
import {click} from "ol/events/condition";
import {CreateLocation} from "@/Models/Map/Events/EventTypes/CreateLocation";
import {InteractionEvent} from "@/Models/Map/Events/InteractionEvent";
import BaseEvent from "ol/events/Event";
import {SelectEvent} from "ol/interaction/Select";
import {Feature} from "ol";
import {SelectLocation} from "@/Models/Map/Events/EventTypes/SelectLocation";



export default class SelectPoints extends JControl{

    /**
     * @param sequence
     * @param mapControls
     */
    // constructor(sequence: number, handleSelectControl: (controlName: string)=>void) {
    constructor(sequence: number, mapControls: MapControls) {
        const button = document.createElement('button');
        button.innerHTML = 'S';
        // console.log(handleSelectControl)
        super(sequence, mapControls, button, 'SelectPoints')

    }

    setActive(): void {
        super.setActive();

        console.log(this.getControl().getMap().getControls());
        console.log(this.getControl().getMap().getInteractions());

    }
    setInactive(): void {
        super.setInactive();

        console.log(this.getControl().getMap().getControls());
        console.log(this.getControl().getMap().getInteractions());
    }



    setupInteractions(): void{
        const selectClick = new Select({
            condition: click,
        });
        this._interactions.push(selectClick);
        selectClick.on('select',(e: SelectEvent)=>{
            console.log('on select')
            console.log(e)
            console.log(e.selected);
            const features: Feature<any>[] =e.selected;
            const interactionEvent: SelectLocation = new SelectLocation(e, features);
            this._mapControls.onInteraction('select',interactionEvent);
        })

    }
}
// export default class AddPoints extends Control{
//
//     private _isActive: boolean;
//     private _button: HTMLElement;
//     public name: string;
//     /**
//      * @param {Object} [opt_options] Control options.
//      */
//     constructor(opt_options?: Options) {
//         const options = opt_options || {};
//
//         const button = document.createElement('button');
//         button.innerHTML = 'N';
//
//         const element = document.createElement('div');
//         element.className = 'add-button ol-unselectable ol-control';
//         element.appendChild(button);
//
//         super({
//             element: element,
//             target: options.target,
//         });
//
//         button.addEventListener('click', this.handleClick.bind(this), false);
//         this._isActive = false;
//         this._button = button;
//         this.name  = "AddPoints";
//     }
//
//     handleClick() {
//         console.log('onclick')
//         // this.getMap().getView().setRotation(0);
//         this._isActive = !this._isActive
//         if(this._isActive){
//             this._button.style.backgroundColor = '#333333';
//         }else{
//             this._button.style.backgroundColor = 'rgba(0,60,136,0.7)';
//         }
//     }
// }