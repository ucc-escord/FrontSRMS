import Index from "@/views/Index.vue";
import Landing from "@/views/Landing.vue";
import Login from "@/views/Login.vue";
import Profile from "@/views/Profile.vue";
import MainNavbar from "@/layout/MainNavbar.vue";
import MainFooter from "@/layout/MainFooter.vue";

import NotFound from "@/layout/NotFoundPage.vue";
import escHeader from "@/escord-components/esc-Header.vue";
import escFooter from "@/escord-components/esc-Footer.vue";

//---| ESCORD COMPONENTS |---
//import escLogin from "../../escord-components/esc-Login.vue";
//import escLanding from "../../escord-components/esc-LandingPage.vue";
//import escStudDash from "../../escord-components/Student/studDashboard.vue";
//import escProfDash from "../../escord-components/Prof/profDashboard.vue";

//import escProf_GSPage from "../../escord-components/Prof/profGradesheetPage.vue";




const escLogin = () => import('../../escord-components/esc-Login.vue')
const escLanding = () => import('../../escord-components/esc-Landing-2.vue')
const escProfDash = () => import('../../escord-components/Prof/profDashboard.vue')
const escProf_GSPage = () => import('../../escord-components/Prof/profGradesheetPage.vue')


const escStudDash  = () => import('../../escord-components/Student/studDashboard.vue')

const escAbout  = () => import('../../escord-components/esc-About.vue')
const escContactUs  = () => import('../../escord-components/esc-ContactUs.vue')
const escStaffScholasticRecord  = () => import('../../escord-components/Staff/StaffScholasticRecord.vue')





const routes = [

  //---| ESCORD ROUTES |----

  {
    path: "*",
    name: "NotFound",
    component: NotFound
  },
  {
    path: "/",
    name: "Landing",
    component: escLanding,
    components: {default: escLanding, header: escHeader, footer: escFooter},

  },
  {
    path: "/login",
    name: "Login",
    component: escLogin,
    components: {default: escLogin, header: escHeader, footer: escFooter},
    meta: { requiresAuth: false }
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
  //uncomment this to have a login validation
  },
  {
    path: "/gradesheet-detail",
    name: "Gradesheet Detail",
    component: escProf_GSPage
  },
  {
    path: "/about-escord",
    name: "About",
    components: {default: escAbout, header: escHeader, footer: escFooter}
  },
  {
    path: "/contact-escord",
    name: "Contact Us",
    components: {default: escContactUs, header: escHeader, footer: escFooter}
  },
  {
    path: "/Staff-scholastic-record",
    name: "Staff Scholastic-record",
      component: escStaffScholasticRecord
  },


]




export default routes;
