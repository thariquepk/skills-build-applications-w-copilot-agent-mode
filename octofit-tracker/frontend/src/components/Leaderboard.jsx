import CollectionView from './CollectionView'
import { displayId } from '../api'

// API endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/
export default function Leaderboard() {
  return <CollectionView resource="leaderboard" title="Leaderboard" columns={['Rank', 'User', 'Team', 'Points']} renderRow={(item) => (
    <tr key={item._id}><td>{item.rank ?? '—'}</td><td>{displayId(item.userId)}</td><td>{displayId(item.teamId)}</td><td className="fw-bold">{item.points ?? 0}</td></tr>
  )} />
}
