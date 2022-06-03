import axios from "axios"


const state = {
    student : {},
    professor : {},
    staff: {},
    duplistud:'',
    dupliprof:'',
    duplistaff:'',


}
const getters = {
    getstudent : state => {
        return state.student
    },
    getprofessor : state => {
        return state.professor
    },
    getstaff : state => {
        return state.staff
    },
    getdupliStud : state =>{
        return state.duplistud
    },
    getdupliProf : state =>{
        return state.dupliprof
    },
    getdupliStaff : state =>{
        return state. duplistaff
    }
 
      
}
const actions = {
     createProfessor({commit},formData) {
        axios.post('/api/createaccprof', formData).then((response)=>{
        

            // console.log('create professor accounts' , response.data);
           // commit('setDupliProf',response.data)
            alert(response.data.message);


            
             }).catch((errors)=>{
  
             this.error =  errors.response.data;
   
             })
     },

     createStudent({commit},formData) {
        axios.post('/api/createaccstud', formData).then((response)=>{
        

            // console.log('create student accounts' , response.data);
           // commit('setDupliStud',response.data)

            alert(response.data.message);

            
            
             }).catch((errors)=>{
  
             this.error =  errors.response.data;
   
             })
     },

     createStaff({commit},formData) {
        axios.post('/api/createaccadm', formData).then((response)=>{
        

          
            // console.log('create staff accounts' , response.data);

//            commit('setDupliStaff',response.data)

            alert(response.data.message);

            
             }).catch((errors)=>{
  
             this.error =  errors.response.data;
   
             })
     },


     //update acccount

     //student

     //staff

    


                    //Manager

                    updateAccountManager({commit},route,formData){
                        axios.put('/api/updateManager/'+route, formData).then((response)=>{
                        
                
                            // console.log('create professor accounts' , response.data);
                                    alert(response.data.message);

                            
                             }).catch((errors)=>{
                  
                             this.error =  errors.response.data;
                   
                             })
                
                            },
        
                            showstudent({commit}){

                                axios.get('/api/showuseraccount').then(response => {
                                    //   this.currentUser = response.data
                                  //    this.student = response.data
                                  commit('setStudent',response.data)


                                //    console.log(this.student)
                            
                                   }).catch(()=>{
                                    //    console.log("Error in getting the user")
                                   }) 
                            },

                            showStaff({commit}){

                                axios.get('/api/showadminaccount').then(response => {
                                    //   this.currentUser = response.data
                                  //    this.student = response.data
                                  commit('setStaff',response.data)
                                //    console.log(this.student)
                            
                                   }).catch(()=>{
                                    //    console.log("Error in getting the user")
                                   }) 


                            },

                            showProf({commit}){

                                axios.get('/api/showprofaccount').then(response => {
                                    //   this.currentUser = response.data
                                  //    this.student = response.data
                                  commit('setProf',response.data)
                                //    console.log(this.student)
                            
                                   }).catch(()=>{
                                    //    console.log("Error in getting the user")
                                   }) 


                            },
                          

   

}


const mutations = {
    setStudent(state,data){
        return state.student = data;
       //  state.isAuthenticated = true;
     },
     setProf(state,data){
        return state.professor = data;
       //  state.isAuthenticated = true;
     },
     setStaff(state,data){
        return state.staff = data;
       //  state.isAuthenticated = true;
     },
     setDupliStud(state,data){
        return state.duplistud = data;
       //  state.isAuthenticated = true;
     },
     setDupliStaff(state,data){
        return state.duplistaff = data;
       //  state.isAuthenticated = true;
     },
     setDupliProf(state,data){
        return state.dupliprof = data;
       //  state.isAuthenticated = true;
     },

}


export default {
    namespace:true,
    state,
    getters,
    actions,
    mutations
}