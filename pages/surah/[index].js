import Link from "next/link";
import Layout from "../../components/layout";
import axios from "axios";

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
	console.log('test');
	return (
		<Layout>
			<section>
				<div>
					<ol>
						<li>
							<Link href={`/surah/${surah.index}`}>{surah.name}</Link>
							<div>{surah.translation}</div>
							<small>{surah.ayat_count} ayat | {surah.revealed}</small>
						</li>
					</ol>
				</div>
				<hr />
				<div>
					<ul>
						{ surah.ayat.map((item, ayat_index) => (
						<li key={ayat_index}>
							<Link href={`/ayat/${item.index}`}>{item.index}</Link>
						</li>
						)) }
					</ul>
				</div>
			</section>
		</Layout>
	);

}

export default SurahIndex