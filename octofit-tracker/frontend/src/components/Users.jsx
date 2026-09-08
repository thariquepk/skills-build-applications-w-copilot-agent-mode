import CollectionView from './CollectionView'

// API endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/
export default function Users() {
  return <CollectionView resource="users" title="Users" columns={['Name', 'Username', 'Email', 'Goal']} renderRow={(item) => (
    <tr key={item._id}><td className="fw-semibold">{item.name || '—'}</td><td>{item.username}</td><td>{item.email}</td><td>{item.profile?.goal || '—'}</td></tr>
  )} />
}
