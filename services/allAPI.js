import {serverURL} from "./serverURL"    
import commonAPI from "./commonAPI"   

// ADMIN LOGIN
export const adminLoginAPI = async (reqBody) => {
    return await commonAPI('POST', `${serverURL}/api/adminlogin`, reqBody, {})
}