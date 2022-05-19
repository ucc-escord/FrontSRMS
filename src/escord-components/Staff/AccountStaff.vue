<template>
<div>
 <form   @submit.prevent="UpdateStaff">
        <md-card-content>
            <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('stdNum')">
                <label for="student-number">Student Number</label> <!---this is not edited-->
                <md-input name="student-number" id="student-number"  autocomplete="given-name" v-model="getcurrentUser.student_number" :disabled="sending" />
           
             <!---    <span class="md-error" v-else-if="!$v.staffAcc.stdNum.minlength">Invalid first name</span>-->
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('stdName')">
                <label for="std-name">Firstname </label>
                <md-input name="std-name" id="std-name"  autocomplete="family-name" v-model="getcurrentUser.firstname" :disabled="sending" />
         
                  <!---       <span class="md-error" v-else-if="!$v.staffAcc.stdPassword.minlength">Invalid last name</span>
            -->  </md-field>
            </div>

               <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('stdName')">
                <label for="std-name">Lastname  </label>
                <md-input name="std-name" id="std-name"  autocomplete="family-name" v-model="getcurrentUser.lastname" :disabled="sending" />
         
                  <!---       <span class="md-error" v-else-if="!$v.staffAcc.stdPassword.minlength">Invalid last name</span>
            -->  </md-field>
            </div>


            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('stdPassword')">
                <label for="std-password">New Password</label>
                <md-input name="std-password" id="std-password" autocomplete="family-name" v-model="staffAcc.stdPassword" :disabled="sending" />
                <span class="md-error" v-if="!$v.staffAcc.stdPassword.required">The last name is required</span>
                <span class="md-error" v-else-if="!$v.staffAcc.stdPassword.minlength">Invalid last name</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('stdConfirmPass')">
                <label for="confirm-pass">Confirm Password</label>
                <md-input name="confirm-pass" id="confirm-pass" autocomplete="family-name" v-model="staffAcc.stdConfirmPass" :disabled="sending" />
                <span class="md-error" v-if="!$v.staffAcc.stdConfirmPass.required">The last name is required</span>
                <span class="md-error" v-else-if="!$v.staffAcc.stdConfirmPass.minlength">Invalid last name</span>
              </md-field>
            </div>
          </div>

          <md-field :class="getValidationClass('stdEmail')">
            <label for="std-email">Email</label>
            <md-input type="email" name="std-email" id="std-email" autocomplete="email" v-model="getcurrentUser.email" :disabled="sending" />
        
          </md-field>
        </md-card-content>

                <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending">Update Student Account</md-button>
        </md-card-actions>
      
      

  <!--    <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar> -->
        </form>
        </div>
</template>


<script>
 import { validationMixin } from 'vuelidate'
import axios from "axios"
import { mapActions, mapGetters} from "vuex";

  import {
    required,
    email,
    minLength,
    maxLength
  } from 'vuelidate/lib/validators'

  export default {
    name: 'FormValidation',
    mixins: [validationMixin],
      mounted(){
   this.$store.dispatch('displayuser');

   
    },

    data: () => ({
      form: {
        firstName: null,
        lastName: null,
        gender: null,
        age: null,
        email: null,
      },
       staffAcc: {
     
        stdPassword:null,
        stdConfirmPass:null,
    
      },

      userSaved: false,
      sending: false,
      lastUser: null
    }),
    validations: {
      form: {
        firstName: {
          required,
          minLength: minLength(3)
        },
        lastName: {
          required,
          minLength: minLength(3)
        },
        age: {
          required,
          maxLength: maxLength(3)
        },
        gender: {
          required
        },
        email: {
          required,
          email
        }
      },

       staffAcc: {
        stdPassword:{
          required,
               minLength: minLength(8)
        },
        stdConfirmPass:{
          required,
               minLength: minLength(8)
        },
      }
    },
      computed:{
 ...mapGetters({getcurrentUser: 'getCurrentUser'}),
  
    },
    methods: {
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      clearForm () {
        this.$v.$reset()
        this.form.firstName = null
        this.form.lastName = null
        this.form.age = null
        this.form.gender = null
        this.form.email = null
      },
      saveUser () {
        this.sending = true

        // Instead of this timeout, here you can call your API
        window.setTimeout(() => {
          this.lastUser = `${this.form.firstName} ${this.form.lastName}`
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

        UpdateStaff(){
               axios.put('/api/updateAdmin/'+this.getcurrentUser.id, {
              password : this.staffAcc.stdPassword,
              confirmpass: this.staffAcc.stdConfirmPass,
              student_number : this.getcurrentUser.student_number,
              firstname : this.getcurrentUser.firstname,
              lastname : this.getcurrentUser.lastname,
              email: this.getcurrentUser.email,

               }).then((response)=>{
        

            console.log('update staff accounts' , response.data);

            
             }).catch((errors)=>{
  
             this.error =  errors.response.data;
   
             })
      },
    }
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