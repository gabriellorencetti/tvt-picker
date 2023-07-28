import dynamic from 'next/dynamic';

const Randomizer = dynamic(() => import('@/components/Randomizer'), {
  ssr: false
});

const UsernameForm = dynamic(() => import('@/components/UsernameForm'), {
  ssr: false
});

export default async function Home({ searchParams }) {
  if (!searchParams.username) {
    return <UsernameForm />;
  }

  const response = await fetch(
    `${process.env.API_URL}/api/tvtime?username=${searchParams.username}`
  );

  const shows = await response.json();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-10">
      <Randomizer shows={shows?.showsArray} />
    </main>
  );
}
