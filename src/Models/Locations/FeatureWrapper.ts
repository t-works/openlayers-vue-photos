import {Feature} from "ol";
import {JDataInterface, LocationData} from "@/Models/Locations/LocationData";

export class FeatureWrapper{
    _feature: Feature<any>
    _data: LocationData;
    _idx: number
    readonly featurePropKey = 'jprops'
    constructor(feature: Feature<any>, idx: number) {
        this._feature = feature;
        this._idx = idx;
        const featureProps = this._feature.getProperties()
        let jdata = {name: 'created name'};
        if({}.hasOwnProperty.call(featureProps, this.featurePropKey)){
            jdata = featureProps.jprops
        }else{
            this._feature.set(this.featurePropKey,jdata)
        }
        this._data = new LocationData(jdata) ;
    }
    getLocationData(): LocationData{
        return this._data;
    }
    updateData<P extends keyof JDataInterface>(propName: P, propValue: JDataInterface[P]): void{
        this._data.setValue(propName, propValue);
        this._feature.set(this.featurePropKey, this._data.getData());
    }
    getIdx(): number{
        return this._idx;
    }
}