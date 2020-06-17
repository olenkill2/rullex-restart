<template>
   <div class="tooltip">
      <!--     <div style="position: relative;">-->
      <!--          <tooltipActivator-->
      <!--            :opened="isOpen"-->
      <!--            @update="isOpen = $event"-->
      <!--          >-->
      <!--            АКТИВАТОР-->
      <!--          </tooltipActivator>-->

      <!--          <tooltipContent-->
      <!--            v-if="isOpen"-->
      <!--          >-->
      <!--            Lorem ipsum dolor sit amet-->
      <!--          </tooltipContent>-->

      <!--          <tooltip>-->
      <!--            <template v-slot:activator {click}>-->
      <!--              s-->
      <!--            </template>-->
      <!--            <template v-slot:content>-->
      <!--              lol-->
      <!--            </template>-->
      <!--          </tooltip>-->

      <!--          <tooltip>-->
      <!--            <template v-slot:activator>-->
      <!--              b-->
      <!--            </template>-->
      <!--            <template v-slot:content>-->
      <!--              lorem-->
      <!--            </template>-->
      <!--          </tooltip>-->
      <!--        </div>-->
     <tooltipActivator
       :opened="isOpen"
       @update="isOpen = $event"
       сlass="activatorrrr"
     >
       <slot name="activator"></slot>
     </tooltipActivator>

     <tooltipContent сlass="activatorrrr2">
       <slot name="content"></slot>
     </tooltipContent>
   </div>
</template>

<script>
  import tooltipActivator from './tooltipActivator'
  import tooltipContent from './tooltipContent'
  export default {
    name: "tooltip",
    components: {
      tooltipActivator,
      tooltipContent
    },
    data() {
      return {
        isOpen: false
      }
    }
  }
</script>

<style lang="scss">
  .tooltip {
    position: relative;
  }
  .content {
    display: none;
  }
  .activator:hover ~ .content {
    display: block;
  }
</style>
