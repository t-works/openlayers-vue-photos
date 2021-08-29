<template>
  <popup :is-visible="visibleAddPointPopup">
    <input :value="featureName" @input="currentFeatureName = $event.target.value">
    <textarea v-html="featureDesciption" @input="currentDescription = $event.target.value"></textarea>
    <div class="actions">
      <button class="secondary" @click="visibleAddPointPopup=false">Cancel</button>
      <button class="primary" @click="doUpdateFeature">OK</button>
    </div>
  </popup>
</template>

<script lang="ts">
import {defineComponent, inject, ref} from "vue";
import {LocationsKey, MapKey} from "../../symbols";
import JMap from "../../Models/Map/JMap";
import {LocationList} from "../../Models/Locations/LocationList";
import {FeatureWrapper} from "@/Models/Locations/FeatureWrapper";
import {CreateLocation} from "@/Models/Map/Events/EventTypes/CreateLocation";
import {CallbackObjectInterface} from "@/Models/Map/Controls/MapControls";
import Popup from "@/components/UXwidgets/Popup.vue";

export const OnCreateLocationPopup = defineComponent({
  name: "OnCreateLocationPopup",
  components: {Popup},
  data(){
    return {
      currentFeatureName: '',
      currentDescription: '',
      visibleAddPointPopup: false,
    }
  },
  setup(){
    const objJMap = inject(MapKey);
    const locations = inject(LocationsKey);
    return {
      objJMap: objJMap as JMap,
      locations: locations as LocationList,
    }
  },
  computed:{
    featureName(): string{
      if(this.locations.getLastLocation()){
        return (this.locations.getLastLocation() as FeatureWrapper).getLocationData().getName();
      }else{
        return '';
      }
    },
    featureDesciption(): string{
      if(this.locations.getLastLocation()){
        return (this.locations.getLastLocation() as FeatureWrapper).getLocationData().getDescription();
      }else{
        return '';
      }
    }
  },
  mounted() {
    const subscribeCreatePayload: CallbackObjectInterface<'onCreateLocation'> = {
      callback: this.onCreate,
      context: this,
      listenEvent: 'onCreateLocation'
    }
    this.objJMap.getMapControls().subscribe<'onCreateLocation'>(subscribeCreatePayload);

  },
  methods:{
    onCreate(event: CreateLocation){
      console.log('event on create')
      console.log(event);
      this.visibleAddPointPopup = true;
      this.locations.addLocation(event.data);
      this.currentDescription = this.featureDesciption;
      this.currentFeatureName = this.featureName;
    },
    doUpdateFeature(){
      this.visibleAddPointPopup = false;
      const idx = (this.locations.getLastLocation() as FeatureWrapper).getIdx();
      this.locations.updateFeatureProp(idx,'name', this.currentFeatureName);
      this.locations.updateFeatureProp(idx,'description', this.currentDescription);
    }
  }
})
export default OnCreateLocationPopup
</script>

<style scoped>

</style>