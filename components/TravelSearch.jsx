'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

gsap.registerPlugin(useGSAP);

const TABS = ['Flight', 'Visa', 'Hotel', 'Holiday'];

const TRENDING_ROUTES = [
  { route: 'DOH → DAC', price: 'from ৳43,951', from: 'Doha', to: 'Dhaka' },
  { route: 'DAC → KUL', price: 'from ৳20,043', from: 'Dhaka', to: 'Kuala Lumpur' },
  { route: 'DAC → DXB', price: 'from ৳38,420', from: 'Dhaka', to: 'Dubai' },
];

const RECENT_SEARCHES = [
  { from: 'Dhaka', to: 'Delhi', date: 'Oct 13, 2026', travelers: '1 traveler' },
  { from: 'Dhaka', to: "Cox's Bazar", date: 'Oct 13, 2026', travelers: '1 traveler' },
];

const FIELD_CLASS =
  'mt-1.5 w-full rounded-xl border border-[#E4E4E7] bg-white px-3.5 py-3 text-[14px] font-medium text-[#18181B] outline-none transition-colors placeholder:text-[#A1A1AA] focus:border-[#71717A]';

function SearchField({ label, className = '', ...props }) {
  return (
    <label className={`block min-w-0 ${className}`}>
      <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#71717A]">
        {label}
      </span>
      <input className={FIELD_CLASS} {...props} />
    </label>
  );
}

function SelectField({ label, children, className = '', ...props }) {
  return (
    <label className={`block min-w-0 ${className}`}>
      <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#71717A]">
        {label}
      </span>
      <select className={FIELD_CLASS} {...props}>
        {children}
      </select>
    </label>
  );
}

