<template>

    <div class="cell cell-map">
      <map-container></map-container>
    </div>
    <div class="cell cell-edit">
      Edit
    </div>
    <div class="cell cell-inspect">
      <inspect></inspect>
    </div>

</template>

<script lang="ts">

import Inspect from "@/components/Inspect.vue";
import {useStore} from "vuex";
import {MapBrowserEvent} from "ol";
import {toLonLat} from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import View from "ol/View";
import {defineComponent, reactive, provide} from "vue";
import JMap from "@/Models/Map/JMap";
import MapContainer from "@/components/MapContainer.vue";
import {CallbackObjectInterface} from "@/Models/Map/Controls/MapControls";

// const geometryLayer = new VectorLayer({
//   source: new VectorSource({})
// })
// const view = new View({
//   zoom: 0,
//   center: [0, 0],
//   constrainResolution: true,
//
// })
const App = defineComponent({
  name: 'App',
  components: {MapContainer, Inspect, },
  setup(){
    const store = useStore();
    const objJMap = reactive(new JMap());
    const initMap = (mapElement: HTMLElement) =>{
      objJMap.init(mapElement);
    }
    const subscribeToControlEvent = (payload: CallbackObjectInterface) =>{
      objJMap.getMapControls().subscribe(payload);
    }
    provide("map", objJMap);
    provide("initMap", initMap);
    provide("subscribeToControlEvent", subscribeToControlEvent);

    return {
      store,
      objJMap
    }
  },
  mounted() {
    // this.initMap(this.$refs['map-root'] as HTMLElement);
    // this.initMap(this.$refs['map-root'] as HTMLElement);
    // this.map.init(this.$refs['map-root']);
    // this.map.registerCLickHandler(this.handleClick);
    // this.registerMapClickHandler(this.handleClick);
  },
  methods:{
    // ...mapMapper.mapMutations(["initMap","registerMapClickHandler"]),
    handleClick(evt: MapBrowserEvent<MouseEvent>){
      console.log(evt);
      console.log(evt.coordinate[0]);
      console.log(evt.coordinate[1]);
      console.log('evt.pixel');
      console.log(evt.pixel);
      console.log('this');
      console.log(this);
      console.log(evt.map.getCoordinateFromPixel(evt.pixel));
      console.log(evt.map.getView().getProjection());

      console.log(toLonLat(evt.coordinate,'EPSG:3857'));
    }
  }
});
export default App;
</script>

<style>
html, body {
  height: 100%;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  height: 100%;
  display: grid;
  grid-template-columns: 100vh;
  grid-auto-rows: 1fr;
  grid-gap: 1rem;
  padding: 1rem;
  box-sizing: border-box;
}

.cell {
  border-radius: 4px;
  background-color: lightgrey;
}

.cell-map {
  grid-column: 1;
  grid-row-start: 1;
  grid-row-end: 3;
}

.cell-edit {
  grid-column: 2;
  grid-row: 1;
}

.cell-inspect {
  grid-column: 2;
  grid-row: 2;
}
</style>