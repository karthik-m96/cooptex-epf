import { Navigate } from "react-router-dom";
import { checkIfValidUserSession } from "../../helpers/StorageHelpers";

export default function RouteAuth(props) {
  const children = props.children;
  const validUser = checkIfValidUserSession();
  if (!validUser) {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
}
