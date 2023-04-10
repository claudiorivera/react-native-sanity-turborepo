import type { NextPage } from "next";
import Head from "next/head";

import { api } from "~/utils/api";

const Home: NextPage = () => {
	const eventQuery = api.event.all.useQuery();

	return (
		<>
			<Head>
				<title>react-native-sanity-turborepo</title>
				<meta name="description" content="Generated by create-t3-app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="flex h-screen flex-col items-center justify-between bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
				<div className="container mt-12 flex h-full flex-col items-center justify-center gap-4 px-4 py-8">
					{eventQuery.data ? (
						<div className="w-full max-w-2xl">
							{JSON.stringify(eventQuery.data, null, 2)}
						</div>
					) : (
						<p>Loading...</p>
					)}
				</div>
			</main>
		</>
	);
};

export default Home;