import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { forwardRef, useState } from "react";

const CommonInputTextField = (
  {
    labelName = "",
    required = false,
    readOnly = false,
    mutedText = "",
    isInvalid = false,
    errorText = "",
    value = "",
    type = "text",
    onChange,
    className = "",
    placeHolder = "",
    isDisabled = false,
    errorClass = "",
    name = "",
    mainDiv = "",
    labelClass = "",
    ...inputProps
  },
  ref
) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <div className={mainDiv}>
      {labelName && (
        <label className={`form-label ${labelClass}`}>
          {labelName}
          {required && <span className="text-danger"> *</span>}
        </label>
      )}
      {mutedText && <small className="text-muted">{mutedText}</small>}

      <input
        ref={ref}
        type={
          type === "password"
            ? !isPasswordVisible
              ? "password"
              : "text"
            : type
        }
        className={`form-control ${isInvalid ? "is-invalid" : ""} ${className}`}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeHolder}
        readOnly={readOnly}
        disabled={isDisabled}
        {...inputProps}
      />
      {type === "password" && (
        <span className="password-toggle">
          <FontAwesomeIcon
            icon={isPasswordVisible ? faEye : faEyeSlash}
            style={{ color: "#854d0e" }}
            onClick={togglePasswordVisibility}
          />
        </span>
      )}
      {isInvalid && errorText && (
        <div className={`invalid-feedback ${errorClass}`}>{errorText}</div>
      )}
    </div>
  );
};

export default forwardRef(CommonInputTextField);
