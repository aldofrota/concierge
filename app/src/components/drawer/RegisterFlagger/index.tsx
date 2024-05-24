import { useEffect, useState } from "react";
import {
  Button,
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

const DrawerRegisterFlagger = ({ show, handleClose }: any) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  const translation = new TranslationServiceImpl();
  const [language, setLanguage] = useState<Language>();

  const onFinish = async (data: any) => {
    setLoading(true);
    await axiosInstance
      .post("/create", data)
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

  useEffect(() => {
    if (show) {
      form.resetFields();
      setLanguage(translation.getTranslation());
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
            <DatePicker format="DD/MM/YYYY" />
          </Form.Item>
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
