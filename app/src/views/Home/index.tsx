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
import pt from "@/language/pt.json";

const Data = () => {
  const translation = new TranslationServiceImpl();
  const [language, setLanguage] = useState<Language>(pt);
  const [messageApi, contextHolder] = message.useMessage();
  const [dataChartLabel, setDataChartLabel] = useState<string[]>([]);
  const [dataChartValues, setDataChartValues] = useState<number[]>([]);
  const [fullRolloutIndexes, setFullRolloutIndexes] = useState<number[]>([]);
  const [expiredFlaggers, setExpiredFlaggers] = useState<string[]>([]);

  const getFlaggers = async () => {
    try {
      const res = await axiosInstance.get("/concierge/all");
      const flaggersData: TRollout[] = res.data ?? [];
      const labels: string[] = [];
      const values: number[] = [];
      const fullRolloutIndexes: number[] = [];
      const expiredFlaggers: string[] = [];
      const currentDate = moment();

      flaggersData.forEach((flagger, index) => {
        const expirationDate = moment(flagger.expiration_at);
        const isExpired = expirationDate.isBefore(currentDate);

        if (isExpired) expiredFlaggers.push(flagger.flagger);

        labels.push(flagger.flagger);
        values.push(Number(flagger.ids[0]));

        if (flagger.full_rollout) {
          fullRolloutIndexes.push(index);
        }
      });

      setDataChartLabel(labels);
      setDataChartValues(values);
      setFullRolloutIndexes(fullRolloutIndexes);
      setExpiredFlaggers(expiredFlaggers);
    } catch (error) {
      messageApi.error(language?.responsesAPI.err_get_rollouts);
      console.error(error);
    }
  };
  useEffect(() => {
    setLanguage(translation.getTranslation());
  }, []);

  useEffect(() => {
    getFlaggers();
  }, []);

  useEffect(() => {
    const annotations = fullRolloutIndexes.map((index) => ({
      x: dataChartLabel[index],
      y: dataChartValues[index],
      marker: {
        size: 0,
      },
      label: {
        style: {
          color: "#FF4560",
        },
        text: "💯",
        offsetY: -20,
      },
    }));

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
        enabled: true,
      },
      annotations: {
        points: annotations,
      },
    };
    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
    setLanguage(translation.getTranslation());

    return () => {
      chart.destroy();
    };
  }, [dataChartLabel, dataChartValues, fullRolloutIndexes]);

  return (
    <>
      {contextHolder}
      <Container fluid="sm"></Container>
      <div className="main-data">
        <div className="chart-rollouts">
          <span className="title-chart">
            <span>{language?.titles.chartCompaniesInRollouts}</span>
            <span>
              {language?.titles.legends}: <span>💯 full rollout</span>
            </span>
          </span>
          <div id="chart"></div>
        </div>
        <div className="rollouts-expired">
          <span className="title-expired">
            {language?.titles.flaggersExpirateded}
          </span>
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
              <div className="not-data">
                {language?.titles.notFlaggersExpirateded}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Data;
