import { Navigate } from "react-router-dom";
import { getUser } from "../../helpers/StorageHelpers";

export default function RouteAuth(props) {
    const children = props.children;
    // const user = getUser();
    // if (!user || !user?.isAdmin) {
    //     return (<Navigate to="/login" replace={true} />)
    // }
    return children;
}