function Board({board}) {

    return (
        <div className="board">
            {board.flat().map((value, index) => (
                <div key={index} className={`cell value-${value}`}>
                    {value !== 0 ? value : ''}
                </div>
            ))}
        </div>
    );
}

export default Board;