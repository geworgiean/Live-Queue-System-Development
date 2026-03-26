'use client';

import { supabase } from "../../../lib/supabase";
import { useState } from "react";

export default function DoctorPage() {
  const [loading, setLoading] = useState(false);
  const [currentNum, setCurrentNum] = useState<number | null>(null);

  const callNext = async () => {
    setLoading(true);

    const { data, error: fetchError } = await supabase
      .from('queue')
      .select('current_number')
      .eq('id', 1)
      .single();

    if (fetchError) {
      console.error('Fetch error:', fetchError);
      setLoading(false);
      return;
    }

    const nextNumber = data.current_number + 1;

    const { error: updateError } = await supabase
      .from('queue')
      .update({ current_number: nextNumber })
      .eq('id', 1);

    if (updateError) {
      console.error('Update error:', updateError);
    } else {
      setCurrentNum(nextNumber); 
    }

    setLoading(false);
  };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950">
            <h1 className="text-2xl font-bold mb-8 text-white">Բժշկի կառավարման վահանակ</h1>
            <button
                onClick={callNext}
                disabled={loading}
                className="px-8 py-4 bg-blue-600 text-white rounded-2xl shadow-lg active:sclae-95 transition-all disabled:bg-gray-400 text-xl font-semibold "
            >
                {loading ? 'Թարմացվում է...' : 'Կանչել հաջորդին (Call Next)'}
            </button>
        </div>
    );
}