'use client';

import { supabase } from "../../../lib/supabase";
import { useEffect, useState } from "react";

const playSound = () => {
    const audio = new Audio('/ding.mp3');
    audio.play().catch(e => console.log("Audio play failed:", e));
};

export default function LobbyPage() {
    const [currentNumber, setCurrentNumber] = useState<number>(0);
    const [history, setHistory] = useState<number[]>([]);
    
    useEffect(() => {
        const fetchInitialValue = async () => {
            const { data } = await supabase
                .from('queue')
                .select('current_number')
                .eq('id', 1)
                .single();

            if (data) setCurrentNumber(data.current_number);
        };

        fetchInitialValue();

        const channel = supabase
            .channel('queue_changes')
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'queue',
                    filter: 'id=eq.1'
                },
                (payload) => {
                    const newNum = payload.new.current_number;
                    
                    setHistory(prev => {
                        const updatedHistory = [currentNumber, ...prev];
                        return updatedHistory.slice(0, 3);
                    });

                    setCurrentNumber(newNum);
                    playSound();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [currentNumber]);

    return (
        <div className="flex h-screen bg-gray-900 text-white">
            {/* Ձախ մաս - Ընթացիկ համարը */}
            <div className="flex-1 flex flex-col items-center justify-center border-r border-gray-800">
                <h1 className="text-4xl font-light mb-10 tracking-widest uppercase text-gray-400">Ընթացիկ Համարը</h1>
                <div className="text-[20rem] font-black leading-none animate-pulse text-green-500">
                    {currentNumber}
                </div>
                <p className="mt-10 text-gray-400 text-xl">Խնդրում ենք մոտենալ սպասասրահին</p>
            </div>

            {/* Աջ մաս - Նախորդ համարների պատմությունը */}
            <div className="w-1/3 flex flex-col justify-center items-center bg-gray-800/30">
                <h2 className="text-2xl font-light mb-6 tracking-widest uppercase text-gray-500">Նախորդները</h2>
                <div className="flex flex-col gap-8">
                    {history.map((num, index) => (
                        <div key={index} className="text-8xl font-bold text-gray-600 opacity-50 line-through">
                            {num}
                        </div>
                    ))}
                    {history.length === 0 && <p className="text-gray-700 italic text-xl">Պատմությունը դատարկ է</p>}
                </div>
            </div>
        </div>
    );
}