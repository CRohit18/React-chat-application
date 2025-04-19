const CommonButton = ({
  children,
  className,
  type = "button",
  onClick,
  style,
  ...args
}) => {
  return (
    <button
      type={type}
      style={style}
      className={`${"common-btn "} ${className}`}
      onClick={onClick}
      {...args}
    >
      {children}
    </button>
  );
};

export default CommonButton;
