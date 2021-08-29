<template>
  <div :class="overlayClass" v-if="privateIsVisible"></div>
    <div :class="popupClass" :style="popupStyle" v-if="privateIsVisible">
  <slot></slot>
</div>

</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";

const Popup =defineComponent({
  name: "Popup",
  props:{
    cancelAllowed:{
      type: Boolean as PropType<boolean>,
      default: false
    },
    width:{
      type: String as PropType<string>,
      default: "50%"
    },
    minWidth:{
      type: String as PropType<string>,
      default: "50%"
    },
    top:{
      type: String as PropType<string>,
      default: "20%"
    },
    isVisible:{
      type: Boolean as PropType<boolean>,
      required: true
    }
  },
  data(){
    return {
      privateIsVisible: false,
      visible: false
    }
  },

  computed:{
    popupStyle(): any{
      return {
        "--popup-width": this.width,
        "--popup-min-width": this.minWidth,
        "--popup-top": this.top,
      }
    },
    overlayClass(): string{
      return this.visible?'overlay':'overlay hidden';
    },
    popupClass(): string{
      return this.visible?'popup':'popup hidden';
    }
  },
  mounted(){
    // this.privateIsVisible = false;
    this.$watch('isVisible',(value: boolean)=>{
      if (value){

        this.privateIsVisible = true;
        this.visible = false;

        setTimeout(()=>{
          this.visible = true;
        },10)
      }else{
        this.visible = false;
        setTimeout(()=>{
          this.privateIsVisible = false;
        },1000)
      }
    })
  }
})
export default Popup;
</script>

<style scoped>
 .popup{
   width: var(--popup-width);
   min-width: var(--popup-min-width);
   top: var(--popup-top);
   background-color: #fff;
   position: fixed;
   padding: 2rem;
   left: 50%;
   margin-left: -25%;
   border-radius: 4px;
   -webkit-box-shadow: -1px 1px 17px 6px rgba(136,163,91,0.62);
   box-shadow: -1px 1px 17px 6px rgba(136,163,91,0.62);
   opacity: 1;
   transition: opacity 1s;
 }
 .popup.hidden{
   opacity: 0;
 }
 .overlay{
   position: fixed;
   width: 100%;
   height: 100%;
   background-color: RGBA(21,50,44,0.7);
   opacity: 1;
   transition: opacity 1s;
   top:0;
   left: 0;
 }
 .overlay.hidden{
   opacity: 0;
  transition: opacity 1s;
 }
</style>