export default function TravelSearch({ onSearch, className = '' }) {
  const rootRef = useRef(null);
  const panelRef = useRef(null);
  const resultRef = useRef(null);
  const [activeTab, setActiveTab] = useState('Flight');
  const [todayDate, setTodayDate] = useState('');
  const [tripType, setTripType] = useState('One way');
  const [origin, setOrigin] = useState('Dhaka');
  const [destination, setDestination] = useState("Cox's Bazar");
  const [departure, setDeparture] = useState('2026-11-27');
  const [returnDate, setReturnDate] = useState('2026-11-30');
  const [travelers, setTravelers] = useState('1');
  const [cabin, setCabin] = useState('Economy');
  const [visaCountry, setVisaCountry] = useState('');
  const [visaDate, setVisaDate] = useState('2026-11-27');
  const [visaType, setVisaType] = useState('Tourist');
  const [hotelCity, setHotelCity] = useState('');
  const [checkIn, setCheckIn] = useState('2026-11-27');
  const [checkOut, setCheckOut] = useState('2026-11-28');
  const [rooms, setRooms] = useState('1');
  const [holidayScope, setHolidayScope] = useState('Domestic');
  const [holidayDestination, setHolidayDestination] = useState('');
  const [holidayDate, setHolidayDate] = useState('2026-11-27');
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    const addDays = (days) => {
      const date = new Date();
      date.setDate(date.getDate() + days);
      return formatDate(date);
    };

    const frame = window.requestAnimationFrame(() => {
      setTodayDate(addDays(0));
      setDeparture(addDays(7));
      setReturnDate(addDays(10));
      setVisaDate(addDays(7));
      setCheckIn(addDays(7));
      setCheckOut(addDays(8));
      setHolidayDate(addDays(7));
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useGSAP(
    () => {
      if (!panelRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      gsap.fromTo(
        panelRef.current,
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.35, ease: 'power2.out' },
      );
    },
    { scope: rootRef, dependencies: [activeTab], revertOnUpdate: true },
  );

  useGSAP(
    () => {
      if (!resultRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      gsap.fromTo(
        resultRef.current,
        { autoAlpha: 0, y: 10, scale: 0.98 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.5)' },
      );
    },
    { scope: rootRef, dependencies: [searchResult], revertOnUpdate: true },
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload =
      activeTab === 'Flight'
        ? { tab: activeTab, tripType, from: origin, to: destination, departure, returnDate: tripType === 'Round trip' ? returnDate : null, travelers: Number(travelers), cabin }
        : activeTab === 'Visa'
          ? { tab: activeTab, country: visaCountry, visaType, date: visaDate, travelers: Number(travelers) }
          : activeTab === 'Hotel'
            ? { tab: activeTab, city: hotelCity, checkIn, checkOut, rooms: Number(rooms), guests: Number(travelers) }
            : { tab: activeTab, scope: holidayScope, destination: holidayDestination, date: holidayDate, travelers: Number(travelers) };

    setSearchResult(payload);
    onSearch?.(payload);
  };

  const setRoute = (route) => {
    setActiveTab('Flight');
    setOrigin(route.from);
    setDestination(route.to);
  };

  return (
    <section
      ref={rootRef}
      className={`@container w-full rounded-[24px] bg-[#FAFAFA] p-4 text-[#18181B] sm:p-6 ${className}`}
    >
      <div className="mx-auto max-w-[920px]">
        <div className="mb-5 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#71717A]">
            Make your next move
          </p>
          <h2 className="mt-1 text-[23px] font-semibold tracking-tight sm:text-[28px]">
            Where to next?
          </h2>
        </div>

        <div className="mb-[-1px] flex flex-wrap justify-center gap-1">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => {
                setActiveTab(tab);
                setSearchResult(null);
              }}
              aria-pressed={activeTab === tab}
              className={`rounded-t-xl px-4 py-2.5 text-[12px] font-semibold transition-colors sm:px-5 ${
                activeTab === tab
                  ? 'bg-[#18181B] text-white'
                  : 'text-[#71717A] hover:bg-[#E4E4E7] hover:text-[#18181B]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-[20px] border border-black/[0.05] bg-white p-4 shadow-[0_8px_28px_rgba(0,0,0,0.05)] sm:p-6"
        >
          <div ref={panelRef}>
            {activeTab === 'Flight' && (
              <>
                <div className="mb-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                  {['One way', 'Round trip'].map((type) => (
                    <label key={type} className="flex cursor-pointer items-center gap-2 text-[12px] text-[#52525B]">
                      <input
                        type="radio"
                        name="tripType"
                        value={type}
                        checked={tripType === type}
                        onChange={() => setTripType(type)}
                        className="accent-[#18181B]"
                      />
                      {type}
                    </label>
                  ))}
                </div>
                <div className="grid gap-3 @sm:grid-cols-2 @3xl:grid-cols-4">
                  <SearchField label="From" value={origin} onChange={(event) => setOrigin(event.target.value)} placeholder="City or airport" required />
                  <SearchField label="To" value={destination} onChange={(event) => setDestination(event.target.value)} placeholder="City or airport" required />
                  <SearchField label="Departure" type="date" min={todayDate} value={departure} onChange={(event) => setDeparture(event.target.value)} required />
                  {tripType === 'Round trip' ? (
                    <SearchField label="Return" type="date" min={departure} value={returnDate} onChange={(event) => setReturnDate(event.target.value)} required />
                  ) : (
                    <SelectField label="Cabin class" value={cabin} onChange={(event) => setCabin(event.target.value)}>
                      {['Economy', 'Premium economy', 'Business', 'First class'].map((option) => <option key={option}>{option}</option>)}
                    </SelectField>
                  )}
                  <SelectField label="Travelers" value={travelers} onChange={(event) => setTravelers(event.target.value)} className="sm:col-span-1">
                    {[1, 2, 3, 4, 5, 6].map((count) => <option key={count} value={count}>{count} {count === 1 ? 'traveler' : 'travelers'}</option>)}
                  </SelectField>
                </div>
              </>
            )}

            {activeTab === 'Visa' && (
              <div className="grid gap-3 @sm:grid-cols-2 @3xl:grid-cols-4">
                <SearchField label="Destination country" value={visaCountry} onChange={(event) => setVisaCountry(event.target.value)} placeholder="Where are you applying?" required />
                <SelectField label="Visa type" value={visaType} onChange={(event) => setVisaType(event.target.value)}>
                  {['Tourist', 'Business', 'Student', 'Transit'].map((option) => <option key={option}>{option}</option>)}
                </SelectField>
                <SearchField label="Travel date" type="date" min={todayDate} value={visaDate} onChange={(event) => setVisaDate(event.target.value)} required />
                <SelectField label="Applicants" value={travelers} onChange={(event) => setTravelers(event.target.value)}>
                  {[1, 2, 3, 4, 5, 6].map((count) => <option key={count} value={count}>{count} {count === 1 ? 'applicant' : 'applicants'}</option>)}
                </SelectField>
              </div>
            )}

            {activeTab === 'Hotel' && (
              <div className="grid gap-3 @sm:grid-cols-2 @3xl:grid-cols-4">
                <SearchField label="Destination" value={hotelCity} onChange={(event) => setHotelCity(event.target.value)} placeholder="City or hotel" required />
                <SearchField label="Check in" type="date" min={todayDate} value={checkIn} onChange={(event) => setCheckIn(event.target.value)} required />
                <SearchField label="Check out" type="date" min={checkIn} value={checkOut} onChange={(event) => setCheckOut(event.target.value)} required />
                <SelectField label="Guests / rooms" value={rooms} onChange={(event) => setRooms(event.target.value)}>
                  {['1', '2', '3', '4'].map((count) => <option key={count} value={count}>{count} {count === '1' ? 'room' : 'rooms'}</option>)}
                </SelectField>
              </div>
            )}

            {activeTab === 'Holiday' && (
              <div className="grid gap-3 @sm:grid-cols-2 @3xl:grid-cols-4">
                <SelectField label="Trip type" value={holidayScope} onChange={(event) => setHolidayScope(event.target.value)}>
                  <option>Domestic</option>
                  <option>International</option>
                </SelectField>
                <SearchField label="Destination" value={holidayDestination} onChange={(event) => setHolidayDestination(event.target.value)} placeholder="Where do you want to go?" required />
                <SearchField label="Travel date" type="date" min={todayDate} value={holidayDate} onChange={(event) => setHolidayDate(event.target.value)} required />
                <SelectField label="Travelers" value={travelers} onChange={(event) => setTravelers(event.target.value)}>
                  {[1, 2, 3, 4, 5, 6].map((count) => <option key={count} value={count}>{count} {count === 1 ? 'traveler' : 'travelers'}</option>)}
                </SelectField>
              </div>
            )}

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#F4F4F5] pt-4">
              <p className="text-[11px] text-[#71717A]">
                Flexible plans start with one good search.
              </p>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#18181B] px-5 py-2.5 text-[12px] font-semibold text-white transition-colors hover:bg-[#3F3F46] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#18181B]"
              >
                <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                Search {activeTab.toLowerCase()}
              </button>
            </div>
          </div>

          {searchResult && (
            <div
              ref={resultRef}
              role="status"
              className="mt-4 rounded-xl border border-[#E4E4E7] bg-[#FAFAFA] px-4 py-3 text-[12px] text-[#52525B]"
            >
              <span className="font-semibold text-[#18181B]">Search ready.</span>{' '}
              {searchResult.tab === 'Flight'
                ? `${searchResult.from} to ${searchResult.to} · ${searchResult.travelers} traveler${searchResult.travelers === 1 ? '' : 's'}`
                : searchResult.tab === 'Hotel'
                  ? `${searchResult.city} · ${searchResult.rooms} room${searchResult.rooms === 1 ? '' : 's'}`
                  : searchResult.tab === 'Visa'
                    ? `${searchResult.country} · ${searchResult.visaType} visa`
                    : `${searchResult.destination} · ${searchResult.scope} holiday`}
              <span className="text-[#71717A]"> — connect onSearch to your booking flow.</span>
            </div>
          )}
        </form>

        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between gap-2">
            <div>
              <h3 className="text-[12px] font-semibold text-[#18181B]">Trending routes</h3>
              <p className="text-[10px] text-[#71717A]">Popular fares to get you going</p>
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {TRENDING_ROUTES.map((route) => (
              <button
                key={route.route}
                type="button"
                onClick={() => setRoute(route)}
                className="flex shrink-0 items-center gap-2 rounded-full border border-black/[0.05] bg-white px-3 py-2 text-left transition-colors hover:border-[#A1A1AA]"
              >
                <span className="grid size-6 place-items-center rounded-full bg-[#F4F4F5] text-[#52525B]">
                  <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
                  </svg>
                </span>
                <span>
                  <span className="block text-[10px] font-semibold text-[#18181B]">{route.route}</span>
                  <span className="block text-[9px] text-[#71717A]">{route.price}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <h3 className="mb-2 text-[12px] font-semibold text-[#18181B]">Recent searches</h3>
          <div className="grid gap-2 sm:grid-cols-2">
            {RECENT_SEARCHES.map((search) => (
              <button
                key={`${search.from}-${search.to}`}
                type="button"
                onClick={() => {
                  setActiveTab('Flight');
                  setOrigin(search.from);
                  setDestination(search.to);
                }}
                className="flex items-center justify-between gap-3 rounded-xl border border-black/[0.05] bg-white px-3 py-2.5 text-left transition-colors hover:border-[#A1A1AA]"
              >
                <span>
                  <span className="block text-[11px] font-semibold text-[#18181B]">{search.from} <span className="text-[#A1A1AA]">→</span> {search.to}</span>
                  <span className="mt-0.5 block text-[9px] text-[#71717A]">{search.date} · {search.travelers}</span>
                </span>
                <span aria-hidden="true" className="text-[#71717A]">↗</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
