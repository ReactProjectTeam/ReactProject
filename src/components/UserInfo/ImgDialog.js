import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Cancel";
import Slide from "@material-ui/core/Slide";
import isEmpty from "lodash/isEmpty";

const styles = {
  croppedDiv: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "centered"
  },
  croppedImg: {
    width: "200px"
  }

};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ImgDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        {!isEmpty(this.props.img) && (
          <div style={styles.croppedDiv}>
            <img src={this.props.img} alt="Cropped" style={styles.croppedImg} />
          </div>
        )}
      </>
    );
  }
}

export default withStyles(styles)(ImgDialog);
