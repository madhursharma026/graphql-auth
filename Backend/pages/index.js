import Link from 'next/link';
import { gql } from 'apollo-boost';
import { useRouter } from 'next/router';
import { useMutation } from 'react-apollo';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert, Snackbar } from '@mui/material';
import React, { useState, useEffect } from 'react';

export default function Home() {

  const [AlertMessageBg, setAlertMessageBg] = useState("");
  const [AlertMessage, setAlertMessage] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [open, setOpen] = React.useState(false);
  const [password, setPassword] = useState("");
  const router = useRouter()

  let gettingLoginToken = ""

  useEffect(() => {
    gettingLoginToken = localStorage.getItem("loginToken");
    if (gettingLoginToken != "") {
      router.push('/myPage')
    }
  });

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const SIGNUP_USER = gql`
  mutation signup($input: LoginUserInput!){
    signup(loginUserInput: $input){
      id,
      username
    }
  }`

  const [signupUser, { loading }] = useMutation(SIGNUP_USER, {
    update(proxy, result) {
      setAlertMessageBg("success")
      setAlertMessage("User Created Successfully")
      setEmailAddress("")
      setPassword("")
      handleClick()
      router.push('/Login')
    },
    onError(err) {
      setAlertMessageBg('danger')
      setAlertMessage(err.graphQLErrors[0].message)
      handleClick()
    },
    variables: {
      "input": {
        "username": `${emailAddress}`,
        "password": `${password}`
      }
    }
  })

  function formSubmit(e) {
    e.preventDefault()
    signupUser()
  }


  return (
    <div className="container-md" style={{ paddingLeft: "15%", paddingRight: "15%" }}>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} className={`text-white bg-${AlertMessageBg}`}>
          {AlertMessage}
        </Alert>
      </Snackbar>
      <h1 className="mt-3 text-center"><u>Signup</u></h1>
      <form className='mt-5' onSubmit={(e) => formSubmit(e)}>
        <div className="form-group mt-3">
          <label for="EmailAddress">Email address</label>
          <input type="email" className="form-control" id="EmailAddress" placeholder="Enter email" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} required autoComplete='off' />
        </div>
        <div className="form-group mt-3">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete='off' />
        </div>
        <button type="submit" className="btn btn-primary mt-3 w-100">Submit</button>
        <h6 className='mt-3'>Have an account? <Link href="/Login">Login</Link></h6>
      </form>
    </div>
  )
}

