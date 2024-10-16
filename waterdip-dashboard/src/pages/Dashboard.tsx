import React, { useEffect, useState } from "react";
import { fetchData } from "../utils/fetchdata";
import { BookingData } from "../types/BookingData";
import TimeSeriesChart from "../components/TimeSeriesChart";
import CountryVisitorsChart from "../components/CountryVisitorsChart";
import AdultVisitorsSparkline from "../components/AdultVisitorsSparkline";
import ChildrenVisitorsSparkline from "../components/ChildrenVisitorsSparkline";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/Dashboard.css";

interface VisitorsData {
  date: string;
  visitors: number;
  adults: number;
  children: number;
  babies: number;
  country: string;
}

interface CountryVisitorsData {
  country: string;
  visitors: number;
}

const Dashboard = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date("2015-07-01"));
  const [endDate, setEndDate] = useState<Date | null>(new Date("2015-08-09"));
  const [visitorsPerDay, setVisitorsPerDay] = useState<VisitorsData[]>([]);
  const [visitorsByCountry, setVisitorsByCountry] = useState<CountryVisitorsData[]>([]);
  const [totalAdults, setTotalAdults] = useState<number>(0);
  const [totalChildren, setTotalChildren] = useState<number>(0);
  const [totalBabies, setTotalBabies] = useState<number>(0);

  useEffect(() => {
    fetchData()
      .then((data) => {
        console.log("Fetched Data:", data);
        const processedData = processBookingData(data);
        setVisitorsPerDay(processedData.visitorsPerDay);
        setVisitorsByCountry(processedData.visitorsByCountry);
        setTotalAdults(processedData.totalAdults);
        setTotalChildren(processedData.totalChildren);
        setTotalBabies(processedData.totalBabies);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const processBookingData = (data: BookingData[]) => {
    const visitorsPerDay: VisitorsData[] = [];
    const visitorsByCountry: { [key: string]: number } = {};
    let totalAdults = 0;
    let totalChildren = 0;
    let totalBabies = 0;

    data.forEach((booking) => {
      const date = new Date(
        `${booking.arrival_date_year}-${booking.arrival_date_month}-${booking.arrival_date_day_of_month}`
      );

      const totalVisitors = booking.adults + booking.children + booking.babies;

      visitorsPerDay.push({
        date: date.toISOString().split("T")[0], // Format as YYYY-MM-DD
        visitors: totalVisitors,
        adults: booking.adults,
        children: booking.children,
        babies: booking.babies,
        country: booking.country,
      });

      if (visitorsByCountry[booking.country]) {
        visitorsByCountry[booking.country] += totalVisitors;
      } else {
        visitorsByCountry[booking.country] = totalVisitors;
      }

      totalAdults += booking.adults;
      totalChildren += booking.children;
      totalBabies += booking.babies;
    });

    const visitorsByCountryArray = Object.keys(visitorsByCountry).map(
      (country) => ({
        country,
        visitors: visitorsByCountry[country],
      })
    );

    return {
      visitorsPerDay,
      visitorsByCountry: visitorsByCountryArray,
      totalAdults,
      totalChildren,
      totalBabies,
    };
  };

  const filteredVisitorsPerDay = visitorsPerDay.filter((visitor) => {
    const visitorDate = new Date(visitor.date);
    return (
      (!startDate || visitorDate >= startDate) &&
      (!endDate || visitorDate <= endDate)
    );
  });

  const filteredVisitorsByCountry = filteredVisitorsPerDay.reduce(
    (acc: { [key: string]: number }, visitor) => {
      if (acc[visitor.country]) {
        acc[visitor.country] += visitor.visitors;
      } else {
        acc[visitor.country] = visitor.visitors;
      }
      return acc;
    },
    {}
  );

  const filteredVisitorsByCountryArray = Object.keys(filteredVisitorsByCountry).map(
    (country) => ({
      country,
      visitors: filteredVisitorsByCountry[country],
    })
  );

  // Extract childrenData from visitorsPerDay for the children sparkline
  const childrenData = filteredVisitorsPerDay.map((item) => ({
    date: item.date,
    children: item.children,
  }));

  return (
    <div>
      <div className="date-picker-container">
        <label>Start Date:</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="MM/dd/yyyy"
        />
        <label>End Date:</label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          dateFormat="MM/dd/yyyy"
        />
      </div>

      <div className="container">
        <div className="chart">
          <h2>Time Series Chart</h2>
          <TimeSeriesChart data={filteredVisitorsPerDay} />
        </div>

        <div className="chart">
          <h2>Country Visitors Chart</h2>
          <CountryVisitorsChart data={filteredVisitorsByCountryArray} />
        </div>

        <div className="chart">
          <h2>Adult Visitors Sparkline</h2>
          <AdultVisitorsSparkline
  data={filteredVisitorsPerDay.map((item) => ({
    date: item.date,
    adults: item.adults,
  }))}
/>
        </div>

        <div className="chart">
          <h2>Children Visitors Sparkline</h2>
          <ChildrenVisitorsSparkline
            data={childrenData}
            totalChildren={totalChildren}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
