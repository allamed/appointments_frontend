

import React, { useEffect, useState } from 'react';
import { fetchAppointments, deleteAppointment } from '../services/api';
import { Appointment as AppointmentType } from './types';
import Appointment from "./Appointment";
import {MDBContainer} from "mdb-react-ui-kit";
import AddAppointmentModal from "./AddAppointmentModal";
import "react-toastify/dist/ReactToastify.css";
import {toast} from "react-toastify";

const AppointmentList = () => {
    const [appointments, setAppointments] = useState<AppointmentType[]>([]);



    useEffect(() => {
        fetchAppointments()
            .then(response => {
                setAppointments(response.data);
                console.log(response.data)
            })
            .catch(error => {
                toast.error("Error fetching appointments:", error);
            });
    }, []);

    const handleDelete = (id: number) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this appointment?");
        if (!isConfirmed) {
            return;
        }
        deleteAppointment(id)
            .then(() => {
                setAppointments(currentAppointments => currentAppointments.filter(appointment => appointment.id !== id));
            })
            .catch(error => {
                toast.error("Error deleting appointment:", error);
            });
    };

    return (
        <div>
            <h2>Appointments</h2>
            <MDBContainer breakpoint="lg">
                <div style={{marginLeft:"80%"}}>
                    <AddAppointmentModal setAppointments={setAppointments} edit={false} />
                </div>

            {appointments.length === 0 ? (
                <p>No appointments found.</p>
            ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap'}}>
                    {appointments.map(appointment => (
                        <Appointment key={appointment.id} appointment={appointment} handleDelete={handleDelete} setAppointments={setAppointments}/>
                    ))}
                </div>

            )}

                </MDBContainer>

        </div>
    );
};

export default AppointmentList;
