import Image from "next/image";
import ArticleCarousel from "../components/ArticleCarousel";

export default function Home() {
  const emergencyInfo = {
    summary: "This is a summary of emergency information. Please download the PDF for complete details.",
    radioFrequencies: ["97.5 FM", "101.3 FM", "105.7 FM"],
    pdfUrl: "/emergency_info.pdf", // Replace with actual PDF path
  };

  const articles = [
    { title: "Emergency Preparedness", url: "https://example.com/article1", preview: "Learn how to prepare for emergencies..." },
    { title: "Local Shelters", url: "https://example.com/article2", preview: "Find information about local shelters..." },
    { title: "Weather Alerts", url: "https://example.com/article3", preview: "Stay updated with the latest weather alerts..." },
  ];

  return (
    <div className="min-h-screen p-8 font-sans">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">Milton SOS</h1>
      </header>

      <main>
        {/* Emergency Information Box */}
        <div className="bg-red-100 border-2 border-red-500 p-4 mb-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">Emergency Information</h2>
          <p className="mb-4">{emergencyInfo.summary}</p>
          <h3 className="font-bold mb-2">Emergency Radio Frequencies:</h3>
          <ul className="list-disc list-inside mb-4">
            {emergencyInfo.radioFrequencies.map((freq, index) => (
              <li key={index}>{freq}</li>
            ))}
          </ul>
          <a 
            href={emergencyInfo.pdfUrl} 
            download 
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
          >
            Download Emergency PDF
          </a>
        </div>
        {/* Article Summary */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">News Summary</h2>
          <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
            <p className="text-gray-700">
              A 14-year-old boy was rescued from Tampa floodwaters after Hurricane Milton, thanks to a vigilant sheriff deputy. In Florida, multiple airports were closed due to the hurricane. Meanwhile, Chick-fil-A plans to replace a demolished Exxon in Hillsborough, New Jersey, and a street takeover involving 250 cars accumulated a huge audience in Montgomery. In other news, a police officer was arrested for video voyeurism in a shocking case, while a homeless, repeated sex offender in Concord was apprehended again. Florida has seen political drama as a prosecutor was suspended, impacting Governor Desantis's reelection campaign. Lastly, ex-Lions CB Cameron Sutton retired from professional football.
            </p>
          </div>
        </section>

        {/* Article Carousel */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Latest Updates</h2>
          <ArticleCarousel articles={[
            { title: "Boy, 14, Rescued From Floating Debris in Tampa", url: "https://www.newser.com/story/357653/boy-14-rescued-from-floating-debris-in-tampa.html", date: "October 11, 2024, 03:50 PM" },
            { title: "14-year-old on floating fence rescued from Milton floodwaters", url: "https://www.nbcboston.com/news/national-international/out-of-a-castaway-movie-sheriff-deputy-rescue-14-year-old-from-tampa-floodwaters-after-milton/3516592/", date: "October 11, 2024, 07:50 AM" },
            { title: "Full List of Florida Airports Closing Ahead of Hurricane Milton", url: "https://www.newsweek.com/full-list-florida-airports-closing-ahead-hurricane-milton-1965251", date: "October 07, 2024, 09:10 PM" },
            { title: "Chick-Fil-A Looks To Replace, Demolish Exxon In Hillsborough", url: "https://patch.com/new-jersey/hillsborough/chick-fil-looks-replace-demolish-exxon-hillsborough", date: "September 20, 2024, 03:36 PM" },
            { title: "Police Officer Arrested For What He Did At His Own House", url: "https://tasteofcountry.com/police-officer-arrested-video-voyeurism/", date: "August 30, 2024, 05:50 PM" },
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
