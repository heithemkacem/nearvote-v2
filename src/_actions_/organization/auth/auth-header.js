export default function authHeader(){
    const org = localStorage.getItem("org")
    if(org ){
        return(
            {"x-access-token":org}
        )
    }else{
        return{}
    }
}