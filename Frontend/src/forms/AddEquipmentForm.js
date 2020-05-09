import React, { useState } from 'react'

const AddEquipmentForm = props => {
	const initialFormState = { name: '', type: '' }
	const [ equipment, setEquipment ] = useState(initialFormState)

	const handleInputChange = event => {
		const { name, value } = event.target
		setEquipment({ ...equipment, [name]: value })
	}

	return (
		<form
			onSubmit={event => {
				event.preventDefault()
				if (!equipment.name || !equipment.type) return
				props.addEquipment(equipment)
				setEquipment(initialFormState)
			}}
		>
			<label>Name</label>
			<input type="text" name="name" value={equipment.name} onChange={handleInputChange} />
			<label>Type</label>
			<input type="text" name="type" value={equipment.type} onChange={handleInputChange} />
			<button>Add</button>
		</form>
	)
}

export default AddEquipmentForm
