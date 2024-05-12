import React, { useState } from "react";

const Calculator = () => {
  const [principal, setPrincipal] = useState("");
  const [fdRate, setFdRate] = useState(6);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState("");
  const [fDValue, setFDValue] = useState(null);
  const [mfValue, setMfValue] = useState(null);
  const [fdTax, setFdTax] = useState(null);
  const [mfTax, setMfTax] = useState(null);

  const taxRateFd = 22;
  const taxRateMfShortTerm = 15;
  const taxRateMfLongTerm = 10;

  const handleCalculate = (e) => {
    e.preventDefault();

    const principalAmt = parseFloat(principal);
    const fdReturnRate = parseFloat(fdRate) / 100;
    const mfReturnRate = parseFloat(rate) / 100;
    const time = parseFloat(years);

    if (
      !isNaN(principalAmt) &&
      !isNaN(mfReturnRate) &&
      !isNaN(fdReturnRate) &&
      !isNaN(time)
    ) {
      const FD = principalAmt * Math.pow(1 + fdReturnRate, time);
      setFDValue(FD.toFixed(2));
      const MF = principalAmt * Math.pow(1 + mfReturnRate ,  time);
      setMfValue(MF.toFixed(2));
      setFdTax(calculateTax(  FD - principalAmt, taxRateFd).toFixed(2));
      if (time >= 1) {
        setMfTax(calculateTax( MF - principalAmt, taxRateMfShortTerm).toFixed(2));
      } else {
        setMfTax(calculateTax( MF - principalAmt, taxRateMfLongTerm).toFixed(2));
      }
    } else {
      setMfValue(null);
    }
  };

  const calculateTax = (value, taxRate) => {
    return (value * taxRate) / 100;
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-600 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md animate-fadeIn">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Mutual Funds VS Fixed Deposit Return Calculator
        </h2>
        <form onSubmit={handleCalculate} className="space-y-6">
          <div>
            <label className="block mb-2 text-gray-700">Initial Investment Amount:</label>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-700">Annual Rate of Return FD (%):</label>
            <input
              type="range"
              min="0"
              max="20"
              step="0.1"
              value={fdRate}
              onChange={(e) => setFdRate(e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-center mt-2 text-gray-700">{fdRate}%</div>
          </div>
          <div>
            <label className="block mb-2 text-gray-700">Annual Rate of Return MF (%):</label>
            <input
              type="range"
              min="0"
              max="20"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-center mt-2 text-gray-700">{rate}%</div>
          </div>
          <div>
            <label className="block mb-2 text-gray-700">Number of Years:</label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Calculate
          </button>
        </form>
        {fDValue !== null && (
          <div className="mt-6 text-center animate-fadeIn">
            <h3 className="text-lg font-bold text-gray-800">FD Value: Rs. {fDValue}</h3>
            <h3 className="text-lg font-bold text-gray-800">FD Tax: Rs. {fdTax}</h3>
            <h3 className="text-lg font-bold text-gray-800">FD Actual Return: Rs. {(fDValue - fdTax).toFixed(2)}</h3>
          </div>
        )}
        {mfValue !== null && (
          <div className="mt-6 text-center animate-fadeIn">
            <h3 className="text-lg font-bold text-gray-800">MF Value: Rs. {mfValue}</h3>
            <h3 className="text-lg font-bold text-gray-800">MF Tax: Rs. {mfTax}</h3>
            <h3 className="text-lg font-bold text-gray-800">MF Actual Return: Rs. {(mfValue - mfTax).toFixed(2)}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculator;
