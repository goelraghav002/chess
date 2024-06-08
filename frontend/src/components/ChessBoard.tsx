import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../constants";

const ChessBoard = ({ chess, board, socket, setBoard }: {
  chess: any;
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  socket: WebSocket;
  setBoard: any;
}) => {

  const [from, setFrom] = useState<null | Square>(null);
  const [to, setTo] = useState<null | Square>(null);

  return (
    <>
      {/* <table className="border-collapse border-2 border-slate-800 my-auto">
        <tbody>
          {board.map((row, i) => (
            <tr key={i}>
              {row.map((square, j) => (
                <td
                  key={j}
                  className={`min-w-20 h-20 ${(i + j) % 2 === 0
                    ? "bg-[#739451]"
                    : "bg-[#ecedd1]"
                    }`}
                >
                  {square && (
                    <div className={`text-center ${(i + j) % 2 === 0
                      ? "text-[#ecedd1]"
                      : "text-[#739451]"
                      }`}>
                      {square.type}
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table> */}

      <div>
        {board.map((row, i) => {
          return (
            <div key={i} className="flex">
              {row.map((square, j) => {
                const squareRepresentation = String.fromCharCode(97 + (j % 8)) + '' + (8 - i) as Square;
                return (
                  <div
                    key={j}
                    onClick={() => {
                      if (!from) {
                        setFrom(squareRepresentation);
                      }
                      else {
                        socket.send(JSON.stringify({
                          type: MOVE,
                          payload: {
                            move: {
                              from,
                              to: squareRepresentation
                            }
                          }
                        }))
                        setFrom(null);
                        chess.move({
                          from,
                          to: squareRepresentation                          
                        });
                        setBoard(chess.board());
                        console.log({
                          from,
                          to: squareRepresentation
                        })
                      }
                    }}
                    className={`w-16 h-16 cursor-pointer ${(i + j) % 2 === 0 ? "bg-[#739451]" : "bg-slate-400"}`}
                  >
                    <div className="w-full justify-center flex h-full">
                      <div className="h-full flex justify-center flex-col">
                        {square ? <img className={`w-4 ${square?.color === 'b' && 'rotate-180'}`} src={`/${square?.color === "b" ? square?.type : `${square?.type?.toUpperCase()} copy`}.png`} /> : null} 
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </>
  )
}

export default ChessBoard