import Index from "@/views/Index.vue";
import Landing from "@/views/Landing.vue";
import Login from "@/views/Login.vue";
import Profile from "@/views/Profile.vue";
import MainNavbar from "@/layout/MainNavbar.vue";
import MainFooter from "@/layout/MainFooter.vue";

//---| ESCORD COMPONENTS |---
import escLogin from "../../escord-components/esc-Login.vue";
import escLanding from "../../escord-components/esc-LandingPage.vue";
import escStudDash from "../../escord-components/Student/studDashboard.vue";
import escProfDash from "../../escord-components/Prof/profDashboard.vue";




const routes = [
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
    component: escProfDash,
    meta: { requiresAuth: true, authorize: 'professor' }
  }


]




export default routes;
