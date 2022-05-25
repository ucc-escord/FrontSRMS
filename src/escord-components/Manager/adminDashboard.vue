<template>
    <div>
    
      <div>
              <admin-acc/>
      </div>

       <div>
              <admin-new-user/>
      </div>
    

       
    </div>

    
   

</template>

<script>

import adminAcc from './adminAccount.vue'
import adminNewUser from './adminAddNewUser.vue'


export default {
        components: {
                adminAcc,
                adminNewUser
        },
}
</script>

<style>

</style>