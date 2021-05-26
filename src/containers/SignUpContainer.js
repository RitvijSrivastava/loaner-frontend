import SignUp from "../components/Auth/SignUp";
import { connect } from "react-redux";
import { signUpUser } from "../redux/auth/auth.actions";

const mapStateToProps = (state) => ({
  data: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  signUpUser: (user) => dispatch(signUpUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
