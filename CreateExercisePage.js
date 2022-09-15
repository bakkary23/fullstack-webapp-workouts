import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const CreateExercisePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');
    
    const history = useHistory();

    const addExercise = async () => {
        const newExercise = { name, reps, weight, unit, date };
        const response = await fetch('/exercises', {
            method: 'post',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            alert("Successfully added the exercise!");
        } else {
            alert(`Failed to add exercise, status code = ${response.status}`);
        }
        history.push("/");
    };


    return (
        <>
        <article>
            <h2>Add to the collection</h2>
            <p>Paragraph about this page.</p>
            <form onSubmit={(e) => { e.preventDefault();}}>
                <fieldset>
                    <legend>Which exercise are you creating?</legend>
                    <label for="name">Exercise name</label>
                    <input
                        type="text"
                        placeholder="Name of exercise"
                        value={name}
                        onChange={e => setName(e.target.value)} 
                        id="name" 
                        required />
                    
                    <label for="reps">Number of reps</label>
                    <input
                        type="number"
                        value={reps}
                        placeholder="..."
                        onChange={e => setReps(e.target.value)} 
                        id="reps" 
                        required />

                    <label for="weight">Weight lifted</label>
                    <input
                        type="number"
                        value={weight}
                        placeholder="..."
                        onChange={e => setWeight(e.target.value)} 
                        id="weight"
                        required />
                    <br></br>
                    <label for="units">Select units</label>
                    <select 
                        type="string" 
                        value={unit} 
                        onChange={e => setUnit(e.target.value)} 
                        id="unit"
                        required >
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
                        id="date"
                        required />

                    <label for="submit">
                    <button
                        type="submit"
                        onClick={addExercise}
                        id="submit"
                    >Add</button> to the collection</label>
                </fieldset>
                </form>
            </article>
        </>
    );
}

export default CreateExercisePage;