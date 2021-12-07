import { Button, TextField } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useAuthContext } from "../hooks/use.auth";
import { useHistory } from "react-router";
import { Link } from "react-router-dom"

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const signInSch = Yup.object().shape({
  password: Yup.string().required("A senha  é obrigatória"),
  phone: Yup.number().required("O telefone  é obrigatório"),
  address: Yup.number().required("O CEP é obrigatório"),
  name: Yup.string().required("O nome é obrigatório"),
});

const RegisterPage = () => {
  const { register } = useAuthContext();
  const history = useHistory();
  return (
    <Formik
      initialValues={{
        phone: "",
        password: "",
        address: "",
        name: "",
      }}
      validationSchema={signInSch}
      onSubmit={async (values) => {
        // same shape as initial values
        const { status } = await register(values);
        if (status === "success") {
          history.push("/login");
        }
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
            label="Telefone"
            variant="standard"
            placeholder="Seu Telefone"
            value={values.name}
            onChange={handleChange("name")}
            error={errors.name && touched.name}
            helperText={errors.name && touched.name && errors.name}
          />
          <TextField
            id="standard-basic"
            label="CEP"
            variant="standard"
            placeholder="CEP"
            value={values.address}
            onChange={handleChange("address")}
            error={errors.address && touched.address}
            helperText={errors.address && touched.address && errors.address}
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
            Registar
          </Button>

          <p>
            Ja tem uma conta?{" "}
            <Link to="/login">
              <a>Fazer Login</a>
            </Link>
          </p>
        </FormContainer>
      )}
    </Formik>
  );
};

export default RegisterPage;
