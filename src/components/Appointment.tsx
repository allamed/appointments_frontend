// src/components/Appointment.tsx

import React from 'react';
import {
    MDBCard,
    MDBCardHeader,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardFooter,
    MDBBtn, MDBListGroupItem, MDBCardSubTitle, MDBContainer
} from 'mdb-react-ui-kit';
import {FaHouseUser, FaUser} from "react-icons/fa";

import { Appointment as AppointmentType } from './types';
import Item from "./Item";
import {FaCalendarAlt} from "react-icons/fa";
import {FaCircleQuestion, FaLocationDot} from "react-icons/fa6";
import {IoCheckmarkDoneCircle} from "react-icons/io5";
import AddAppointmentModal from "./AddAppointmentModal"; // adjust the import path as necessary

interface AppointmentProps {
    appointment: AppointmentType;
    handleDelete:(id:number)=> void;
    setAppointments:(arg:any) => any;
}

const Appointment: React.FC<AppointmentProps> = ({ appointment, handleDelete, setAppointments }) => {

    const handleUpdate=()=>{

    }

    return (
        <div className="appointment" style={{margin:15}}>



            <MDBCard alignment='center' style={{margin:20}}>
                <MDBCardHeader>{appointment.title}</MDBCardHeader>
                <MDBCardBody>


                    <Item icon={<FaHouseUser color="#95afc0" />} text={"Host: " +appointment.host.name}/>
                    <Item icon={<FaUser color="#95afc0" />} text={"Client: " +appointment.client.name}/>
                    <Item icon={<FaCircleQuestion color="#95afc0" />} text={appointment.type}/>
                    <Item icon={<FaLocationDot color="#95afc0" />} text={ appointment.location || 'N/A'}/>
                    <MDBCardFooter style={{marginTop:10}}>
                        <Item icon={<FaCalendarAlt color="#95afc0" />} text={"Start at " + new Date(appointment.startTime).toLocaleString()}/>
                        <Item icon={<IoCheckmarkDoneCircle color="#95afc0" />} text={"Ends at " + new Date(appointment.endTime).toLocaleString()}/>


                    </MDBCardFooter>
                    <AddAppointmentModal setAppointments={setAppointments} edit={true} appointmentToEdit={appointment}/>
                     <MDBBtn style={{backgroundColor:"#ff7979"}} href='#' onClick={(e)=>handleDelete(appointment.id)}>delete</MDBBtn>
                </MDBCardBody>



            </MDBCard>
        </div>
    );
};

export default Appointment;
