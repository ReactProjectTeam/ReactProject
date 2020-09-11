import React from 'react';
import swal from "sweetalert";

const Swal = () => {
    const handleSwal =()=>{
        swal("Qeydiyyat ugurlu oldu", "Qeydiyyatınızı tamamlamaq üçün emailden təsdiqləyin", "success",{
            button: false,
        })
    }
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12 d-flex justify-content-center align-items-center">
                        <div className="swal" style={{width: "300px",height: "300px"}}>
                            {handleSwal()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Swal;