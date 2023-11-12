import { useState, useEffect } from "react";

export default function ButtonCheckActivity({column, stats}) {
	const [isChecked, setIsChecked] = useState(column[1] === 'checked');

	useEffect(() => {
		setIsChecked(stats === 'checked');
	  }, [column]);

	const handleCheckboxChange = () => {
		// Handle checkbox change if needed
		// Example: You can make an API call to update the server state
		// axios.put('/api/updateCheckbox', { id: column.id, isChecked: !isChecked });

		// Assuming column[0] is the ID of the item you want to identify
		const itemId = `${column[0]}-${column[1]}`;

		// Get the existing items from localStorage (assuming it's stored as JSON)
		const storedItems = JSON.parse(localStorage.getItem('checkedItems')) || [];
	  
		// Check if the item is already in the array
		const isItemChecked = storedItems.includes(itemId);
	  
		// If the item is checked, remove it; otherwise, add it
		const updatedItems = isItemChecked
		  ? storedItems.filter((item) => item !== itemId)
		  : [...storedItems, itemId];
	  
		// Save the updated items back to localStorage
		localStorage.setItem('checkedItems', JSON.stringify(updatedItems));

		setIsChecked(!isChecked);

		console.log(localStorage.getItem('checkedItems'));
	};

	return (
		<div>
			<input
				type="checkbox"
				className="checkbox checkbox-accent"
				checked={isChecked}
				onChange={handleCheckboxChange}
				disabled={stats === 'inactive'} />
		</div>
	);
	
	// if (column[1]=='checked') {
	// 	return ( // Task selesai
	// 		<div>
	// 			{column}
	// 			<input type="checkbox" className="checkbox checkbox-accent" checked={isChecked}/>
	// 		</div>
	// 	);   
	// } else if (column[1]=='inactive') {
	// 	return ( // Task di hari yang akan datang
	// 		<div>
	// 			{column}
	// 			<input type="checkbox" className="checkbox checkbox-accent" disabled/>
	// 		</div>
	// 	);   
	// } else {
	// 	return ( // siap di checklist
	// 		<div>
	// 			{column}
	// 			<input type="checkbox" className="checkbox checkbox-accent"/>
	// 		</div>
	// 	);
	// }
}