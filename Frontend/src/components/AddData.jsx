import React, { useState } from 'react'

function AddData( {setShowModal, setRefresh} ) {

    const [rate, setRate] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [job, setJob] = useState('');
    const [status, setStatus] = useState('Inactive');


    const HandleClick = async () => {
        console.log(rate, name, email, job, status);

        if(name !== '' && email !== '' && job !== '' && rate !== ''){
            await fetch('http://localhost:6969/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    job: job,
                    rate: rate,
                    isactive: status==='Active', // Convert status to boolean
                }),
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
            setRefresh(true);
        }
        else{    
            setShowModal(false);
        }
        setShowModal(false);

    }
    

  return (
    <div >

        <div className="modal-box fixed top-2/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop:blur-sm z-50">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={()=>setShowModal(false)}>✕</button>
                <h3 className="font-bold text-lg py-4">Add Client</h3>
                
                <div>
                    <label className="input input-bordered flex items-center my-4 gap-2">
                        Name 
                        <input type="text" className="grow" onChange={(e) => setName(e.target.value)} />
                    </label>

                    <label className="input input-bordered flex items-center my-4 gap-2">
                        Email 
                        <input type="email" className="grow" onChange={(e) => setEmail(e.target.value)} />
                    </label>

                    <label className="input input-bordered flex items-center my-4 gap-2">
                        Job 
                        <input type="text" className="grow" onChange={(e) => setJob(e.target.value)} />
                    </label>

                    <div className="flex mb-4 justify-between">
                        <label className="input input-bordered flex mr-4 items-center gap-2">
                            Rate
                            <input type="number" className="grow" onChange={(e) => setRate(e.target.value)} />
                        </label>

                        <select className="select select-bordered w-full max-w-xs" onChange={(e) => setStatus(e.target.value)}>
                            <option value="Inactive">Inactive</option>
                            <option value="Active">Active</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-success" onClick={HandleClick}> Add Client </button>
                </div>
            </div>
    </div>
  )
}

export default AddData
