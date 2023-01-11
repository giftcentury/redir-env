import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useLayoutEffect } from 'react'

export default function Comp({ metaTags }) {

    useLayoutEffect(() => {
        // location.href = metaTags['og:url']
    }, [])


    return (
        <div>
            {metaTags &&

                <Head>
                    {metaTags && Object.entries(metaTags).map((entry) => {


                        console.log(entry)

                        if (entry[0] == 'og:image') {
                            return (
                                <meta key={entry[0]} name={entry[0]} content={entry[1].replace(':', "://").replaceAll(",", "/")} />

                            )
                        }
                        else {

                            return (

                                <meta key={entry[0]} name={entry[0]} content={entry[1]} />
                            )
                        }

                    }
                    )}

                    <meta  name={'og:image:height'} content={600} />
                    <meta  name={'og:image:width'} content={600} />


                </Head>


            }
            {/* <p>hello check</p> */}
        </div>
    )
}


export async function getStaticProps(Context) {

    let mainurl = [];
    let slugString = '';
    const slugs = Context
    mainurl = slugs.params.slugs

    // let dta = mainurl.map(x => {
    //     slugString += x + '/'
    // });

    mainurl = mainurl.toString()
    let urls = mainurl.split('image')
    console.log('harish : ' + urls)
    console.log('harish : ' + slugs.params)



    let data = await fetch(process.env.vercel + 'api/getMetadata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            url: process.env.main + mainurl.split('image')[0],
            thumbnail: urls[1].replace(',', '')
        })
    })

    data = await data.json()
    // console.log(data.metadata)


    const metaTags = {
        "og:title": data.metadata.title,
        "og:description": data.metadata.description,
        "og:image": data.metadata.image,
        "og:url": data.metadata.url,
    };

    return {
        props: {
            metaTags
        }
    }


}



export async function getStaticPaths() {

    return {
        paths: [],
        fallback: 'blocking', // can also be true or 'blocking'
    }
}