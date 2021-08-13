<template>
  <div ref="map-root"
       style="width: 100%; height: 100%">
  </div>
</template>

<script lang="ts">
import {defineComponent, inject} from "vue";
import View from 'ol/View'
import Map from 'ol/Map'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import {toLonLat} from 'ol/proj';
import VectorSource from 'ol/source/Vector'
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
// importing the OpenLayers stylesheet is required for having
// good looking buttons!
import 'ol/ol.css'
import PointerInteraction from "ol/interaction/Pointer";
import {MapBrowserEvent, MapEvent} from "ol";
import VectorLayer from "ol/layer/Vector";
import {Source} from "ol/source";
import JMap from "@/Models/Map/JMap";
// import AddPoints from "@/Models/Map/Controls/AddPoints";
import MapControls from "@/Models/Map/Controls/MapControls";
import { defaults as defaultControls} from 'ol/control';
import {mapMapper} from "@/store/modules/map";

const geometryLayer = new VectorLayer({
  source: new VectorSource({})
})
const view = new View({
  zoom: 0,
  center: [0, 0],
  constrainResolution: true,

})
const MapContainer = defineComponent({
// export default {
  name: 'MapContainer',
  components: {},
  data(){
    return {
      // map: new Map({}),
      // map: new JMap(),
      // view: view,
      // controls: new MapControls(),
      // geometrySource: new VectorSource()
    }
  },
  setup(){
    const initMapHook = inject("initMap")
    return {
      initMapHook: initMapHook as (mapElement: HTMLElement) => void
    }
  },
  props: {},
  // provide: {
  //   geometryLayer2: new VectorLayer({
  //     source: new VectorSource({})
  //   })
  // },

  computed:{
    // ...mapMapper.mapGetters(["map"]),
    // mapControls(): MapControls {
    //   return this.map.getMapControls();
    // }
  },

  mounted() {
    this.initMapHook(this.$refs['map-root'] as HTMLElement);
    // this.initMap(this.$refs['map-root'] as HTMLElement);
    // this.initMap(this.$refs['map-root'] as HTMLElement);
    // this.map.init(this.$refs['map-root']);
    // this.map.registerCLickHandler(this.handleClick);
    // this.registerMapClickHandler(this.handleClick);
  },
  // methods:{
  //   // ...mapMapper.mapMutations(["initMap","registerMapClickHandler"]),
  //   handleClick(evt: MapBrowserEvent<MouseEvent>){
  //     console.log(evt);
  //     console.log(evt.coordinate[0]);
  //     console.log(evt.coordinate[1]);
  //     console.log('evt.pixel');
  //     console.log(evt.pixel);
  //     console.log('this');
  //     console.log(this);
  //     console.log(evt.map.getCoordinateFromPixel(evt.pixel));
  //     console.log(evt.map.getView().getProjection());
  //
  //     console.log(toLonLat(evt.coordinate,'EPSG:3857'));
  //   }
  // }
})
export default MapContainer;
</script>

<style scoped>

</style>