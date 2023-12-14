import React, {useEffect, useState} from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter, MDBInput, MDBSwitch, MDBCol, MDBRadio,
} from 'mdb-react-ui-kit';
import { toast } from "react-toastify";





import {Appointment, Buyer as buyerType, Vendor as vendorType} from "./types";
import {
    createAppointment,
    createBuyer,
    createVendor,
    fetchAppointments,
    fetchBuyers,
    fetchVendors, updateAppointment
} from "../services/api";


interface AppointmentModalProps {
    setAppointments:(arg:any) => any;
    edit?: boolean;
    appointmentToEdit?: Appointment;

}
 const AddAppointmentModal  : React.FC<AppointmentModalProps> =({setAppointments, edit, appointmentToEdit}) =>
{
    const [basicModal, setBasicModal] = useState(false);
    useEffect(() => {
        if (edit && appointmentToEdit) {
            setTitle(appointmentToEdit.title);
            setType(appointmentToEdit.type);
            setLocation(appointmentToEdit.location);
            setHostId(String(appointmentToEdit.host.id));
            setClientId(String(appointmentToEdit.client.id));
           // setStartDate(appointmentToEdit.startTime.toISOString().split('T')[0]);
           // setStartTime(appointmentToEdit.startTime.toISOString().split('T')[1].substring(0, 5));
            //setEndTime(appointmentToEdit.endTime.toISOString().split('T')[1].substring(0, 5));
        }
    }, [edit, appointmentToEdit]);

    const toggleOpen = () => {
        setBasicModal(!basicModal);

        if (!edit){
            setType("")
            setTitle("")
            setStartTime("")
            setStartDate("")
            setLocation("")
            setHostId("")
            setClientId("")
        }
    }

    const [title, setTitle] = useState('');
    const [type, setType] = useState('Physical');
    const [location, setLocation] = useState<String|undefined>('');
    const [hostId, setHostId] = useState('');
    const [clientId, setClientId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [vendors, setVendors] = useState<vendorType[]>([]);
    const [buyers, setBuyers] = useState<buyerType[]>([]);

    const [newHostForm, setNewHostForm]=useState(false);
    const [newHostName, setNewHostName]=useState("")
    const [newClientForm, setNewClientForm]=useState(false);
    const [newClientName, setNewClientName]=useState("")
    const[newClientCompanyName,setNewClientCompanyName]=useState("")

    useEffect(() => {
        fetchVendors().then(response => setVendors(response.data));
        fetchBuyers().then(response => setBuyers(response.data));

    }, []);



    const saveAppointment = async () => {
        if (!title || title==""){
            toast.error("please provide a title")
            return
        }
        if (!type){
            toast.error("please provide a type")
            return
        }
        if (!hostId){
            toast.error("please provide a host")
            return
        }
        if (!clientId){
            toast.error("please provide a client")
            return
        }
        if (!startDate){
            toast.error("please provide a date")
            return
        }
        if (!startTime){
            toast.error("please provide a start time")
            return
        }
        const start= new Date(`${startDate}T${startTime}`)
        const end= new Date(`${startDate}T${endTime}`)

        const appointment = { title, type, location, hostId, clientId, startTime: start, endTime: end };

        try {
            if (edit && appointmentToEdit) {

                await updateAppointment(appointmentToEdit.id, appointment);
                toast.success("Appointment updated successfully");
            } else {

                await createAppointment(appointment);
                toast.success("Appointment added successfully");
            }

            // Close modal and refresh appointments
            toggleOpen();
            const response = await fetchAppointments();
            setAppointments(response.data);
        } catch (error: any) {
            const errorMessage = error.response?.data || "Unknown error occurred";
            toast.error(`Error saving appointment: ${errorMessage}`);
        }
    };


    function addNewHost() {
        const name=newHostName;
        if (!newHostName) {toast.error("please provide a name")
            return}
        createVendor({name:name}).then(response => {

            setVendors([...vendors,response.data ])
            toast.success("host succesfully created");
            setNewHostName("")
            setNewHostForm(false);
        })
            .catch(error => {
                toast.error("Error creating the vendor", error);
            });
    }

    function addNewClient() {
        if (!newClientName) {toast.error("please provide a name")
            return}
        if (!newClientCompanyName){toast.error("please provide a company name")
            return}


        createBuyer({name:newClientName, companyName:newClientCompanyName}).then(response => {

            setBuyers([...buyers,response.data ])
            toast.success("client succesfully created");
            setNewClientName("")
            setNewClientCompanyName("")
            setNewClientForm(false);
        })
            .catch(error => {
                toast.error("Error creating the vendor", error);
            });
    }

    return (
        <>
            <MDBBtn style={{marginRight:15}} onClick={toggleOpen}>{edit ? 'edit' : 'Add new Appointment'}</MDBBtn>
            <MDBModal open={basicModal} setopen={setBasicModal} tabIndex='-1'>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>{edit ? 'Edit appointment' : 'Add new Appointment'}</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>

                            <form >
                                <div style={{marginTop:15, marginBottom:25}}>
                                    <select style={{marginRight:15, padding:10, borderColor:"lightgray", borderRadius:4}} value={hostId} onChange={e => setHostId(e.target.value)}>
                                        <option value="">Select Host</option>
                                        {vendors.map(vendor => (
                                            <option key={vendor.id} value={vendor.id}>{vendor.name}</option>
                                        ))}
                                    </select>
                                    <select style={{marginRight:15, padding:10, borderColor:"lightgray", borderRadius:4}} value={clientId} onChange={e => setClientId(e.target.value)}>
                                        <option value="">Select Client</option>
                                        {buyers.map(buyer => (
                                            <option key={buyer.id} value={buyer.id}>{buyer.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap'}}>

                                <div style={{ borderColor: newHostForm ? "lightgray" : "transparent",
                                    border: newHostForm ? "solid" : "none",
                                    borderWidth: newHostForm ? 0.5 : 0,
                                    borderRadius: 5,
                                    padding: 5,
                                    marginBottom: 20,
                                    width: '50%'}}>
                                    <a href='#!' style={{fontSize:"small"}} onClick={()=>setNewHostForm(!newHostForm)}>Add new Host?</a>
                                    {newHostForm &&  (
                                        <div style={{ marginBottom:5}}>
                                            <MDBInput className='mb-4' type='text' id='title' label='new host name'  onChange={(e) => setNewHostName(e.target.value)}/>
                                            <MDBBtn style={{paddingTop:5, paddingBottom:5}} onClick={addNewHost}>Save</MDBBtn>
                                        </div>)}
                                </div>
                                <div style={{ borderColor: newClientForm ? "grey" : "transparent",
                                    border: newClientForm ? "solid" : "none",
                                    borderWidth: newClientForm ? 0.5 : 0,
                                    borderRadius: 5,
                                    padding: 5,
                                    marginBottom: 20,
                                    width: '50%'}}>
                                    <a href='#!' style={{fontSize:"small"}} onClick={()=>setNewClientForm(!newClientForm)}>Add new Client?</a>
                                    {newClientForm &&  (
                                        <div style={{ marginBottom:5}}>
                                            <MDBInput className='mb-4' type='text' id='title' label='new client name' onChange={(e) => setNewClientName(e.target.value)}/>
                                            <MDBInput className='mb-4' type='text' id='title' label='company name' onChange={(e) => setNewClientCompanyName(e.target.value)}/>

                                            <MDBBtn style={{paddingTop:5, paddingBottom:5}} onClick={addNewClient}>Save</MDBBtn>
                                        </div>)}
                                </div>
                                </div>
                                <MDBInput className='mb-4' type='text' id='title' label='appointment title' value={title} onChange={(e) => setTitle(e.target.value)}/>
                                <div style={{margin:20, width:"40%"}}>
                                    <MDBRadio name='flexRadioDefault' id='flexRadioDefault1' label='Virtual' onChange={() => setType('Virtual')} />
                                    <MDBRadio name='flexRadioDefault' id='flexRadioDefault2' label='Physical' defaultChecked onChange={() => setType('Physical')} />
                                </div>

                                <MDBInput
                                    className='mb-4'
                                    type='text'
                                    id='location'
                                    label='Location'
                                    disabled={type=='Virtual'}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                                <div style={{margin:25}}>


                                <label style={{margin:15}}>
                                   Date:
                                    <input style={{marginLeft:15, padding:5, borderColor:"lightgray", borderRadius:4}} type="date" value={startDate} onChange={(e)=>setStartDate(e.target.value)} />

                                </label>
                                <br />
                                <label style={{margin:15}}>
                                    Start time:
                                    <input style={{marginRight:25,marginLeft:15, padding:5, borderColor:"lightgray", borderRadius:4}}  type="time" value={startTime} onChange={(e)=>setStartTime(e.target.value)} />

                                    End time:
                                    <input style={{marginLeft:15, padding:5, borderColor:"lightgray", borderRadius:4}}  type="time" value={endTime} onChange={(e)=>setEndTime(e.target.value)} />


                                </label>
                                <br />
                                </div>





                            </form>


                        </MDBModalBody>

                        <MDBModalFooter>

                            <MDBBtn onClick={saveAppointment}> {edit ? 'Update Appointment' : 'Save Appointment'}</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}
export default AddAppointmentModal