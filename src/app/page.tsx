import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6 text-white">
      
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-5xl font-extrabold mb-4 bg-linear-to-r from-blue-400 to-green-500 bg-clip-text text-transparent">
          Live Queue System
        </h1>
        <p className="text-gray-400 text-xl mb-12">
          Ընտրեք ձեր աշխատանքային սենյակը կամ դիտման էկրանը
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link href="/doctor" className="group">
            <div className="p-8 bg-gray-800 border border-gray-700 rounded-3xl hover:border-blue-500 transition-all transform hover:-translate-y-2 cursor-pointer shadow-xl">
              <div className="text-4xl mb-4">👨‍⚕️</div>
              <h2 className="text-2xl font-bold mb-2 group-hover:text-blue-400">Բժշկի էկրան</h2>
              <p className="text-gray-500">
                Կառավարեք հերթը և կանչեք հաջորդ պացիենտին
              </p>
            </div>
          </Link>

          <Link href="/lobby" className="group">
            <div className="p-8 bg-gray-800 border border-gray-700 rounded-3xl hover:border-green-500 transition-all transform hover:-translate-y-2 cursor-pointer shadow-xl">
              <div className="text-4xl mb-4">📺</div>
              <h2 className="text-2xl font-bold mb-2 group-hover:text-green-400">Սպասասրահ</h2>
              <p className="text-gray-500">
                Ցուցադրեք հերթի համարը իրական ժամանակում
              </p>
            </div>
          </Link>
        </div>

        <div className="mt-16 text-gray-600 text-sm italic">
          Live Queue System
        </div>
      </div>
    </div>
  );
}