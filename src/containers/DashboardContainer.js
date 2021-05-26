import Dashboard from "../components/Dashboard/Dashboard";
import { connect } from "react-redux";
import { createNewLoan, getLoans } from "../redux/dashboard/dashboard.actions";

const mapStateToProps = (state) => ({
  data: state.dashboard,
});

const mapDispatchToProps = (dispatch) => ({
  createNewLoan: (loan) => dispatch(createNewLoan(loan)),
  getLoans: (userId) => dispatch(getLoans(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
