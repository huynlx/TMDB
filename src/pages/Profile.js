import Footer from "../components/Footer/Footer";
import ProfilePage from "../components/ProfilePage";
const Profile = (props) => {
  return (
    <>
      <ProfilePage props={props} />
      <Footer />
    </>
  );
};

export default Profile;
