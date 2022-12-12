import 'bootstrap/dist/css/bootstrap.min.css';
import { useMutation } from 'react-apollo';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { gql } from 'apollo-boost';

export default function myPage() {

    const router = useRouter()
    const [loginUserId, setLoginUserId] = useState("");

    function logoutFunction() {
        localStorage.setItem("loginToken", "");
        router.push('/Login')
    }

    let gettingLoginToken = ""

    if (typeof window !== 'undefined') {
        gettingLoginToken = localStorage.getItem("loginToken");
    }

    const USER_DETAILS = gql`
    mutation userVerify($input: UserTokenInput!){
        userVerify(userToken: $input){
          access_token
        }
      }`

    const [userDetails, { loading }] = useMutation(USER_DETAILS, {
        update(proxy, result) {
            setLoginUserId(result.data.userVerify.access_token)
        },
        onError(err) {
            alert(err.graphQLErrors[0].message)
        },
        variables: {
            "input": {
                "userToken": gettingLoginToken
            }
        }
    })

    useEffect(() => {
        userDetails()
    }, []);

    return (
        <div className='text-center mt-5'>
            <h1>Hey! User with id {loginUserId}</h1>
            <button onClick={() => logoutFunction()}>Logout</button>
        </div>
    )
}

