/* eslint-disable @next/next/no-img-element */
"use client";
import { getSearchDestinations } from "@/services/getApis";
import React, { useEffect, useState, useRef } from "react";
import { FaSearch, FaChevronLeft, FaChevronRight, FaPlus, FaMinus } from "react-icons/fa";

interface Destination {
  location: string;
  subtitle: string;
  img: string;
}

interface GuestCounts {
  adults: number;
  children: number;
  infants: number;
  pets: number;
}

type DateTabType = "dates" | "months" | "flexible";

const Search = () => {
  const [activeField, setActiveField] = useState<string | null>(null);
  const [destinationData, setDestinationData] = useState<Destination[]>([]);
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({
    where: "",
    checkin: "",
    checkout: "",
    who: "",
  });
  const [selectedDates, setSelectedDates] = useState<{
    checkin: Date | null;
    checkout: Date | null;
  }>({
    checkin: null,
    checkout: null,
  });
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [dateRange, setDateRange] = useState<"checkin" | "checkout" | null>(null);
  const [guestCounts, setGuestCounts] = useState<GuestCounts>({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });
  const [activeDateTab, setActiveDateTab] = useState<DateTabType>("dates");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedFlexOption, setSelectedFlexOption] = useState<string>("");
  const [selectedFlexDays, setSelectedFlexDays] = useState<string>("Exact dates");


  const containerRef = useRef<HTMLDivElement>(null);

  const fields = [
    { id: "where", label: "Where", placeholder: "Where? : Search destinations" },
    { id: "checkin", label: "Check in", placeholder: "Check in: Add dates" },
    { id: "checkout", label: "Check out", placeholder: "Check out: Add dates" },
    { id: "who", label: "Who", placeholder: "Who? : Add guests" },
  ];

  const flexibleOptions = [
    "A weekend",
    "A week",
    "A month"
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSearchDestinations();
        setDestinationData(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching destinations:", error);
        setDestinationData([]);
      }
    };
    fetchData();

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setActiveField(null);
        setDateRange(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const totalGuests = guestCounts.adults + guestCounts.children;
    const totalPets = guestCounts.pets;
    const totalInfants = guestCounts.infants;

    let displayText = "";
    if (totalGuests > 0) {
      displayText += `${totalGuests} guest${totalGuests > 1 ? "s" : ""}`;
    }
    if (totalInfants > 0) {
      displayText += displayText ? `, ${totalInfants} infant${totalInfants > 1 ? "s" : ""}` : `${totalInfants} infant${totalInfants > 1 ? "s" : ""}`;
    }
    if (totalPets > 0) {
      displayText += displayText ? `, ${totalPets} pet${totalPets > 1 ? "s" : ""}` : `${totalPets} pet${totalPets > 1 ? "s" : ""}`;
    }

    setFormValues(prev => ({
      ...prev,
      who: displayText || ""
    }));
  }, [guestCounts]);

  const handleSelectDestination = (dest: Destination) => {
    setFormValues({ ...formValues, where: dest.location });
    setActiveField(null);

    const nextField = document.getElementById("checkin");
    nextField?.focus();
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const handleDateClick = (date: Date) => {
    if (activeField === "checkin" || (!selectedDates.checkin && !selectedDates.checkout)) {
      setSelectedDates({ checkin: date, checkout: null });
      setFormValues({ ...formValues, checkin: formatDate(date), checkout: "" });
      setDateRange("checkout");
      setActiveField("checkout");
    } else if (activeField === "checkout" || dateRange === "checkout") {
      if (selectedDates.checkin && date < selectedDates.checkin) {
        setSelectedDates({ checkin: date, checkout: null });
        setFormValues({ ...formValues, checkin: formatDate(date), checkout: "" });
        setDateRange("checkout");
      } else {
        setSelectedDates({ ...selectedDates, checkout: date });
        setFormValues({ ...formValues, checkout: formatDate(date) });
        setActiveField(null);
        setDateRange(null);
      }
    }
  };

  const handleMonthSelect = (month: string) => {
    setSelectedMonth(month);

    if (dateRange === "checkout") {
      setFormValues({
        ...formValues,
        checkout: month,
      });
    } else {
      setFormValues({
        ...formValues,
        checkin: month,
        checkout: "",
      });
      setDateRange("checkout"); // move user to checkout
    }
  };

  const handleFlexibleSelect = (option: string) => {
    setSelectedFlexOption(option);

    if (dateRange === "checkout") {
      setFormValues({
        ...formValues,
        checkout: option,
      });
    } else {
      setFormValues({
        ...formValues,
        checkin: option,
        checkout: "",
      });
      setDateRange("checkout");
    }
  };


  const updateGuestCount = (type: keyof GuestCounts, increment: boolean) => {
    setGuestCounts(prev => ({
      ...prev,
      [type]: Math.max(0, prev[type] + (increment ? 1 : -1))
    }));
  };

  const generateCalendarDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    const endDate = new Date(lastDay);

    startDate.setDate(startDate.getDate() - startDate.getDay());
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

    const days = [];
    const current = new Date(startDate);

    while (current <= endDate) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return days;
  };

  const isDateInRange = (date: Date) => {
    if (!selectedDates.checkin || !selectedDates.checkout) return false;
    return date >= selectedDates.checkin && date <= selectedDates.checkout;
  };

  const isDateSelected = (date: Date) => {
    return (
      (selectedDates.checkin && date.toDateString() === selectedDates.checkin.toDateString()) ||
      (selectedDates.checkout && date.toDateString() === selectedDates.checkout.toDateString())
    );
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const getNextMonth = () => {
    return new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1);
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const currentMonthIndex = new Date().getMonth();
  const guestTypes = [
    {
      key: "adults" as keyof GuestCounts,
      title: "Adults",
      subtitle: "Ages 13 or above",
      min: 0
    },
    {
      key: "children" as keyof GuestCounts,
      title: "Children",
      subtitle: "Ages 2-12",
      min: 0
    },
    {
      key: "infants" as keyof GuestCounts,
      title: "Infants",
      subtitle: "Under 2",
      min: 0
    },
    {
      key: "pets" as keyof GuestCounts,
      title: "Pets",
      subtitle: "Bringing a service animal?",
      min: 0
    }
  ];

  const renderDateTabContent = () => {
    switch (activeDateTab) {
      case "dates":
        return (
          <>
            {/* Calendar Grid */}
            <div className="flex gap-8">
              {/* Current Month */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-full">
                    <FaChevronLeft className="w-4 h-4" />
                  </button>
                  <h3 className="text-lg font-semibold">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </h3>
                  <div className="w-8" />
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2">
                  {dayNames.map((day) => (
                    <div key={day} className="text-center text-xs font-medium text-gray-500 p-2">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {generateCalendarDays(currentMonth).map((date, index) => {
                    const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
                    const isToday = date.toDateString() === new Date().toDateString();
                    const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));
                    const isSelected = isDateSelected(date);
                    const isInRange = isDateInRange(date);

                    return (
                      <button
                        key={index}
                        onClick={() => !isPast && handleDateClick(date)}
                        disabled={isPast}
                        className={`
                          p-2 text-sm rounded-full relative
                          ${!isCurrentMonth ? "text-gray-300" : ""}
                          ${isPast ? "text-gray-300 cursor-not-allowed" : "hover:bg-gray-100"}
                          ${isSelected ? "bg-black text-white" : ""}
                          ${isInRange && !isSelected ? "bg-gray-200" : ""}
                          ${isToday && !isSelected ? "border border-black" : ""}
                        `}
                      >
                        {date.getDate()}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Next Month */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-8" />
                  <h3 className="text-lg font-semibold">
                    {monthNames[getNextMonth().getMonth()]} {getNextMonth().getFullYear()}
                  </h3>
                  <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-full">
                    <FaChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2">
                  {dayNames.map((day) => (
                    <div key={day} className="text-center text-xs font-medium text-gray-500 p-2">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {generateCalendarDays(getNextMonth()).map((date, index) => {
                    const isCurrentMonth = date.getMonth() === getNextMonth().getMonth();
                    const isToday = date.toDateString() === new Date().toDateString();
                    const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));
                    const isSelected = isDateSelected(date);
                    const isInRange = isDateInRange(date);

                    return (
                      <button
                        key={index}
                        onClick={() => !isPast && handleDateClick(date)}
                        disabled={isPast}
                        className={`
                          p-2 text-sm rounded-full relative
                          ${!isCurrentMonth ? "text-gray-300" : ""}
                          ${isPast ? "text-gray-300 cursor-not-allowed" : "hover:bg-gray-100"}
                          ${isSelected ? "bg-black text-white" : ""}
                          ${isInRange && !isSelected ? "bg-gray-200" : ""}
                          ${isToday && !isSelected ? "border border-black" : ""}
                        `}
                      >
                        {date.getDate()}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer with date range options */}
            <div className="flex justify-center mt-6 gap-2">
              {["Exact dates", "± 1 day", "± 2 days", "± 3 days", "± 7 days","± 14 days"].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setSelectedFlexDays(option);

                    // only update inputs if checkin is selected
                    if (selectedDates.checkin) {
                      setFormValues((prev) => ({
                        ...prev,
                        checkin: `${formatDate(selectedDates.checkin)} ${option}`,
                        checkout: selectedDates.checkout
                          ? `${formatDate(selectedDates.checkout)} ${option}`
                          : "",
                      }));
                    }
                  }}
                  className={`px-4 py-2 border rounded-full text-sm transition 
        ${selectedFlexDays === option
                      ? "border-black bg-gray-50"
                      : "border-gray-300 hover:border-black"}
      `}
                >
                  {option}
                </button>
              ))}
            </div>

          </>
        );

      case "months":
        return (
          <div className="py-4">
            <h3 className="text-lg font-semibold mb-6 text-center">Stay for a month this year</h3>
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              {monthNames.map((month, index) => {
                const isPast = index < currentMonthIndex; // disable past months
                return (
                  <button
                    key={month}
                    onClick={() => !isPast && handleMonthSelect(month)}
                    disabled={isPast}
                    className={`
                p-4 border rounded-3xl text-center transition duration-200
                ${isPast
                        ? "border-gray-200 text-gray-400 cursor-not-allowed"
                        : selectedMonth === month
                          ? "border-black bg-gray-50"
                          : "border-gray-300 hover:border-gray-400"}
              `}
                  >
                    <div className="font-medium">{month}</div>
                  </button>
                );
              })}
            </div>
          </div>
        );


      case "flexible":
        return (
          <div className="py-4">
            <h3 className="text-lg font-semibold mb-2 text-center">How long would you like to stay?</h3>
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              {flexibleOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handleFlexibleSelect(option)}
                  className={`
                    p-3 border rounded-3xl text-center transition duration-200
                    ${selectedFlexOption === option
                      ? "border-black bg-gray-50"
                      : "border-gray-300 hover:border-gray-400"
                    }
                  `}
                >
                  <div className="font-medium">{option}</div>
                </button>
              ))}
            </div>

            <div className="mt-8 text-center">
              <h4 className="font-medium mb-4">Go anytime this year</h4>
              <div className="flex justify-center gap-2 flex-wrap">
                {monthNames.map((month, index) => {
                  const isDisabled = index < currentMonthIndex;
                  const isCurrent = index === currentMonthIndex;

                  return (
                    <button
                      key={month}
                      type="button"
                      disabled={isDisabled}
                      onClick={() => !isDisabled && handleMonthSelect(month)}
                      className={`px-4 py-2 border rounded-full text-sm transition 
            ${isDisabled ? "border-gray-200 text-gray-400 cursor-not-allowed" : "border-gray-300 hover:border-black"}
            ${isCurrent && !isDisabled ? "font-semibold bg-gray-50" : ""}`}
                    >
                      {month}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-neutral-100">
      <div className="flex justify-center items-center pb-8 relative">
        <div
          className="flex items-center shadow-md border border-neutral-300 rounded-full bg-white px-2 py-2"
          ref={containerRef}
        >
          {fields.map((field) => (
            <div key={field.id} className="relative flex flex-col">
              <input
                id={field.id}
                type="text"
                value={formValues[field.id]}
                placeholder={field.placeholder}
                onFocus={() => {
                  setActiveField(field.id);
                  if (field.id === "checkin" || field.id === "checkout") {
                    setDateRange(field.id as "checkin" | "checkout");
                  }
                }}
                onChange={(e) =>
                  setFormValues({ ...formValues, [field.id]: e.target.value })
                }
                readOnly={["checkin", "checkout", "who"].includes(field.id)}
                className={`px-6 py-3 text-sm cursor-pointer outline-none border-none ${activeField === field.id
                  ? "bg-white rounded-full shadow-sm"
                  : "hover:bg-gray-100 hover:rounded-full"
                  }`}
              />
            </div>
          ))}

          <button
            style={{
              background:
                "radial-gradient(circle at center,#FF385C 0%,#E61E4D 27.5%,#E31C5F 40%,#D70466 55.5%,#BD1E59 75%,#BD1E59 100%)",
            }}
            className="flex items-center gap-2 text-white px-5 py-3 rounded-3xl font-semibold shadow-md hover:opacity-90 transition duration-300 ml-2"
          >
            <FaSearch className="text-white text-lg" />
            {activeField && <span>Search</span>}
          </button>

          {/* Destinations Dropdown */}
          {activeField === "where" && destinationData.length > 0 && (
            <div className="absolute top-[70px] left-50 w-[450px] bg-white rounded-2xl shadow-lg p-4 z-50 max-h-92 overflow-y-auto">
              <p className="text-sm font-semibold text-gray-600 mb-3">
                Suggested destinations
              </p>
              <ul className="grid grid-cols-1 gap-2">
                {destinationData.map((dest) => (
                  <li
                    key={dest.location}
                    onClick={() => handleSelectDestination(dest)}
                    className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 rounded-lg p-2 transition"
                  >
                    <img
                      src={dest.img}
                      alt={dest.location}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium">{dest.location}</p>
                      <p className="text-xs text-gray-500">{dest.subtitle}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Guest Selection Dropdown */}
          {activeField === "who" && (
            <div className="absolute top-[70px] right-50 w-[400px] bg-white rounded-2xl shadow-lg p-6 z-50">
              <div className="space-y-6">
                {guestTypes.map((guestType) => (
                  <div key={guestType.key} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{guestType.title}</div>
                      <div className="text-sm text-gray-500">{guestType.subtitle}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateGuestCount(guestType.key, false)}
                        disabled={guestCounts[guestType.key] <= guestType.min}
                        className={`w-8 h-8 rounded-full border flex items-center justify-center transition ${guestCounts[guestType.key] <= guestType.min
                          ? "border-gray-300 text-gray-300 cursor-not-allowed"
                          : "border-gray-400 text-gray-600 hover:border-gray-600"
                          }`}
                      >
                        <FaMinus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center font-medium">
                        {guestCounts[guestType.key]}
                      </span>
                      <button
                        onClick={() => updateGuestCount(guestType.key, true)}
                        className="w-8 h-8 rounded-full border border-gray-400 text-gray-600 hover:border-gray-600 flex items-center justify-center transition"
                      >
                        <FaPlus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {guestTypes[3].key === "pets" && guestCounts.pets > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button className="text-sm text-gray-600 underline hover:text-gray-800">
                    Bringing a service animal?
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Calendar Dropdown */}
          {(activeField === "checkin" || activeField === "checkout") && (
            <div className="absolute top-[60px] left-0 w-[700px] bg-white rounded-2xl shadow-lg p-6 z-50">
              {/* Header with tabs */}
              <div className="flex justify-center mb-6">
                <div className="flex bg-gray-100 rounded-full p-1">
                  <button
                    onClick={() => setActiveDateTab("dates")}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition ${activeDateTab === "dates"
                      ? "bg-white shadow-sm text-black"
                      : "text-gray-500 hover:text-gray-700"
                      }`}
                  >
                    Dates
                  </button>
                  <button
                    onClick={() => setActiveDateTab("months")}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition ${activeDateTab === "months"
                      ? "bg-white shadow-sm text-black"
                      : "text-gray-500 hover:text-gray-700"
                      }`}
                  >
                    Months
                  </button>
                  <button
                    onClick={() => setActiveDateTab("flexible")}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition ${activeDateTab === "flexible"
                      ? "bg-white shadow-sm text-black"
                      : "text-gray-500 hover:text-gray-700"
                      }`}
                  >
                    Flexible
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              {renderDateTabContent()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;