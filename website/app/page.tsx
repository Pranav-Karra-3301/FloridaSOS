'use client';

import Image from "next/image";
import ArticleCarousel from "../components/ArticleCarousel";
import Alert from "../components/alert";
<<<<<<< Updated upstream
import { useState } from 'react';
import gasStationsData from '../Data/gas_stations_hillsborough.json';
import hotelsData from '../Data/hotels_hillsborough.json';
import sheltersData from '../Data/shelters_with_google_maps.json';
import foodPantriesData from '../Data/food_pantries.json';

=======
import { useEffect } from 'react';
>>>>>>> Stashed changes
export default function Home() {
  const emergencyInfo = {
    summary: "This is a summary of emergency information. Please download the PDF or Print this webpage for complete details.",
    radioFrequencies: ["97.5 FM", "101.3 FM", "105.7 FM"],
    pdfUrl: "/emergency_info.pdf", // Replace with actual PDF path
  };

  const evacuationPlans = [
    { county: "Hillsborough County", filename: "hillsborough_evac_plan.pdf" },
    { county: "Orange County", filename: "orange_evac_plan.pdf" },
    { county: "Osceola County", filename: "osceola_evac_plan.pdf" },
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
    <div className="min-h-screen p-8 font-sans">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">Milton SOS</h1>
      </header>

      <main>
        {/* Emergency Information Box */}
        <div className="bg-red-500 border-2 border-red-700 p-4 mb-6 rounded-lg text-center text-white">
          <h2 className="text-xl font-bold mb-2">⚠️ Emergency Information</h2>
          <p className="mb-3">{emergencyInfo.summary}</p>
          <h3 className="font-bold mb-2">Emergency Radio: {emergencyInfo.radioFrequencies.join(', ')}</h3>
          <div className="flex flex-wrap justify-center gap-2 mb-3">
            {evacuationPlans.map((plan, index) => (
              <a
                key={index}
                href={`/${plan.filename}`}
                download
                className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-600"
              >
                {plan.county} Evacuation Plan
              </a>
            ))}
          </div>
          <a 
            href={emergencyInfo.pdfUrl} 
            download 
            className="bg-white text-red-500 px-3 py-1 rounded-full text-sm hover:bg-red-100"
          >
            Download Emergency PDF
          </a>
        </div>
        {/* Alerts Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Alerts</h2>
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

        {/* Hurricane Tracking Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Hurricane Tracking</h2>
          <div className="w-[70%] mx-auto bg-gray-200 rounded-lg overflow-hidden">
            <img
              src="/path.gif"
              alt="Hurricane Path"
              className="w-full h-auto"
            />
          </div>
        </section>
        
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
          <div className="relative group cursor-pointer">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-violet-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative px-7 py-6 bg-black ring-1 ring-gray-900/5 rounded-lg leading-none">
              <ul className="text-white-700 list-disc pl-5 space-y-2">
                <li>Hurricane Milton caused significant damage and deaths across Florida.</li>
                <li>Tampa Bay was severely affected, with damage to the local stadium raising concerns for the Rays' upcoming season.</li>
                <li>A boat captain survived by clinging to a cooler in the Gulf of Mexico.</li>
                <li>Peso Pluma cancelled concerts in Tampa and Miami due to the hurricane.</li>
                <li>Florida Lieutenant Dan Joseph Malinowski's daughter criticized influencers for exploiting the tragedy.</li>
                <li>The death toll has risen to 16 as rescue efforts continue.</li>
                <li>Residents are navigating flooded streets for cleanup as recovery efforts begin.</li>
                <li>The road to recovery is expected to be long and arduous.</li>
              </ul>
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
              SELECT COUNTY:
            </label>
            <select
              id="county-select"
              value={selectedCounty}
              onChange={(e) => setSelectedCounty(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-black text-white"
            >
              <option value="">Select a county</option>
              {counties.map((county) => (
                <option key={county} value={county}>
                  {county}
                </option>
              ))}
            </select>
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

        {/* Additional Sections */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Resources</h2>
          {/* Add resource content here */}
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
          {/* Add contact information here */}
        </section>
      </main>

      <footer className="text-center text-sm text-gray-500 mt-8">
        © 2023 Milton SOS. All rights reserved.
      </footer>
    </div>
  );
}