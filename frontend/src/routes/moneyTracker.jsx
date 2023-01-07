import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MoneyTracker() {
  const [txn, setTxn] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("user");
  };

  const navigate = useNavigate();
  useEffect(() => {
    let user = localStorage.getItem("user");
    if (!user) {
      navigate("/login", { replace: true });
    }
    user = JSON.parse(user)
    console.log(user)
    axios
      .post("http://localhost:4000/transactions/", user)
      .then(function (response) {
        setTxn([...response.data.data])
        console.log(txn, response.data.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const [newTxn, setNewTxn] = useState({
    amount: "0",
    category: "",
  });
  const handleAddTxnChange = (event) => {
    event.preventDefault();
    const target = event.target;
    setNewTxn({
      ...newTxn,
      [target.name]: target.value,
    });
  };

  const handleAddTxn = () => {
    console.log(newTxn);
    let user = JSON.parse(localStorage.getItem("user"));
    newTxn.email = user.email
    axios
      .post("http://localhost:4000/transactions/add", newTxn)
      .then(function (response) {
        console.log(response.data.message);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <button
        style={{ margin: 20, color: "red" }}
        onClick={handleLogout}
      >
        Logout
      </button>
      <div style={{display:"flex"}}>
        <table className="table" style={{float:"left"}}>
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Amount</th>
                <th scope="col">Category</th>
                </tr>
            </thead>
            <tbody>
                {txn && txn.length && txn.map((el,i)=>{
                    return <tr key={i}>
                    <th scope="row">{i+1}</th>
                    <td>{el.amount}</td>
                    <td>{el.category}</td>
                    </tr>
                })}
            </tbody>
            </table>
            <div className="Add-Txn-form-container">
            <form className="Auth-form">
            <div className="Auth-form-content">
                <h3 className="Auth-form-title">Add Transaction</h3>
                <label>Amount of Transaction</label>
                <input
                onChange={handleAddTxnChange}
                value={newTxn.name}
                type="number"
                className="form-control mt-1"
                placeholder="Amount"
                name="amount"
                />
                <label>Category</label>
                <select
                onChange={handleAddTxnChange}
                name="category"
                className="form-select"
                aria-label="Default select example"
                >
                <option value="Miscellaneous" defaultValue={"Miscellaneous"}>
                    Miscellaneous
                </option>
                <option value="Grocery">Grocery</option>
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                </select>
                <div className="d-grid gap-2 mt-3">
                <button
                    onClick={handleAddTxn}
                    type="submit"
                    className="btn btn-primary"
                >
                    Submit
                </button>
                </div>
            </div>
            </form>
        </div>
      </div>
    </div>
  );
}

export default MoneyTracker;
