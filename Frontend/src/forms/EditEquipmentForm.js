import React, { useState, useEffect } from 'react'

const EditEquipmentForm = props => {
  const [ equipment, setEquipment ] = useState(props.currentEquipment)

  useEffect(
    () => {
      setEquipment(props.currentEquipment)
    },
    [ props ]
  )

  const handleInputChange = event => {
    const { name, value } = event.target

    setEquipment({ ...equipment, [name]: value })
  }

  return (
    <form
      onSubmit={event => {
        event.preventDefault()
        props.updateEquipment(equipment._id, equipment)
      }}
    >
      <label>Name</label>
      <input type="text" name="name" value={equipment.name} onChange={handleInputChange} />
      <label>Type</label>
      <input type="text" name="type" value={equipment.type} onChange={handleInputChange} />
      <button>Update</button>
      <button onClick={() => props.setEditing(false)} className="button muted-button">
        Cancel
      </button>
    </form>
  )
}

export default EditEquipmentForm
