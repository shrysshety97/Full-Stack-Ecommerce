// import React from "react";
// import "./Orders.css";
// import { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useEffect } from "react";
// import { assets } from "../../assets/assets";
// import { useContext } from "react";
// import { StoreContext } from "../../context/StoreContext";
// import { useNavigate } from "react-router-dom";

// const Orders = ({ url }) => {
//   const navigate = useNavigate();
//   const { token, admin } = useContext(StoreContext);
//   const [orders, setOrders] = useState([]);

//   const fetchAllOrder = async () => {
//     const response = await axios.get(url + "/api/order/list", {
//       headers: { token },
//     });
//     if (response.data.success) {
//       setOrders(response.data.data);
//     }
//   };

//   const statusHandler = async (event, orderId) => {
//     const response = await axios.post(
//       url + "/api/order/status",
//       {
//         orderId,
//         status: event.target.value,
//       },
//       { headers: { token } }
//     );
//     if (response.data.success) {
//       toast.success(response.data.message);
//       await fetchAllOrder();
//     } else {
//       toast.error(response.data.message);
//     }
//   };
//   useEffect(() => {
//     if (!admin && !token) {
//       toast.error("Please Login First");
//       navigate("/");
//     }
//     fetchAllOrder();
//   }, []);

//   return (
//     <div className="order add">
//       <h3>Order Page</h3>
//       <div className="order-list">
//         {orders.map((order, index) => (
//           <div key={index} className="order-item">
//             <img src={assets.parcel_icon} alt="" />
//             <div>
//               <p className="order-item-food">
//                 {order.items.map((item, index) => {
//                   if (index === order.items.length - 1) {
//                     return item.name + " x " + item.quantity;
//                   } else {
//                     return item.name + " x " + item.quantity + ", ";
//                   }
//                 })}
//               </p>
//               <p className="order-item-name">
//                 {order.address.firstName + " " + order.address.lastName}
//               </p>
//               <div className="order-item-address">
//                 <p>{order.address.street + ","}</p>
//                 <p>
//                   {order.address.city +
//                     ", " +
//                     order.address.state +
//                     ", " +
//                     order.address.country +
//                     ", " +
//                     order.address.zipcode}
//                 </p>
//               </div>
//               <p className="order-item-phone">{order.address.phone}</p>
//             </div>
//             <p>Items: {order.items.length}</p>
//             <p>${order.amount}</p>
//             <select
//               onChange={(event) => statusHandler(event, order._id)}
//               value={order.status}
//             >
//               <option value="Food Processing">Food Processing</option>
//               <option value="Out for delivery">Out for delivery</option>
//               <option value="Delivered">Delivered</option>
//             </select>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Orders;

import React, { useState, useEffect, useContext } from "react";
import "./Orders.css";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Orders = ({ url }) => {
  const navigate = useNavigate();
  const { token, admin } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [selectedOrders, setSelectedOrders] = useState([]);

  const fetchAllOrder = async () => {
    try {
      const response = await axios.get(url + "/api/order/list", {
        headers: { token },
      });
      if (response.data.success) {
        setOrders(response.data.data);
        setFilteredOrders(response.data.data);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to load orders");
    }
  };

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(
      url + "/api/order/status",
      {
        orderId,
        status: event.target.value,
      },
      { headers: { token } }
    );
    if (response.data.success) {
      toast.success(response.data.message);
      await fetchAllOrder();
    } else {
      toast.error(response.data.message);
    }
  };

  // 🧩 Filter Logic
  useEffect(() => {
    let filtered = [...orders];

    if (statusFilter !== "All") {
      filtered = filtered.filter((o) => o.status === statusFilter);
    }

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((o) =>
        (o.address.firstName + " " + o.address.lastName)
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        o._id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (dateRange.start && dateRange.end) {
      const start = new Date(dateRange.start);
      const end = new Date(dateRange.end);
      filtered = filtered.filter((o) => {
        const orderDate = new Date(o.createdAt);
        return orderDate >= start && orderDate <= end;
      });
    }

    setFilteredOrders(filtered);
  }, [orders, statusFilter, searchQuery, dateRange]);

  // 🧾 Export selected orders to CSV
  const exportToCSV = () => {
    if (selectedOrders.length === 0) {
      toast.warning("Please select at least one order to export!");
      return;
    }

    const selectedData = filteredOrders.filter((order) =>
      selectedOrders.includes(order._id)
    );

    const csvRows = [];
    const headers = ["Order ID", "Name", "Items", "Amount", "Status", "Date"];
    csvRows.push(headers.join(","));

    selectedData.forEach((o) => {
      const name = `${o.address.firstName} ${o.address.lastName}`;
      const items = o.items
        .map((i) => `${i.name} x${i.quantity}`)
        .join("; ");
      csvRows.push(
        `${o._id},"${name}","${items}",${o.amount},${o.status},${new Date(
          o.createdAt
        ).toLocaleString()}`
      );
    });

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "orders_export.csv";
    link.click();
  };

  useEffect(() => {
    if (!admin && !token) {
      toast.error("Please Login First");
      navigate("/");
    }
    fetchAllOrder();
  }, []);

  const handleSelect = (id) => {
    setSelectedOrders((prev) =>
      prev.includes(id) ? prev.filter((oid) => oid !== id) : [...prev, id]
    );
  };

  return (
    <div className="order add">
      <h3>Order Management</h3>

      {/* Filter & Search Bar */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search by name or order ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Food Processing">Food Processing</option>
          <option value="Out for delivery">Out for Delivery</option>
          <option value="Delivered">Delivered</option>
        </select>

        <div className="date-range">
          <input
            type="date"
            onChange={(e) =>
              setDateRange({ ...dateRange, start: e.target.value })
            }
          />
          <input
            type="date"
            onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
          />
        </div>

        <button onClick={exportToCSV}>Export Selected</button>
      </div>

      <div className="order-list">
        {filteredOrders.map((order, index) => (
          <div key={index} className="order-item">
            <input
              type="checkbox"
              checked={selectedOrders.includes(order._id)}
              onChange={() => handleSelect(order._id)}
            />
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1)
                    return item.name + " x " + item.quantity;
                  else return item.name + " x " + item.quantity + ", ";
                })}
              </p>
              <p className="order-item-name">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}
                </p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>${order.amount}</p>
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;

