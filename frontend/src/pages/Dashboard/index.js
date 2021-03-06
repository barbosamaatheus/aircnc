import React, { useEffect, useState, useMemo } from "react";
import socketio from "socket.io-client";
import { Link } from "react-router-dom";
import api from "../../services/api";

import "./styles.css";
import { request } from "http";

export default function Dashboard() {
  const [spots, setSpots] = useState([]);
  const [requests, setRequests] = useState([]);

  const user_id = localStorage.getItem("user");
  const socket = useMemo(
    () =>
      socketio("http://localhost:3333", {
        query: { user_id }
      }),
    [user_id]
  );

  useEffect(() => {
    socket.on("booking_request", data => {
      setRequests([...requests, data]);
    });
  }, [requests, socket]);

  useEffect(() => {
    async function loadSpots() {
      const user_id = localStorage.getItem("user");
      const res = await api.get("/dashboard", {
        headers: { user_id }
      });

      setSpots(res.data);
    }
    loadSpots();
  }, []);

  async function handleAccept(id){
    await api.post(`/bookings/${id}/approval`);
    setRequests(requests.filter(request => request._id !== id));
  }

  async function handleReject(id){
    await api.post(`/bookings/${id}/rejection`);
    setRequests(requests.filter(request => request._id !== id));
  }

  return (
    <>
      <ul className="notification">
        {requests.map(req => (
          <li key={req._id}>
            <p>
              <strong>{req.user.email}</strong> está solicitando uma reserva em:
              <strong>{req.spot.company}</strong> para a data:
              <strong>{request.date}</strong>
            </p>
            <button className="accept" onClick={() => handleAccept(req._id)}>ACEITAR</button>
            <button className="reject" onClick={() => handleReject(req._id)}>REJEITAR</button>
          </li>
        ))}
      </ul>
      <ul className="spot-list">
        {spots.map(spot => (
          <li key={spot._id}>
            <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
            <strong>{spot.company}</strong>
            <span>{spot.price ? `R$: ${spot.price}` : "GRATUITO"}</span>
          </li>
        ))}
      </ul>
      <Link to="/new">
        <button className="btn">Cadastrar novo spot</button>
      </Link>
    </>
  );
}
