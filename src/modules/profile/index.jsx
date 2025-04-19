import CommonButton from "@/components/common/buttons/CommonButton";
import CommonInputTextField from "@/components/common/inputTextField/CommonInputTextField";
import {
  FirstNameRequired,
  LastNameRequired,
  PhoneRegex,
  PhoneRequired,
  PhoneValidation,
} from "@/constants/SchemaValidation";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { getUserProfile } from "./slice/profileSlice";

const Profile = () => {
  const [selectedImage, setSelectedImage] = useState(
    "https://trisita.s3.amazonaws.com/images/e1c393b8-9738-4219-8919-677d66919cb1.jpeg"
  );

  const params = useParams();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setSelectedImage(imageURL);

      // Optionally: append this to FormData or store it in formik manually
    }
  };

  const validationSchema = Yup.object({
    firstname: Yup.string().trim().required(FirstNameRequired),
    lastname: Yup.string().trim().required(LastNameRequired),
    phone: Yup.string()
      .matches(PhoneRegex, PhoneValidation)
      .required(PhoneRequired),
  });

  useEffect(() => {
    if (params?.id) {
      dispatch(getUserProfile(params?.id));
    }
  }, []);

  const initialValues = {
    firstname: "Ankit",
    lastname: "Shah",
    phone: "9819403014",
    designation: "Business Head",
  };
  const onSubmit = (values) => {
    console.log("Submit", values);
  };

  const { values, touched, errors, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit,
    });

  return (
    <>
      <h3>Manage Profile</h3>
      <div className="update-profile">
        <h2 className="title">Update Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group image-upload">
            <div className="image-wrapper">
              <img src={selectedImage} alt="Profile" className="profile-img" />
              <div className="edit-icon">
                <label htmlFor="imageInput" className="icon-btn">
                  ✏️
                </label>
                <input
                  type="file"
                  id="imageInput"
                  name="profile_image"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                />
              </div>
            </div>
            <label htmlFor="profile_image" className="label">
              Profile Image
            </label>
          </div>
          <CommonInputTextField
            labelName="First Name"
            id="firstname"
            name="firstname"
            className="input"
            required
            mainDiv="form-group"
            labelClass="label"
            value={values?.firstname}
            placeHolder="Enter your first name"
            isInvalid={errors.firstname && touched.firstname}
            errorText={errors.firstname}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <CommonInputTextField
            labelName="Last Name"
            id="lastname"
            name="lastname"
            className="input"
            required
            mainDiv="form-group"
            labelClass="label"
            value={values?.lastname}
            placeHolder="Enter your last name"
            isInvalid={errors.lastname && touched.lastname}
            errorText={errors.lastname}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <CommonInputTextField
            labelName="Phone"
            id="phone"
            name="phone"
            className="input"
            required
            mainDiv="form-group"
            labelClass="label"
            value={values?.phone}
            placeHolder="Enter your first name"
            isInvalid={errors.phone && touched.phone}
            errorText={errors.phone}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <CommonInputTextField
            labelName="Designation"
            id="designation"
            name="designation"
            className="input"
            mainDiv="form-group"
            labelClass="label"
            value={values?.designation}
            placeHolder="Enter your first name"
            isInvalid={errors.designation && touched.designation}
            errorText={errors.designation}
            isDisabled
          />
          <CommonButton className="submit-btn" type="submit">
            Update Profile
          </CommonButton>
        </form>
      </div>
    </>
  );
};

export default Profile;
