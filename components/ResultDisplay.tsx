import React from 'react';
import { motion } from 'framer-motion';
import type { AnimalInfo } from '../types';

// Icon Components
const StarIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
    <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z" clipRule="evenodd" />
    </svg>
);
const HeartIcon: React.FC<{ className?: string }> = ({ className }) => ( <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-1.344-.688 11.85 11.85 0 01-2.032-1.12A9.37 9.37 0 013 14.508v-1.147c0-2.435 1.255-4.5 3.5-5.508l.243-.105a4.715 4.715 0 014.256 0l.243.105c2.245 1.008 3.5 3.073 3.5 5.508v1.147c0 .883-.26 1.73-.744 2.532a11.85 11.85 0 01-2.032 1.12 15.247 15.247 0 01-1.344.688l-.022.012-.007.003h-.001a.752.752 0 01-.748 0z" /></svg> );
const RulerIcon: React.FC<{ className?: string }> = ({ className }) => ( <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M2.25 3.75A.75.75 0 013 3h18a.75.75 0 01.75.75v3.19l-5.432 2.264a.75.75 0 01-.818-.21l-4.17-4.676a.75.75 0 00-1.092-.01L6.002 11.23a.75.75 0 01-1.22-.54V3.75zM3 15.75a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75zm0 3a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" /></svg> );
const GlobeIcon: React.FC<{ className?: string }> = ({ className }) => ( <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.75 2.25a.75.75 0 00-1.5 0v2.25a.75.75 0 001.5 0V2.25zM5.03 5.03a.75.75 0 00-1.06-1.06l-1.5 1.5a.75.75 0 101.06 1.06l1.5-1.5zM19.97 5.03a.75.75 0 001.06-1.06l-1.5-1.5a.75.75 0 10-1.06 1.06l1.5 1.5zM12 19.5a7.5 7.5 0 100-15 7.5 7.5 0 000 15zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> );
const FoodIcon: React.FC<{ className?: string }> = ({ className }) => ( <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M8.25 10.875a2.625 2.625 0 115.25 0 2.625 2.625 0 01-5.25 0z" clipRule="evenodd" /><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.663 4.022a.75.75 0 01.955-.658 9.84 9.84 0 013.416 0 .75.75 0 01.954.658 8.25 8.25 0 010 7.956.75.75 0 01-.954.658 9.84 9.84 0 01-3.416 0 .75.75 0 01-.955-.658 8.25 8.25 0 010-7.956z" clipRule="evenodd" /></svg> );
const CareIcon: React.FC<{ className?: string }> = ({ className }) => ( <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" /></svg> );
const HealthIcon: React.FC<{ className?: string }> = ({ className }) => ( <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.75 2.25a.75.75 0 00-1.5 0v2.25h-2.25a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25h2.25a.75.75 0 000-1.5h-2.25V2.25z" /><path fillRule="evenodd" d="M3 9a.75.75 0 00-.75.75v10.5a.75.75 0 00.75.75h4.5a.75.75 0 00.75-.75V9.75A.75.75 0 007.5 9h-4.5zm5.25 0a.75.75 0 01.75-.75h10.5a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75V9z" clipRule="evenodd" /></svg> );
const AgeIcon: React.FC<{ className?: string }> = ({ className }) => ( <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" /></svg> );
const HygieneIcon: React.FC<{ className?: string }> = ({ className }) => ( <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V3.375c0-1.036-.84-1.875-1.875-1.875H5.625zM12.75 17.25a.75.75 0 000-1.5H12a.75.75 0 000 1.5h.75zM12 13.5a.75.75 0 01.75-.75h.75a.75.75 0 010 1.5H12.75A.75.75 0 0112 13.5zM12.75 9.75a.75.75 0 000-1.5H12a.75.75 0 000 1.5h.75zM10.5 17.25a.75.75 0 01-.75-.75v-.75a.75.75 0 011.5 0v.75a.75.75 0 01-.75.75zM8.25 17.25a.75.75 0 000-1.5H7.5a.75.75 0 000 1.5h.75zM7.5 13.5a.75.75 0 01.75-.75h.75a.75.75 0 010 1.5H8.25A.75.75 0 017.5 13.5zM8.25 9.75a.75.75 0 000-1.5H7.5a.75.75 0 000 1.5h.75zM15 15.75a.75.75 0 01.75.75v.75a.75.75 0 01-1.5 0v-.75a.75.75 0 01.75-.75zm2.25.75a.75.75 0 00-1.5 0v.75a.75.75 0 001.5 0v-.75zM15 9a.75.75 0 01.75.75v.75a.75.75 0 01-1.5 0V9.75A.75.75 0 0115 9zm2.25.75a.75.75 0 00-1.5 0v.75a.75.75 0 001.5 0V9.75z" clipRule="evenodd" /></svg> );
const MapPinIcon: React.FC<{ className?: string }> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 005.169-4.4c3.45-4.773 4.135-10.018 2.37-14.223a.75.75 0 00-1.342.645 15.474 15.474 0 01-2.18 13.043C15.445 19.341 12.828 21 12 21c-.828 0-3.445-1.659-5.631-4.562A15.474 15.474 0 014.188 3.82a.75.75 0 00-1.342-.645c-1.765 4.205-.968 9.45 2.37 14.223A16.975 16.975 0 0011.54 22.351z" clipRule="evenodd" /><path fillRule="evenodd" d="M12 12.75a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" /></svg>);
const StoreIcon: React.FC<{ className?: string }> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1.5a.75.75 0 01.75.75V7.5h-1.5V2.25A.75.75 0 0112 1.5z" /><path fillRule="evenodd" d="M3 9a.75.75 0 01.75-.75h16.5a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75H3.75a.75.75 0 01-.75-.75V9zm15-1.5A2.25 2.25 0 0015.75 6H8.25A2.25 2.25 0 006 8.25v1.5a.75.75 0 01-1.5 0v-1.5A3.75 3.75 0 018.25 4.5h7.5A3.75 3.75 0 0119.5 8.25v1.5a.75.75 0 01-1.5 0v-1.5z" clipRule="evenodd" /></svg>);
const ClockIcon: React.FC<{ className?: string }> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" /></svg>);
const ShieldIcon: React.FC<{ className?: string }> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M12 1.5c-5.922 0-10.5 3.444-10.5 7.875 0 2.593 1.122 5.314 3.235 7.991.956 1.218 2.067 2.228 3.245 3.033.39.266.822.493 1.28.675a.75.75 0 00.48 0c.458-.182.89-.41 1.28-.675 1.178-.805 2.29-1.815 3.245-3.033 2.113-2.677 3.235-5.398 3.235-7.991C22.5 4.944 17.922 1.5 12 1.5zM12 6a.75.75 0 01.75.75v3.75h3.75a.75.75 0 010 1.5h-3.75v3.75a.75.75 0 01-1.5 0v-3.75H7.5a.75.75 0 010-1.5h3.75V6.75A.75.75 0 0112 6z" clipRule="evenodd" /></svg>);
const LightbulbIcon: React.FC<{ className?: string }> = ({ className }) => ( <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.25c-3.865 0-7.5 3.135-7.5 7.5 0 2.123.93 4.057 2.443 5.443.344.313.652.652.928 1.01v4.297a.75.75 0 00.75.75h6a.75.75 0 00.75-.75v-4.297c.276-.358.584-.697.928-1.01 1.513-1.386 2.443-3.32 2.443-5.443 0-4.365-3.635-7.5-7.5-7.5zM15 15.375a3 3 0 01-6 0v-1.125a3 3 0 016 0v1.125z" /></svg> );

interface ResultDisplayProps {
  result: AnimalInfo;
  imageUrl: string;
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: {
            duration: 0.5
        }
    }
};

const InfoPill: React.FC<{ icon: React.ReactNode; label: string; value: string; }> = ({ icon, label, value }) => (
    <div className="flex flex-col items-center justify-center p-3 bg-gray-100 text-center border-2 border-black">
        <div className="flex items-center gap-2 text-gray-700">{icon}<span className="text-sm font-bold uppercase tracking-wider">{label}</span></div>
        <p className="text-lg font-bold text-black mt-1">{value}</p>
    </div>
);

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
        <div className="flex items-center">
            {[...Array(fullStars)].map((_, i) => <StarIcon key={`full-${i}`} className="w-4 h-4 text-black" />)}
            {halfStar && <div className="relative w-4 h-4"><StarIcon key="half-empty" className="w-4 h-4 text-gray-300 absolute" /><StarIcon key="half" className="w-4 h-4 text-black absolute" style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0% 100%)' }} /></div>}
            {[...Array(emptyStars)].map((_, i) => <StarIcon key={`empty-${i}`} className="w-4 h-4 text-gray-300" />)}
        </div>
    );
};

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, imageUrl }) => {
  const confidencePercentage = (result.confidence * 100).toFixed(1);

  return (
    <motion.div 
        className="w-full max-w-6xl mx-auto my-8 bg-white brutal-border overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
    >
        <div className="grid md:grid-cols-5">
            <motion.div className="md:col-span-2" variants={itemVariants}>
                <img src={imageUrl} alt={result.breed} className="w-full h-96 md:h-full object-cover border-b-2 md:border-b-0 md:border-r-2 border-black" />
            </motion.div>
            <div className="md:col-span-3 p-6 md:p-8 flex flex-col">
                <motion.div variants={itemVariants}>
                    <h2 className="text-3xl lg:text-4xl font-bold tracking-wide">{result.breed}</h2>
                    <div className="mt-2 text-sm font-bold text-black bg-yellow-300 inline-block px-2 py-1 border-2 border-black">CONFIDENCE: {confidencePercentage}%</div>
                </motion.div>
                <motion.p className="mt-4 text-gray-800 leading-relaxed flex-grow" variants={itemVariants}>{result.description}</motion.p>
                
                <motion.div className="mt-6" variants={itemVariants}>
                    <h3 className="text-lg font-bold tracking-wider uppercase">At a Glance</h3>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
                        <InfoPill icon={<AgeIcon className="w-4 h-4" />} label="Est. Age" value={result.estimatedAge} />
                        <InfoPill icon={<HeartIcon className="w-4 h-4" />} label="Lifespan" value={result.lifespan} />
                        <InfoPill icon={<RulerIcon className="w-4 h-4" />} label="Height" value={result.size.height} />
                        <InfoPill icon={<RulerIcon className="w-4 h-4 -scale-x-100" />} label="Weight" value={result.size.weight} />
                        <InfoPill icon={<GlobeIcon className="w-4 h-4" />} label="Origin" value={result.origin} />
                        <InfoPill icon={<FoodIcon className="w-4 h-4" />} label="Diet" value={result.diet} />
                    </div>
                </motion.div>

                <motion.div className="mt-6" variants={itemVariants}>
                    <h3 className="text-lg font-bold tracking-wider uppercase">Temperament</h3>
                    <div className="flex flex-wrap gap-2 mt-3">{result.temperament.map((trait, index) => (<span key={index} className="px-3 py-1 bg-gray-200 text-black border-2 border-black text-sm font-bold">{trait}</span>))}</div>
                </motion.div>

                <motion.div className="mt-6 pt-6 border-t-2 border-black" variants={itemVariants}>
                    <h3 className="text-lg font-bold flex items-center gap-2"><LightbulbIcon className="w-5 h-5 text-black" />Fun Fact</h3>
                    <p className="mt-2 text-gray-700 italic">"{result.funFact}"</p>
                </motion.div>

                <motion.div className="mt-6 pt-6 border-t-2 border-black" variants={itemVariants}>
                    <h3 className="text-xl font-bold mb-4">Care Guide</h3>
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-lg font-bold flex items-center gap-2"><CareIcon className="w-5 h-5" />General Care & Needs</h4>
                            <p className="mt-2 text-gray-800 leading-relaxed">{result.careAndNeeds}</p>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold flex items-center gap-2"><HygieneIcon className="w-5 h-5" />Hygiene Hub</h4>
                            <ul className="mt-3 space-y-2">{result.hygieneSchedule.map((item, index) => (<li key={index} className="flex justify-between items-center p-3 bg-gray-100 border-2 border-black text-sm"><span className="font-bold">{item.task}</span><span className="font-bold text-right">{item.frequency}</span></li>))}</ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold flex items-center gap-2"><HealthIcon className="w-5 h-5" />Common Health Issues</h4>
                            <p className="mt-2 text-gray-800 leading-relaxed">{result.commonHealthIssues}</p>
                            <div className="mt-4 p-4 bg-yellow-300 border-2 border-black text-sm" role="alert"><p><strong className="font-bold">Disclaimer:</strong> This is not professional veterinary advice. Always consult a licensed veterinarian.</p></div>
                        </div>
                    </div>
                </motion.div>

                {(result.nearbyStores?.length > 0 || result.vetHospitals?.length > 0 || result.localWelfare?.length > 0) && (
                <motion.div className="mt-6 pt-6 border-t-2 border-black" variants={itemVariants}>
                    <h3 className="text-xl font-bold mb-4">Local Care Finder</h3>
                    <div className="space-y-6">
                       {result.nearbyStores?.length > 0 && (
                           <div>
                                <h4 className="text-lg font-bold flex items-center gap-2"><StoreIcon className="w-5 h-5" />Pet Supplies</h4>
                                <div className="mt-3 grid grid-cols-1 gap-4">
                                    {result.nearbyStores.map((store, index) => (
                                        <div key={index} className="p-4 bg-gray-100 border-2 border-black">
                                            <div className="flex justify-between items-start">
                                                <p className="font-bold">{store.name}</p>
                                                <div className="flex items-center gap-1 text-xs">
                                                    <StarRating rating={store.rating} />
                                                    <span className="font-bold">({store.rating.toFixed(1)})</span>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-700 mt-1 flex items-start gap-1.5"><MapPinIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />{store.address}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                         {result.vetHospitals?.length > 0 && (
                             <div>
                                <h4 className="text-lg font-bold flex items-center gap-2"><HealthIcon className="w-5 h-5" />Veterinary Care</h4>
                                <div className="mt-3 grid grid-cols-1 gap-4">
                                    {result.vetHospitals.map((vet, index) => (
                                         <div key={index} className="p-4 bg-gray-100 border-2 border-black">
                                            <p className="font-bold">{vet.name}</p>
                                            <p className="text-sm text-gray-700 mt-1 flex items-start gap-1.5"><MapPinIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />{vet.address}</p>
                                            <p className="text-sm text-gray-700 mt-2 flex items-center gap-1.5 font-medium"><ClockIcon className="w-4 h-4 flex-shrink-0" />{vet.hours}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {result.localWelfare?.length > 0 && (
                            <div>
                                <h4 className="text-lg font-bold flex items-center gap-2"><ShieldIcon className="w-5 h-5" />Animal Welfare & Control</h4>
                                <div className="mt-3 grid grid-cols-1 gap-4">
                                    {result.localWelfare.map((org, index) => (
                                        <div key={index} className="p-4 bg-gray-100 border-2 border-black">
                                            <p className="font-bold">{org.organizationName}</p>
                                            <p className="text-sm font-bold mt-1 underline">{org.contactInfo}</p>
                                            <p className="text-sm text-gray-800 mt-2">{org.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                         )}
                        <div className="mt-2 p-4 bg-blue-300 border-2 border-black text-sm" role="alert"><p><strong className="font-bold">Note:</strong> Nearby locations are AI-generated suggestions. Please verify all details independently.</p></div>
                    </div>
                </motion.div>
                )}
            </div>
        </div>
    </motion.div>
  );
};

export default ResultDisplay;