import Axios from "axios";

const AxiosHelper = Axios.create({
    baseURL: "http://localhost:3000",

})

export default AxiosHelper;