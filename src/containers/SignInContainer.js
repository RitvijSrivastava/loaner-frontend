import SignIn from "../components/Auth/SignIn";
import { connect } from "react-redux";
import { removeErrorMessage, signInUser } from "../redux/auth/auth.actions";

const mapStateToProps = (state) => ({
  user: state.auth.user,
  data: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  signInUser: (user) => dispatch(signInUser(user)),
  removeErrorMessage: () => dispatch(removeErrorMessage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
