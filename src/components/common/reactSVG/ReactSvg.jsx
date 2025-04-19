import { ReactSVG } from "react-svg";
const ReactSvg = ({ src, color_code = "#282828" }) => (
  <ReactSVG
    src={src}
    beforeInjection={(svg) => {
      svg.querySelectorAll("path").forEach((path) => {
        path.setAttribute("fill", color_code);
      });
    }}
  />
);
export default ReactSvg;
