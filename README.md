<div align="center">
  <img src="website/public/hackpsu.png" alt="HackPSU Logo" width="300">
  
  HackPSU Fall 2024
  # 👑 Overall 1st Place Winner 👑
</div>

# (Submitted As)Hurricane Warning Dashboard

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 📋 Table of Contents
1. [Introduction](#introduction)
2. [Repository Structure](#repository-structure)
3. [Key Components](#key-components)
4. [Data Sources](#data-sources)
5. [Customization](#customization)
6. [Setup and Deployment](#setup-and-deployment)
7. [Using as a Template](#using-as-a-template)

## 🌟 Introduction

This repository contains a comprehensive Hurricane Warning Dashboard, designed to provide real-time information and resources during hurricane emergencies. Built with Next.js and utilizing various data sources, this dashboard offers a centralized platform for emergency information, news updates, and local resource mapping. 

**This project serves as a powerful template that can be quickly adapted and deployed, enabling the creation of an all-in-one emergency dashboard capable of serving millions of people within minutes of a crisis.**

## 🚧 Repository Structure

```
/
├── website/
│   ├── app/
│   │   ├── components/
│   │   ├── fonts/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── Data/
│   │   ├── Site/
│   │   ├── evac_alerts.py
│   │   ├── evac_alerts.txt
│   │   ├── food_pantries.json
│   │   ├── gas_stations_hillsborough.json
│   │   ├── hillsborough_timeline.json
│   │   ├── hospitals_hillsborough.json
│   │   ├── hotels_hillsborough.json
│   │   ├── news.py
│   │   ├── power_outages.json
│   │   ├── shelters_with_google_maps.json
│   │   ├── summaries.json
│   │   └── tampa.json
│   ├── public/
│   │   └── [various image and asset files]
│   ├── .gitignore
│   ├── next.config.mjs
│   ├── package.json
│   ├── postcss.config.js
│   ├── README.md
│   ├── tailwind.config.ts
│   └── tsconfig.json
└── README.md
```

## 🧩 Key Components

1. **Main Dashboard (page.tsx)**
   - Location: `website/app/page.tsx`
   - Description: The core component rendering the entire dashboard interface.
   - Key sections:
     - Hurricane category and wind speed indicators
     - Emergency information box
     - News summary and latest updates
     - Hurricane tracking maps
     - Power outages information
     - Available services (hotels, gas stations, shelters, etc.)
     - Resources and emergency preparedness checklist

2. **Data Fetching and Processing**
   - Location: `website/Data/`
   - Key files:
     - `evac_alerts.py`: Fetches evacuation alerts from FEMA API
     - `news.py`: Retrieves and processes news articles
     - `Site/PowerOutages.py`: Scrapes power outage data
     - `Site/FindHospitals.py`: Gathers hospital information

3. **Styling**
   - Location: `website/app/globals.css`
   - Description: Contains global styles and custom animations

4. **Layout and Metadata**
   - Location: `website/app/layout.tsx`
   - Description: Defines the overall layout and metadata for the application

## 📊 Data Sources

The dashboard utilizes various JSON files to populate its content:

1. `gas_stations_hillsborough.json`: Gas station locations
2. `hotels_hillsborough.json`: Hotel information
3. `shelters_with_google_maps.json`: Shelter locations with Google Maps links
4. `food_pantries.json`: Food pantry information
5. `hospitals_hillsborough.json`: Hospital data
6. `power_outages.json`: Current power outage statistics
7. `tampa.json` and `summaries.json`: News articles and summaries

These files are located in the `website/Data/` directory and are loaded dynamically by the application.

## 🎨 Customization

To customize the dashboard for a different location or disaster type:

1. Update the JSON files in the `website/Data/` directory with relevant information.
2. Modify the `page.tsx` file to reflect the new disaster type and location-specific details.
3. Adjust the styling in `globals.css` if needed.
4. Update images and assets in the `public/` directory.

## 🚀 Setup and Deployment

1. Clone the repository
2. Navigate to the `website/` directory
3. Install dependencies: `npm install`
4. Run the development server: `npm run dev`
5. Build for production: `npm run build`
6. Deploy the `out/` directory to your preferred hosting platform

## 🔄 Using as a Template

This repository can be easily forked and customized for any disaster or emergency situation:

1. Fork the repository to your GitHub account.
2. Clone your forked repository locally.
3. Update the JSON files in `website/Data/` with information relevant to your specific emergency or location.
4. Modify the `page.tsx` file to reflect the new disaster type and location-specific details. Key areas to update include:
   - Title and description (lines 58-61)
   - Emergency information (lines 14-32)
   - Hurricane tracking section (if applicable, lines 207-242)
   - Available services section (lines 334-503)
5. Update images in the `public/` directory with relevant maps and visuals.
6. Customize the styling in `globals.css` if desired.
7. Update the `README.md` file with information about your specific implementation.
8. Deploy your customized dashboard following the setup instructions above.

By following these steps, you can have a fully functional emergency dashboard up and running in minutes, tailored to your specific needs and location.

This template provides a solid foundation for creating emergency information hubs quickly and efficiently, allowing for rapid deployment during critical situations.
