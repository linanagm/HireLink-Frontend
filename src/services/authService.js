import axiosClient from "./axiosClient";


export const getData = ( key )=>
    {
    const saved = localStorage.getItem(key);
         return saved ? JSON.parse(saved) : null;
};

export const saveTokens = () => {
        const saved = localStorage.getItem("tokens");
        return saved ? JSON.parse(saved) : null;
        

}


// -------------------------------------------------

export async function register(values) {

        const res = await axiosClient.post('/auth/register', values, { timeout: 60000 }); 

        return res;

}


//-----------------------------------------------------------
export async function verifyEmail(verificationToken) {
  try{
      const res = await axiosClient.post("/auth/verify", {
      verificationToken: verificationToken
  });
  return res.data;

  }catch(error){
      console.log('verifyemail server error: \n ' , error);
    return error;   
  }
  
  
}

// -------------------------------------------------------

export async function login({email, password}) {
  try{
      const res = await axiosClient.post("/auth/login", {email, password})
      console.log('API DATA: \n', res.data);
      
      return res.data;
  } catch(error)
  
  {
      console.log('login server error : \n',error);
      
      
      return error;     
  }
  

 
}
