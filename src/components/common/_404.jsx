import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import CommonButton from "./buttons/CommonButton";
import routesConstants from "@/routes/routesConstants";
import { ErrorImg, LeftWire, RightWire } from "@/constants/images";

const _404 = () => {
  const { isAuth } = useSelector((state) => state.login);
  const navigate = useNavigate();
  return (
    <div className="account-pages my-5 pt-5">
      <Container>
        <Row>
          <Col lg="12">
            <div className="position-relative four-backdrop" style={{}}>
              <img
                src={LeftWire}
                alt="Left Wire"
                className="position-absolute"
                style={{
                  left: "6%",
                  top: "68%",
                  transform: "translateY(-50%)",
                }}
              />
              <img
                src={RightWire}
                alt="Right Wire"
                className="position-absolute"
                style={{
                  right: "6%",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />

              <img src={ErrorImg} alt="404 Error" className="img-fluid" />
            </div>
            <div className="mt-5 text-center">
              <CommonButton
                className={"mx-auto"}
                onClick={() => {
                  navigate(routesConstants?.[isAuth ? "DASHBOARD" : "LOGIN"]);
                }}
              >
                {`Back to ${isAuth ? "Home" : "Login"}`}
              </CommonButton>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default _404;
