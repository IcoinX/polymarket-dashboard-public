export default async function handler(req, res) {
if (req.headers['x-api-key'] !== process.env.API_TOKEN) return res.status(401).json({error:'Unauthorized'});
const path = req.query.path.join('/');
const response = await fetch(`${process.env.API_BASE}/api/${path}`, {
headers: {'x-api-key': process.env.API_TOKEN}
});
const data = await response.json();
res.json(data);
}
