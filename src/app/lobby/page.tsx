'use client';

import { supabase } from "../../../lib/supabase";
import { useEffect, useState } from "react";

export default function LobbyPage() {
    const [currentNumber, setCurrentNumber] = useState<number>(0);

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
                    event:  'UPDATE',
                    schema: 'public',
                    table: 'queue',
                    filter: 'id=eq.1'
                },
                (payload) => {
                    console.log('Փոփոխություն ստացվեց!', payload);
                    setCurrentNumber(payload.new.current_number);
                }
            )
            .subscribe();

            return () => {
                supabase.removeChannel(channel);
            };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <h1 className="text-4xl fint-light mb-10 tracking-widest uppercase">Հերթի Համարը</h1>
            <div className="text-[20rem] font-black leading-none animate-pulse text-green-500">
                {currentNumber}
            </div>
            <p className="mt-10 text-gray-400 text-xl ">Խնդրում ենք մոտենալ սպասասրահին</p>
        </div>
    );
}