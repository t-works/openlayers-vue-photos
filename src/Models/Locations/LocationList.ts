import {Feature} from "ol";
import {FeatureWrapper} from "@/Models/Locations/FeatureWrapper";
import {JDataInterface} from "@/Models/Locations/LocationData";

export class LocationList{
    features: FeatureWrapper[] = [];
    addLocation(feature: Feature<any>){
        const featureWrapper = new FeatureWrapper(feature, this.features.length);
        this.features.push(featureWrapper);
    }
    getLastLocation(): FeatureWrapper | false{
        if(this.features.length === 0){
            return false;
        }
        return this.features[this.features.length-1];
    }
    updateFeatureProp<P extends keyof JDataInterface>(idx: number, prop: P, value: JDataInterface[P]): void{
        console.log('updateFeatureProp')
        console.log(value)
        this.features[idx].updateData<P>(prop,value);
    }
}