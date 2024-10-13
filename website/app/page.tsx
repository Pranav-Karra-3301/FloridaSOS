import Image from "next/image";
import ArticleCarousel from "../components/ArticleCarousel";

export default function Home() {
  const emergencyInfo = {
    summary: "This is a summary of emergency information. Please download the PDF for complete details.",
    radioFrequencies: ["97.5 FM", "101.3 FM", "105.7 FM"],
    pdfUrl: "/emergency_info.pdf", // Replace with actual PDF path
  };

  const evacuationPlans = [
    { county: "Hillsborough County", filename: "hillsborough_evac_plan.pdf" },
    { county: "Orange County", filename: "orange_evac_plan.pdf" },
    { county: "Osceola County", filename: "osceola_evac_plan.pdf" },
  ];
  return (
    <div className="min-h-screen p-8 font-sans">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">Milton SOS</h1>
      </header>

      <main>
        {/* Emergency Information Box */}
        <div className="bg-red-500 border-2 border-red-700 p-6 mb-8 rounded-lg text-center text-white">
          <h2 className="text-2xl font-bold mb-4">⚠️ Emergency Information ⚠️</h2>
          <p className="mb-6">{emergencyInfo.summary}</p>
          <h3 className="font-bold mb-3">❗️ Emergency Radio Frequencies ❗️</h3>
          <ul className="list-none mb-6">
            {emergencyInfo.radioFrequencies.map((freq, index) => (
              <li key={index} className="mb-1">📻 {freq}</li>
            ))}
          </ul>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {evacuationPlans.map((plan, index) => (
              <a
                key={index}
                href={`/${plan.filename}`}
                download
                className="bg-white text-red-500 px-6 py-3 rounded-full hover:bg-red-100 transition-colors"
              >
                ⚠️ {plan.county} Evacuation Plan ⚠️
              </a>
            ))}
          </div>
          <a 
            href={emergencyInfo.pdfUrl} 
            download 
            className="bg-white text-red-500 px-6 py-3 rounded-full hover:bg-red-100 transition-colors inline-block"
          >
            ⚠️ Download Emergency PDF ⚠️
          </a>
        </div>
        {/* Article Summary */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">News Summary</h2>
          <div className="relative group cursor-pointer">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-violet-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative px-7 py-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none">
              <ul className="text-gray-700 list-disc pl-5 space-y-2">
                <li>A 14-year-old boy was rescued from Tampa floodwaters after Hurricane Milton by a vigilant sheriff deputy.</li>
                <li>Multiple airports in Florida were closed due to Hurricane Milton.</li>
                <li>Chick-fil-A plans to replace a demolished Exxon in Hillsborough, New Jersey.</li>
                <li>A street takeover involving 250 cars drew a large audience in Montgomery.</li>
                <li>A police officer was arrested for video voyeurism in a shocking case.</li>
                <li>A homeless, repeat sex offender in Concord was apprehended again.</li>
                <li>A Florida prosecutor was suspended, impacting Governor DeSantis's reelection campaign.</li>
                <li>Ex-Lions CB Cameron Sutton retired from professional football.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Article Carousel */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Latest Updates</h2>
          <ArticleCarousel articles={[
            { title: "Boy, 14, Rescued From Floating Debris in Tampa", url: "https://www.newser.com/story/357653/boy-14-rescued-from-floating-debris-in-tampa.html", date: "October 11, 2024, 03:50 PM", preview: "A 14-year-old boy was rescued from floating debris in Tampa after Hurricane Milton." },
            { title: "14-year-old on floating fence rescued from Milton floodwaters", url: "https://www.nbcboston.com/news/national-international/out-of-a-castaway-movie-sheriff-deputy-rescue-14-year-old-from-tampa-floodwaters-after-milton/3516592/", date: "October 11, 2024, 07:50 AM", preview: "A sheriff's deputy rescued a 14-year-old boy from floodwaters in Tampa after Hurricane Milton." },
            { title: "Full List of Florida Airports Closing Ahead of Hurricane Milton", url: "https://www.newsweek.com/full-list-florida-airports-closing-ahead-hurricane-milton-1965251", date: "October 07, 2024, 09:10 PM", preview: "Several Florida airports are closing in preparation for Hurricane Milton." },
            { title: "Chick-Fil-A Looks To Replace, Demolish Exxon In Hillsborough", url: "https://patch.com/new-jersey/hillsborough/chick-fil-looks-replace-demolish-exxon-hillsborough", date: "September 20, 2024, 03:36 PM", preview: "Chick-Fil-A plans to replace a demolished Exxon station in Hillsborough, New Jersey." },
            { title: "Police Officer Arrested For What He Did At His Own House", url: "https://tasteofcountry.com/police-officer-arrested-video-voyeurism/", date: "August 30, 2024, 05:50 PM", preview: "A police officer was arrested for video voyeurism at his own residence." },
          ]} />
        </section>

        {/* Latest Images Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Latest Images</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="aspect-w-16 aspect-h-9">
              <img
                src="/1.png"
                alt="Latest image 1"
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
            <div className="aspect-w-16 aspect-h-9">
              <img
                src="/2.png"
                alt="Latest image 2"
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
            <div className="aspect-w-16 aspect-h-9">
              <img
                src="/3.png"
                alt="Latest image 3"
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
          </div>
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
