import axios from 'axios';

const BASE_API_URL = 'https://modaresaback-8c953116f1cf.herokuapp.com'; // Replace with your actual API URL

const APPOINTMENTS_API_URL = `${BASE_API_URL}/appointments`;
const BUYERS_API_URL = `${BASE_API_URL}/buyers`;
const VENDORS_API_URL = `${BASE_API_URL}/vendors`;

//appointments
export const fetchAppointments = () => axios.get(APPOINTMENTS_API_URL);
export const createAppointment = (data: any) => {
    console.log(data)
  return  axios.post(APPOINTMENTS_API_URL, data);
}
export const updateAppointment = (id: number, data: any) => axios.put(`${APPOINTMENTS_API_URL}/${id}`, data);
export const deleteAppointment = (id: number) => axios.delete(`${APPOINTMENTS_API_URL}/${id}`);



//buyers
export const fetchBuyers = () => axios.get(BUYERS_API_URL);
export const createBuyer = (data: any) => axios.post(BUYERS_API_URL, data);
export const updateBuyer = (id: number, data: any) => axios.put(`${BUYERS_API_URL}/${id}`, data);
export const deleteBuyer = (id: number) => axios.delete(`${BUYERS_API_URL}/${id}`);




//vendors
export const fetchVendors = () => axios.get(VENDORS_API_URL);
export const createVendor = (data: any) => axios.post(VENDORS_API_URL, data);
export const updateVendor = (id: number, data: any) => axios.put(`${VENDORS_API_URL}/${id}`, data);
export const deleteVendor = (id: number) => axios.delete(`${VENDORS_API_URL}/${id}`);

