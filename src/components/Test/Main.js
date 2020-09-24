import React, { useState, useEffect, useRef, useMemo,useCallback } from "react";


const Main = ({alertHandle,alertShow}) => {

    console.log("alertShow",alertShow)
    return (
        <div>
            <h1>Salam</h1>
            <button onClick={alertHandle} className="btn btn-success">{!alertShow ? "Goster" : "Bagla"}</button>
        </div>
    );
};


export default Main;
