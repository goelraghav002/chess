import { useEffect, useState } from "react"
import Button from "../components/Button"
import ChessBoard from "../components/ChessBoard"
import { useSocket } from "../hooks/useSocket"
import { GAME_OVER, INIT_GAME, MOVE } from "../constants"
import { Chess } from "chess.js"


const GamePage = () => {
  const socket = useSocket();
  const [chess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!socket) {
      return;
    }
    
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      switch (message.type) {
        case INIT_GAME:
          setBoard(chess.board());
          setStarted(true);
          break;
        
        case MOVE:
          const move = message.payload;
          chess.move(move);
          setBoard(chess.board());
          console.log("Move Made")
          break;
        
        case GAME_OVER:
          console.log("Game Over")
          break;
      }
    }

  }, [socket])

  if (!socket) return (<div>Connecting...</div>);

  return (
    <div className="bg-slate-800 h-screen flex justify-center items-center">
      <div className="max-w-screen-xl m-auto flex flex-col lg:flex-row">
        <div className="w-full flex justify-start items-center p-10">
          <ChessBoard chess={chess} setBoard={setBoard} socket={socket} board={board} />
        </div>
        <div className="bg-slate-900 lg:m-10">
          <div className="text-center lg:w-80">
            <Button
              disabled={started}
              onClick={() => {
                socket.send(JSON.stringify({
                  type: INIT_GAME,
                }))
              }}
            >
              Play
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GamePage