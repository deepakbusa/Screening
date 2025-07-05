import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000/api";

export const fetchFinancial = async () => {
  const res = await axios.get(`${API_BASE}/financial/`);
  return res.data;
};

export const fetchHR = async () => {
  const res = await axios.get(`${API_BASE}/hr/`);
  return res.data;
};

export const fetchRND = async () => {
  const res = await axios.get(`${API_BASE}/rnd/`);
  return res.data;
};

export const fetchSecurity = async () => {
  const res = await axios.get(`${API_BASE}/security/`);
  return res.data;
}; 