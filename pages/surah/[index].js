import Link from "next/link";
import Layout from "../../components/layout";
import axios from "axios";
import { FiChevronLeft } from "react-icons/fi";

export async function getServerSideProps({params}) {
	try {
		const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/surah/${params.index}`);
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
				<Link className="btn mb-3"
							href={`/surah`}>
							<FiChevronLeft />
							<span>Semua Surah</span>
						</Link>
				<div className="flex flex-col lg:flex-row gap-3 mb-3">
					<div className="w-full lg:w-1/3">
						<div className="sticky top-[.75rem] flex flex-col bg-white rounded shadow-lg">
							<div className="relative m-4 [&>h4]:text-xl [&>h4]:mb-1 [&>h4]:text-slate-900 [&>h5]:text-md [&>h5]:text-slate-600">
								<h4>{surah.index}. {surah.name}</h4>
								<h5>{surah.translation}</h5>
								<small className="absolute top-0 right-0">{surah.ayat_count} ayat</small>
								<small className="absolute bottom-0 right-0">{surah.revealed}</small>
							</div>
						</div>
					</div>
					<div className="w-full lg:w-2/3">
						<div className="bg-white rounded shadow-lg p-4 mb-3">
							<div className="relative">
								<h4 className="mb-2">
									Progress hafalan
									<div className="badge badge-accent font-bold text-white mx-3">90%</div>
								</h4>
								<progress className="progress progress-accent w-full" value="90" max="100"></progress>
							</div>
						</div>
						<div className="flex flex-col gap-2 bg-white rounded shadow-lg p-4">
							{ surah.ayat.map((item, ayat_index) => (
							<label key={ayat_index} className="flex items-center justify-between rounded-lg cursor-pointer p-3 transition ease-in hover:bg-slate-50">
								<div>
									Ayat <span className="font-semibold">{item.index}</span>
								</div>
								<div>
									<input className="peer checkbox checkbox-accent"
										type="checkbox"
										defaultChecked />
								</div>
							</label>
							)) }
						</div>
					</div>
				</div>
			</section>
		</Layout>
	);

}

export default SurahIndex