import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {signInWithGoogle} from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase"

function Login(){
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if(loading) return;
        if(user) navigate("/home");
    },[user, navigate, loading])

    return(
        <div>
            <button onClick={signInWithGoogle}>Login With Google</button>
        </div>
    )
}

export default Login