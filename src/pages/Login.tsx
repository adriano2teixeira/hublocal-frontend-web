import { Button, TextField } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useAuthContext } from "../hooks/use.auth";
import { Link } from "react-router-dom";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const signInSch = Yup.object().shape({
  password: Yup.string().required("A senha  é obrigatória"),
  phone: Yup.number().required("O telefone  é obrigatório"),
});

const LoginPage = () => {
  const { login } = useAuthContext();
  return (
    <Formik
      initialValues={{
        phone: "",
        password: "",
      }}
      validationSchema={signInSch}
      onSubmit={async (values) => {
        // same shape as initial values
        await login(values.phone, values.password);
      }}
    >
      {({ errors, touched, values, handleChange, submitForm }) => (
        <FormContainer>
          <TextField
            id="standard-basic"
            label="Telefone"
            variant="standard"
            placeholder="Seu Telefone"
            value={values.phone}
            onChange={handleChange("phone")}
            error={errors.phone && touched.phone}
            helperText={errors.phone && touched.phone && errors.phone}
          />
          <TextField
            id="standard-basic"
            label="Senha"
            variant="standard"
            placeholder="*******"
            value={values.password}
            onChange={handleChange("password")}
            error={errors.password && touched.password}
            helperText={errors.password && touched.password && errors.password}
          />

          <Button
            type="button"
            color="primary"
            className="form__custom-button"
            onClick={submitForm}
          >
            Entrar
          </Button>

          <p>
            Ainda não tem conta?{" "}
            <Link to="/register">
              <a>Registe-se</a>
            </Link>
          </p>
        </FormContainer>
      )}
    </Formik>
  );
};

export default LoginPage;
