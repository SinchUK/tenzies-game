import { useState, useEffect } from 'react';
import Confetti from 'react-confetti'
import './number_items.css';

function generateNumber() {
    return Math.ceil(Math.random() * 6);
}

const NumberItems = () => {
    // states
    const [tenzies, setTenzies] = useState(generateNewTenzies());
    const [isWin, setIsWin] = useState(false);

    // functions
    function generateNewTenzies() {
        const result = [];
        for(let i = 1; i <= 10; i++) {
            result.push({
                id: `tenz_${i}`,
                isLocked: false,
                number: generateNumber(),
            })
        }

        return result;
    }

    function handleLockTenz(tenzId) {
        if (isWin) return

        setTenzies((prevTenzies) => {
            return prevTenzies.map((tenz) => {
                if(tenz.id === tenzId) {
                    return {
                        ...tenz,
                        isLocked: !tenz.isLocked,
                    }
                } else {
                    return tenz
                }
            })
        })
    }

    function handleRollTenzies() {
        setTenzies((prevTenzies) => {
            return prevTenzies.map((tenz) => {
                if(tenz.isLocked) {
                    return tenz
                } else {
                    return {
                        ...tenz,
                        number: generateNumber(),
                    }
                }
            })
        })
    }

    function checkIsWin() {
        const allLocked = tenzies.every((tenz) => tenz.isLocked);
        const allNumbersSame = tenzies.every((tenz) => tenz.number === tenzies[0].number);

        if(allLocked && allNumbersSame) {
            setIsWin(true);
        }
    }

    function handleNewGame() {
        if(isWin) {
            setTenzies(generateNewTenzies())
            setIsWin(false);
        } else {
            handleRollTenzies()
        }
    }

    // effects
    useEffect(() => {
        checkIsWin();
    }, [tenzies]);

    // render
    return (
        <>
            { isWin && <Confetti  colors={['#000ff', '#00ffff']}/> }
            <div className='game_items'>
                {tenzies.map((tenz) => {
                    return (
                        <div 
                            key={tenz.id}
                            onClick={() => handleLockTenz(tenz.id)}
                            className={tenz.isLocked ? "game_item locked" : "game_item"}
                        >
                            {tenz.number}
                        </div>
                    )
                })}
            </div>
            <button onClick={handleNewGame}>{isWin ? "New Game" : "Roll"}</button>
        </>
    )
}


export default NumberItems;