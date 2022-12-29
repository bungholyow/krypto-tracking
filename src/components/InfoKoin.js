import axios from "axios";
import React, { useEffect, useState } from "react";
import { CryptoState } from "../CryptoContext";
import { HistoricalChart } from "../config/api";
import {
  CircularProgress,
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import { Line } from "react-chartjs-2";
import { chartDays } from "../config/data";
import TombolSelect from "./TombolSelect";

const InfoKoin = () => {
  const [historiData, setHistoriData] = useState();
  const [hari, setHari] = useState();

  const { currency } = CryptoState();
  const [flag, setflag] = useState(false);

  const useStyles = makeStyles((theme) => ({
    container: {
      width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
    },
  }));

  const classes = useStyles();

  const fetchHistoriData = async (koin) => {
    const { data } = await axios.get(HistoricalChart(koin.id, hari, currency));

    setHistoriData(data.prices);
  };

  useEffect(() => {
    fetchHistoriData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency, hari]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {!historiData | (flag === false) ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: historiData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return hari === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historiData.map((coin) => coin[1]),
                    label: `Price ( Past ${hari} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <TombolSelect
                  key={day.value}
                  onClick={() => {
                    setHari(day.value);
                    setflag(false);
                  }}
                  selected={day.value === hari}
                >
                  {day.label}
                </TombolSelect>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default InfoKoin;
