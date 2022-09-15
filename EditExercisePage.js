import React from 'react';
import { useHistory } from "react-router-dom";
import { useState } from 'react';

export const EditExercisePage = ({ exercise }) => {
 
    const [name, setName]       = useState(exercise.name);
    const [reps, setReps]       = useState(exercise.reps);
    const [weight, setWeight]   = useState(exercise.weight);
    const [unit, setUnit]       = useState(exercise.unit);
    const [date, setDate]       = useState(exercise.date);
    
    const history = useHistory();

    const editExercise = async () => {
        const response = await fetch(`/exercises/${exercise._id}`, {
            method: 'PUT',
            body: JSON.stringify({ 
                name: name, 
                reps: reps,
                weight: weight,
                unit: unit,
                date: date
            }),
            headers: {'Content-Type': 'application/json',},
        });

        if (response.status === 200) {
            alert("Successfully edited document!");
        } else {
            const errMessage = await response.json();
            alert(`Failed to update document. Status ${response.status}. ${errMessage.Error}`);
        }
        history.push("/");
    }

    return (
        <>
        <article>
            <h2>Edit an exercise in the collection</h2>
            <p>Input the parameters you would like to change</p>
            <form onSubmit={(e) => { e.preventDefault();}}>
                <fieldset>
                    <legend>Exercise parameters:</legend>
                    <label for="name">Exercise name</label>
                    <input
                        type="text"
                        placeholder="Name of exercise"
                        value={name}
                        onChange={e => setName(e.target.value)} 
                        id="name" />
                    
                    <label for="reps">Number of reps</label>
                    <input
                        type="number"
                        value={reps}
                        placeholder="..."
                        onChange={e => setReps(e.target.value)} 
                        id="reps" />

                    <label for="weight">Weight lifted</label>
                    <input
                        type="number"
                        value={weight}
                        placeholder="..."
                        onChange={e => setWeight(e.target.value)} 
                        id="weight" />

                    <br></br>
                    <label for="units">Select units</label>
                    <select 
                        type="string" 
                        value={unit} 
                        onChange={e => setUnit(e.target.value)} 
                        id="unit">
                            <option value="kg">Kilograms</option>
                            <option value="lbs">Pounds</option>
                            <option value="km">Kilometers</option>
                    </select>

                    <label for="date">Date</label>
                    <input
                        type="date"
                        value={date}
                        placeholder="MM-DD-YY"
                        onChange={e => setDate(e.target.value)} 
                        id="date" />

                    <br></br>
                    <label for="submit">
                    <button
                        onClick={editExercise}
                        id="submit"
                    >Save</button> updates to the collection</label>
                </fieldset>
                </form>
            </article>
        </>
    );
}
export default EditExercisePage;