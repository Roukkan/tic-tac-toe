import React, { useEffect, useState } from "react";
import Board from './Board';

const Game = () => {

    const[value, setValue]=useState(Array(9).fill(null))
    const[currentPlayer, setCurrentPlayer]=useState("X")
    const[winner, setWinner]=useState(null)
    const[isDraw, setIsDraw]=useState(false)
    
    const checkWinner=()=>{
        const winIndex=[
            // horizontal winIndex
            [0,1,2],
            [3,4,5],
            [6,7,8],

            // vertical winIndex
            [0,3,6],
            [1,4,7],
            [2,5,8],

            // diagonal winIndex
            [0,4,8],
            [2,4,6]
        ]

        //loop for posible winning combinations
        for(let i=0; i<winIndex.length; i++) {
            const[a,b,c]=winIndex[i]
            if(value[a] === value[b] && value[a] === value[c] && value[a] !== null){
                return value[a]
            }
        }
        return null
    }

    //eveent handler for the box click
    const handleclick=(index:number)=>{
        if(value[index]===null && !winner && !isDraw){
            const updateValue=[...value]
            updateValue[index]=currentPlayer
            setValue(updateValue)
            setCurrentPlayer(currentPlayer==="X"?"O":"X")
        }
    }

    //check if the board is full
    const isboardfull=()=>{
        return value.every((square)=>square!==null)
    }

    // function for new game
    const handleNewGame=()=>{
        setValue(Array(9).fill(null))
        setWinner(null)
        setCurrentPlayer('X')
        setIsDraw(false)
    }

    //Check for winner or a draw
    useEffect(() => {
        const newWinner = checkWinner();
        if (newWinner) {
            setWinner(newWinner)
        } else if (isboardfull()) {
            setIsDraw(true)
        }
    }, [value])
    
    return(
        <div>
            <Board onClick={handleclick} value={value}/>
            {/* Dynamically display the result of the game */}
            {winner ? <h1>Winner: {winner}</h1> : isDraw ? <h1>Draw Match</h1> :
            <h1>Player: {currentPlayer}</h1>}
            <button type="button" onClick={handleNewGame} className="start">New Game</button>
        </div>
    )
}

export default Game