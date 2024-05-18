import { useState, useEffect } from "react";
import axios from "axios";

import { Appbar } from "../components/Appbar.jsx";
import { Balance } from "../components/Balance.jsx";
import { Users } from "../components/Users.jsx";

function DashboardPage() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/account/balance", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setBalance(response.data.balance);
      });
  }, [balance]);

  return (
    <div>
      <Appbar label={"PayTM"} initial={"U"} />
      <div className="m-8">
        <Balance amount={balance} />
        <Users />
      </div>
    </div>
  );
}

export default DashboardPage;
