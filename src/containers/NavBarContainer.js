import NavBar from "../components/NavBar/NavBar";
import { connect } from "react-redux";
import { signOutUser } from "../redux/auth/auth.actions";

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  signOutUser: () => dispatch(signOutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
