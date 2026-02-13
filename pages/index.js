import useSWR from 'swr';

const fetcher = url => fetch(url).then(r => r.json());

export default function Dashboard() {
const {data: status = {}} = useSWR('/api/status', fetcher);
const {data: runs = []} = useSWR('/api/runs', fetcher);
const {data: events = []} = useSWR('/api/events', fetcher);
const {data: positions = []} = useSWR('/api/positions', fetcher);

const phase = status.phase || 'N/A';
const size = status.size || 'N/A';
const risk = status.risk || 'N/A';
const kill = status.kill || 'N/A';
const last = status.last_run || 'N/A';
const trades = status.trades_count || 0;
const pnl = status.pnl_unreal || 0;
const exposure = status.exposure || 0;

return (
<div style={{fontFamily:'sans-serif',maxWidth:'1200px',margin:'0 auto',padding:'20px'}}>
<header style={{background:'#1f2937',color:'white',padding:'20px',borderRadius:'10px',marginBottom:'20px'}}>
<h1>Polymarket Bot Dashboard 🚀</h1>
<div>LIVE ● Phase: {phase} ● Mode: {status.mode || 'PAPER'} ● Size: ${size} ● Risk: {risk} ● Kill: {kill} ● Last: {last}</div>
</header>
<section id="status">
<h2>KPIs</h2>
<p>Trades: {trades} | PnL Unreal: ${pnl} | Exposure: ${exposure}</p>
</section>
<section id="runs">
<h2>Last Runs (20)</h2>
<table style={{width:'100%',borderCollapse:'collapse',border:'1px solid #ddd'}}>
<thead style={{background:'#f2f2f2'}}><tr><th>Run ID</th><th>Open</th><th>Tradable</th><th>New Trades</th><th>PnL</th></tr></thead>
<tbody>{runs.map(r => (
<tr key={r.run_id || Math.random()}>
<td>{r.run_id || 'N/A'}</td>
<td>{r.open_markets || 0}</td>
<td>{r.tradable_now || 0}</td>
<td>{r.new_trades || 0}</td>
<td>${r.unreal_pnl_usdc || 0}</td>
</tr>
))}</tbody>
</table>
</section>
<section id="proof">
<h2>Events (50)</h2>
<div>Last order: ID {events[0]?.order_id || 'N/A'} {events[0]?.market_slug || ''}</div>
<table style={{width:'100%',borderCollapse:'collapse',border:'1px solid #ddd'}}>
<thead style={{background:'#f2f2f2'}}><tr><th>Type</th><th>Slug</th><th>Side</th><th>Size</th><th>TS</th></tr></thead>
<tbody>{events.slice(0,20).map(e => (
<tr key={e.timestamp || Math.random()}>
<td>{e.type || 'N/A'}</td>
<td>{e.market_slug || ''}</td>
<td>{e.side || ''}</td>
<td>{e.size || ''}</td>
<td>{e.timestamp || ''}</td>
</tr>
))}</tbody>
</table>
</section>
<section id="positions">
<h2>Positions</h2>
<table style={{width:'100%',borderCollapse:'collapse',border:'1px solid #ddd'}}>
<thead style={{background:'#f2f2f2'}}><tr><th>Slug</th><th>Size</th><th>Entry</th><th>Unreal</th><th>Age</th></tr></thead>
<tbody>{positions.map(p => (
<tr key={p.slug || Math.random()}>
<td>{p.slug || ''}</td>
<td>{p.size || ''}</td>
<td>{p.entry || ''}</td>
<td>{p.unreal || ''}</td>
<td>{p.age_days || ''}</td>
</tr>
))}</tbody>
</table>
</section>
<script>
setInterval(() => location.reload(), 10000);
</script>
</div>
);
}
