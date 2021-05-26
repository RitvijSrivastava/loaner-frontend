import SignIn from "../components/Auth/SignIn";
import { connect } from "react-redux";
import { signInUser } from "../redux/auth/auth.actions";

const mapStateToProps = (state) => ({
  user: state.auth.user,
  data: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  signInUser: (user) => dispatch(signInUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
