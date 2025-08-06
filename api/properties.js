
let properties = [];

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(properties);
  } else if (req.method === 'POST') {
    const newProperty = { id: Date.now(), ...req.body };
    properties.push(newProperty);
    res.status(201).json(newProperty);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
