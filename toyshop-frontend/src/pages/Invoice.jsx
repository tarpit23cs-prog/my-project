import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getInvoice } from "../services/orderService";

function Invoice() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    loadInvoice();
  }, []);

  const loadInvoice = async () => {
    const res = await getInvoice(orderId);
    if (res.success) {
      setInvoice(res.data);
    }
  };

  if (!invoice) return <h3>Loading invoice...</h3>;

  return (
    <>
      <h2>Invoice</h2>

      <p><b>Company:</b> Toy Shop Management System</p>
      <p><b>Invoice ID:</b> {invoice.id}</p>
      <p><b>Order Date:</b> {new Date(invoice.createdAt).toDateString()}</p>
      <p><b>Customer:</b> {invoice.customerName}</p>

      <hr />

      {invoice.items.map(item => (
        <div key={item.id} style={{ marginBottom: 8 }}>
          <p>{item.name}</p>
          <p>Quantity: {item.quantity}</p>
        </div>
      ))}

      <hr />

      <h3>Total Amount: ₹{invoice.totalAmount}</h3>

      <p>Thank you for shopping!</p>
      <button onClick={() => window.print()}>
        Download Invoice
      </button>

    </>
  );
}

export default Invoice;
