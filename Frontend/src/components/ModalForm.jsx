import { useState, useEffect } from "react";

export default function ModalForm({ isOpen, onClose, mode, onSubmit, clientData, setClientData,  setRefresh }) {
    const [rate, setRate] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [job, setJob] = useState('');
    const [status, setStatus] = useState('Inactive'); // Default to 'Inactive'

    // Populate the form when in 'edit' mode
    useEffect(() => {
        if (mode === 'edit' && clientData) {
            setName(clientData.name || ''); // Default to empty string if clientData.name is undefined
            setEmail(clientData.email || ''); // Default to empty string if clientData.email is undefined
            setJob(clientData.job || ''); // Default to empty string if clientData.job is undefined
            setRate(clientData.rate || ''); // Default to empty string if clientData.rate is undefined
            setStatus(clientData.isactive ? 'Active' : 'Inactive'); // Handle active/inactive status
        } else {
            // Reset form for 'add' mode
            setName('');
            setEmail('');
            setJob('');
            setRate('');
            setStatus('Inactive');
        }
    }, [mode, isOpen, clientData]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const client = {
            name,
            email,
            job,
            rate,
            isactive: status === 'Active', // Convert status to boolean
        };

        // Call the onSubmit handler (passing client data)
        const temp = clientData;
        temp.name = name;
        temp.email = email;
        temp.job = job;
        temp.rate = rate;
        temp.isactive = status === 'Active';
        onSubmit(temp);

        // After submitting, trigger a refresh or reset state if needed
        setRefresh(true);  // Assuming you want to trigger a refresh after form submission
        onClose(); // Optionally close the modal after submission
    };

    return (
        <dialog id="my_modal_3" className="modal bg-black/40" open={isOpen}>
            <div className="modal-box">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
                <h3 className="font-bold text-lg py-4">{mode === 'edit' ? 'Edit Client' : 'Add Client'}</h3>
                
                <form onSubmit={handleSubmit}>
                    <label className="input input-bordered flex items-center my-4 gap-2">
                        Name 
                        <input type="text" className="grow" value={name} onChange={(e) => setName(e.target.value)} />
                    </label>

                    <label className="input input-bordered flex items-center my-4 gap-2">
                        Email 
                        <input type="email" className="grow" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>

                    <label className="input input-bordered flex items-center my-4 gap-2">
                        Job 
                        <input type="text" className="grow" value={job} onChange={(e) => setJob(e.target.value)} />
                    </label>

                    <div className="flex mb-4 justify-between">
                        <label className="input input-bordered flex mr-4 items-center gap-2">
                            Rate
                            <input type="number" className="grow" value={rate} onChange={(e) => setRate(e.target.value)} />
                        </label>

                        <select className="select select-bordered w-full max-w-xs" value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="Inactive">Inactive</option>
                            <option value="Active">Active</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-success">
                        {mode === 'edit' ? 'Save Changes' : 'Add Client'}
                    </button>
                </form>
            </div>
        </dialog>
    );
}
