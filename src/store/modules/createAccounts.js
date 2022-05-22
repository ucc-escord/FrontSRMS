import axios from "axios"


const state = {
 

}
const getters = {

 
      
}
const actions = {
     createProfessor({commit},formData) {
        axios.post('/api/createaccprof', formData).then((response)=>{
        

            console.log('create professor accounts' , response.data);

            
             }).catch((errors)=>{
  
             this.error =  errors.response.data;
   
             })
     },


     //update acccount

     //student

     updateAccountStudent({commit},route,formData){
        axios.put('/api/updateStudent/'+route, formData).then((response)=>{
        

            console.log('create professor accounts' , response.data);

            
             }).catch((errors)=>{
  
             this.error =  errors.response.data;
   
             })

     },

     //staff

     updateAccountStaff({commit},route,formData){
        axios.put('/api/updateAdmin/'+route, formData).then((response)=>{
        

            console.log('create professor accounts' , response.data);

            
             }).catch((errors)=>{
  
             this.error =  errors.response.data;
   
             })

            },


            //prof

            updateAccountProf({commit},route,formData){
                axios.put('/api/updateProf/'+route, formData).then((response)=>{
                
        
                    console.log('create professor accounts' , response.data);
        
                    
                     }).catch((errors)=>{
          
                     this.error =  errors.response.data;
           
                     })
        
                    },


                    //Manager

                    updateAccountManager({commit},route,formData){
                        axios.put('/api/updateManager/'+route, formData).then((response)=>{
                        
                
                            console.log('create professor accounts' , response.data);
                
                            
                             }).catch((errors)=>{
                  
                             this.error =  errors.response.data;
                   
                             })
                
                            },
        



   

}


const mutations = {
 
}


export default {
    namespace:true,
    state,
    getters,
    actions,
    mutations
}