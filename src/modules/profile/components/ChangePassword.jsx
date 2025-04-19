import CommonButton from "@/components/common/buttons/CommonButton";
import CommonInputTextField from "@/components/common/inputTextField/CommonInputTextField";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const ChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const validationSchema = Yup.object({
    oldPassword: Yup.string().required("Old password is required"),

    newPassword: Yup.string()
      .min(6, "New password must be at least 6 characters")
      .required("New password is required"),

    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const onSubmit = (values) => {
    console.log("Submit", values);
  };
  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };
  const { values, touched, errors, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit,
    });
  return (
    <>
      <h3>Change Password</h3>
      <div className="update-profile">
        <h2 className="title">Change Password Form</h2>
        <form onSubmit={handleSubmit} className="change-password">
          <CommonInputTextField
            labelName="Old Password"
            id="oldPassword"
            type="password"
            required
            value={values.oldPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            placeHolder="Enter old password"
            isInvalid={errors.oldPassword && touched.oldPassword}
            errorText={errors.oldPassword}
            errorClass="Password-error"
          />
          <CommonInputTextField
            labelName="New Password"
            id="newPassword"
            type="password"
            required
            value={values.newPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            placeHolder="Enter new password"
            isInvalid={errors.newPassword && touched.newPassword}
            errorText={errors.newPassword}
            errorClass="Password-error"
          />
          <CommonInputTextField
            labelName="Confirm Password"
            id="confirmNewPassword"
            type="password"
            required
            value={values.confirmNewPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            placeHolder="Enter confirm password"
            isInvalid={errors.confirmNewPassword && touched.confirmNewPassword}
            errorText={errors.confirmNewPassword}
            errorClass="Password-error"
          />
          <CommonButton
            type="submit"
            disabled={isLoading}
            className="submit-btn"
          >
            Set Password
          </CommonButton>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
