import useSWR from 'swr';
import { useRouter } from 'next/navigation'

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error, isLoading } = useSWR('https://jsonplaceholder.typicode.com/posts', fetcher)
  const router = useRouter();
  const redirectCheck = () => router.replace('./blog')
  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
  return (
    <main>
      {data.slice(0, 10).map((item) => (
        <div key={item.id} className='mb-4'>
          <div className='font-black'>id: {item.id}</div>
          <div className='font-black text-blue-600'>title: {item.title}</div>
          <div>body: {item.body}</div>
        </div>
      ))}
      <div className='flex justify-center my-4'>
        <button onClick={redirectCheck} className='px-10 rounded-full py-2 bg-blue-500 text-white font-bold'>リダイレクト</button>
      </div>
    </main>
  );
};
