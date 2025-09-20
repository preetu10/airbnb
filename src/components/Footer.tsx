"use client"
import React, { useState } from 'react';
import { FaArrowDown, FaDollarSign, FaFacebook, FaInstagram } from 'react-icons/fa';
import { FaGlobe, FaTwitter } from 'react-icons/fa6';

const Footer = () => {
  const [showAll, setShowAll] = useState(false);
  const tab1_contents = [
    { title: "Family travel hub", subtitle: "Tips and inspiration", link: "/family-travel" },
    { title: "Family budget travel", subtitle: "Get there for less", link: "/family-budget-travel" },
    { title: "Vacation ideas for any budget", subtitle: "Make it special without making it spendy", link: "/6-budget-friendly-family-vacation" },
    { title: "Travel Europe on a budget", subtitle: "How to take the kids to Europe for less", link: "/6-budget-friendly-family-vacation-europe-with-kids" },
    { title: "Outdoor adventure", subtitle: "Explore nature with the family", link: "/outdoor-adventure" },
    { title: "Bucket list national parks", subtitle: "Must-see parks for family travel", link: "bucket-list-for-parks" },
    { title: "Kid-friendly state parks", subtitle: "Check out these family-friendly hikes", link: "/kids-friendly-parks" },
  ]
  const tab2_contents = [
    { city: "Albuquerque", state: "New Mexico" },
    { city: "Atlanta Metro", state: "Georgia" },
    { city: "Augusta", state: "Georgia" },
    { city: "Austin Metro", state: "Texas" },
    { city: "Baton Rouge", state: "Louisiana" },
    { city: "Bentonville", state: "Arkansas" },
    { city: "Birmingham", state: "Alabama" },
    { city: "Boise", state: "Idaho" },
    { city: "Boston Metro", state: "Massachusetts" },
    { city: "Boulder", state: "Colorado" },
    { city: "Charlotte", state: "North Carolina" },
    { city: "Chicago Metro", state: "Illinois" },
    { city: "Cincinnati", state: "Ohio" },
    { city: "Columbus", state: "Ohio" },
    { city: "Crestview", state: "Florida" },
    { city: "Dallas", state: "Texas" },
    { city: "Denver", state: "Colorado" },
    { city: "Detroit Metro", state: "Michigan" },
    { city: "Fayetteville", state: "North Carolina" },
    { city: "Fort Myers", state: "Florida" },
    { city: "Fort Worth", state: "Texas" },
    { city: "Frankfort", state: "Kentucky" },
    { city: "Fresno", state: "California" },
    { city: "Greeley", state: "Colorado" },
    { city: "Greenville-Greer", state: "South Carolina" },
    { city: "Hartford", state: "Connecticut" },
    { city: "Hoboken", state: "New Jersey" },
    { city: "Houston Metro", state: "Texas" },
    { city: "Indianapolis", state: "Indiana" },
    { city: "Jacksonville", state: "Florida" },
    { city: "Kansas City, MO", state: "Missouri" },
    { city: "Lacey", state: "Washington" },
    { city: "Lexington Park", state: "Maryland" },
    { city: "Los Angeles", state: "California" },
    { city: "Loveland", state: "Colorado" },
    { city: "Madison", state: "Alabama" },
    { city: "Memphis", state: "Tennessee" },
    { city: "Miami", state: "Florida" },
    { city: "Midland", state: "Texas" },
    { city: "Minneapolis", state: "Minnesota" },
    { city: "Myrtle Beach", state: "South Carolina" },
    { city: "Narragansett", state: "Rhode Island" },
    { city: "Nashville Metro", state: "Tennessee" },
    { city: "Orange County", state: "California" },
    { city: "Marin County", state: "California" },
    { city: "Norfolk", state: "Virginia" },
    { city: "East Bay", state: "California" },
    { city: "Oklahoma City", state: "Oklahoma" },
    { city: "Orlando Metro", state: "Florida" },
    { city: "Panama City", state: "Florida" },
    { city: "Petaluma", state: "California" },
    { city: "Philadelphia Metro", state: "Pennsylvania" },
    { city: "Phoenix", state: "Arizona" },
    { city: "Pittsburgh", state: "Pennsylvania" },
    { city: "Ponte Vedra Beach", state: "Florida" },
    { city: "Port Arthur", state: "Texas" },
    { city: "Portland, ME", state: "Maine" },
    { city: "Portland", state: "Oregon" },
    { city: "Prescott Valley", state: "Arizona" },
    { city: "Raleigh", state: "North Carolina" },
    { city: "Riverside", state: "California" },
    { city: "Sacramento", state: "California" },
    { city: "Salt Lake City", state: "Utah" },
    { city: "San Antonio", state: "Texas" },
    { city: "San Diego", state: "California" },
    { city: "San Francisco", state: "California" },
    { city: "San Jose", state: "California" },
    { city: "Santa Rosa Beach", state: "Florida" },
    { city: "Sarasota", state: "Florida" },
    { city: "Seattle Metro", state: "Washington" },
    { city: "San Francisco Peninsula", state: "California" },
    { city: "Spokane", state: "Washington" },
    { city: "St. Augustine", state: "Florida" },
    { city: "Stamford", state: "Connecticut" },
    { city: "Tampa Bay", state: "Florida" },
    { city: "Ventura County", state: "California" },
    { city: "Baltimore County", state: "Maryland" },
    { city: "Tulsa", state: "Oklahoma" },
    { city: "Washington Metro", state: "District of Columbia" },
    { city: "West Palm Beach", state: "Florida" },
    { city: "Wildwood", state: "Florida" },
    { city: "Wilmington, NC", state: "North Carolina" },
  ];
  // first 18
  const initialData = tab2_contents.slice(0, 17);
  // rest
  const remainingData = tab2_contents.slice(17);

  return (
    <div className="bg-base-200">
      {/* top */}
      <div className="py-10 px-4 sm:px-10 lg:px-32">
        <h3 className="text-left font-medium text-black text-2xl mb-6">
          Inspiration for future getaways
        </h3>
        <div className="tabs tabs-border text-left overflow-x-auto">
          <input type="radio" name="my_tabs_2" className="tab md:pr-10 pl-0" aria-label="Travel tips & inspiration" defaultChecked />
          <div className="tab-content bg-base-200 md:pr-4 py-4">
            <div className="flex flex-wrap gap-4">
              {tab1_contents.map((content) => (
                <div key={content.title} className="min-w-[160px]">
                  <a href={content.link} className="cursor-pointer text-black font-medium">{content.title}</a>
                  <br />
                  <a href={content.link} className="text-neutral-500 cursor-pointer">{content.subtitle}</a>
                </div>
              ))}
            </div>
          </div>
          <input type="radio" name="my_tabs_2" className="tab" aria-label="Airbnb-friendly apartments" />
          <div className="tab-content bg-base-200 md:pr-4 py-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {initialData.map((content) => (
                <div key={content.city} className="py-1">
                  <a href={`www.google.com/${content.city}`} className="cursor-pointer text-black font-medium">{content.city}</a>
                  <br />
                  <a href={`www.google.com/${content.city}`} className="text-neutral-500 cursor-pointer">{content.state}</a>
                </div>
              ))}

              {!showAll && (
                <div className="py-1 col-span-full">
                  <button
                    onClick={() => setShowAll(true)}
                    className="text-black font-medium flex items-center gap-1"
                  >
                    Show more <FaArrowDown />
                  </button>
                </div>
              )}

              {showAll && remainingData.map((content) => (
                <div key={content.city} className="py-1">
                  <a href={`www.google.com/${content.city}`} className="cursor-pointer text-black font-medium">{content.city}</a>
                  <br />
                  <a href={`www.google.com/${content.city}`} className="text-neutral-500 cursor-pointer">{content.state}</a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* middle links */}
      <div className="footer flex flex-col sm:flex-row flex-wrap justify-between px-4 sm:px-10 lg:px-32 py-10 gap-8">
        <nav>
          <h6 className="font-medium text-black mb-2">Support</h6>
          <ul className="space-y-1">
            <li><a className="link link-hover">Help Center</a></li>
            <li><a className="link link-hover">Get help with a safety issue</a></li>
            <li><a className="link link-hover">AirCover</a></li>
            <li><a className="link link-hover">Disability support</a></li>
            <li><a className="link link-hover">Cancellation options</a></li>
            <li><a className="link link-hover">Report neighborhood concern</a></li>
          </ul>
        </nav>
        <nav>
          <h6 className="font-medium text-black mb-2">Hosting</h6>
          <ul className="space-y-1">
            <li><a className="link link-hover">Airbnb your home</a></li>
            <li><a className="link link-hover">Airbnb your experience</a></li>
            <li><a className="link link-hover">Airbnb your service</a></li>
            <li><a className="link link-hover">AirCover for Hosts</a></li>
            <li><a className="link link-hover">Hosting resources</a></li>
            <li><a className="link link-hover">Community forum</a></li>
            <li><a className="link link-hover">Hosting responsibly</a></li>
            <li><a className="link link-hover">Airbnb-friendly apartments</a></li>
            <li><a className="link link-hover">Join a free Hosting class</a></li>
            <li><a className="link link-hover">Find a co‑host</a></li>
          </ul>
        </nav>
        <nav>
          <h6 className="font-medium text-black mb-2">Airbnb</h6>
          <ul className="space-y-1">
            <li><a className="link link-hover">2025 Summer Release</a></li>
            <li><a className="link link-hover">Newsroom</a></li>
            <li><a className="link link-hover">Careers</a></li>
            <li><a className="link link-hover">Investors</a></li>
            <li><a className="link link-hover">Gift Cards</a></li>
            <li><a className="link link-hover">Airbnb.org emergency stays</a></li>
          </ul>
        </nav>
      </div>

      {/* bottom */}
      <div className="footer border-t border-base-300 px-4 sm:px-10 lg:px-32 py-4 flex flex-col sm:flex-row justify-between gap-4">
        <p className="text-sm inline text-neutral-700">
          © 2025 Airbnb, Inc. <a href="/terms" className="underline">Terms</a>. <a href="/sitemap/v2" className="underline">Sitemap</a>. <a href="/privacy" className="underline">Privacy</a>. <a href="/privacy-choices" className="underline">Your Privacy Choices</a>
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1 cursor-pointer text-black"><FaGlobe className="text-xl" /> English (US)</div>
          <div className="flex items-center gap-1 cursor-pointer text-black"><FaDollarSign className="text-2xl" /> USD</div>
          <a href="https://www.facebook.com/airbnb" className="text-black text-2xl"><FaFacebook /></a>
          <a href="https://www.twitter.com/airbnb" className="text-black text-2xl"><FaTwitter /></a>
          <a href="https://www.instagram.com/airbnb" className="text-black text-2xl"><FaInstagram /></a>
        </div>
      </div>
    </div>
  );
};

export default Footer;