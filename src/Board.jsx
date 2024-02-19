import React, {useState, useEffect} from 'react'
import "./Board.css"
import Navbar from './components/Navbar';
import {useDispatch, useSelector} from "react-redux"
import { updateScore, fetchHighscore } from './redux/slices/userSlice';
import Highscore from './components/Highscore';


function Board() {
    const [deck, setDeck] = useState([])
    const [diffuseCardCount, setDiffuseCardCount] = useState(0)
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [explodeAction, setExplodeAction] = useState(false);
    const [currentCard, setCurrentCard] = useState(null)
    const [cardIsShowing, setCardIsShowing] = useState(false);

    const dispatch = useDispatch();

    const highscore = useSelector(state => state.user.highscores)

   

    const initializeDeck = () => {
        const cards = [
          { cardName: 'cat1.png', cardTitle: 'first card title' },
          { cardName: 'defusecard.jpg', cardTitle: 'second card title' },
          { cardName: 'shufflecard.jpg', cardTitle: 'third card title' },
          { cardName: 'explod_card.png', cardTitle: 'forth card title' },
        ];
        const tempDeck = [];
      
        const getRandomInt = (min, max) => {
          return Math.floor(Math.random() * (max - min + 1) + min);
        }
      
        for (let i = 0; i < 5; i++) {
          tempDeck.push(cards[getRandomInt(0, cards.length - 1)]);
        }
      
        return tempDeck;
      }

    const restartGame = () => {
        const tempDeck = initializeDeck();
        setDeck(tempDeck);
        setDiffuseCardCount(0);
        dispatch(fetchHighscore())
        setGameOver(false)
        setGameWon(false)

        // if (gameWon){
        //     dispatch(updateScore());
        // }
        dispatch(fetchHighscore());
    }

    const handleExplodingKitten = () => {
            const tempDeck = [...deck];
            tempDeck.pop();

            if(deck.length == 1){
                dispatch(updateScore())
                setGameWon(true)
            }
            else{
                setDiffuseCardCount(prev => prev - 1);
                setDeck(tempDeck)
                setExplodeAction(false)
            }
    }

    //Pop the last card ->  check what it is -> take appropriate action
    const handleCardShow = () => {
        const tempDeck = [...deck];
        const currCard = tempDeck[tempDeck.length-1];
        setCurrentCard(currCard)
        setCardIsShowing(true)
        setTimeout(() => {
            if(tempDeck.length == 1 && currCard.cardName != "shufflecard.jpg" && currCard.cardName != "explod_card.png"){
                setGameWon(true)
                dispatch(updateScore())
            }

            if(currCard.cardName == "cat1.png"){
                //remove card from deck
                tempDeck.pop();
                setDeck(tempDeck);
            }
            else if(currCard.cardName == "defusecard.jpg"){
                setDiffuseCardCount(prev => prev + 1)
                tempDeck.pop();
                setDeck(tempDeck);
            }
            else if(currCard.cardName == "shufflecard.jpg"){
                restartGame() //Restart Game 
            }
            else if(currCard.cardName == "explod_card.png"){ 
                if(diffuseCardCount > 0 ){ 
                    setExplodeAction(true);
                }
                else{
                    setGameOver(true)
                }
            }
            setCurrentCard(null); // set currentCard to null after 2.5 seconds
            setCardIsShowing(false)
          }, 2500)
    }

      
    useEffect( () => {
        const tempDeck = initializeDeck();
        setDeck(tempDeck);
    }, [])
    useEffect(() => {
        if (gameWon) {
            console.log('Game won, dispatching updateScore');
            dispatch(updateScore());
        }
    }, [gameWon]);

    console.log(deck)
  return (
    <>
    <Navbar/>
    {
        gameWon ? (
            <div className='won-div'>
                <h1>Congratulations! You Won! 🥳</h1>
                <p>Great job! You successfully completed the game. Play again and aim for an even higher score!</p>
                <button onClick={ restartGame } >Restart</button>
            </div>
        ) : (

        gameOver ? (
            <div className='gameover-div'>
                <h1>Game Over 😢</h1>
                <p>Oh no! It looks like the game is over. Better luck next time!</p>
                <button onClick={ restartGame } >Play Again</button>
            </div>
        ) : (
        <div className='board' >
        
        <div className="container">
            <div className='card-cont' >
                {
                deck && deck.map((card, ind) => (
                    <div key={ind} className={`card1 card-${ind+1}`} ></div>
                ))
                }
            </div>

            {
                currentCard && (
                    <div className='card active-card'> 
                    <img src={currentCard.cardName} alt={`Current Card`} />
                    </div>
                )
            }

            { !cardIsShowing && <button className='show-btn' onClick={handleCardShow} >show card</button>} 
            {
                explodeAction && <button className='diffuse-btn' onClick={handleExplodingKitten} >Use Diffuse</button>
            }
            <h2>Diffuse Cards To Use - {diffuseCardCount}</h2>
        </div>

                <Highscore highscore={highscore} />

            </div>
        )
      )
    }

    </>
  )
}

export default Board