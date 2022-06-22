import axios from "axios"
import {sessionService} from 'redux-react-session'
import authHeader from "../../organization/auth/auth-header"
import { toast } from 'react-toastify';

const localUrl="http://localhost:5000/"
const currentUrl= localUrl

export const loginVoter= (credentials,navigate,setSubmitting)=>{
return()=>{
axios.post(`${currentUrl}voter/votersignin`,credentials,
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
                localStorage.setItem("voter",response.data.data[0].token)
                localStorage.setItem("voter_id",response.data.data[0]._id)
                localStorage.setItem("email",response.data.data[0].email)
                localStorage.setItem("isVoterAuthenticated", "true");
                toast.success(`Welcome ${response.data.data[0].firstName} ${response.data.data[0].lastName}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            
            const userData=data.data[0]
            const token = userData._id
            sessionService.saveSession(token).then(()=>{
                sessionService.saveUser(userData).then(()=>{
                navigate(`/voter-dashboard/app`)   
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

export const getCurrentVoter = ()=>{
    return localStorage.getItem("voter_id")
}

export const getCurrentVoterEmail = ()=>{
    return localStorage.getItem("email")
}

export const signupVoter= (credentials,setSubmitting,navigate)=> {
    return()=>{
    axios.post(`${currentUrl}voter/votersignup`,credentials,{
        headers: 
        authHeader()
}).then((response)=>{
    const {data} = response
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
        //User added to the DB
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
            setSubmitting(false)
            navigate('/dashboard/voters-list', { replace: true });
            
    }
     //Complete Submission
}).catch((error)=>{
    console.log(error)
})
}}

export const createVoteRoom= (credentials,navigate,setSubmitting)=> {
    return()=>{
    axios.post(`${currentUrl}voteroom/createvoteroom`,credentials,{
        headers: 
           authHeader()
}).then((response)=>{
    const {data} = response
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
        //User added to the DB
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
            setSubmitting(false)

            navigate(`/dashboard/vote-party/${data.data._id}`, { replace: true });
    }
}).catch((error)=>{
    console.log(error)
})
}}

export const signupVoterFromExcel= (fileData)=> {
    return()=>{
    axios.post(`${currentUrl}voter/votersignupfromexcel`,{fileData},{
        headers: 
            authHeader()
}).then((response)=>{
   
    const {data} = response
    
    const myArray = data.split("/");
    console.log(myArray)
    myArray.map((res)=>{
        if(res === "A voter aleardy exist with this email"){
            toast.error("A voter aleardy exist with this email", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }else if(res === "A voter aleardy exist with this Phone"){
            toast.error("A voter aleardy exist with this Phone", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }else if(res === "A voter aleardy exist with this Username"){
            toast.error("A voter aleardy exist with this Username", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }else if(res === "Check your excel file a variable is missing"){
            toast.error("Check your excel file a variable is missing", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }else if(res === "Voter has been created"){
            toast.success("Voter has been added", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
        
        return res  
    })

    setTimeout(function(){
        window.location.reload(1);
     }, 3500);
}).catch((error)=>{
    console.log(error)
})
}}

export const AddVoteParty= (formData)=> {
    return()=>{
    axios.post(`${currentUrl}voteparty/addvoteparty`,(formData),{
        headers: 
            authHeader()
}).then((response)=>{
    const {data} = response
    if (data.status === "Success"){
        //User added to the DB
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
    if (data.status === "Failed"){
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
    }
   
}).catch((error)=>{
    console.log(error)
})
}}

export const logoutVoter= (navigate)=>{
    return()=>{
        localStorage.clear()
        sessionService.deleteSession()
        sessionService.deleteUser()
        navigate(`/home`, { replace: true });
    }
}

export const updateVoter= (values,voter_id,setSubmitting)=>{
    return()=>{
        axios.put(`${currentUrl}voter/updatevoter/${voter_id}`,(values)).then((response)=>{
        const {data} = response
        if (data.status === "Success"){
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
            setSubmitting(false)


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
    
    
     }
}

export const updateVoteRoom= (values,setSubmitting,voteroomid,navigate)=>{
    return()=>{
        axios.put(`${currentUrl}voteroom/update-vote-room/${voteroomid}`,(values)).then((response)=>{
        const {data} = response
        if (data.status === "Success"){
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
            setSubmitting(false)
            navigate(`/dashboard/vote-party/${data.data2._id}`, { replace: true });
            
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
    
    
     }
}

export const voterForgetPassword= (credentials,navigate,setSubmitting,)=>{
    
    //Make checks and get some data
    return()=>{
    axios.post(`${currentUrl}voter_forgot_passwords/voterrequestpasswordreset`,credentials,
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
                toast.info("email with password reset has been send", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                    setSubmitting(false)
                    navigate('/voter-login', { replace: true });
            }
            //Complete Submission
           
        }).catch((error)=>{
            console.log(error)
        })
       
    }}

export const voterResetPassword= (credentials,navigate,setSubmitting)=>{
        //Make checks and get some data
        return()=>{
        axios.post(`${currentUrl}voter_forgot_passwords/voterresetpassword`,credentials,
            {
            headers:{ 
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
                    //Check for specific message
                    setSubmitting(false)
                   
                }else if(data.status==="Success"){
                    
                    setSubmitting(false)
                    toast.success("password has been reseted", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                        navigate('/voter-login', { replace: true });
                }
                //Complete Submission
               
            }).catch((error)=>{
                console.log(error)
            })
}}

export const deleteVoter= (data)=> {
    
    return()=>{
    axios.delete(`${currentUrl}voter/deletevoter`,{data},{  
        headers: 
               authHeader()
        }
    )
    .then((response)=>{
                    toast.error(response.data, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    })
                    window.location.reload()
    }).catch((error)=>{
    console.log(error)
    })

}}

export const sendEmails= (id)=> {
    return()=>{
    axios.post(`${currentUrl}voteroom/sendvotersemail`,id,{  
        headers: 
               authHeader()
        }
    )
    .then((response)=>{
        const {data} = response
                if(data.status==="Pending"){
                    const {message} = data
                    toast.info(message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                }
    }).catch((error)=>{
    console.log(error)
    })
}}
