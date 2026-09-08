import CollectionView from './CollectionView'
import { displayId } from '../api'

// API endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/
export default function Activities() {
  return <CollectionView resource="activities" title="Activities" columns={['Type', 'User', 'Duration', 'Distance', 'Points']} renderRow={(item) => (
    <tr key={item._id}><td>{item.type}</td><td>{displayId(item.userId)}</td><td>{item.duration ?? '—'} min</td><td>{item.distance ?? '—'}</td><td>{item.points ?? 0}</td></tr>
  )} />
}
