import { Empty, Tooltip } from "antd";
import { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import "./index.scss";

const Notifications = () => {
  const [show, setShow] = useState(false);
  const [notifications] = useState([]);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  return (
    <>
      <Tooltip title="Notificações" color={"var(--concierge-1)"}>
        <div className="main-notifications">
          <span className="material-symbols-rounded icon" onClick={handleShow}>
            notifications
          </span>
        </div>
      </Tooltip>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement={"end"}
        scroll={true}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <span className="title-offcanvas"> Notificações</span>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {notifications.length === 0 ? (
            <Empty
              description={
                <span className="not-notification">
                  Sem nenhuma notificação por aqui
                </span>
              }
            />
          ) : (
            <span>Notificação</span>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Notifications;
