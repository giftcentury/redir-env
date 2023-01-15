import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useLayoutEffect } from 'react'

export default function Comp({ metaTags }) {

    useLayoutEffect(() => {
        location.href = metaTags['og:url']
    }, [])


    return (
        <div>
            {metaTags &&

                <Head>
                    {metaTags && Object.entries(metaTags).map((entry) => {

                        console.log(entry)
                        return (

                            <meta key={entry[0]} name={entry[0]} content={entry[1]} />
                        )
                    }
                    )}
                </Head>


            }
        </div>
    )
}


export async function getStaticProps(Context) {


    let mainurl = [];
    let slugString = '';
    const slugs = Context
    mainurl = slugs.params.slugs

    mainurl.map(x => {
        slugString += x + '/'
    });
    console.log(slugString)



    let data = await fetch(process.env.vercel + 'api/getMetadata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            url: process.env.main + slugString
        })
    })

    data = await data.json()
    console.log(data.metadata)


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