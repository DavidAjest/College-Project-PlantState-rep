import { useEffect, useState } from "react";
import AuthenticatedGuard from "../guards/Authenticated";
import AuthenticatedAdminGuard from "../guards/AuthenticatedAdmin";
import { useAuth } from "../context/AuthContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "../firebase";
import { Chart } from "react-google-charts";
function truncateToTwoDecimals(num) {
  return Math.floor(num * 100) / 100;
}
const fetchQueries = async (uid, startDate, endDate) => {
  const coll = collection(database, `users/${uid}/predictions`);
  const q = query(coll, where("date", ">=", startDate), where("date", "<=", endDate));
  return getDocs(q).then((docs) => {
    const l = [];
    docs.forEach((d) => {
      l.push(d.data());
    });
    return l;
  });
};

function Queries() {
  const [startDate, setStartDate] = useState("2021-04-29");
  const [endDate, setEndDate] = useState("2024-06-29");
  const [results, setResults] = useState([]);

  const { user } = useAuth();
  useEffect(() => {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();

    const fetchEm = async () => {
      if (!start || !end) return;
      try {
        const res = await fetchQueries(user.uid, start, end);
        let predictions = [];
        for (let pred of res) {
          predictions.push([
            new Date(pred.date).toLocaleString(),
            truncateToTwoDecimals(pred.prediction),
          ]);
        }
        console.log(predictions);
        setResults(predictions);
      } catch (e) {
        console.error(e);
      }
    };
    fetchEm();
  }, [startDate, endDate]);

  useEffect(() => {
    console.log(results);
  }, [results]);

  return (
    <div>
      <center className="flex items-start justify-center flex-col max-w-[500px] mx-auto">
        <div className="text-2xl font-bold text-center self-center p-2">
          Query history and stats
        </div>
        <br />
        <div className="flex flex-row items-center justify-around w-full">
          <div className="flex flex-col items-start">
            <label className="font-bold py-[2px]">Start date</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div className="flex flex-col items-start">
            <label className="font-bold py-[2px]">End date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
              }}
            />
          </div>
        </div>
        {results.length > 0 && (
          <>
            <Chart
              chartType="ColumnChart"
              data={[["Date", "Health"], ...results]}
              width="100%"
              options={{
                bar: { groupWidth: "20%" },
                legend: { position: "none" },
                hAxis: {
                  title: "Date",
                },
                vAxis: {
                  title: "Health",
                },
                chartArea: { width: "50%", height: "70%" },
                title: "Plant Health Trend Over Time",
              }}
              height="400px"
            />
            {/* Show Results as a pie bar , with vs without disease */}
            <h4 className="m-auto pt-4 font-bold mb-0 translate-y-7 z-[9999]">
              Disease distribution
            </h4>
            <Chart
              chartType="PieChart"
              data={[
                ["Disease", "Count"],
                ["With Disease", results.filter(([date, health]) => health > 0.5).length],
                ["Without Disease", results.filter(([date, health]) => health <= 0.5).length],
              ]}
              width="100%"
              options={{
                is3D: true,
                chartArea: { width: "50%", height: "70%" },
                titlePosition: "center",
                // align text
                titleTextStyle: {
                  fontSize: 14,
                  alignment: "center",
                  textAlign: "center",
                  bold: true,
                },
              }}
              height="400px"
            />
          </>
        )}
      </center>
    </div>
  );
}

export default AuthenticatedGuard(Queries);
