<template>
<div>
  {{ featureString }}
</div>


</template>

<script lang="ts">
import {defineComponent, inject, ref} from "vue";
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

type GreetFunction<T> = (a: T) => void;
const Inspect = defineComponent({
  name: "Inspect",
  data(){
    return {
      visibleAddPointPopup: false,

    }
  },
  setup(){
    const objJMap = inject(MapKey);
    const locations = inject(LocationsKey);
    const features = ref([] as Feature<any>[]); //ref<
    const onNewFeature = (feature: Feature<any>)=> {
      features.value.push(feature);
    }

    const updateFeatureName = (name: string)=>{

      // (features[0] as Feature<any>).setProperties('')
      let value: any = (features.value[0] as Feature<any>).getProperties();

      // (features.value[0] as Feature<any>).setProperties('jprops', value: any)
    }
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