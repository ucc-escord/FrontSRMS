//do not use this router


import Vue from "vue";
import Router from "vue-router";
import Index from "./views/Index.vue";
import Landing from "./views/Landing.vue";
import Login from "./views/Login.vue";
import Profile from "./views/Profile.vue";
import MainNavbar from "./layout/MainNavbar.vue";
import MainFooter from "./layout/MainFooter.vue";

//---| ESCORD COMPONENTS |---
import escLogin from "./escord-components/esc-Login.vue";
import escLanding from "./escord-components/esc-LandingPage.vue";
import escStudDash from "./escord-components/Student/studDashboard.vue";
import escProfDash from "./escord-components/Prof/profDashboard.vue";
import escStaffDash from "./escord-components/Staff/profDashboard.vue";

import escProf_GSPage from "./escord-components/Prof/profGradesheetPage.vue";


Vue.use(Router);


function loggedIn(){
  return localStorage.getItem('token');
 
}

function guardMyroute(to, from, next){


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




}



export default new Router({
  routes: [
    {
      path: "/",
      name: "index",
      components: { default: Index, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" }
      }
    },
    {
      path: "/landing",
      name: "landing",
      components: { default: Landing, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" }
      }
    },
    {
      path: "/login",
      name: "login",
      components: { default: Login, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 }
      }
    },
    {
      path: "/profile",
      name: "profile",
      components: { default: Profile, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" }
      }
    },

    //---| ESCORD ROUTES |----
    {
      path: "/welcome-to-escord",
      name: "Landing",
      component: escLanding
    },
    {
      path: "/login-to-escord",
      name: "Login",
      component: escLogin
    },
    {
      path: "/student-dashboard",
      name: "Student Dashboard",
      component: escStudDash
    },
    {
      path: "/prof-dashboard",
      name: "Professor Dashboard",
      component: escProfDash
    },
    {
      path: "/gradesheet-detail",
      name: "Gradesheet Detail",
      component: escProf_GSPage
    }
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});



