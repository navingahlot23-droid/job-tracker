function JobForm({ company, role, setCompany, setRole, status, setStatus, onAdd, onUpdate, editId }) {
    return (
        <>
            <input type='text' placeholder='Company' value={company} onChange={(e) => setCompany(e.target.value)} />
            <input type='text' placeholder='Role' value={role} onChange={(e) => setRole(e.target.value)} />
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Select">Select</option>
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Rejected">Rejected</option>
                <option value="Selected">Selected</option>
            </select>
            <button onClick={editId ? onUpdate : onAdd}>{editId ? "Update Job" : "Add Job"}</button>
        </>
    )
}

export default JobForm