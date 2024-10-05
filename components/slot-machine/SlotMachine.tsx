"use client";

import { useState } from "react";
import { Button } from "./button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./card";

const symbols = [
    { icon: "🍒", label: "Cherry" },
    { icon: "🍋", label: "Lemon" },
    { icon: "🍇", label: "Grape" },
    { icon: "🍎", label: "Apple" },
    { icon: "⭐", label: "Star" },
];

export default function SlotMachine() {
    const [reels, setReels] = useState([0, 0, 0]);
    const [spinning, setSpinning] = useState(false);
    const [score, setScore] = useState(100);

    const spin = () => {
        if (score >= 10) {
            setSpinning(true);
            setScore((prevScore) => prevScore - 10);

            const newReels = reels.map(() => Math.floor(Math.random() * symbols.length));

            const spinDuration = 2000;
            const intervalDuration = 100;
            let currentSpin = 0;

            const spinInterval = setInterval(() => {
                setReels((prevReels) =>
                    prevReels.map((reel, index) =>
                        currentSpin < spinDuration - index * 300
                            ? Math.floor(Math.random() * symbols.length)
                            : newReels[index]
                    )
                );
                currentSpin += intervalDuration;

                if (currentSpin >= spinDuration) {
                    clearInterval(spinInterval);
                    setSpinning(false);
                    checkWin(newReels);
                }
            }, intervalDuration);
        }
    };

    const checkWin = (finalReels: number[]) => {
        if (finalReels[0] === finalReels[1] && finalReels[1] === finalReels[2]) {
            setScore((prevScore) => prevScore + 50);
        } else if (
            finalReels[0] === finalReels[1] ||
            finalReels[1] === finalReels[2] ||
            finalReels[0] === finalReels[2]
        ) {
            setScore((prevScore) => prevScore + 20);
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">Slot Machine</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex justify-center space-x-4 mb-4">
                    {reels.map((reel, index) => (
                        <div
                            key={index}
                            className={`w-20 h-20 overflow-hidden border-2 border-gray-300 rounded-lg flex items-center justify-center`}
                        >
                            <span
                                className={`text-4xl ${spinning ? "animate-slot" : ""}`}
                                role="img"
                                aria-label={symbols[reel].label}
                            >
                                {symbols[reel].icon}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="text-center text-2xl font-bold mb-4">Score: {score}</div>
            </CardContent>
            <CardFooter className="flex justify-center">
                <Button onClick={spin} disabled={spinning || score < 10} className="px-8 py-4 text-lg font-bold">
                    {spinning ? "Spinning..." : "Spin (10 points)"}
                </Button>
            </CardFooter>
        </Card>
    );
}
