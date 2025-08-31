
import React from 'react';
import { TwitterIcon, DribbbleIcon, LinkedInIcon, BehanceIcon, CoffeeIcon } from './icons';

export const CreatorPage: React.FC = () => {
  return (
    <div className="animate-fade-in-up">
      <div className="text-center pt-16 pb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
          Di Balik Layar
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Kenalan yuk sama yang bikin Apokado Studio.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
        <div className="md:col-span-1 flex justify-center">
          <img 
            src="https://picsum.photos/seed/creator/400/400" 
            alt="The Creator" 
            className="rounded-full w-48 h-48 md:w-64 md:h-64 object-cover border-4 border-viking shadow-lg"
          />
        </div>
        <div className="md:col-span-2 text-gray-700 dark:text-gray-200 space-y-6 text-lg">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Hey, aku [Nama]!</h2>
          <p>
            Aku seorang desainer grafis dan kreator digital yang hobi banget bantuin orang lain buat ngebangun brand mereka. Apokado Studio ini aku mulai dengan satu misi simpel: nyediain aset desain keren yang gampang diakses dan gratis buat semua.
          </p>
          <p>
            Menurutku, desain yang bagus itu kunci komunikasi yang efektif. Lewat template-template ini, aku harap bisa ngebantu para pebisnis, influencer, dan siapa aja yang mau keliatan lebih pro di dunia digital.
          </p>
           <div className="pt-4">
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Ngobrol yuk!</h3>
            <div className="flex space-x-4">
                 <a href="#" className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-viking hover:text-gray-900 transition-all duration-300 transform hover:scale-110">
                    <TwitterIcon className="w-6 h-6" />
                </a>
                 <a href="#" className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-viking hover:text-gray-900 transition-all duration-300 transform hover:scale-110">
                    <DribbbleIcon className="w-6 h-6" />
                </a>
                 <a href="#" className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-viking hover:text-gray-900 transition-all duration-300 transform hover:scale-110">
                    <LinkedInIcon className="w-6 h-6" />
                </a>
                 <a href="#" className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-viking hover:text-gray-900 transition-all duration-300 transform hover:scale-110">
                    <BehanceIcon className="w-6 h-6" />
                </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-2xl mx-auto text-center py-16 mt-16 bg-viking/10 dark:bg-viking/20 rounded-2xl border border-viking/30 px-6">
          <CoffeeIcon className="w-12 h-12 mx-auto text-viking mb-4"/>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Suka sama karyaku?</h2>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
              Kalau template-template ini ngebantu kamu, boleh lho traktir secangkir kopi. Dukungan kamu bikin aku makin semangat ngonten!
          </p>
          <button className="mt-8 bg-viking text-gray-900 font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-viking/30">
              Traktir Kopi ☕
          </button>
      </div>

      <style>{`
        @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
};