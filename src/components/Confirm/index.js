import React, {useState, useEffect} from 'react'
import confirm from '../../API/confirm'
import getUserByToken from "../../API/getUserByToken";
import {isEmpty} from "lodash/isEmpty"

import {useCookies} from "react-cookie";
import Footer from "../../layout/Footer";

export default function Confirm(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [confirmed, setConfirmed] = useState(true)
    const [user, setUser] = useState({});
    const [cookies, setCookie] = useCookies(["token"]);

    const { history } = props;
    const code = new URLSearchParams(props.location.search).get("code")
    useEffect(() => {

        // const token = new URLSearchParams(props.location.search).get("token")
        // console.log("isEmpty(cookies.token)",isEmpty(cookies.token))
        // cookies.token === "undefined" && (
            confirm(code)
                .then((response) => {
                    if (response.status === 200) {
                        // setConfirmed(true)
                        setCookie('token',response.data.data.token)
                        props.getConfirmed(confirmed)
                    }
                })
                .then(() => {
                    history.push("/");
                })
            // .finally((response) => {
            //     setIsLoading(false);
            // })
        // )


    }, [])



    return (
        <>
            {isLoading === true ? (
                <div className="col-md-12 d-flex justify-content-center align-items-center">
                    <div
                        className="spinner-border"
                        style={{ color: "#ff9466" }}
                        role="status"
                    >
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            ) : (
                confirmed && (<p>testiqlendi</p>)
            )}
            <Footer confirm={"confirm"}/>
        </>
    )
}
