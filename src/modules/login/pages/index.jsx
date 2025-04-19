import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { getLogin, setPageLoader } from "../slice/loginSlice";
import routesConstants from "@/routes/routesConstants";
import {
  EmailRequired,
  EmailValidation,
  PasswordRequired,
  PasswordValidation,
} from "@/constants/SchemaValidation";
import { Construction } from "@/constants/images";
import CommonButton from "@/components/common/buttons/CommonButton";
import CommonInputTextField from "@/components/common/inputTextField/CommonInputTextField";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [darkTheme, setDarkTheme] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    if (currentTheme) {
      setDarkTheme(currentTheme === "dark");
    }
  }, []);

  const initialValues = {
    email: "ankit.shah@trisita.com",
    password: "Rivaan@007",
  };

  const validationSchema = Yup.object({
    email: Yup.string().trim().email(EmailValidation).required(EmailRequired),
    password: Yup.string()
      .min(6, PasswordValidation)
      .required(PasswordRequired),
  });

  const onSubmit = async () => {
    //Handle page loader
    dispatch(setPageLoader(true));
    //get login
    setIsLoading(true);
    dispatch(
      getLogin({
        email: values.email?.trim(),
        password: values.password?.trim(),
      })
    ).then(() => {
      //Handle page loader
      navigate(routesConstants?.DASHBOARD);
      dispatch(setPageLoader(false));
      setIsLoading(false);
    }).catch(() =>  
    {navigate(routesConstants?.DASHBOARD)
    dispatch(setPageLoader(false))
    setIsLoading(false)}
    );
  };

  const { values, touched, errors, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit,
    });

  return (
    <div
      className="login_container"
      style={{ backgroundImage: `url(${Construction})` }}
    >
      <div className="loginBox">
        <div className="header">
          <h1>Welcome to Trisita</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <CommonInputTextField
              labelName="Email Address"
              id="email"
              required
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeHolder="Enter your email address"
              isInvalid={errors.email && touched.email}
              errorText={errors.email}
            />
          </div>
          <div className="formGroup">
            <CommonInputTextField
              labelName="Password"
              id="password"
              type="password"
              required
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeHolder="Enter your password"
              isInvalid={errors.password && touched.password}
              errorText={errors.password}
              errorClass="Password-error"
            />
          </div>
          <CommonButton type="submit" disabled={isLoading}>
            Login
          </CommonButton>
        </form>
      </div>
    </div>
  );
};

export default Login;
