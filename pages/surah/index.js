import Link from "next/link";
import Layout from "../../components/layout";
import axios from "axios";

export async function getServerSideProps() {
	try {
		const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/surah`);
		const surah = response.data.data;
		return {
			props: {
				surah,
			},
		};
	} catch (error) {
		console.error('Error fetching surah:', error);
		return {
			props: {
				surah: null,
			},
		};
	}
}

function SurahIndex(props) {
	const { surah } = props;

	return (
		<Layout>
			<section className="p-3">
				<div>
					<div className="grid lg:grid-cols-3 gap-3">
						{ surah.map((item, surah_index) => (
						<div key={surah_index} className="bg-white rounded shadow-lg">
							<div className="relative m-4 mb-2 [&>h4]:text-xl [&>h4]:mb-1 [&>h4]:text-slate-900 [&>h5]:text-md [&>h5]:text-slate-600">
								<h4>{item.index}. {item.name}</h4>
								<h5>{item.translation}</h5>
								<small className="absolute top-0 right-0">{item.ayat_count} ayat</small>
								<small className="absolute bottom-0 right-0">{item.revealed}</small>
							</div>
							<div className="mb-b p-2">
								<Link className="btn btn-dark btn-sm w-full [&>span]:text-xs"
									href={`/surah/${item.index}`}>
									<span>Lihat detail</span>
								</Link>
							</div>
						</div>
						)) }
					</div>
				</div>
			</section>
		</Layout>
	);

}

export default SurahIndex