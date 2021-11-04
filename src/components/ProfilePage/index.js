import Header from "./Header";
import BackgroundHeader from "../../helpers/BackgroundHeader";
import Main from "./Main";
import "../../css/Main.scss";
import Navigation from "./Navigation";
import { memo, useState } from "react";

const ProfilePage = () => {
  const [select, setSelect] = useState("watchlist");
  const [type, setType] = useState("movie");
  const theme = document
    .getElementsByTagName("HTML")[0]
    .getAttribute("data-theme");
  return (
    <>
      <BackgroundHeader children={<Header />} />
      <Navigation
        type={type}
        setType={setType}
        select={select}
        setSelect={setSelect}
        theme={theme}
      />
      <Main
        type={type}
        setType={setType}
        select={select}
        setSelect={setSelect}
        theme={theme}
      />
    </>
  );
};

export default memo(ProfilePage);
