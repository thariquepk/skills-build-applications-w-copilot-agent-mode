import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

export default function CollectionView({ resource, title, columns, renderRow }) {
  const [records, setRecords] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    fetchCollection(resource)
      .then((items) => active && setRecords(items))
      .catch((reason) => active && setError(reason.message))
    return () => { active = false }
  }, [resource])

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h2 mb-0">{title}</h1>
        <span className="badge text-bg-secondary">{records.length} records</span>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      {!error && (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead><tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr></thead>
            <tbody>
              {records.length ? records.map(renderRow) : (
                <tr><td className="text-center text-muted" colSpan={columns.length}>No records found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
