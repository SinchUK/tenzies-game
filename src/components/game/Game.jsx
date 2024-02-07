import NumberItems from '../numberItems/NumberItems';
import './game.css';
import { useState } from 'react';

const Game = () => {

    return (
        <div className='game'>
            <div className="game_title">
                <div className='game_title_text'>
                    <h1>Tenzies</h1>
                    <p>Roll until all dice are the same. 
                        Click each die to freeze it at its 
                        current value between rolls.
                    </p>
                </div>
            </div>
            <NumberItems />
        </div>
    )
}

export default Game;
