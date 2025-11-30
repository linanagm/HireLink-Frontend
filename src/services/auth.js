

export const getData = ( key )=>
    {
    const saved = localStorage.getItem(key);
         return saved ? JSON.parse(saved) : null;
};

export const saveTokens = () => {
        const saved = localStorage.getItem("tokens");
        return saved ? JSON.parse(saved) : null;
        

}