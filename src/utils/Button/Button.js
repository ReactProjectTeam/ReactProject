import React  from 'react';
import Button from '@material-ui/core/Button';


const ButtonCustom =({title})=> {
        const style = {
            backgroundColor: "#ff9466",
            color: "white",
            width: "100%",
            marginTop: "20px",
            height: "45px",
            fontSize: "14px"
        }

        return (
            <>
                <Button variant="contained" type="submit" style={style}>
                    {title}
                </Button>
            </>
        );

}

export default ButtonCustom;