<template>
    <div class="modal-container" v-click-outside="closeModal">

        <div class="modal-header">
            <H3 class="title text-esc-accent">Add New Professor</H3>
        </div>
        <H6 class="title ">{{getdupliProf.message}}</H6>

        <div class="modal-body text-center">
            <form class="md-layout mx-auto" 
            @submit.prevent="registerValidate" novalidate>

                <div class="input md-layout-item md-size-100 md-layout md-gutter md-alignment-center-space-between">
                
                    <div class="md-layout-item md-size-40">
                        <md-field
                        class="has-esc-accent"
                        :class="getValidationClass('profFN')">
                            <label> First Name </label>
                            <md-input
                            :disabled="sending" 
                            v-model="registerData.profFN"></md-input>

                            <span class="md-error" v-if="!$v.registerData.profFN.required">First name is required.</span>
                            <span class="md-error" v-else-if="!$v.registerData.profFN.minLength">Minimum of 3 characters.</span>
                        </md-field>
                    </div>

                    <div class="md-layout-item md-size-20">
                        <md-field
                        class="has-esc-accent">
                            <label>MI</label>
                            <md-input
                            v-model="registerData.profMI"></md-input>
                        </md-field>
                    </div>

                    <div class="md-layout-item md-size-40">
                        <md-field
                        class="has-esc-accent"
                        :class="getValidationClass('profLN')">
                            <label>Last Name</label>
                            <md-input
                            :disabled="sending" 
                            v-model="registerData.profLN"></md-input>

                            <span class="md-error" v-if="!$v.registerData.profLN.required">Last name is required.</span>
                            <span class="md-error" v-else-if="!$v.registerData.profLN.minLength">Minimum of 3 characters.</span>
                        </md-field>
                    </div>

                </div>

                <div class="input md-layout-item md-small-size-100">
                    <md-field 
                    class="has-esc-accent"
                    :class="getValidationClass('profRank')">
                        
                        <label> Rank/ Position </label>
                        <md-input
                        :disabled="sending" 
                        v-model="registerData.profRank"></md-input>

                        <span class="md-error" v-if="!$v.registerData.profRank.required">Rank/ position is required.</span>
                    </md-field>
                </div>

                <div class="input md-layout-item md-small-size-100">
                    <md-field 
                    class="has-esc-accent"
                    :class="getValidationClass('profEmail')">
                        
                        <label> Email </label>
                        <md-input
                        :disabled="sending" 
                        v-model="registerData.profEmail"></md-input>

                        <span class="md-error" v-if="!$v.registerData.profEmail.required">Email is required.</span>

                        <span class="md-error" v-else-if="!$v.registerData.profEmail.email">Invalid email.</span>
                    </md-field>
                </div>
                
                   <div class="md-layout-item md-size-100 md-layout md-gutter md-alignment-center-left">
            <!-- <md-field :class="getValidationClass('DefaultPassword')">-->
                  <p class="Default"> <strong>Default Password:</strong> Professor Name + UCCescord@SRMS2020</p>
                     <p class="md-subheader">ex: JERWINUCCescord@SRMS2020</p>
            
             </div>

                <div class="buttons md-layout-item md-size-100 md-layout md-gutter md-alignment-center-center">
                    <md-button 
                    type="submit" 
                    class="md-esc-accent md-round md-wd" 
                    :disabled="sending">ADD</md-button>
                </div>

               
            </form>
        </div>

        
    </div>
</template>

<script>
//validation imports
import { validationMixin } from 'vuelidate'
import { required, email, minLength } from 'vuelidate/lib/validators'
import { mapActions, mapGetters} from "vuex";

export default {
  name: "modal",
  data() {
    return {
        /* form data */
      registerData: {
          profFN: null,
          profMI: null,
          profLN: null,
          profRank: null,
          profEmail: null,
      },
      sending: false,
    };
  },
  mixins: [validationMixin], // for validation
   /* for validation */
  validations: {
      
    registerData: {
        profFN: {required, minLength: minLength(3)},
        profLN: {required, minLength: minLength(3)},
        profRank: {required},
        profEmail: {required, email}
    }
    
  },
  computed:{
     ...mapGetters({getdupliProf: 'getdupliProf'}),

    },
  methods: {
    closeModal: function() {
      this.$emit("close");
    },
    /* validation methods */
     ...mapActions({createProfessor: 'createProfessor'}),
     
    getValidationClass (fieldName) {
      const field = this.$v.registerData[fieldName]

      if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      clearForm () {
        this.$v.$reset()
        this.registerData.profFN = null
        this.registerData.profMI = null
        this.registerData.profLN = null
        this.registerData.profRank = null
        this.registerData.profEmail = null
      },
      registerValidate () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.clearForm();
          this.createProfessor(this.registerData);
          console.log("Logged in successfully.")
        }
        else {
          console.log("Failed to log in.");
        }
    },
  },
};
</script>

<style lang="scss">
.buttons
{
margin-top: 1.5em !important;
}
.Default
{
font-size: 90% !important;
}
.md-input {
  width: 0.05rem;
  max-width: 100%;
}
.md-error {
  position: absolute !important;
  top: 3.07em !important;
  left: 0 !important;
  line-height: 0.95em !important;
  text-align: left;
  font-size: .777rem !important;
}
h3, .h3 {
  font-size: 1.5em !important;
  line-height: 1em !important;
  margin-bottom: 0px !important;
}
.input {
  margin-bottom: 1em !important;
}

.__cancel {
  font-weight: bold !important;
  font-size: 0.95em !important;
}

.modal-container {
 box-shadow: none !important;
}
</style>
