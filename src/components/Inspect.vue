<template>
<div>
  {{ featureString }}
</div>
<div>
  {{ mapCenter }}
</div>


</template>

<script lang="ts">
import {defineComponent, inject, ref, watch } from "vue";
import {mapMapper} from "@/store/modules/map";
import MapControls, {CallbackFnInterface, CallbackObjectInterface} from "@/Models/Map/Controls/MapControls";
import BaseEvent from "ol/events/Event";
import GeoJSON from "ol/format/GeoJSON"
import JMap from "@/Models/Map/JMap";
import {LocationsKey, MapKey} from "@/symbols";
import {Select} from "ol/interaction";
import {SelectLocation} from "@/Models/Map/Events/EventTypes/SelectLocation";
import {CreateLocation} from "@/Models/Map/Events/EventTypes/CreateLocation";
import {Feature} from "ol";
import {SelectEvent} from "ol/interaction/Select";
import {LocationList} from "@/Models/Locations/LocationList";
import {FeatureWrapper} from "@/Models/Locations/FeatureWrapper";
import {Projection} from "ol/proj";
import OlMap from "ol/Map";
import View from "ol/View";

type GreetFunction<T> = (a: T) => void;
const Inspect = defineComponent({
  name: "Inspect",
  data(){
    return {
      visibleAddPointPopup: false,
      view: {} as View,
      centerData: [0,0]
    }
  },
  setup(){
    const objJMap = inject(MapKey);
    const locations = inject(LocationsKey);
    const features = ref([] as Feature<any>[]); //ref<
    const onLoadFeature= (feature: Feature<any>)=>{
      features.value.push(feature);
    }
    return {
      objJMap: objJMap as JMap,
      features: features,
      locations: locations as LocationList,
      onLoadFeature: onLoadFeature
      // subscribeToControlEvent: subscribeToControlEvent //as (payload: CallbackObjectInterface) => void
    }
  },
  computed:{
    // ...mapMapper.mapGetters(["map"]),
    mapControls(): MapControls{
      return this.objJMap.getMapControls();
    },
    mapCenter(): string{
      if(this.objJMap.getMap()){
        console.log('projection')
        console.log((this.objJMap.getProjection() as Projection).getExtent());
        console.log(((this.objJMap as JMap).getMap() as OlMap).getView().getCenter());
        // const center = ((this.objJMap as JMap).getMap() as OlMap).getView().getCenter();
        console.log(((this.objJMap as JMap).getMap() as OlMap).getView().getZoom());
        // return (this.objJMap.getProjection() as Projection).getExtent().toString();
        // return center[0] + "," + center[1];
        return this.centerData[0] + "," + this.centerData[1];
      }
      return ''
    },
    featureString(): string{
      const features = this.objJMap.getFeatures()
      console.log('features');
      console.log(features);
      // let parser = new ol.format.GeoJSON();
      let parser = new GeoJSON();
      // let area = parser.writeFeatureObject(arg1.feature, {featureProjection: 'EPSG:3857'});
      let area = parser.writeFeatures(features, {featureProjection: 'EPSG:3857'});
      return area;
    },

    featureName(): string{

      if(this.locations.getLastLocation()){
        return (this.locations.getLastLocation() as FeatureWrapper).getLocationData().getName();
      }else{
        return '';
      }
    }
  },
  mounted() {
    this.centerData = ((this.objJMap as JMap).getMap() as OlMap).getView().getCenter();
    ((this.objJMap as JMap).getMap() as OlMap).getView().on('change:center',(evt)=>{
      console.log(evt)
      console.log(evt.target)
      this.centerData = (evt.target as View).getCenter()
    });
    // this.mapControls.subscribe("select",this.onSelectFeature,this)
    const subscribePayload: CallbackObjectInterface<'select'> = {
      callback: this.onSelect,
      context: this,
      listenEvent: 'select'
    }
    const subscribeCreatePayload: CallbackObjectInterface<'onCreateLocation'> = {
      callback: this.onCreate,
      context: this,
      listenEvent: 'onCreateLocation'
    }
    // this.subscribeToControlEvent(subscribePayload);
    this.objJMap.getMapControls().subscribe<'select'>(subscribePayload);
  },

  methods:{
    // ...mapMapper.mapMutations(["subscribeToControlEvent"]),
    onSelect(event: SelectLocation){
      console.log(event)
      this.visibleAddPointPopup = true;
      const data: Feature<any>[] = event.getData()

      const feature = event.data
      // fn()
      // console.log(evt.target.features_)

    },

    onCreate(event: CreateLocation){
      console.log('event on create')
      console.log(event);
      this.visibleAddPointPopup = true;
      this.onLoadFeature( event.data);
      this.locations.addLocation(event.data);
    },

  }
});
export default Inspect;
</script>

<style scoped>

</style>