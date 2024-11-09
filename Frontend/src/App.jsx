import './App.css'
import Navbar from './components/Navbar'
import  TableList  from './components/TableList'
import ModalForm from './components/ModalForm';
import { useState } from 'react';
import AddData from './components/AddData';




function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [clientData, setClientData] = useState({id: '', name: '', email: '', job: '', rate: '', isactive: ''}); // Store client data for editing
  const [refresh, setRefresh] = useState(false);
  const[showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  
  const handleOpen = () => {
      setClientData(clientData);
      setModalMode('edit');
      setIsOpen(true);
  };

  const handleSubmit = async () => {
      if (modalMode === 'add') {
          // Handle add item
          
      } else {
          // Handle edit item
          try {
            const response = await fetch(`http://localhost:6969/${ clientData.id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(clientData),
            });
            console.log(await response.json());
          }
          catch (err) {
            console.error(err);
          }
      }
      setIsOpen(false);
      setRefresh(true);
  };


  return (
    <>
    {/* ++ py-5 px-5 */}
    <div className="py-5 px-5 ">
        <div style={showModal===true?{opacity:0.2, backdropFilter:'blur(50px)', pointerEvents:'none'}:{opacity:100}}>
            <Navbar search={search} setSearch={setSearch} showModal={showModal} setShowModal={setShowModal} />
            <TableList search={search} setSearch={setSearch} onOpen={() => handleOpen()} refresh={refresh} setRefresh={setRefresh} clientData={clientData} setClientData={setClientData}/>
            <ModalForm isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            mode={modalMode}
            clientData={clientData}
            refresh={refresh}
            setRefresh={setRefresh}
            setClientData={setClientData}
            onSubmit={handleSubmit}/>
        </div>
        {
            showModal===true?<AddData showModal={showModal} setShowModal={setShowModal} setRefresh={setRefresh}  onClose={() => setIsOpen(false)}/>:'' 
        }
    </div>
      
    </>
  )
}

export default App
