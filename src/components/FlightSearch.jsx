import React, { useState } from "react";
import { FaExchangeAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const tabsData = ["Flight", "Hotel", "Holiday", "Visa", "eSIM"];
const travellerOptions = [
  "1 Traveller, Economy",
  "2 Travellers, Economy",
  "1 Traveller, Business",
];

export default function FlightSearch() {
    const [fromCity, setFromCity] = useState("Dhaka");
    const [toCity, setToCity] = useState("Cox's Bazar");
    const [departureDate, setDepartureDate] = useState(new Date());
    const [returnDate, setReturnDate] = useState(new Date());
    const [travellerClass, setTravellerClass] = useState(travellerOptions[0]);
    const [fareType, setFareType] = useState("Regular Fare");
    const [flightType, setFlightType] = useState("One Way");

    const swapCities = () => {
        setFromCity((prev) => {
        const temp = toCity;
        setToCity(prev);
        return temp;
        });
    };

    return (
        <div className="mt-3 rounded-xl bg-white shadow-md p-6 w-full max-w-[960px]">
            <div className="mt-[10px] md:mt-1 flex gap-6 mb-5">
                {["One Way", "Round Way"].map((type) => (
                    <div
                    key={type}
                    className={`flex items-center gap-3 cursor-pointer px-4 py-2 rounded-full transition-all duration-200 ${
                        flightType === type
                        ? "bg-red-100 text-red-500 font-semibold shadow-md"
                        : "bg-red-100 text-red-500 hover:bg-red-200"
                    }`}
                    onClick={() => setFlightType(type)}
                    >
                    <div
                        className={`w-6 h-6 border-2 border-red-500 rounded-full flex items-center justify-center transition-all duration-200 ${
                        flightType === type ? "bg-red-500" : "bg-transparent"
                        }`}
                    ></div>
                    <span className="text-sm md:text-base">{type}</span>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                {/* From */}
                <div className="relative col-span-1">
                    <input
                    type="text"
                    value={fromCity}
                    onChange={(e) => setFromCity(e.target.value)}
                    placeholder="From"
                    className="w-full h-20 px-3 rounded-lg border bg-transparent font-medium placeholder:text-green-700"
                    style={{borderColor: "#290961", color: "#290961"}}
                    />
                    <p className="absolute top-1 left-3 text-xs" style={{color: "#290961"}}>From</p>
                </div>

                {/* To */}
                <div className="relative col-span-1">
                    <input
                    type="text"
                    value={toCity}
                    onChange={(e) => setToCity(e.target.value)}
                    placeholder="To"
                    className="w-full h-20 px-3 rounded-lg border bg-transparent text-green-900 font-medium placeholder:text-green-700"
                    style={{borderColor: "#290961", color: "#290961"}}
                    />
                    <p className="absolute top-1 left-3 text-xs" style={{color: "#290961"}}>To</p>
                    <button
                        className="absolute top-1 right-1 p-2"
                        style={{ color: "#290961"}}
                        onClick={swapCities}
                    >
                    <FaExchangeAlt />
                    </button>
                </div>

                {/* Dates */}
                <div className="col-span-1 md:col-span-2 flex gap-2">
                    <DatePicker
                    selected={departureDate}
                    onChange={(date) => setDepartureDate(date)}
                    className="w-full h-20 rounded-lg border px-5 text-green-900 text-center font-medium bg-transparent"
                    style={{borderColor: "#290961"}}
                    placeholderText="Departure"
                    />
                    <DatePicker
                    selected={returnDate}
                    onChange={(date) => setReturnDate(date)}
                    className="w-full h-20 rounded-lg border px-3 text-green-900 text-center font-medium bg-transparent"
                    style={{borderColor: "#290961"}}
                    placeholderText="Return"
                    />
                    
                </div>

                {/* Traveller & Class */}
                <div className="col-span-1 relative">
                    <select
                    value={travellerClass}
                    onChange={(e) => setTravellerClass(e.target.value)}
                    className="w-full h-20 rounded-lg border px-3 text-green-900 font-medium bg-green-100"
                    style={{borderColor: "#290961"}}
                    >
                    {travellerOptions.map((option) => (
                        <option key={option} value={option}>
                        {option}
                        </option>
                    ))}
                    </select>
                </div>

                {/* Search Button */}
                <div className="col-span-1 relative md:col-span-1">
                    <button className="w-full h-20 border rounded-lg text-white font-semibold hover:bg-blue-800 flex items-center justify-center gap-2" style={{backgroundColor: "#290961"}}>
                    Search
                    </button>
                </div>
            </div>
        </div>
    )
}