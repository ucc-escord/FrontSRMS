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

        
        
                return dispatch('routeingprotection').then(() => {
                 
                    console.log('RUNNING ACTIONS 3')


            })
 
   
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


           routeingprotection({commit}){

            router.beforeEach((to, from, next) => {
                // redirect to login page if not logged in and trying to access a restricted page
                const { authorize, requiresAuth } = to.meta;
               // const currentUser = authenticationService.currentUserValue;
              
              const currentUser = localStorage.getItem('role');
              
                if (requiresAuth) {
                    if (!loggedIn()) {
                        // not logged in so redirect to login page with the return url
                        return next({ path: '/login-to-escord'});
                    }
              
                    // check if route is restricted by role
                    if (authorize.length && !authorize.includes(currentUser)) {
                        // role not authorised so redirect to home page
                        console.log(currentUser);
                        if(currentUser === 'superadmin'){
                        return next({ path: '/dashboard' }); //no component
                      }
                      if(currentUser === 'staff'){
              
                        return next({ path: '/staff' }); //mno component
                      }
                      if(currentUser === 'student'){
                        return next({ path: '/student-dashboard' });
                      }
                      if(currentUser === 'professor'){
                        return next({ path: '/prof-dashboard' });
                      }
              
                    }
                }
              jack
                next();
              })

           }
    
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


function loggedIn(){
    return localStorage.getItem('token');
   
  }
  
  
 



export default {
    namespace:true,
    state,
    getters,
    actions,
    mutations
}