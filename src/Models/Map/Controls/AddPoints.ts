import JControl from "@/Models/Map/Controls/JControl";
import MapControls from "@/Models/Map/Controls/MapControls";
import Source from "ol/source/Source";
import {Draw, Modify, Snap} from "ol/interaction";
import VectorSource from "ol/source/Vector";
import {DrawEvent} from "ol/interaction/Draw";
import { v4 as uuidv4 } from 'uuid';



export default class AddPoints extends JControl{

    private _modify: Modify;
    private _snap: Snap;
    private _draw: Draw;

    /**
     * @param sequence
     * @param mapControls
     *
     */
    // constructor(sequence: number, handleSelectControl: (controlName: string)=>void) {
    constructor(sequence: number, mapControls: MapControls) {
        const button = document.createElement('button');
        button.innerHTML = 'A';
        // console.log(handleSelectControl)
        super(sequence, mapControls, button, 'AddPoints')
        this._modify = new Modify({source: mapControls.getVectorSource() as VectorSource<any>});
        this._snap = new Snap({source: mapControls.getVectorSource() as VectorSource<any>});
        this._draw = new Draw({
            source: mapControls.getVectorSource() as VectorSource<any>,
            type: 'Point',
            geometryName: 'new Point',
        });
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        this._draw.on('drawend',(e)=> {
            this.onDrawEnd(e);
        })
    }

    setActive(): void {
        super.setActive();
        console.log(this.getControl().getMap().getControls());
    }
    setInactive(): void {
        super.setInactive();

        console.log(this.getControl().getMap().getControls());
    }
    addInteractions(): void{
        console.log('addInteractions')
        console.log(this._interactions);
        this.getControl().getMap().addInteraction(this._modify);
        this.getControl().getMap().addInteraction(this._snap);
        this.getControl().getMap().addInteraction(this._draw);
    }
    removeInteractions(): void{
        console.log('removeInteractions')
        this.getControl().getMap().removeInteraction(this._modify);
        this.getControl().getMap().removeInteraction(this._snap);
        this.getControl().getMap().removeInteraction(this._draw);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        this._draw.on('drawend',(e)=> {
            this.onDrawEnd(e);
        })
    }
    setupInteractions(vectorSource: Source): void{
        console.log('setupInteractions')
    }

    onDrawEnd(evt: DrawEvent){

        console.log('draw end')
        console.log(evt);
        console.log('this in onDrawEnd');
        console.log(this);
        const feature = evt.feature;
        console.log(feature.hasProperties())
        console.log(feature.getProperties())
        console.log(feature.getKeys())
        feature.getGeometry()
        feature.setId(uuidv4());
        feature.set('jprops',{name: 'test name'})
        console.log(feature.getProperties())
    }
}
