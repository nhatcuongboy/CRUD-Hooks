import React, { useState, Fragment, useEffect } from "react";
import AddEquipmentForm from "./forms/AddEquipmentForm";
import EditEquipmentForm from "./forms/EditEquipmentForm";
import EquipmentTable from "./tables/EquipmentTable";

const App = () => {
  const initialFormState = { name: "", type: "" };

  // Setting state
  const [equipments, setEquipments] = useState([]);
  const [currentEquipment, setCurrentEquipment] = useState(initialFormState);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const url = "http://localhost:4000/api/equipment/list";
      const response = await fetch(url);
      const responseJSON = await response.json();
      setEquipments(responseJSON);
    }
    fetchData();
  }, []);

  const addEquipment = (equipment) => {
    async function addData() {
		const response = await fetch(
        "http://localhost:4000/api/equipment/create",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(equipment),
        }
      );
      const equip = await response.json();
      setEquipments([...equipments, equip]);
    }
    addData();
  };

  const deleteEquipment = (_id) => {
    async function deleteData() {
      const response = await fetch(
        `http://localhost:4000/api/equipment/delete/${_id}`,
        {
          method: "DELETE",
        }
      );
      const responseJSON = await response.json();
      console.log(responseJSON)
      if (response.status === 200) {  // delete success
        const fetchList = await fetch('http://localhost:4000/api/equipment/list');
        const fetchListJSON = await fetchList.json();
        setEquipments(fetchListJSON);
      } else { 
        // show error
      }
    }
    deleteData();
  };

  const updateEquipment = (_id, updatedEquipment) => {
    setEditing(false);
	
	async function updateData() {
		const response = await fetch(
			`http://localhost:4000/api/equipment/update/${_id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedEquipment),
        }
      );
      const responseJSON = await response.json();
      console.log(responseJSON)
      if (response.status === 200) {  // update success
        const fetchList = await fetch('http://localhost:4000/api/equipment/list');
        const fetchListJSON = await fetchList.json();
        setEquipments(fetchListJSON);
      } else { 
        // show error
      }
    }
    updateData();
  };

  const editRow = (equipment) => {
    setEditing(true);

    setCurrentEquipment({
      _id: equipment._id,
      name: equipment.name,
      type: equipment.type,
    });
  };

  return (
    <div className="container">
      <h1>CRUD App with Hooks</h1>
      <div className="flex-row">
        <div className="flex-large">
          {editing ? (
            <Fragment>
              <h2>Edit equipment</h2>
              <EditEquipmentForm
                editing={editing}
                setEditing={setEditing}
                currentEquipment={currentEquipment}
                updateEquipment={updateEquipment}
              />
            </Fragment>
          ) : (
            <Fragment>
              <h2>Add equipment</h2>
              <AddEquipmentForm addEquipment={addEquipment} />
            </Fragment>
          )}
        </div>
        <div className="flex-large">
          <h2>View equipments</h2>
          <EquipmentTable
            equipments={equipments}
            editRow={editRow}
            deleteEquipment={deleteEquipment}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
