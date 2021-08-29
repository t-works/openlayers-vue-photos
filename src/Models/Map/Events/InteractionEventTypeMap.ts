import {CreateLocation} from "@/Models/Map/Events/EventTypes/CreateLocation";
import {SelectLocation} from "@/Models/Map/Events/EventTypes/SelectLocation";
import {DefaultInteractionEventType} from "@/Models/Map/Events/EventTypes/DefaultInteractionEventType";

export type InteractionEventTypeMap = {
    "onCreateLocation": CreateLocation,
    "select": SelectLocation,
}


// export interface CallbackPayload
//
// export type CallbackFnInterface<T extends string> = (event: InteractionEventTypeMapValue<T>)=> void; //Event | BaseEvent)=> void;
// export interface CallbackObjectInterface<T extends string>{
//     listenEvent: T;
//     context: any;
//     callback: CallbackFnInterface<T>
// }

export type InteractionEventTypeMapValue<T extends string> = T extends keyof InteractionEventTypeMap? InteractionEventTypeMap[T]:never;