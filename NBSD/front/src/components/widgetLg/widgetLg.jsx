import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import "./widgetLg.css";
import { format } from "timeago.js"

export default function WidgetLg() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("orders");
        setOrders(res.data);
      } catch {}
    };
    getOrders();
  }, []);
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Dernières transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Client</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Montant</th>
          <th className="widgetLgTh">Statut du paiement</th>
          <th className="widgetLgTh">Statut de la livraison</th>

        </tr>
        {orders.map((order) => (
          <tr className="widgetLgTr" key={order.userId}>
            <td className="widgetLgUser">
              <span className="widgetLgName">{order.userId}</span>
            </td>
            <td className="widgetLgDate">{format(order.createdAt)}</td>
            <td className="widgetLgAmount">{order.total} €</td>
            <td className="widgetLgStatus">
              <Button type={order.payment_status} />
            </td>
            <td className="widgetLgStatus">
              <Button type={order.delivery_status} />
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}