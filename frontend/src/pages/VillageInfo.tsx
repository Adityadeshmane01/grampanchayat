import { NavigationHeader } from "@/components/NavigationHeader";
import React from "react";

const villageStats = [
  { label: "Total Population", value: "1,464", color: "text-orange-500", icon: "👥" },
  { label: "Households", value: "279", color: "text-sky-500", icon: "🏠" },
  { label: "Literacy Rate", value: "83.23%", color: "text-orange-500", icon: "🏫" },
  { label: "Health Centers", value: "3", color: "text-sky-500", icon: "💙" },
];

const tableData = {
  en: [
    { label: "Total No. of Houses", total: "279", male: "-", female: "-" },
    { label: "Population", total: "1,464", male: "767", female: "697" },
    { label: "Child (0-6)", total: "176", male: "108", female: "68" },
    { label: "Schedule Caste", total: "154", male: "80", female: "74" },
    { label: "Schedule Tribe", total: "539", male: "278", female: "261" },
    { label: "Literacy", total: "83.23 %", male: "90.14 %", female: "75.99 %" },
    { label: "Total Workers", total: "903", male: "454", female: "449" },
    { label: "Main Worker", total: "844", male: "-", female: "-" },
    { label: "Marginal Worker", total: "59", male: "32", female: "27" },
  ],
  mr: [
     { label: "एकूण घरांची संख्या", total: "२७९", male: "-", female: "-" },
    { label: "लोकसंख्या", total: "१,४६४", male: "७६७", female: "६९७" },
    { label: "बालक (०-६)", total: "१७६", male: "१०८", female: "६८" },
    { label: "अनुसूचित जाती", total: "१५४", male: "८०", female: "७४" },
    { label: "अनुसूचित जमाती", total: "५३९", male: "२७८", female: "२६१" },
    { label: "साक्षरता", total: "८३.२३ %", male: "९०.१४ %", female: "७५.९९ %" },
    { label: "एकूण कामगार", total: "९०३", male: "४५४", female: "४४९" },
    { label: "मुख्य कामगार", total: "८४४", male: "-", female: "-" },
    { label: "सीमांत कामगार", total: "५९", male: "३२", female: "२७" },
  ],
};

const taxTableData = {
  en: {
    heading: "Grampanchayat Tax Information",
    columns: {
      serialNo: "Serial No.",
      taxType: "Tax Type",
      previousYear: "Previous Year (Rs)",
      currentYear: "Current Year (Rs)",
      total: "Total (Rs)",
    },
    rows: [
      {
        serialNo: "01",
        taxType: "Property Tax",
        previousYear: "54,942",
        currentYear: "1,40,745",
        total: "1,95,683",
      },
      {
        serialNo: "02",
        taxType: "Sanitation/Cleaning Tax",
        previousYear: "70",
        currentYear: "565",
        total: "635",
      },
      {
        serialNo: "03",
        taxType: "Street Lighting Tax",
        previousYear: "70",
        currentYear: "565",
        total: "635",
      },
      {
        serialNo: "",
        taxType: "TOTAL:",
        previousYear: "55,082",
        currentYear: "1,41,875",
        total: "1,96,953",
      },
    ],
  },
  mr: {
    heading: "ग्रामपंचायत कर माहिती",
    columns: {
      serialNo: "अ.नं.",
      taxType: "कराचा प्रकार",
      previousYear: "मागील",
      currentYear: "चालू",
      total: "एकूण",
    },
    rows: [
      {
        serialNo: "०१",
        taxType: "घरपट्टी",
        previousYear: "५४९४२",
        currentYear: "१४०७४५",
        total: "१९५६९३",
      },
      {
        serialNo: "०२",
        taxType: "सफाईपट्टी",
        previousYear: "७०",
        currentYear: "५६५",
        total: "६३५",
      },
      {
        serialNo: "०३",
        taxType: "दिवाबत्ती",
        previousYear: "७०",
        currentYear: "५६५",
        total: "६३५",
      },
      {
        serialNo: "",
        taxType: "एकूण",
        previousYear: "५५०८२",
        currentYear: "१४२३३५",
        total: "१९६८२३",
      },
    ],
  },
};

interface LanguageProps {
  language: string;
  setLanguage: (s: "en" | "mr") => void;
}

export default function VillageInfo({ language, setLanguage }: LanguageProps) {
  const t = tableData[language as keyof typeof tableData];
  const taxT = taxTableData[language as keyof typeof taxTableData];

  return (
    <>
      <NavigationHeader language={language} onLanguageChange={setLanguage} />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-2">
          Village Statistics
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Our village is a thriving community with rich cultural heritage and
          modern amenities. We are committed to sustainable development and
          improving the quality of life for all residents.
        </p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {villageStats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-lg shadow border border-orange-100 p-6 flex flex-col items-start"
            >
              <span className="text-2xl mb-2">{stat.icon}</span>
              <span className="font-semibold text-gray-700">{stat.label}</span>
              <span
                className={`text-3xl font-bold mt-2 ${stat.color}`}
              >
                {stat.value}
              </span>
            </div>
          ))}
        </div>

        {/* Table */}
        <h2 className="text-xl font-semibold text-blue-900 mb-4">
          Bramhangaon Vanas Data
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow border border-blue-100">
            <thead>
              <tr className="bg-green-600 text-white">
                <th className="py-3 px-4 text-left rounded-tl-lg">Particulars</th>
                <th className="py-3 px-4 text-left">Total</th>
                <th className="py-3 px-4 text-left">Male</th>
                <th className="py-3 px-4 text-left rounded-tr-lg">Female</th>
              </tr>
            </thead>
            <tbody>
              {t.map((row, idx) => (
                <tr
                  key={row.label}
                  className={idx % 2 === 0 ? "bg-blue-50" : "bg-white"}
                >
                  <td className="py-2 px-4 font-medium text-gray-700">
                    {row.label}
                  </td>
                  <td className="py-2 px-4">{row.total}</td>
                  <td className="py-2 px-4">{row.male}</td>
                  <td className="py-2 px-4">{row.female}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h2 className="text-xl font-semibold text-blue-900 mt-10 mb-4">
          {taxT.heading}
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow border border-blue-100">
            <thead>
              <tr className="bg-green-600 text-white">
                <th className="py-3 px-4 text-left rounded-tl-lg">
                  {taxT.columns.serialNo}
                </th>
                <th className="py-3 px-4 text-left">{taxT.columns.taxType}</th>
                <th className="py-3 px-4 text-left">
                  {taxT.columns.previousYear}
                </th>
                <th className="py-3 px-4 text-left">
                  {taxT.columns.currentYear}
                </th>
                <th className="py-3 px-4 text-left rounded-tr-lg">
                  {taxT.columns.total}
                </th>
              </tr>
            </thead>
            <tbody>
              {taxT.rows.map((row, idx) => (
                <tr
                  key={`${row.taxType}-${idx}`}
                  className={idx % 2 === 0 ? "bg-blue-50" : "bg-white"}
                >
                  <td className="py-2 px-4 font-medium text-gray-700">
                    {row.serialNo}
                  </td>
                  <td className="py-2 px-4 font-medium text-gray-700">
                    {row.taxType}
                  </td>
                  <td className="py-2 px-4 font-semibold">{row.previousYear}</td>
                  <td className="py-2 px-4 font-semibold">{row.currentYear}</td>
                  <td className="py-2 px-4 font-semibold">{row.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
