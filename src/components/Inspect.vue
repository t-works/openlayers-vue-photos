<template>
<div>
  {{ featureString }}
</div>
</template>

<script lang="ts">
import {defineComponent, inject} from "vue";
import {mapMapper} from "@/store/modules/map";
import MapControls, {CallbackObjectInterface} from "@/Models/Map/Controls/MapControls";
import BaseEvent from "ol/events/Event";
import GeoJSON from "ol/format/GeoJSON"
import JMap from "@/Models/Map/JMap";


const Inspect = defineComponent({
  name: "Inspect",
  setup(){
    const objJMap = inject("map")
    const subscribeToControlEvent = inject("subscribeToControlEvent")
    return {
      objJMap: objJMap as JMap,
      subscribeToControlEvent: subscribeToControlEvent as (payload: CallbackObjectInterface) => void
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
    }
  },
  mounted() {
    // this.mapControls.subscribe("select",this.onSelectFeature,this)
    const subscribePayload: CallbackObjectInterface = {
      callback: this.onSelectFeature,
      context: this,
      listenEvent: 'select'
    }
    this.subscribeToControlEvent(subscribePayload);
  },

  methods:{
    // ...mapMapper.mapMutations(["subscribeToControlEvent"]),
    onSelectFeature(evt: Event | BaseEvent){
      console.log(evt)
      console.log(this)
      // console.log(evt.target.features_)

    }
  }
});
export default Inspect;
</script>

<style scoped>

</style>