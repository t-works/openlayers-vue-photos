import View from 'ol/View'
import OlMap from 'ol/Map'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import {Projection, toLonLat} from 'ol/proj';
import VectorSource from 'ol/source/Vector'
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
// importing the OpenLayers stylesheet is required for having
// good looking buttons!
import 'ol/ol.css'
import PointerInteraction from "ol/interaction/Pointer";
import {Feature, MapBrowserEvent, MapEvent} from "ol";
import VectorLayer from "ol/layer/Vector";
import {Draw, Modify, Snap} from "ol/interaction";
import {Control} from "ol/control";
import MapControls from "@/Models/Map/Controls/MapControls";

type HandleClickFunctionType = (evt: MapBrowserEvent<MouseEvent>) => void;
export default class JMap {
    protected _map?: OlMap// = new OlMap({})
    protected _vectorSource =   new VectorSource();
    private _controls: MapControls | false;

    constructor() {
        this._controls = false;
        // this._controls = new MapControls(this._vectorSource, this._map);
    }
    init(target: HTMLElement): void{

        const tileLayer = new TileLayer({
            source: new OSM() // tiles are served by OpenStreetMap
        });
        // const source = new VectorSource();
        const geometryLayer = new VectorLayer({
            // source: source,
            source: this._vectorSource,
            style: new Style({
                fill: new Fill({
                    color: 'rgba(255, 255, 255, 0.2)',
                }),
                stroke: new Stroke({
                    color: '#ffcc33',
                    width: 2,
                }),
                image: new CircleStyle({
                    radius: 7,
                    fill: new Fill({
                        color: '#ffcc33',
                    }),
                }),
            }),
        })
        const view0 = new View({
            zoom: 0,
            center: [0, 0],
            projection: 'EPSG:3857',
            constrainResolution: true
        })
        this._map = new OlMap({
          layers: [tileLayer, geometryLayer],
          target:target,
          view: new View({
            center: [-11000000, 4600000],
            zoom: 4,
          }),
        });
        this._map.getView().on('change:center',(evt)=>{
            // console.log(evt)
        })
    }
    initControls(): MapControls | false{
        if(!this._controls && this._map){
            this._controls = new MapControls(this._vectorSource, this._map);
        }
        if(this._map && this._controls){
        const controls = this._controls.getControls()
            for(let i = 0; i< controls.length; i++){
                this._map.addControl(controls[i].getControl());
            }
            return this._controls;
        }
        return false;
    }
    registerCLickHandler(handler: HandleClickFunctionType){
        if(this._map) {
            this._map.on("singleclick", handler);
        }
    }
    unRegisterCLickHandler(handler: HandleClickFunctionType){
        if(this._map) {
            this._map.un("singleclick", handler);
        }
    }
    getVectorLayer(): VectorSource<any>{
        return this._vectorSource;
    }
    getMapControls(): MapControls{
        if(this._controls){
            return this._controls;
        }
        return this.initControls() as MapControls
    }
    getFeatures(): Feature<any>[]{
        return this._vectorSource.getFeatures();
    }

    addControl(control: Control){
        console.log('add control');
        console.log(control);
        if(this._map) {
            this._map.addControl(control);
        }
    }
    getMap(): OlMap | false{
        if(this._map){
            return this._map;
        }
        return false;
    }
    getProjection(): Projection | false{
        if( this._map){
            return this._map.getView().getProjection();
        }
        return false;
    }
    getCenter(): number[]{
        if(this._map){
            return this._map.getView().getCenter();
        }
        return [0,0];
    }

}