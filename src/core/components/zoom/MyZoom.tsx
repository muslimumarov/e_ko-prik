import "react-medium-image-zoom/dist/styles.css";
import Zoom, { UncontrolledProps } from "react-medium-image-zoom";

const MyZoom = ({ ...props }: UncontrolledProps) => {
  return <Zoom {...props} />;
};

export default MyZoom;
