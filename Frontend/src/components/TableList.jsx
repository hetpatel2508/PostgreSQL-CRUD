import { useEffect, useState } from "react";

export default function TableList({ onOpen, clientData, setClientData, refresh, setRefresh, search, setSearch }) {
    const [tableData, setTableData] = useState([]);

    // Fetch data from the server based on the search term or refresh trigger
    const fetchDATA = async () => {
        try {
            let url = 'http://localhost:6969/';
            if (search) {
                url = `http://localhost:6969/search/${search}`;
            }

            const response = await fetch(url);
            const data = await response.json();
            setTableData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            if (error.response && error.response.status === 404) {
                setTableData([]);
            } else {
                throw error;
            }
        }
    };

    // Trigger data fetch when the component mounts or when refresh changes
    useEffect(() => {
        fetchDATA();
    }, [refresh]);  // This will run when 'refresh' is triggered

    // Trigger data fetch when search changes
    useEffect(() => {
        fetchDATA();
    }, [search]);  // This will run when the 'search' state changes

    // Handle client edit action
    function handleEdit(item) {
        onOpen('edit');
        setClientData(item);
    }

    // Handle client delete action
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:6969/${id}`, {
                method: 'DELETE',
            });
            await response.json();
            setRefresh(true);  // Trigger a refresh after deletion
        } catch (err) {
            console.error('Error deleting client:', err);
        }
    };

    return (
        <>
            <div className="overflow-x-auto mt-10">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Job</th>
                            <th>Rate</th>
                            <th>Status</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="hover">
                        {tableData.length > 0 ? (
                            tableData.map((item) => (
                                <tr key={item.id}>
                                    <th>{item.id}</th>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.job}</td>
                                    <td>{item.rate}</td>
                                    <td>
                                        <button
                                            className={`btn rounded-full w-20 ${item.status ? 'btn-primary' : 'btn-outline btn-primary'}`}
                                        >
                                            {item.status ? 'Active' : 'Inactive'}
                                        </button>
                                    </td>
                                    <td>
                                        <button className="btn btn-secondary" onClick={() => handleEdit(item)}>
                                            Update
                                        </button>
                                    </td>
                                    <td>
                                        <button className="btn btn-accent" onClick={() => handleDelete(item.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-center">No clients found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}
