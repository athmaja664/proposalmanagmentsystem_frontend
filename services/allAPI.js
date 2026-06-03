import {serverURL} from "./serverURL"    
import commonAPI from "./commonAPI"   


// ADMIN LOGIN
export const adminLoginAPI = async (reqBody) => {
    return await commonAPI('POST', `${serverURL}/api/adminlogin`, reqBody, {})
}

//ADD CLIENT
export const addclientAPI=async(reqBody,reqHeader)=>{
  return await commonAPI('POST',`${serverURL}/api/addclient`,reqBody,reqHeader)
}

//GET THE CLIENT FOR THE ADD PROJECT
export const getclientAPI=async(reqHeader)=>{
  return await commonAPI('GET',`${serverURL}/api/getclient`,{},reqHeader)
}

//ADD PROJECT
export const addprojectAPI=async(reqBody,reqHeader)=>{
  return await commonAPI('POST',`${serverURL}/api/addproject`,reqBody,reqHeader)
}

//GET PROJECT FOR PROPOSAL CREATION
export const getProjectAPI=async(reqHeader)=>{
  return await commonAPI('GET',`${serverURL}/api/getproject`,{},reqHeader)
}


//CREATE PROPOSAL
export const createProposalAPI=async(reqBody,reqHeader)=>{
  return await commonAPI('POST',`${serverURL}/api/createproposal`,reqBody,reqHeader)
}

//GET CLIENT,PROJECTS FOR THE ADD PROPOSAL
export const listProposalAPI=async(reqHeader)=>{
  return await commonAPI('GET',`${serverURL}/api/getproposal`,{},reqHeader)
}

//UPDATE PROPOSALS
export const updatedProposalAPI=async(id,reqBody,reqHeader)=>{
  return await commonAPI('PUT',`${serverURL}/api/updateproposal/${id}`,reqBody,reqHeader)
}

//DELETE PROPOSALS
export const deleteProposalAPI=async(id,reqHeader)=>{
  return await commonAPI('DELETE',`${serverURL}/api/deleteproposal/${id}`,{},reqHeader)
}

// GENERATE LINK
export const generateLinkAPI = async (reqBody, reqHeader) => {
    return await commonAPI('POST', `${serverURL}/api/links/generate`, reqBody, reqHeader)
}

// REVOKE LINK
export const revokeLinkAPI = async (reqBody, reqHeader) => {
    return await commonAPI('POST', `${serverURL}/api/links/revoke`, reqBody, reqHeader)
}

// GET PROPOSAL BY TOKEN
export const getProposalByTokenAPI = async (token) => {
    return await commonAPI('GET', `${serverURL}/api/public/proposal/${token}`, null, null)
}

// VERIFY PASSWORD
export const verifyPasswordAPI = async (reqBody) => {
    return await commonAPI('POST', `${serverURL}/api/public/verify-password`, reqBody, null)
}
