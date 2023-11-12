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
			<section>
				<div>
					<ol>
						{ surah.map((item, surah_index) => (
						<li key={surah_index}>
							<Link href={`/surah/${item.index}`}>{item.name}</Link>
							<div>{item.translation}</div>
							<small>{item.ayat_count} ayat | {item.revealed}</small>
						</li>
						)) }
					</ol>
				</div>
			</section>
		</Layout>
	);

}

export default SurahIndex