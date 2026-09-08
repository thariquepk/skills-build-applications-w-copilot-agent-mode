import CollectionView from './CollectionView'

// API endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/
export default function Workouts() {
  return <CollectionView resource="workouts" title="Workouts" columns={['Name', 'Difficulty', 'Description', 'Exercises']} renderRow={(item) => (
    <tr key={item._id}><td className="fw-semibold">{item.name}</td><td><span className="badge text-bg-info">{item.difficulty || 'All levels'}</span></td><td>{item.description || '—'}</td><td>{item.exercises?.length ?? 0}</td></tr>
  )} />
}
