import axios from "axios";

const commonAPI = async (httpMethod, url, reqBody, reqHeader) => {
    const reqConfig = {
        method: httpMethod,
        url,
        data: reqBody,
        headers: reqHeader
    }
    //API call using axios
    return await axios(reqConfig).then(res => {
        return res
    })
        .catch(err => {
            return err.response
        })
}
export default commonAPI