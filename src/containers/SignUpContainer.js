import SignUp from "../components/Auth/SignUp";
import { connect } from "react-redux";
import { removeErrorMessage, signUpUser } from "../redux/auth/auth.actions";

const mapStateToProps = (state) => ({
  data: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  signUpUser: (user) => dispatch(signUpUser(user)),
  removeErrorMessage: () => dispatch(removeErrorMessage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
