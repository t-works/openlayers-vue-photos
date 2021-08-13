import {Control, defaults as defaultControls} from 'ol/control';
import {Options} from 'ol/control/Control';
import JControl from "@/Models/Map/Controls/JControl";
import MapControls from "@/Models/Map/Controls/MapControls";
import PointerInteraction from "ol/interaction/Pointer";
import Source from "ol/source/Source";
import Map from "ol/Map";
import {Draw, Modify, Select, Snap} from "ol/interaction";
import VectorSource from "ol/source/Vector";
import {Collection, Feature} from "ol";
import BaseEvent from "ol/events/Event";
import {DrawEvent} from "ol/interaction/Draw";
import { v4 as uuidv4 } from 'uuid';
import {click} from "ol/events/condition";



export default class MovePoints extends JControl{

    /**
     * @param sequence
     * @param mapControls
     *
     */
    // constructor(sequence: number, handleSelectControl: (controlName: string)=>void) {
    constructor(sequence: number, mapControls: MapControls) {
        const button = document.createElement('button');
        button.innerHTML = 'M';
        // console.log(handleSelectControl)
        super(sequence, mapControls, button, 'MovePoints')

    }

    setActive(): void {
        super.setActive();
    }
    setInactive(): void {
        super.setInactive();
    }

    setupInteractions(): void{
        const select = new Select({
            condition: click,
        });
        const modify = new Modify({
            features: select.getFeatures(),
            // source: vectorSource as VectorSource<any>
        });
        // const snap = new Snap({source: vectorSource as VectorSource<any>});

        // draw.on('drawend',this.onDrawEnd)
        // const draw = new Draw({
        //     source: vectorSource as VectorSource<any>,
        //     type: 'Point',
        //     geometryName: 'new Point',
        // });
        this._interactions.push(modify,select);
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