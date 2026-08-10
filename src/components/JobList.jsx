import JobCard from "./JobCard"

function JobList({ jobs, onDelete, onEdit }) {
    return (
        <div className="card-wrap">
            {
                jobs.map((job) => (
                    <JobCard key={job.id} job={job} onDelete={onDelete} onEdit={onEdit} />
                ))
            }
        </div>
    )
}

export default JobList