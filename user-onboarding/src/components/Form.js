import React from "react";

import { withFormik, Form, Field } from "formik";
import axios from "axios";
import * as Yup from "yup";


const OnboardingForm = ({ values, errors, touched, isSubmitting }) => {
  return (
    <Form>

      <div>
      {touched.firstName && errors.firstName && <p>{errors.firstName}</p>}
        <Field 
          type="text" 
          name="firstName" 
          placeholder="Enter First Name"
        />
      </div>

      <div>
      {touched.lastName && errors.lastName && <p>{errors.lastName}</p>}
        <Field 
          type="text" 
          name="lastName" 
          placeholder="Enter Last Name"
        />
      </div>

      <div>
      {touched.password && errors.password && <p>{errors.password}</p>}
        <Field 
          type="password" 
          name="password" 
          placeholder="Enter Password"
        />
      </div>

      <div>
      {touched.email && errors.email && <p>{errors.email}</p>}
        <Field 
          type="email" 
          name="email" 
          placeholder="Enter Your Email"
        />
      </div>

      
      <label>
        <p>Terms of Service</p>
      
      {touched.tos && errors.tos && <p>{errors.tos}</p>}
        <Field 
          
          type="checkbox" 
          name="tos" 
          checked={values.tos}
        />
      </label>
      
      
      <button disabled={isSubmitting}>
        Submit Form
      </button>

    </Form>
  );
};

const FormikOnboardingForm = withFormik({
  mapPropsToValues({ lastName, firstName, email, password, tos }) {
    return {
      firstName: "",
      lastName: "",
      email:  "",
      password: "",
      tos: false,
    };
  },

  validationSchema: Yup.object().shape({

    firstName: Yup.string()
      .min(2, "First name must be at least 2 characters")
      .required("First Name is required"),

    lastName: Yup.string()
      .min(2, "Second name must be at least 2 characters")
      .required("Last name is required"), 

    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),

    email: Yup.string()
      .email("Email not valid")
      .required("Email is required"),

    tos: Yup.boolean()
      .required()
      .oneOf([true], "Please accept terms of service" ),
  }),


  handleSubmit(values, { resetForm, setSubmitting }) {
    
    axios
      .post("https://reqres.in/api/users", values)
      .then(res => {
        window.alert(
          'Thanks ' + res.data.firstName + ' your form has been submitted'
        ) 
        resetForm();
        setSubmitting(false);
        
      })

      .catch(err => {
        console.log(err); 
        setSubmitting(false);
      });
  }


})(OnboardingForm);

export default FormikOnboardingForm
