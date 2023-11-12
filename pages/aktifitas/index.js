import Layout from "../../components/layout";
import axios from "axios";
import ButtonCheckActivity from "../../components/utilities/button-check-activity";
import { useState, useEffect } from "react";

export async function getServerSideProps() {
	try {
		const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/aktifitas`);
		const activities = response.data.data;
		return {
			props: {
				activities,
			},
		};
	} catch (error) {
		console.error('Error fetching activities:', error);
		return {
			props: {
				activities: null,
			},
		};
	}
}

function ActivityIndex(props) {
	const { activities } = props;

	const today = new Date();

	const [choiceMonth, setChoiceMonth] = useState(today.getMonth() + 1);
	const [choiceYear, setChoiceYear] = useState(today.getFullYear());

	const currentDay = today.getDate();
	const currentMonth = choiceMonth;
	const currentYear = choiceYear;
	const lastDayOfMonth = new Date(currentYear, currentMonth, 0);
	const daysInMonth = lastDayOfMonth.getDate();
	const monthNames = [
		"January",
		"February",
		"March", "April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	];
	const [dailyRecord, setDailyRecord] = useState(null);
	
	useEffect(() => {
		const storedDailyRecord = localStorage.getItem('checkedItems');
		if (storedDailyRecord) {
			setDailyRecord(JSON.parse(storedDailyRecord));
		}
	}, []);

	console.log(dailyRecord);

	return (
		<Layout>
			<section>
				<div className="bg-white rounded shadow-lg">
					<div className="table-scroll">
						<table className="table-of-acticity">
							<thead className="bg-white">
								<tr>
									<th rowSpan={2} className="bg-white">
										<div className="input-group">
											<select className="select select-accent"
												name="choice_month" 
												defaultValue={currentMonth} 
												onChange={(e) => setChoiceMonth(e.target.value)}>
												{monthNames.map((item, index) => (
													<option key={index} value={String(index + 1).padStart(2, '0')}>{item}</option>
												))}
											</select>
											<select className="select select-accent"
												name="choice_year" 
												defaultValue={currentYear} 
												onChange={(e) => setChoiceYear(e.target.value)}>
												{(() => {
													const choice_year = [];
													for (let index = 2; index >= 0; index--) {
														choice_year.push(<option key={index} value={today.getFullYear() - index}>{today.getFullYear() - index}</option>);
													}
													return choice_year;
												})()}
											</select>
										</div>
									</th>
									<th colSpan={daysInMonth}>
										<h1 className="text-lg mb-0">Mutabaah Yaumiyah</h1>
									</th>
								</tr>
								<tr>
								{(() => {
									const thead = [];
									for (let index = 1; index <= daysInMonth; index++) {
										thead.push(<th key={index} className="bg-white text-center">{index}</th>);
									}
									return thead;
								})()}
								</tr>
							</thead>
							<tbody>
								{ activities.map((item, activity_index) => (
									<tr key={activity_index}>
										<td>{item.title}</td>
										{(() => {
											const tbody = [];
											let stats;
											for (let day = 1; day <= daysInMonth; day++) {
												const currentDate = `${currentYear}-${currentMonth}-${String(day).padStart(2, '0')}`;
												const storedDailyRecord = (dailyRecord) ? dailyRecord : [];
												const isDateChecked = storedDailyRecord.includes(`${item.id}-${currentDate}`);

												stats = 'active';
												if (
													(day > currentDay && currentMonth == (today.getMonth() + 1) && currentYear == today.getFullYear()) || 
													(currentMonth > (today.getMonth() + 1) && currentYear == today.getFullYear()) || 
													(currentYear > today.getFullYear())
												) {
													stats = 'inactive';
												} else if (isDateChecked) {
													stats = 'checked';
												}
												tbody.push(
													<td key={day} className="text-center">
														<ButtonCheckActivity column={[item.id, `${currentDate}`]} stats={stats}/>
													</td>
												);
											}
											return tbody;
										})()}
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</section>
		</Layout>
	);
}

export default ActivityIndex