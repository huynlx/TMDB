import { storage } from "../../firebase";
import { useState } from "react";
import { useImperativeHandle, forwardRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { changeProfile } from "../../actions/settingActions";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FILE_SIZE } from "../../constants/GlobalConstants";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    "& .MuiSvgIcon-root": {
      display: "none",
    },
  },
  customFileUpload: {
    display: "inline-block",
    marginLeft: "10px",
    cursor: "pointer",
    borderBottom: "3px solid  white",
    fontSize: "18px",
    "&:hover": {
      borderBottom: "3px solid  black",
    },
  },
}));
const ReactFirebaseFileUpload = forwardRef((props, ref) => {
  //forwardRef phải có cả props và ref
  const [image, setImage] = useState(null);
  const classes = useStyles();
  // const [progress, setProgress] = useState(0);
  const [check, setCheck] = useState(false);
  const [preview, setPreview] = useState();
  const { user } = useSelector((state) => state.user);
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  useImperativeHandle(ref, () => ({
    handleUpload(data) {
      if (image && !check) {
        props.setLoad(true); //set loading2
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // const progress = Math.round(
            //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            // );
            // setProgress(progress);
          },
          (error) => {
            console.log(error);
          },
          () => {
            storage
              .ref("images")
              .child(image.name)
              .getDownloadURL()
              .then((url) => {
                if (
                  data.email !== user.user.email ||
                  url !== user.user.avatar
                ) {
                  user.user.email = data.email;
                  user.user.avatar = url;
                  data.username = user.user.username;
                  data.avatar = url;
                  props.dispatch(changeProfile(data, user)).then((res) => {
                    document.getElementById("uploadCaptureInputFile").value =
                      "";
                    props.notify();
                    setTimeout(() => {
                      props.setLoad(false); //=> set loading2 "false"
                    }, 0);
                  }); //=> set loading "true" (by REQUEST)
                }
              });
          }
        );
      } else {
        if (data.email !== user.user.email) {
          user.user.email = data.email;
          data.username = user.user.username;
          data.avatar = user.user.avatar;
          props.dispatch(changeProfile(data, user)); //=> set loading "true" (by REQUEST)
          props.notify();
        }
      }
    },
  }));

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!image) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(image);
    //check size of image
    if (image.size > FILE_SIZE) {
      setPreview();
      setCheck("File too large");
    } else {
      setPreview(objectUrl);
      setCheck(false);
    }
    // check width, height of image
    // const img = new Image();
    // img.src = objectUrl;
    // img.onload = function () {
    //     console.log(img.width + "x" + img.height);
    // };

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  return (
    <div>
      <div className="d-flex align-items-center">
        <Avatar alt="avatar" src={preview} className={classes.large} />
        <label
          htmlFor="uploadCaptureInputFile"
          className={classes.customFileUpload + " mb-0"}
        >
          Upload
        </label>
        {
          check && (
            <span
              className="ml-2"
              style={{ borderBottom: "2px solid transparent", color: "red" }}
            >
              {check}
            </span>
          )
          // progress !== 0 && < progress value={progress} max='100' style={{ verticalAlign: 'middle', marginLeft: '10px', border: "revert" }} />
        }
      </div>
      <input
        type="file"
        className="d-none"
        onChange={(e) => handleChange(e)}
        id="uploadCaptureInputFile"
      />
    </div>
  );
});

export default ReactFirebaseFileUpload;
