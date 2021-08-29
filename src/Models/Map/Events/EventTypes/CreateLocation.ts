import {InteractionEvent} from "@/Models/Map/Events/InteractionEvent";
import {DrawEvent} from "ol/interaction/Draw";
import {Feature} from "ol";

export class CreateLocation extends InteractionEvent<DrawEvent, Feature<any>>{

}