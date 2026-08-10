import { useState, useEffect } from 'react'
import './App.css'
import JobCard from './components/JobCard'
import JobForm from './components/JobForm'
import JobList from './components/JobList'

function App() {
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem('jobs')
    return savedJobs ? JSON.parse(savedJobs) : []
  })
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [status, setStatus] = useState('Select')
  const [editId, setEditId] = useState(null)
  const [search, setsearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('')

  const addJob = () => {
    const newJob = {
      id: Date.now(),
      company: company, // when the property name and variable name are the same, we can directly write 'company'. This is called object property shorthand.
      role,
      status
    }
    setJobs([...jobs, newJob]);
    setCompany('')
    setRole('')
    setStatus('Select')
  }

  const deleteJob = (id) => {
    const updatedJobs = jobs.filter((job) =>
      job.id !== id)
    setJobs(updatedJobs)
  }

  const editJob = (job) => {
    setCompany(job.company)
    setRole(job.role)
    setStatus(job.status)
    setEditId(job.id)
  }

  const updateJob = () => {
    const updatedJobs = jobs.map((job) => {
      if (job.id === editId) {
        return {
          ...job,
          company,
          role,
          status
        }
      }
      return job
    })
    setJobs(updatedJobs)
    setCompany('')
    setRole('')
    setStatus('Select')
    setEditId(null)
  }

  const filteredJobs = jobs.filter((job) => {
    const matchSearch =
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.role.toLowerCase().includes(search.toLowerCase())

    const matchStatus = filterStatus === '' || job.status === filterStatus

    return matchSearch && matchStatus
  });

  const appliedJobs = jobs.filter((job) => job.status === 'Applied').length
  const interviewJobs = jobs.filter((job) => job.status === 'Interview').length
  const rejectedjobs = jobs.filter((job) => job.status === 'Rejected').length
  const selectedJobs = jobs.filter((job) => job.status === 'Selected').length

  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs))
  }, [jobs])

  return (
    <>
      <section className='wrap'>
        <h1>Job Tracker</h1>

        <div className='job-tracker'>
          <h3>Total Jobs <span>{jobs.length}</span></h3>
          <h3>Applied <span>{appliedJobs}</span></h3>
          <h3>Interview <span>{interviewJobs}</span></h3>
          <h3>Rejected <span>{rejectedjobs}</span></h3>
          <h3>Selected <span>{selectedJobs}</span></h3>
        </div>


        <JobForm company={company} role={role} setCompany={setCompany} setRole={setRole} status={status} setStatus={setStatus} onAdd={addJob} onUpdate={updateJob} editId={editId} />



        <div className='job-search'>
          <input type='text' placeholder='Search jobs by company or role' value={search} onChange={(e) => setsearch(e.target.value)} />
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="">Search by Status</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Rejected">Rejected</option>
            <option value="Selected">Selected</option>
          </select>
        </div>

        {jobs.length === 0 ? (
          <p>No jobs yet.</p>
        ) : filteredJobs.length === 0 ? (
          <p>No matching jobs found.</p>
        ) : (
          <JobList
            jobs={filteredJobs}
            onDelete={deleteJob}
            onEdit={editJob}
          />
        )}
      </section>
    </>
  )
}

export default App
