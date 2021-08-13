
import {Getters, Mutations, Actions, Module, Context, createMapper} from 'vuex-smart-module'
import {Store} from "vuex";
import JMap from "@/Models/Map/JMap";
import MapControls, {CallbackObjectInterface} from "@/Models/Map/Controls/MapControls";
import {MapBrowserEvent} from "ol";
export class MapState {
    // map: JMap = new JMap();
}

class MapActions extends Actions<
    MapState,
    MapGetters,
    MapMutations,
    MapActions
    > {
    // product!: Context<typeof ProductModule>;

    // $init (store: Store<any>): void {
    //     // this.product = ProductModule.context(store);
    // }
    // fetchDescriptors(payload: StandardActionPayload){
    //     if(this.pricing.state.isDescriptorsLoaded){
    //         if(!this.state.descriptorsLoaded){
    //             this.commit("createMapModule",this.pricing.getters.getDescriptorsModel);
    //         }
    //         if(this.product.state.isLoaded){
    //             this.commit("applySelectionFromProduct");
    //         }
    //         return;
    //     }
    //     return new Promise((resolve,reject)=>{
    //         this.pricing.actions.fetchDescriptors(payload).then(
    //             result => {
    //                 console.log('fetchDescriptors avb')
    //                 console.log(result)
    //                 if (result) {
    //                     this.commit("createMapModule", result as  DescriptorListModel)
    //                     if(this.pricing.state.isDescriptorsLoaded){
    //                         this.commit("applySelectionFromProduct");
    //                     }
    //                 }
    //             })
    //     })
    // }
}

class MapGetters extends Getters<MapState> {
    // You can declare both getter properties or methods
    // product!: Context<typeof ProductModule>;
    // // pricing!: Context<typeof priceModule>;
    // $init (store: Store<any>): void {
    //     this.product = ProductModule.context(store);
    // }
    // get map(): JMap{
    //     return this.state.map;
    // }
    // get mapControls(): MapControls{
    //     return this.state.map.getMapControls();
    // }
}

export class MapMutations extends Mutations<MapState> {

    // subscribeToControlEvent(payload: CallbackObjectInterface){
    //     this.state.map.getMapControls().subscribe(payload);
    // }
    // initMap(payload: HTMLElement){
    //     this.state.map.init(payload);
    // }
    // registerMapClickHandler(payload: (evt: MapBrowserEvent<MouseEvent>)=> void){
    //     this.state.map.registerCLickHandler(payload);
    // }

}
// Create a module with module asset classes
export const MapModule = new Module({
    state: MapState,
    getters: MapGetters,
    mutations: MapMutations,
    actions: MapActions,

})
export const mapMapper = createMapper(MapModule);