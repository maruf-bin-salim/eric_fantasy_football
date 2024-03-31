'use client';

import Preview from '@/app/components/Preview/Preview';
import { getNewsById } from '@/database/client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';


export default function SomeClientComponent() {
    const { id } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchNews() {
            let { news } = await getNewsById(id);
            if (news) {
                setData(news[0]);
            }

        }
        if (id) fetchNews();
    }, [id])

    // if (!data) {
    //     return <p>Loading...</p>
    // }

    console.log(data);

    return (
        <div className="max-w-lg mx-auto flex  items-center flex-col mt-8 p-4 bg-white rounded-lg ">
            <img className="w-full rounded" src={data?.cover_photo_url} />
            <h1 className="text-2xl font-bold mb-4 mt-3">{data?.title}</h1>
            <div >
                <Preview markdown={data?.content} />
            </div>
            <div>
                <h2 className="text-lg font-semibold mb-2">Tags</h2>
                <ul className="flex flex-wrap">
                    {data?.tags.map(tag => (
                        <li key={tag.id} className="mr-2 mb-2">{tag.text}</li>
                    ))}
                </ul>
            </div>
        </div>
    );


}