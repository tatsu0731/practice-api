import useSWR from 'swr';
import { useRouter } from 'next/navigation'

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
    const { data, error, isLoading } = useSWR('https://jsonplaceholder.typicode.com/posts', fetcher)
    const router = useRouter();
    const redirectCheck = () => router.replace('./')
    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>
    return (
        <main>
            <h1 className='text-xl font-black text-blue-500'>blog画面</h1>
            <div>
                {data.slice(0, 3).map((item) => (
                    <div key={item.id}>
                        <div className='font-black'>id: {item.id}</div>
                        <div className='font-black text-blue-600'>title: {item.title}</div>
                        <div>body: {item.body}</div>
                    </div>
                ))}
            </div>
            <div className='flex justify-center my-4'>
                <button onClick={redirectCheck} className='px-10 rounded-full py-2 bg-blue-500 text-white font-bold'>戻る</button>
            </div>
        </main>
    );
};
