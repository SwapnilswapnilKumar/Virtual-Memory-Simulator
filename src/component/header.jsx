import React from "react";
import { HelpModal } from "./modal";

const Header = ({
  handleRefChange,
  handleFrameChange,
  handleRefStringGenClick,
  handleSwapToggle,
  handleAnimationToggle,
  frameNumber,
  referenceInputTextField,
  animationToggle,
  swapToggle,
}) => {
  return (
    <div className="p-6 bg-white space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold text-center">Virtual Memory Simulator</h1>
        <p className="text-gray-600 mt-1 text-center">Developed by Swapnil</p>
      </div>

      {/* Input Section */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-gray-700 mb-1" title="Enter reference string 0~9 separated with ','">
            Reference String
          </label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Reference string [0-9] separated with ','"
            value={referenceInputTextField}
            onChange={handleRefChange}
          />
        </div>

        <div className="flex-1 md:w-1/6">
          <label className="block text-gray-700 mb-1" title="Enter number 3~7">
            Frame Number
          </label>
          <input
            type="number"
            min="3"
            max="7"
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Frame number [3-7]"
            value={frameNumber}
            onChange={handleFrameChange}
          />
        </div>
      </div>

      {/* Buttons Section */}
      <div className="flex flex-col md:flex-row gap-2">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          onClick={handleRefStringGenClick}
        >
          Generate String
        </button>

        <button
          className={`px-4 py-2 rounded transition ${
            !swapToggle ? "bg-blue-500 text-white hover:bg-blue-600" : "border border-blue-500 text-blue-700 hover:bg-blue-100"
          }`}
          onClick={handleSwapToggle}
        >
          {swapToggle ? "Hide swapped memory" : "Show swapped memory"}
        </button>

        <button
          className={`px-4 py-2 rounded transition ${
            !animationToggle ? "bg-blue-500 text-white hover:bg-blue-600" : "border border-blue-500 text-blue-700 hover:bg-blue-100"
          }`}
          onClick={handleAnimationToggle}
        >
          {animationToggle ? "Turn off animation" : "Turn on animation"}
        </button>
      </div>

      <HelpModal />
    </div>
  );
};

export default Header;
