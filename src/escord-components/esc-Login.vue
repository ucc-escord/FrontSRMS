<template>
  <div class="wrapper">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto"
          >
            
            <md-card>
                <md-card-content>
                    <h3 class="title text-center text-esc-darkgrey">Login</h3>

                    <form @submit.prevent="loginValidate" novalidate>

                        <md-field 
                        class="md-form-group has-esc-accent"
                        md-clearable
                        :class="getValidationClass('userEmail')">
                            <md-icon>
                                alternate_email
                            </md-icon>
                            <label>Email Address</label>
                            <md-input
                            :disabled="sending" 
                            v-model="loginData.userEmail"
                            type="email"></md-input>

                            <span class="md-error" v-if="!$v.loginData.userEmail.required">Email is required.</span>

                            <span class="md-error" v-else-if="!$v.loginData.userEmail.email">Invalid email.</span>
                        </md-field>

                        <md-field 
                        class="md-form-group has-esc-accent"
                        :class="getValidationClass('userPassword')">
                            <md-icon>
                                lock_outline
                            </md-icon>
                            <label>Password</label>
                            <md-input
                            :disabled="sending" 
                            v-model="loginData.userPassword"
                            type="password"></md-input>

                            <span class="md-error" v-if="!$v.loginData.userPassword.required">Password is required.</span>
                        </md-field>
                       
                        <md-checkbox
                        v-model="loginData.rememberPass">
                        Remember my password
                        </md-checkbox>

                        <div class="__card-buttons md-layout md-gutter md-alignment-center-space-between">
                            <md-button
                            class="md-layout-item md-size-45 md-simple md-dense md-round md-info">
                                Reset Password
                            </md-button>

                            <md-button
                            class="md-layout-item md-size-45 md-dense md-round md-esc-accent"
                            type="submit"
                            :disabled="sending">
                                Login
                            </md-button>

                        </div>

                        
                    </form>
                </md-card-content>
            </md-card>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

//validation imports
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'

export default {
  bodyClass: "escord-login-page",
  data() {
    return {
        /* form data */
      loginData: {
          userEmail: null,
          userPassword: null,
          rememberPass: false
      },
      sending: false,
    };
  },
  mixins: [validationMixin], // for validation

   /* for validation */
  validations: {
      loginData: {
          userEmail: {required, email},
          userPassword: {required}
      }
  },

  props: {
    header: {
      type: String,
      default: require("@/assets/img/bg-545454.jpg")
    }
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    }
  },

  methods: {
    /* validation methods */
    getValidationClass (fieldName) {
      const field = this.$v.loginData[fieldName]

      if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      clearForm () {
        this.$v.$reset()
        this.loginData.userEmail = null
        this.loginData.userPassword = null
      },
      loginValidate () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          console.log("Logged in successfully.")
        }
        else {
          console.log("Failed to log in.");
        }
    }
  }
};
</script>

<style lang="scss" scoped>

h3.title {
    margin-bottom: 2rem !important;
}

.__card-buttons {
    margin-top: 1.5rem !important;
}

.md-field {
    margin-bottom: 1em !important;
}

.md-error {
  position: absolute !important;
  top: 3.07em !important;
  left: 2.25rem !important;
  line-height: 0.95em !important;
  text-align: justify;
  font-size: .777rem !important;
}

.md-input {
    text-transform: none !important;
}

// .md-checkbox {
//   position: relative !important;
//   top: -1.5em !important;
//   left: 0.15rem !important;
// }
</style>
