// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


const { getMetadata } = require('page-metadata-parser');
const domino = require('domino');




export default async function handler(req, res) {

  if (req.method == 'POST') {

    const url = req.body.url;

    try {

      const response = await fetch(url);
      const html = await response.text();
      const doc = domino.createWindow(html).document;
      const metadata = getMetadata(doc, url);

      res.json({ metadata, url })

    } catch (error) {

      res.json({ url })
    }
  }

  else {

    res.json({ msg: 'no data' })
  }


}
