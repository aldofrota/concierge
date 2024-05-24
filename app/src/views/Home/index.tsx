import "./index.scss";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ApexCharts from "apexcharts";
import axiosInstance from "@/services/axios.intance";
import { message } from "antd";
import { Language } from "@/types/language";
import { TranslationServiceImpl } from "@/services/translate";
import { TRollout } from "@/types/rollout";
import moment from "moment";

const Data = () => {
  const translation = new TranslationServiceImpl();
  const [language, setLanguage] = useState<Language>();
  const [messageApi, contextHolder] = message.useMessage();
  const [flaggers, setFlaggers] = useState<TRollout[]>([]);
  const [dataChartLabel, setDataChartLabel] = useState<string[]>([]);
  const [dataChartValues, setDataChartValues] = useState<number[]>([]);
  const [expiredFlaggers, setExpiredFlaggers] = useState<string[]>([]);

  const getFlaggers = async () => {
    try {
      const res = await axiosInstance.get("/all");
      const flaggersData: TRollout[] = res.data.flaggers ?? [];
      const labels: string[] = [];
      const values: number[] = [];
      const expiredFlaggers: string[] = [];
      const currentDate = moment();

      flaggersData.forEach((flagger) => {
        const expirationDate = moment(flagger.expiration_at);
        const isExpired = expirationDate.isBefore(currentDate);

        if (isExpired) expiredFlaggers.push(flagger.flagger);

        if (flagger.full_rollout) {
          labels.push(`${flagger.flagger} | FULL ROLLOUT`);
        } else {
          labels.push(flagger.flagger);
        }
        values.push(Number(flagger.ids[0]));
      });
      setFlaggers(flaggersData);
      setDataChartLabel(labels);
      setDataChartValues(values);
      setExpiredFlaggers(expiredFlaggers);
    } catch (error) {
      messageApi.error(language?.responsesAPI.err_get_rollouts);
      console.error(error);
    }
  };

  useEffect(() => {
    getFlaggers();
  }, []);

  useEffect(() => {
    var options = {
      series: [
        {
          data: dataChartValues,
        },
      ],
      chart: {
        type: "bar",
        height: 350,
      },
      dataLabels: {
        enabled: true,
      },
      xaxis: {
        categories: dataChartLabel,
      },
      grid: {
        xaxis: {
          lines: {
            show: true,
          },
        },
      },
      yaxis: {
        axisTicks: {
          show: true,
        },
      },
      tooltip: {
        enabled: true, // Desativa o tooltip padrão
      },
    };
    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, [dataChartLabel, dataChartValues]);

  return (
    <>
      {contextHolder}
      <Container fluid="sm"></Container>
      <div className="main-data">
        <div className="chart-rollouts">
          <span className="title-chart">
            Quantidade de empresas por rollout
          </span>
          <div id="chart"></div>
        </div>
        <div className="rollouts-expired">
          <span className="title-expired">Rollouts expirados</span>
          <div className="flaggers">
            {expiredFlaggers.length > 0 ? (
              expiredFlaggers.map((flagger) => {
                return (
                  <span className="flagger" key={flagger}>
                    {flagger}
                  </span>
                );
              })
            ) : (
              <div className="not-data">Sem rollouts expirados</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Data;
