import CreateNewLoan from "../components/CreateNewLoan/CreateNewLoan";
import { connect } from "react-redux";
import { createNewLoan } from "../redux/dashboard/dashboard.actions";

const mapStateToProps = (state) => ({
  data: state.dashboard,
});

const mapDispatchToProps = (dispatch) => ({
  createNewLoan: (loan) => dispatch(createNewLoan(loan)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewLoan);
