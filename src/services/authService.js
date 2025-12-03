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

        const res = await axiosClient.post('/auth/register', values);

        return res;

}
