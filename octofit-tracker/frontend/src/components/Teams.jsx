import CollectionView from './CollectionView'

// API endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/
export default function Teams() {
  return <CollectionView resource="teams" title="Teams" columns={['Name', 'Description', 'Members']} renderRow={(item) => (
    <tr key={item._id}><td className="fw-semibold">{item.name}</td><td>{item.description || '—'}</td><td>{item.members?.length ?? 0}</td></tr>
  )} />
}
