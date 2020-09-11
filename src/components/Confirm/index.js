import React, {useState, useEffect} from 'react'
import confirm from '../../API/confirm'
export default function Confirm(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [confirmed, setconfirmed] = useState(false)
    
    useEffect(() => {
        const code = new URLSearchParams(props.location.search).get("code")
        confirm(code)
        .then((response) => {
          if (response.status === 200) {
            setconfirmed(true)
          }
        })
        .then(() => {
            history.push("/signin");
          })
        .finally((response) => {
          setIsLoading(false);
        });
    }, [])

    const { history } = props;

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
        </>
    )
}
