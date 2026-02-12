import useSWR from 'swr';

const fetcher = url => fetch(url).then(r => r.json());

export default function Dashboard() {
const {data: status} = useSWR('/api/status', fetcher);
const {data: runs} = useSWR('/api/runs', fetcher);
const {data: events} = useSWR('/api/events', fetcher);
const {data: positions} = useSWR('/api/positions', fetcher);

return (
<div style={{fontFamily:'sans-serif',maxWidth:'1200px',margin:'0 auto',padding:'20px'}}>
<header style={{background:'#1f2937',color:'white',padding:'20px',borderRadius:'10px',marginBottom:'20px'}}>
<h1>Polymarket Bot Dashboard 🚀</h1>
<div>LIVE ● Phase: {status?.phase} ● Mode: {status?.mode} ● Size: {status?.size} ● Risk: {status?.risk} ● Kill: {status?.kill} ● Last: {status?.last_update}</div>
</header>
<section id="status"><h2>KPIs</h2><p>Trades: {status?.trades_count} | PnL Unreal: {status?.pnl_unreal} | Exposure: {status?.exposure}</p></section>
<section id="runs"><h2>Last Runs</h2><table style={{width:'100%',borderCollapse:'collapse'}}><thead><tr><th>Run</th><th>Open</th><th>Tradable</th><th>New Trades</th><th>PnL</th></tr></thead><tbody>{runs?.map(r => <tr key={r.run_id}><td>{r.run_id}</td><td>{r.open_markets}</td><td>{r.tradable_now}</td><td>{r.new_trades}</td><td>{r.unreal_pnl_usdc}</td></tr>)}</tbody></table></section>
<section id="proof"><h2>Events</h2><div>Last order: ID {events?.[0]?.order_id} {events?.[0]?.market_slug} {events?.[0]?.side} {events?.[0]?.size} filled {events?.[0]?.filled}%</div><table><thead><tr><th>Type</th><th>Slug</th><th>Side</th><th>Price/Size</th><th>TS</th></tr></thead><tbody>{events?.slice(0,20).map(e => <tr key={e.timestamp}><td>{e.type}</td><td>{e.market_slug}</td><td>{e.side}</td><td>{e.price}/{e.size}</td><td>{e.timestamp}</td></tr>)}</tbody></table></section>
<section id="positions"><h2>Positions</h2><table><thead><tr><th>Slug</th><th>Size</th><th>Entry</th><th>Unreal</th><th>Age</th></tr></thead><tbody>{positions?.map(p => <tr key={p.slug}><td>{p.slug}</td><td>{p.size}</td><td>{p.entry}</td><td>{p.unreal}</td><td>{p.age_days}</td></tr>)}</tbody></table></section>
<script>setInterval(()=>location.reload(),10000);</script>
</div>
);
}
