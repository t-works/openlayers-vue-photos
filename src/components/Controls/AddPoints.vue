<template>
<div class="add-button ol-unselectable ol-control" ref="control">
  <button>A</button>
</div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'
import AddPoints from "@/Models/Map/Controls/AddPoints";
import MapControls from "@/Models/Map/Controls/MapControls";
export default {
  name: "AddPoints",
  setup(){
    const controlElement = ref(null);
    const control = ref(null);
    onMounted(()=>{
      control.value = new AddPoints(controlElement.value)
      MapControls.registerControl(control.value);
    })
    return{
      controlElement,
    }
  },
}
</script>

<style scoped>

</style>