import {InteractionEventTypeMap} from "@/Models/Map/Events/InteractionEventTypeMap";
import {CallbackObjectInterface} from "@/Models/Map/Controls/MapControls";
import {InjectionKey} from "vue";
import JMap from "@/Models/Map/JMap";
import {LocationList} from "@/Models/Locations/LocationList";
// export type EvtType =
// export type ControlEventSubscribeFn = (payload: CallbackObjectInterface<T extends EvtType>) => void;
// export const ControlEventSubscribeKey: InjectionKey<ControlEventSubscribeFn> = Symbol('ControlEventSubscribe');
export const MapKey: InjectionKey<JMap> = Symbol('Map');
export const LocationsKey: InjectionKey<LocationList> = Symbol('LocationList');