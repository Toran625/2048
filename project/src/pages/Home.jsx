import {Link, useNavigate} from "react-router-dom";

function Home(){

    const navigate = useNavigate();

    return ( 
        <div className="home">
            <h1>Welcome to 2048 Game</h1>
            <p>Click the button below to start playing!</p>
            <Link to="/game"><button>Go to Game</button></Link>
            <Link to="/game">Go to Game again</Link>
            <button onClick={() => navigate("/game")}>Go to Game a third time</button>
        </div>
    )
}

export default Home;