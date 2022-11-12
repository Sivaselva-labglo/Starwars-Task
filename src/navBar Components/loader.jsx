import React from "react";
import ReactLoading from "react-loading";

const Loader = (props) => {
  return (
    <>
      {props.load ? <ReactLoading type="bars" height='60px' width='60px' color="white" /> : " "}
    </>
  )
}
export default Loader;