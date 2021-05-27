import Dashboard from "../components/Dashboard/Dashboard";
import { connect } from "react-redux";
import { getLoans } from "../redux/dashboard/dashboard.actions";

const mapStateToProps = (state) => ({
  data: state.dashboard,
});

const mapDispatchToProps = (dispatch) => ({
  getLoans: (userId) => dispatch(getLoans(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
