import {InteractionEvent} from "@/Models/Map/Events/InteractionEvent";
import {DrawEvent} from "ol/interaction/Draw";
import {Feature} from "ol";
import {SelectEvent} from "ol/interaction/Select";

export class SelectLocation extends InteractionEvent<SelectEvent, Feature<any>[]>{
    getData(): Feature<any>[]{
        return this.data;
    }
}