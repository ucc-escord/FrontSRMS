<template>
    <div>
    
      <div>
              <admin-acc/>
      </div>

       <div>
              <arch-table/>
      </div>
    

       
    </div>

    
   

</template>

<script>

import adminAcc from './adminAccount.vue'
import ArchTable from './adminArchieveTable.vue'


export default {
        components: {
                adminAcc,
                ArchTable
        },
}
</script>

<style>

</style>