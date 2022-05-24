<template>

<!--this is for data in srms--->
 <div>

<!--This is for update account--->
      <form  novalidate  class="md-layout"   @submit.prevent="validateUser" >
          <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('student_number')">
                <label for="student-number">Student Number</label> <!---this is not edited-->
                <md-input name="student-number" id="student-number"  autocomplete="given-name" v-model="getcurrentUser.student_number" :disabled="sending" />
                <span class="md-error" v-if="!$v.getcurrentUser.student_number.required">The student number is required</span>
             <!---    <span class="md-error" v-else-if="!$v.studentAcc.stdNum.minlength">Invalid first name</span>-->
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('name')">
                <label for="std-name">Name </label>
                <md-input name="std-name" id="std-name"  autocomplete="family-name" v-model="getcurrentUser.name" :disabled="sending" />
                <span class="md-error" v-if="!$v.getcurrentUser.name.required">The name is required</span>
                  <!---       <span class="md-error" v-else-if="!$v.studentAcc.stdPassword.minlength">Invalid last name</span>
            -->  </md-field>
            </div>


            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('stdPassword')">
                <label for="std-password">New Password</label>
                <md-input type="password" name="std-password" id="std-password" autocomplete="family-name" v-model="studentAcc.stdPassword" :disabled="sending" />
                <span class="md-error" v-if="!$v.studentAcc.stdPassword.required">The New Password is required</span>
                <span class="md-error" v-else-if="!$v.studentAcc.stdPassword.minlength">Invalid Password</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('stdConfirmPass')">
                <label for="confirm-pass">Confirm Password</label>
                <md-input type="password" name="confirm-pass" id="confirm-pass" autocomplete="family-name" v-model="studentAcc.stdConfirmPass" :disabled="sending" />
                <span class="md-error" v-if="!$v.studentAcc.stdConfirmPass.required">The Confirm Password is required</span>
                <span class="md-error" v-else-if="!$v.studentAcc.stdConfirmPass.minlength ">Confirm Password is Invalid, Check Length and Same Password</span>          

              </md-field>
            </div>
          </div>

          <md-field :class="getValidationClass('email')">
            <label for="std-email">Email</label>
            <md-input type="email" name="std-email" id="std-email" autocomplete="email" v-model="getcurrentUser.email" :disabled="sending" />
            <span class="md-error" v-if="!$v.getcurrentUser.email.required">The email is required</span>
            <span class="md-error" v-else-if="!$v.getcurrentUser.email.email ">Invalid email</span>
          </md-field>
        </md-card-content>

                <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending">Update Student Account</md-button>
        </md-card-actions>
      

      <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was updated with success!</md-snackbar>
        </form>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate'
import { mapActions, mapGetters} from "vuex";
import axios from "axios"


  import {
    required,
    email,
    minLength,
    maxLength, sameAs
  } from 'vuelidate/lib/validators'

  export default {
    name: 'FormValidation',
    mixins: [validationMixin],

    mounted(){
   this.$store.dispatch('displayuser');

   
    },
    data: () => ({

     
      studentAcc: {
       
        stdPassword:null,
        stdConfirmPass:null,
     
      },
      userSaved: false,
      sending: false,
      lastUser: null
    }),
    validations: {

  getcurrentUser:{
    student_number:{
          required,
      },
      name:{
          required,
      },
      email:{
          required,
          email
      },
      },
      studentAcc: {
        stdPassword:{
          required,
               minLength: minLength(8)
        },
        stdConfirmPass:{
          required,
               minLength: minLength(8),
                sameAs: sameAs(function () { return this.studentAcc.stdPassword })

        },
      }
    },
    methods: {
      getValidationClass (fieldName) {
        const field = this.$v.studentAcc[fieldName]
        const field2 = this.$v.getcurrentUser[fieldName]



        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }

           if (field2) {
          return {
            'md-invalid': field2.$invalid && field2.$dirty
          }
        }
      },
      clearForm () {
        this.$v.$reset()
        this.studentAcc.stdPassword = null
        this.studentAcc.stdConfirmPass = null
      
      },

      saveUser () {
        this.sending = true

        this.UpdateStudent();

        // Instead of this timeout, here you can call your API
        window.setTimeout(() => {
          this.lastUser = `${this.getcurrentUser.name} ${this.getcurrentUser.email}`
          this.userSaved = true
          this.sending = false
          this.clearForm()
        }, 1500)
      },
      validateUser () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.saveUser()
        }
      },

        UpdateStudent(){
          
         //   console.log(this.studentAcc);
              
//     this.updateAccStud({route:this.getcurrentUser.id}, formDax)


    
        axios.put('/api/updateStudent/'+this.getcurrentUser.id, {
             password : this.studentAcc.stdPassword,
              confirmpass: this.studentAcc.stdConfirmPass,
              student_number : this.getcurrentUser.student_number,
              name : this.getcurrentUser.name,
              email: this.getcurrentUser.email,

        }).then((response)=>{
        

            console.log('update student accounts' , response.data);

            
             }).catch((errors)=>{
  
             this.error =  errors.response.data;
   
             })

        }
    
     
    },

    computed:{
 ...mapGetters({getcurrentUser: 'getCurrentUser'}),
  
    },
  }
</script>

<style lang="scss" scoped>
  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
</style>