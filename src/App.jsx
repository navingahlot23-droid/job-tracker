import { useState, useEffect } from 'react'
import './App.css'
import JobForm from './components/JobForm'
import JobList from './components/JobList'

function App() {
  const [jobs, setJobs] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {
    const savedJobs = localStorage.getItem('jobs')
    if (savedJobs) {
      setJobs(JSON.parse(savedJobs))
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('jobs', JSON.stringify(jobs))
    }
  }, [jobs, isLoaded])

  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [status, setStatus] = useState('Select')
  const [editId, setEditId] = useState(null)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('')

  const addJob = () => {
    if (!company.trim() || !role.trim() || status === 'Select') {
      alert('Please fill all the fields');
      return
    }
    const newJob = {
      id: Date.now(),
      company: company.trim(), // when the property name and variable name are the same, we can directly write 'company'. This is called object property shorthand.
      role: role.trim(),
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

  const cancelEdit = () => {
    setCompany('')
    setRole('')
    setStatus('Select')
    setEditId(null)
  }

  const updateJob = () => {
    if (!company.trim() || !role.trim() || status === 'Select') {
      alert('Please fill all the fields');
      return
    }
    const updatedJobs = jobs.map((job) => {
      if (job.id === editId) {
        return {
          ...job,
          company: company.trim(),
          role: role.trim(),
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

  const clearAllJobs = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete all the jobs?')

    if (confirmDelete) {
      setJobs([])
      setSearch('')
      setFilterStatus('')
    }
  }

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

        <JobForm company={company} role={role} setCompany={setCompany} setRole={setRole} status={status} setStatus={setStatus} onAdd={addJob} onUpdate={updateJob} onCancel={cancelEdit} editId={editId} />

        {jobs.length === 0 ? (
          <p>No jobs yet.</p>
        ) : (
          <>
            <div className='clr-job'>
              <button className='clr-btn' onClick={clearAllJobs}>Clear All Jobs</button>
            </div>
            <div className='job-search'>
              <input type='text' placeholder='Search jobs by company or role' value={search} onChange={(e) => setSearch(e.target.value)} />
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="">All Status</option>
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Rejected">Rejected</option>
                <option value="Selected">Selected</option>
              </select>
              {
                (search || filterStatus) && (
                  <button onClick={() => { setSearch(''); setFilterStatus('') }}>Clear Filters</button>
                )
              }
            </div>
            {filteredJobs.length === 0 ? (
              <p>No matching jobs found.</p>
            ) : (
              <JobList
                jobs={filteredJobs}
                onDelete={deleteJob}
                onEdit={editJob}
              />
            )
            }
          </>
        )
        }
      </section>
    </>
  )
}

export default App
