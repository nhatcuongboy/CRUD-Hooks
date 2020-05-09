import React from 'react'

const EquipmentTable = props => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {props.equipments.length > 0 ? (
        props.equipments.map(equipment => (
          <tr key={equipment._id}>
            <td>{equipment.name}</td>
            <td>{equipment.type}</td>
            <td>
              <button
                onClick={() => {
                  props.editRow(equipment)
                }}
                className="button muted-button"
              >
                Edit
              </button>
              <button
                onClick={() => props.deleteEquipment(equipment._id)}
                className="button muted-button"
              >
                Delete
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No equipments</td>
        </tr>
      )}
    </tbody>
  </table>
)

export default EquipmentTable
