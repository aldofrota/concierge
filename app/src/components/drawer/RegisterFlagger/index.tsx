import { useEffect, useState } from "react";
import {
  Button,
  ConfigProvider,
  DatePicker,
  Drawer,
  Form,
  Input,
  Space,
  Switch,
  message,
} from "antd";
import axiosInstance from "@/services/axios.intance";
import TextArea from "antd/es/input/TextArea";
import { Language } from "@/types/language";
import { TranslationServiceImpl } from "@/services/translate";

import ptBR from "antd/es/locale/pt_BR";
import esES from "antd/es/locale/es_ES";
import enUS from "antd/es/locale/en_US";
import { StorageServiceImpl } from "@/services/storage";

type DateConfig = {
  lang: any;
  format: string;
};

const DrawerRegisterFlagger = ({ show, handleClose }: any) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  const storage = new StorageServiceImpl();
  const translation = new TranslationServiceImpl();
  const [language, setLanguage] = useState<Language>();
  const [dateConfig, setDateConfig] = useState<DateConfig>({
    lang: ptBR,
    format: "DD/MM/YYYY",
  });

  const onFinish = async (data: any) => {
    setLoading(true);
    await axiosInstance
      .post("/concierge/create", data)
      .then(() => {
        setLoading(false);
        messageApi.success(language?.responsesAPI.succes_create_rollout);
        handleClose();
      })
      .catch((reason) => {
        messageApi.error(reason.message);
        setLoading(false);
      });
  };

  const handleLanguage = () => {
    const language = storage.getData("language");

    switch (language) {
      case "portuguese":
        setDateConfig({
          lang: ptBR,
          format: "DD/MM/YYYY",
        });
        break;
      case "english":
        setDateConfig({
          lang: enUS,
          format: "MM/DD/YYYY",
        });
        break;
      case "spanish":
        setDateConfig({
          lang: esES,
          format: "DD/MM/YYYY",
        });
        break;
    }
  };

  useEffect(() => {
    if (show) {
      form.resetFields();
      setLanguage(translation.getTranslation());
      handleLanguage();
    }
  }, [show]);

  return (
    <>
      {contextHolder}
      <Drawer
        open={show}
        onClose={handleClose}
        title={language?.drawers.register_flagger}
        extra={
          <Space>
            <Button onClick={handleClose}>
              {language?.actions_buttons.cancel}
            </Button>
            <Button
              type="primary"
              onClick={() => form.submit()}
              loading={loading}
            >
              {language?.actions_buttons.save}
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            label={language?.labels_form.flagger}
            name="flagger"
            rules={[
              {
                required: true,
                message: language?.rules.flagger,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <ConfigProvider locale={dateConfig.lang}>
            <Form.Item
              label={language?.labels_form.expiration_at}
              name="expiration_at"
              rules={[
                {
                  required: true,
                  message: language?.rules.expiration_at,
                },
              ]}
            >
              <DatePicker format={dateConfig.format} />
            </Form.Item>
          </ConfigProvider>
          <Form.Item
            label={language?.labels_form.full_rollout}
            name="full_rollout"
            valuePropName="checked"
            className="divider-switch"
          >
            <Switch
              checkedChildren={language?.actions_buttons.yes}
              unCheckedChildren={language?.actions_buttons.no}
            />
          </Form.Item>
          <Form.Item
            label={language?.labels_form.description}
            name="description"
            rules={[
              {
                required: true,
                message: language?.rules.description,
              },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};
export default DrawerRegisterFlagger;
