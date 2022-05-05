import axios from "axios"
import store from "../../store"
import router from "./../../router";



const state = {
    isAuthenticated: !!localStorage.getItem('token'),
    currentUser: {},
    role: localStorage.getItem('role'),
    storingerror : "",

}
const getters = {
    isAuthenticated: state => {
        return state.isAuthenticated
       },
    
       getCurrentUser: state => {
        return state.currentUser
       },

       getrole : state => {
           return state.role
       },
       geterror : state => {
        return state.storingerror
    }
      
}
const actions = {
     loginUser({commit, dispatch},User){

          axios.get('/sanctum/csrf-cookie').then(response => {
                axios.post('/api/adminlogin',User).then((response)=>{
                //   localStorage.setItem('isLoggedIn','true');
                   localStorage.setItem('token',response.data);
                    
                   axios.defaults.headers.common["Authorization"] = `Bearer ${response.data}`;
                  //   this.$router.push({name:'Dashboard'});
               
                return dispatch('currentUserLog').then(() => {
                 
                        console.log('RUNNING ACTIONS 2')


                })
     
                  }).catch((errors)=>{
    
               commit("setError",errors.response.data.errors.email[0]);
     
                  })
        
                }); //end of axios
        

        },

       currentUserLog({commit,dispatch}){
           
        axios.get('/api/user').then(response => {
         
                localStorage.setItem('role', response.data.user_role);

        
                if(response.data.user_role === "admin"){
                  //    router.push({path:'/About'});
                  router.push('/login', () => router.go(0)).catch(err => {})
              
                      
                }else if (response.data.user_role === "superadmin"){
              //    router.push({path:'/Dashboard'});
             
              router.push('/student-dashboard', () => router.go(0)).catch(err => {})

             
                  
                }else{
               //   router.push({path:'/AdminDashboard'});
               router.push('/prof-dashboard', () => router.go(0)).catch(err => {})
                
                }
 
             }).catch(()=>{
                 console.log("Error in getting the user")
             })
   
        
           },


           
       displayuser({commit}){
           
        axios.get('/api/user').then(response => {
                //   this.currentUser = response.data
           
                  commit('setUser',response.data)
                  commit('setRole',response.data.user_role)
   
               }).catch(()=>{
                   console.log("Error in getting the user")
               })
           },




           AnotherUser({commit, dispatch},User){

            axios.get('/sanctum/csrf-cookie').then(response => {
                  axios.post('/api/userlogin',User).then((response)=>{
                  //   localStorage.setItem('isLoggedIn','true');
                     localStorage.setItem('token',response.data);
                      
                     axios.defaults.headers.common["Authorization"] = `Bearer ${response.data}`;
                    //   this.$router.push({name:'Dashboard'});
                 
                  return dispatch('currentUserLog').then(() => {
                   
                          console.log('RUNNING ACTIONS 2')
  
  
                  })
       
                    }).catch((errors)=>{
      
                 commit("setError",errors.response.data.errors.email[0]);
       
                    })
          
                  }); //end of axios
          
  
          },
    
}

const mutations = {

    setUser(state,data){
       return state.currentUser = data;
      //  state.isAuthenticated = true;
    },

    setRole(state,data){
        return state.role = data;
    },
    setError(state,data){
      return state. storingerror = data;
  },

   
    LogOut(state){
        state.isAuthenticated = false;
    },
}


  
  
 



export default {
    namespace:true,
    state,
    getters,
    actions,
    mutations
}