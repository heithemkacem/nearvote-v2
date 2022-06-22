import axios from "axios"
import { toast } from 'react-toastify';
import {sessionService} from 'redux-react-session'
const localUrl="http://localhost:5000/"
const currentUrl= localUrl

export const loginUser= (credentials,navigate,setSubmitting)=>{

return()=>{
axios.post(`${currentUrl}org/signin`,credentials,
    {
    headers: { 
        'Content-Type': 'application/json'
    }
    }
    ).then((response)=>{    
        const {data} = response
        if(data.status==="Failed"){
            const {message} = data
            toast.error(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setSubmitting(false)
           
        }else if(data.status==="Success"){
            if(response.data.data[0].token){
                localStorage.setItem("org",response.data.data[0].token)
                localStorage.setItem("isAuthenticated", "true");
                localStorage.setItem("org_id",response.data.data[0]._id );
                toast.success(`Welcome ${response.data.data[0].orgName}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setSubmitting(false)
            }
            const userData=data.data[0]
            const token = userData._id
            sessionService.saveSession(token).then(()=>{
                sessionService.saveUser(userData).then(()=>{
                    navigate('/dashboard/app', { replace: true });
                }).catch((error)=>{
                    console.log(error)
                })
            }).catch((error)=>{
                console.log(error)
            })
        }
      
    }).catch((error)=>{
        console.log(error)
    })

}}
export const signupUser= (credentials,navigate,setSubmitting)=> {
    return()=>{
    axios.post(`${currentUrl}org/signup`,credentials,{
        headers: { 
            'Content-Type': 'application/json'
          }
}).then((response)=>{
    const {data} = response
    console.log(response.data)
    if(data.status === "Failed"){
        const {message} = data;
        toast.error(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        setSubmitting(false)

       
    }else if (data.status === "Success"){
        toast.success("You Have Recived A Verification Mail", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        setSubmitting(false)
        navigate(`/verify/${data.data.orgID}`, { replace: true });
    }else if (data.status === "Pending"){
        const {message} = data;
        toast.success(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

       
    }
     //Complete Submission
     
}).catch((error)=>{
    console.log(error)
})


}}

export const logoutUser= (navigate)=>{
    return()=>{
        localStorage.clear()
        sessionService.deleteSession()
        sessionService.deleteUser()
        navigate('/home', { replace: true });
    }
}

export const getCurrentOrganization = ()=>{
    return localStorage.getItem("org")
}

export const getCurrentOrganizationId = ()=>{
    return localStorage.getItem("org_id")
}

export const forgetPassword= (credentials,navigate,setSubmitting)=>{
    //Make checks and get some data
    return()=>{
    axios.post(`${currentUrl}forgot_passwords/requestpasswordreset`,credentials,
        {
        headers: { 
            'Content-Type': 'application/json'
        }
        }
        ).then((response)=>{    
            const {data} = response
            if(data.status==="Failed"){
                //Check for specific message
                const {message} = data
                toast.error(message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setSubmitting(false)
            }else if(data.status==="Pending"){
                
                toast.success("Reset Password Request Email Sent", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progresstoastify: undefined,
                });
                setSubmitting(false)
                navigate('/login', { replace: true });
            }
        }).catch((error)=>{
            console.log(error)
        })
       
    }}


export const resetPassword= (credentials,navigate,setSubmitting)=>{
        //Make checks and get some data
        return()=>{
        axios.post(`${currentUrl}forgot_passwords/resetpassword`,credentials,
            {
            headers: { 
                'Content-Type': 'application/json'
            }
            }
            ).then((response)=>{    
                const {data} = response
                if(data.status==="Failed"){
                    const {message} = data
                    toast.error(message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setSubmitting(false)
                }else if(data.status==="Success"){
                    toast.error("password has been reseted", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setSubmitting(false)
                    navigate('/login', { replace: true });
                }
              
            }).catch((error)=>{
                console.log(error)
            })
        
}}

export const verifyOrg= (otp,navigate,setSubmitting,orgID)=>{
    //Make checks and get some data
    return()=>{
    axios.post(`${currentUrl}otp-verification/verify${orgID}`,otp,
        {
        headers: { 
            'Content-Type': 'application/json'
        }
        }
        ).then((response)=>{    
            const {data} = response
            if(data.status==="Success"){
                //Check for specific message
                const {message} = data
                toast.success(message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setSubmitting(false)
                navigate('/login', { replace: true });
            }else if(data.status==="Failed") {
                const {message} = data
                toast.error(message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setSubmitting(false)
            }
        }).catch((error)=>{
            console.log(error)
        })
       
}}

    export const resendOTP= (orgID,email,navigate,setSubmitting,)=>{
        //Make checks and get some data
        return()=>{
        axios.post(`${currentUrl}otp-verification/resendOTP`,{orgID,email},
            {
            headers: { 
                'Content-Type': 'application/json'
            }
            }
            ).then((response)=>{    
                const {data} = response
                if(data.status==="Success"){
                    //Check for specific message
                    const {message} = data
                    toast.success(message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setSubmitting(false)
                    navigate(`/verify/${orgID}`, { replace: true });
                }else if(data.status==="Failed") {
                    const {message} = data
                    toast.error(message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setSubmitting(false)
                }
            }).catch((error)=>{
                console.log(error)
            })
           
 }}
    
    export const updateOrg= (values,orgid,setSubmitting)=>{
        return()=>{
            axios.put(`${currentUrl}org/updateorg/${orgid}`,values).then((response)=>{
            const {data} = response
            if (data.status === "Success"){
                const {message} = data;
                setSubmitting(false)
                toast.success(message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });


            }else if (data.status === "Failed"){
                //User added to the DB
                const {message} = data;
                toast.error(message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                setSubmitting(false)
            }
        }).catch((error)=>{
            console.log(error)
        })
        
        
}}