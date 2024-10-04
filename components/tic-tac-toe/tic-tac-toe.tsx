"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type Player = "X" | "O" | null;

export default function TicTacToe() {
    const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
    const [winner, setWinner] = useState<Player>(null);
    const [scores, setScores] = useState({ X: 0, O: 0 });
    const [playerNames, setPlayerNames] = useState({ X: "Player X", O: "Player O" });
    const [isComputerMode, setIsComputerMode] = useState(false);

    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8], // Rows
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8], // Columns
        [0, 4, 8],
        [2, 4, 6], // Diagonals
    ];

    const checkWinner = (squares: Player[]): Player => {
        for (let combo of winningCombos) {
            const [a, b, c] = combo;
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    const handleClick = (index: number) => {
        if (board[index] || winner) return;

        const newBoard = [...board];
        newBoard[index] = currentPlayer;
        setBoard(newBoard);

        const newWinner = checkWinner(newBoard);
        if (newWinner) {
            setWinner(newWinner);
            setScores((prev) => ({ ...prev, [newWinner]: prev[newWinner] + 1 }));
        } else if (!newBoard.includes(null)) {
            setWinner("draw");
        } else {
            setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
        }
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setCurrentPlayer("X");
        setWinner(null);
    };

    const computerMove = () => {
        const emptyCells = board.reduce((acc, cell, index) => (cell === null ? [...acc, index] : acc), [] as number[]);
        if (emptyCells.length > 0) {
            const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            handleClick(randomIndex);
        }
    };

    useEffect(() => {
        if (isComputerMode && currentPlayer === "O" && !winner) {
            const timer = setTimeout(computerMove, 500);
            return () => clearTimeout(timer);
        }
    }, [currentPlayer, isComputerMode, winner]);

    return (
        <Card className="p-6 max-w-md mx-auto">
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <div className="space-y-2">
                        <Label htmlFor="playerX">Player X Name</Label>
                        <Input
                            id="playerX"
                            value={playerNames.X}
                            onChange={(e) => setPlayerNames((prev) => ({ ...prev, X: e.target.value }))}
                            className="w-40"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="playerO">Player O Name</Label>
                        <Input
                            id="playerO"
                            value={playerNames.O}
                            onChange={(e) => setPlayerNames((prev) => ({ ...prev, O: e.target.value }))}
                            className="w-40"
                        />
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <Switch id="computer-mode" checked={isComputerMode} onCheckedChange={setIsComputerMode} />
                    <Label htmlFor="computer-mode">Computer Mode (O)</Label>
                </div>

                <div className="grid grid-cols-3 gap-2">
                    {board.map((cell, index) => (
                        <Button
                            key={index}
                            onClick={() => handleClick(index)}
                            disabled={!!cell || !!winner || (isComputerMode && currentPlayer === "O")}
                            variant="outline"
                            className="h-20 text-4xl"
                        >
                            {cell}
                        </Button>
                    ))}
                </div>

                <div className="text-center">
                    {winner ? (
                        winner === "draw" ? (
                            <p>It's a draw!</p>
                        ) : (
                            <p>{playerNames[winner]} wins!</p>
                        )
                    ) : (
                        <p>Current player: {playerNames[currentPlayer]}</p>
                    )}
                </div>

                <div className="flex justify-between">
                    <p>
                        Score - {playerNames.X}: {scores.X}
                    </p>
                    <p>
                        Score - {playerNames.O}: {scores.O}
                    </p>
                </div>

                <Button onClick={resetGame} className="w-full">
                    Reset Game
                </Button>
            </div>
        </Card>
    );
}
