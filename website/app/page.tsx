'use client';

import Image from "next/image";
import Alert from "../components/alert";
import { useState } from 'react';
import gasStationsData from '../Data/gas_stations_hillsborough.json';
import hotelsData from '../Data/hotels_hillsborough.json';
import sheltersData from '../Data/shelters_with_google_maps.json';
import foodPantriesData from '../Data/food_pantries.json';
import hospitalsData from '../Data/hospitals_hillsborough.json';
import powerOutagesData from '../Data/power_outages.json';

export default function Home() {
  const emergencyInfo = {
    summary: "This is a summary of emergency information. Please download the PDF or Print this webpage for complete details.",
    radioFrequencies: ["97.5 FM", "101.3 FM", "105.7 FM"],
    pdfUrl: "/emergency_info.pdf", // Replace with actual PDF path
  };

  const evacuationPlans = [
    { county: "Hillsborough County", filename: "/evac_plans/hillsborough_evac_plan.pdf" },
    { county: "Orange County", filename: "/evac_plans/orange_evac_plan.pdf" },
    { county: "Osceola County", filename: "/evac_plans/osceola_evac_plan.pdf" },
  ];

  const [selectedCounty, setSelectedCounty] = useState('');
  const [selectedOptions, setSelectedOptions] = useState({
    hotels: true,
    gasStations: true,
    shelters: true,
    foodPantries: true
  });

  const counties = Object.keys(gasStationsData);

  const handleOptionChange = (option: keyof typeof selectedOptions) => {
    setSelectedOptions(prev => ({ ...prev, [option]: !prev[option] }));
  };

  const getSelectedCount = () => Object.values(selectedOptions).filter(Boolean).length;

  return (
    <div className="min-h-screen p-8 font-sans bg-black text-white">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-6">🌪️ Hurricane Warning Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Hurricane Category</h2>
            <div className="relative w-full h-32 mx-auto">
              <svg className="w-full h-full" viewBox="0 0 200 60">
                <rect x="0" y="25" width="200" height="10" fill="#4B5563" />
                <rect x="0" y="25" width="160" height="10" fill="#8B5CF6" />
                {/* Category markers */}
                <text x="0" y="55" textAnchor="start" fill="#9CA3AF" fontSize="10">1</text>
                <text x="50" y="55" textAnchor="middle" fill="#9CA3AF" fontSize="10">2</text>
                <text x="100" y="55" textAnchor="middle" fill="#9CA3AF" fontSize="10">3</text>
                <text x="150" y="55" textAnchor="middle" fill="#9CA3AF" fontSize="10">4</text>
                <text x="200" y="55" textAnchor="end" fill="#9CA3AF" fontSize="10">5</text>
                <text x="160" y="20" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">4</text>
              </svg>
            </div>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Sustained Winds</h2>
            <div className="relative w-full h-32 mx-auto">
              <svg className="w-full h-full" viewBox="0 0 200 60">
                <rect x="0" y="25" width="200" height="10" fill="#4B5563" />
                <rect x="0" y="25" width="150" height="10" fill="#8B5CF6" />
                {/* Wind speed markers */}
                <text x="0" y="55" textAnchor="start" fill="#9CA3AF" fontSize="6">0 mph</text>
                <text x="50" y="55" textAnchor="middle" fill="#9CA3AF" fontSize="6">50 mph</text>
                <text x="100" y="55" textAnchor="middle" fill="#9CA3AF" fontSize="6">100 mph</text>
                <text x="150" y="55" textAnchor="middle" fill="#9CA3AF" fontSize="6">150 mph</text>
                <text x="200" y="55" textAnchor="end" fill="#9CA3AF" fontSize="6">200 mph</text>
                <text x="150" y="20" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">150 mph</text>
              </svg>
            </div>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4">States Affected</h2>
            <div className="flex items-center justify-center">
              <span className="text-5xl font-bold">FLORIDA</span>
            </div>
          </div>
        </div>
        <p className="text-lg mt-6">Displaying Information for: Hurricane Milton</p>
        <p className="text-sm text-yellow-300">Last Updated: October 12, 2024 11:00 AM EDT</p>
      </header>

      <main>
        <div className="overflow-hidden mb-8">
          <div className="flex animate-scroll whitespace-nowrap">
            {[...Array(30)].map((_, index) => (
              <Image
                key={index}
                src="/warning.png"
                alt="Warning"
                width={50}
                height={50}
                className="mr-4 inline-block"
              />
            ))}
            {[...Array(30)].map((_, index) => (
              <Image
                key={index + 20}
                src="/warning.png"
                alt="Warning"
                width={50}
                height={50}
                className="mr-4 inline-block"
              />
            ))}
          </div>
        </div>
        {/* Emergency Information Box */}
        <div className="bg-[#3f0d0c] border border-red-500 p-4 mb-6 rounded-lg text-center text-[#f5c2c7]">
          <h2 className="text-xl font-bold mb-2">⚠️ Emergency Information</h2>
          <p className="mb-3">{emergencyInfo.summary}</p>
          <h3 className="font-bold mb-2">Emergency Radio: {emergencyInfo.radioFrequencies.join(', ')}</h3>
          <div className="flex flex-wrap justify-center gap-2 mb-3">
            {evacuationPlans.map((plan, index) => (
              <a
                key={index}
                href={`/${plan.filename}`}
                download
                className="bg-[#842029] text-[#f5c2c7] px-3 py-1 rounded-full text-sm hover:bg-[#6d1a22]"
              >
                {plan.county} Evacuation Plan
              </a>
            ))}
          </div>
          <a 
            href={emergencyInfo.pdfUrl} 
            download 
            className="bg-[#f5c2c7] text-[#3f0d0c] px-3 py-1 rounded-full text-sm hover:bg-[#e2b4b4]"
          >
            Download Emergency PDF
          </a>
        </div>
        {/* Alerts Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            Alerts
            <span className="ml-2 inline-flex items-center">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <span className="ml-1 text-red-500 text-sm">LIVE</span>
            </span>
          </h2>
        </section>
        <Alert variant="destructive" message="Alert: HURRICANE MILTON Ongoing
HURRICANE MILTON started on October 05, 2024 and is currently ongoing.
Please stay safe and follow local guidance." />
        <details className="mt-4">
          <summary className="cursor-pointer text-blue-500 hover:text-blue-600">See Counties Affected</summary>
          <p className="mt-2 text-sm">
            Alachua (County), Baker (County), Bradford (County), Brevard (County), Broward (County), Charlotte (County), Citrus (County), Clay (County), Collier (County), Columbia (County), DeSoto (County), Dixie (County), Duval (County), Flagler (County), Gilchrist (County), Glades (County), Hamilton (County), Hardee (County), Hendry (County), Hernando (County), Highlands (County), Hillsborough (County), Indian River (County), Lafayette (County), Lake (County), Lee (County), Levy (County), Madison (County), Manatee (County), Marion (County), Martin (County), Miami-Dade (County), Monroe (County), Nassau (County), Okeechobee (County), Orange (County), Osceola (County), Palm Beach (County), Pasco (County), Pinellas (County), Polk (County), Putnam (County), St. Johns (County), St. Lucie (County), Sarasota (County), Seminole (County), Sumter (County), Suwannee (County), Taylor (County), Union (County), Volusia (County), Big Cypress Indian Reservation, Brighton Indian Reservation, Fort Pierce Indian Reservation, Hollywood Indian Reservation, Immokalee Indian Reservation, Tampa Reservation, Seminole Tribe of Florida, Miccosukee Tribe of Indians of Florida
          </p>
        </details>
{/* Article Summary */}
<section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            A.I News Summary
            <span className="ml-2 inline-flex items-center">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <span className="ml-1 text-red-500 text-sm">LIVE</span>
            </span>
          </h2>
          <div className="relative cursor-pointer">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-violet-600 rounded-lg blur opacity-100 animate-pulse"></div>
            <div className="relative px-7 py-6 bg-black ring-1 ring-gray-900/5 rounded-lg leading-none">
              <ul className="text-white-700 list-disc pl-5 space-y-2">
                <li>Hurricane Milton caused significant damage and deaths across Florida.</li>
                <li>Tampa Bay was severely affected, with damage to the local stadium raising concerns for the Rays&apos; upcoming season.</li>
                <li>A boat captain survived by clinging to a cooler in the Gulf of Mexico.</li>
                <li>Peso Pluma cancelled concerts in Tampa and Miami due to the hurricane.</li>
                <li>Florida Lieutenant Dan Joseph Malinowski&apos;s daughter criticized influencers for exploiting the tragedy.</li>
                <li>The death toll has risen to 16 as rescue efforts continue.</li>
                <li>Residents are navigating flooded streets for cleanup as recovery efforts begin.</li>
                <li>The road to recovery is expected to be long and arduous.</li>
              </ul>
            </div>
          </div>
        </section>
        
        {/* Hurricane Tracking Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Hurricane Tracking</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-black rounded-lg overflow-hidden">
              <h3 className="text-lg font-semibold mb-2 text-center text-white">Path</h3>
              <Image
                src="/path.gif"
                alt="Hurricane Path"
                width={400}
                height={300}
                className="w-full h-auto"
              />
            </div>
            <div className="bg-black rounded-lg overflow-hidden">
              <h3 className="text-lg font-semibold mb-2 text-center text-white">Temperature Map</h3>
              <Image
                src="/temp.gif"
                alt="Temperature Map"
                width={400}
                height={300}
                className="w-full h-auto"
              />
            </div>
            <div className="bg-black rounded-lg overflow-hidden">
              <h3 className="text-lg font-semibold mb-2 text-center text-white">Satellite</h3>
              <Image
                src="/sat.gif"
                alt="Satellite View"
                width={400}
                height={300}
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>
        

        {/* Article Carousel and Latest Images */}
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          {/* Article Carousel */}
          <section className="md:w-1/2">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              Latest Updates
              <span className="ml-2 inline-flex items-center">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                <span className="ml-1 text-red-500 text-sm">LIVE</span>
              </span>
            </h2>
            <div className="grid grid-cols-1 gap-4 h-[500px] overflow-y-auto">
              {[
                { title: "Florida Lieutenant Dan, Joseph Malinowski daughter lashes out against influencers after Hurricane Milton", url: "https://nypost.com/2024/10/12/us-news/florida-lieutenant-dan-joseph-malinowski-daughter-lashes-out-against-influencers-after-hurricane-milton/", date: "October 12, 2024, 10:53 AM", preview: "" },
                { title: "Lightning beat Hurricanes after extended stay due to Hurricane Milton", url: "https://apnews.com/article/nhl-tampa-bay-lightning-hurricane-milton-dbba41c2e63a4d4a11a9488ce97d7624", date: "October 12, 2024, 07:56 AM", preview: "" },
                { title: "Can Tampa Bay Rays replace shredded stadium roof in time for next season?", url: "https://www.nbcnews.com/news/us-news/can-tampa-bay-rays-replace-shredded-stadium-roof-time-season-rcna175029", date: "October 11, 2024, 08:48 PM", preview: "" },
                { title: "Peso Pluma Cancels Florida Concerts, Donates to Hurricane Relief Funds", url: "https://www.billboard.com/music/music-news/peso-pluma-cancels-tampa-miami-concerts-hurricane-milton-florida-1235798897/", date: "October 11, 2024, 08:19 PM", preview: "" },
                { title: "Peso Pluma Cancels Florida Concerts, Donates to Hurricane Relief Funds", url: "https://www.billboard.com/music/latin/peso-pluma-cancels-tampa-miami-concerts-hurricane-milton-florida-1235798897/", date: "October 11, 2024, 08:19 PM", preview: "" },
                { title: "Milton death toll rises to 17 as rescuers navigate rising Tampa Bay floodwaters", url: "https://www.upi.com/Top_News/2024/10/11/Milton-death-toll-rises-16-rescuers-navigate-rising-Tampa-Bay-floodwaters/8471728666255/", date: "October 11, 2024, 07:00 PM", preview: "" },
                { title: "Hurricane Milton damage photos in Florida, drone images of Tampa, Sarasota, Fort Myers, Vero Beach", url: "https://news.yahoo.com/news/hurricane-milton-damage-photos-florida-155507590.html", date: "October 11, 2024, 05:36 PM", preview: "" },
              ].map((article, index) => (
                <div key={index} className="bg-black shadow-md rounded-lg p-4 transition-shadow duration-300 hover:shadow-lg">
                  <h3 className="font-bold mb-2">{article.title}</h3>
                  <p className="text-xs text-gray-500 mb-2">{article.date}</p>
                  <a 
                    href={article.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-500 hover:underline"
                  >
                    Read more
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* Latest Images Section */}
          <section className="md:w-1/2">
            <h2 className="text-2xl font-bold mb-4">Latest Images</h2>
            <div className="grid grid-cols-2 gap-4 h-[500px] overflow-y-auto">
              {["/1.png", "/2.png", "/3.png", "/4.jpg", "/5.jpg", "/6.jpg"].map((src, index) => (
                <div key={index} className="aspect-w-16 aspect-h-9">
                  <img
                    src={src}
                    alt={`Latest image ${index + 1}`}
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
        

        {/* Power Outages Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Power Outages</h2>
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-lg">County: <span className="font-bold">{powerOutagesData.County}</span></p>
                <p className="text-lg">Total Customers: <span className="font-bold">{powerOutagesData["Total Customers Tracked"].toLocaleString()}</span></p>
              </div>
              <div>
                <p className="text-lg">Customers Out: <span className="font-bold text-red-500">{powerOutagesData["Customers Out"].toLocaleString()}</span></p>
                <p className="text-lg">Outage Percentage: <span className="font-bold text-red-500">{powerOutagesData["Outage Percentage"]}</span></p>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-bold mb-2">Providers</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {powerOutagesData.Providers.map((provider, index) => (
                  <div key={index} className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-bold mb-2">{provider.Provider}</h4>
                    <p>Customers Tracked: {provider["Customers Tracked"]}</p>
                    <p>Customers Out: <span className="text-red-500">{provider["Customers Out"]}</span></p>
                    <p className="text-sm text-gray-400">Last Updated: {provider["Last Updated"]}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Hospitals Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Hospitals</h2>
          <div className="mb-4">
            <label htmlFor="county-select" className="block text-sm font-bold text-white uppercase mb-2">
              SELECT CITY:
            </label>
            <div className="relative">
              <select
                id="county-select"
                value={selectedCounty}
                onChange={(e) => setSelectedCounty(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-black text-white shadow-[0_0_10px_rgba(59,130,246,0.5)] border-2 border-blue-500 transition-all duration-300 ease-in-out hover:shadow-[0_0_15px_rgba(59,130,246,0.8)]"
              >
                <option value="">Select a City</option>
                {Object.keys(hospitalsData).map((county) => (
                  <option key={county} value={county}>
                    {county}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="h-4 w-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
          {selectedCounty && hospitalsData[selectedCounty as keyof typeof hospitalsData] && (
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Hospitals in {selectedCounty}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {hospitalsData[selectedCounty as keyof typeof hospitalsData].map((hospital, index) => (
                  <div key={index} className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-bold mb-2">{hospital.name}</h4>
                    <p className="text-sm mb-2">{hospital.address}</p>
                    <a 
                      href={hospital.maps_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline text-sm"
                    >
                      View on Google Maps
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
        {/* Available Services Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Available Services Nearby</h2>
          <div className="mb-4 flex flex-wrap gap-4">
            {Object.entries(selectedOptions).map(([key, value]) => (
              <label key={key} className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => handleOptionChange(key as keyof typeof selectedOptions)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-white font-bold uppercase">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
              </label>
            ))}
          </div>
          <div className="mb-4">
            <label htmlFor="county-select" className="block text-sm font-bold text-white uppercase mb-2">
              SELECT CITY:
            </label>
            <div className="relative">
              <select
                id="county-select"
                value={selectedCounty}
                onChange={(e) => setSelectedCounty(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-black text-white shadow-[0_0_10px_rgba(59,130,246,0.5)] border-2 border-blue-500 transition-all duration-300 ease-in-out hover:shadow-[0_0_15px_rgba(59,130,246,0.8)]"
              >
                <option value="">Select a City</option>
                {counties.map((county) => (
                  <option key={county} value={county}>
                    {county}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="h-4 w-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
          {selectedCounty && (
            <div className={`grid grid-cols-1 ${getSelectedCount() > 1 ? `md:grid-cols-2` : ''} ${getSelectedCount() > 2 ? `lg:grid-cols-3` : ''} ${getSelectedCount() > 3 ? `xl:grid-cols-4` : ''} gap-4`}>
              {selectedOptions.hotels && (
                <div>
                  <h3 className="text-xl font-bold mb-2">Hotels <span className="text-sm font-normal text-green-500">● Live</span></h3>
                  {(hotelsData[selectedCounty as keyof typeof hotelsData] || []).slice(0, 5).map((hotel, index) => (
                    <div key={index} className="bg-black shadow-md rounded-lg p-4 mb-2">
                      <h4 className="font-bold mb-1">{hotel.name}</h4>
                      <p className="text-sm mb-1">{hotel.address}</p>
                      <p className="text-sm mb-1">Availability: {hotel.availability}</p>
                      <a 
                        href={hotel.maps_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline text-sm"
                      >
                        View on Google Maps
                      </a>
                    </div>
                  ))}
                  {hotelsData[selectedCounty as keyof typeof hotelsData]?.length > 5 && (
                    <button className="text-blue-500 hover:underline mt-2">See more hotels</button>
                  )}
                </div>
              )}
              
              {selectedOptions.gasStations && (
                <div>
                  <h3 className="text-xl font-bold mb-2">Gas Stations <span className="text-sm font-normal text-green-500">● Live</span></h3>
                  {(gasStationsData[selectedCounty as keyof typeof gasStationsData] || []).slice(0, 5).map((station, index) => (
                    <div key={index} className="bg-black shadow-md rounded-lg p-4 mb-2">
                      <h4 className="font-bold mb-1">{station.name}</h4>
                      <p className="text-sm mb-1">{station.address}</p>
                      <a 
                        href={station.maps_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline text-sm"
                      >
                        View on Google Maps
                      </a>
                    </div>
                  ))}
                  {gasStationsData[selectedCounty as keyof typeof gasStationsData]?.length > 5 && (
                    <button className="text-blue-500 hover:underline mt-2">See more gas stations</button>
                  )}
                </div>
              )}

              {selectedOptions.shelters && (
                <div>
                  <h3 className="text-xl font-bold mb-2">Shelters</h3>
                  {sheltersData.slice(0, 5).map((shelter, index) => (
                    <div key={index} className="bg-black shadow-md rounded-lg p-4 mb-2">
                      <h4 className="font-bold mb-1">{shelter.name}</h4>
                      <p className="text-sm mb-1">{shelter.address}</p>
                      <p className="text-sm mb-1">Phone: {shelter.phone}</p>
                      <a 
                        href={shelter.google_map}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline text-sm"
                      >
                        View on Google Maps
                      </a>
                    </div>
                  ))}
                  {sheltersData.length > 5 && (
                    <button className="text-blue-500 hover:underline mt-2">See more shelters</button>
                  )}
                </div>
              )}

              {selectedOptions.foodPantries && (
                <div>
                  <h3 className="text-xl font-bold mb-2">Food Pantries</h3>
                  {foodPantriesData.slice(0, 5).map((pantry, index) => (
                    <div key={index} className="bg-black shadow-md rounded-lg p-4 mb-2">
                      <h4 className="font-bold mb-1">{pantry.name}</h4>
                      <p className="text-sm mb-1">Phone: {pantry.phone || 'N/A'}</p>
                      <a 
                        href={pantry.address}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline text-sm"
                      >
                        View on Google Maps
                      </a>
                      {pantry.website && (
                        <a 
                          href={pantry.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-blue-500 hover:underline text-sm mt-1"
                        >
                          Visit Website
                        </a>
                      )}
                    </div>
                  ))}
                  {foodPantriesData.length > 5 && (
                    <button className="text-blue-500 hover:underline mt-2">See more food pantries</button>
                  )}
                </div>
              )}
            </div>
          )}
        </section>


        {/* Resources Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Resources</h2>
          <div className="bg-black p-6 rounded-lg shadow-lg mb-6">
            <h3 className="text-xl font-bold mb-4">How to Signal SOS</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-900 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Morse Code</h4>
                <p className="text-2xl">• • • — — — • • •</p>
                <p className="text-sm mt-2">(3 short, 3 long, 3 short)</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Hand Signals</h4>
                <Image
                  src="/handSOS.png"
                  alt="Hand signals for SOS"
                  width={200}
                  height={50}
                  className="mx-auto"
                />
              </div>
              <div className="bg-gray-900 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Flashlight</h4>
                <p className="text-2xl">🔆 🔆 🔆 ⚪— ⚪— ⚪— 🔆 🔆 🔆</p>
                <p className="text-sm mt-2">(3 quick, 3 long, 3 quick)</p>
              </div>
            </div>
          </div>

          {/* Emergency Checklist Section */}
          <div className="bg-black p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Emergency Preparedness Checklist</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-900 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Essential Documents</h4>
                <ul className="list-disc list-inside">
                  <li>Driver's license</li>
                  <li>Passport</li>
                  <li>Birth certificate</li>
                  <li>Social Security card</li>
                  <li>Insurance policies</li>
                </ul>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Emergency Supplies</h4>
                <ul className="list-disc list-inside">
                  <li>First aid kit</li>
                  <li>Flashlight and batteries</li>
                  <li>Battery-powered radio</li>
                  <li>Non-perishable food</li>
                  <li>Bottled water</li>
                </ul>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Personal Items</h4>
                <ul className="list-disc list-inside">
                  <li>Medications</li>
                  <li>Eyeglasses or contacts</li>
                  <li>Cash and credit cards</li>
                  <li>Change of clothes</li>
                  <li>Personal hygiene items</li>
                </ul>
              </div>
            </div>
            <div className="text-center">
              <a 
                href="/checklist.pdf" 
                download 
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-block"
              >
                Download Full Checklist PDF
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="text-center text-sm text-gray-500 mt-8">
        Hack PSU Fall 2024 Submission | <a href="https://github.com/Pranav-Karra-3301/FloridaSOS" className="text-blue-500 hover:underline">GitHub</a>
      </footer>
    </div>
  );
}