import React, { useState, useEffect, useRef, useMemo,useCallback } from "react";
import Main from "./Main";
import Alert from "./Alert";


const Test = () => {
    const [alertShow, setAlertShow] = useState(false);


    const alertHandle =()=>{
        setAlertShow(!alertShow)
    }

    return (
        <div className="container pt-3">
            {alertShow && (
                <Alert/>
            )}
            <Main alertHandle={alertHandle} alertShow={alertShow}/>
        </div>
    );
};


export default Test;
