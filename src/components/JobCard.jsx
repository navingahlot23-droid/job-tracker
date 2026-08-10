function JobCard({ job, onDelete, onEdit }) {
    return (
        <div className="job-card">
            <h4>{job.company}</h4>
            <p>{job.role}</p>
            <p className={`status ${job.status.toLowerCase()}`}>Status: {job.status}</p>
            <button onClick={()=>onDelete(job.id)}>Delete</button>
            <button onClick={()=>onEdit(job)}>Edit</button>
        </div>
    )
}
export default JobCard