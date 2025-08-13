import React, { useState } from "react";

export function HelpModal() {
    const [show, setShow] = useState(false);

    return (
        <>
            <button
                className="bg-blue-600 text-white px-4 py-2 rounded mt-2 ml-2 hover:bg-blue-700"
                onClick={() => setShow(true)}
            >
                How To Use
            </button>

            {show && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg w-11/12 max-w-md p-5 shadow-lg">
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="text-xl font-semibold text-gray-800">Basic Usage</h2>
                            <button
                                className="text-gray-500 hover:text-gray-700 text-xl"
                                onClick={() => setShow(false)}
                            >
                                &times;
                            </button>
                        </div>

                        <div className="text-gray-700 space-y-2 text-sm mb-4 overflow-y-auto max-h-80">
                            <p>Reference String: Enter numbers [0-9] separated with commas</p>
                            <p>Frame Number: Enter number [3-7]</p>
                            <p>Generate String: Generate 24 random numbers</p>
                            <p>Show/Hide swapped out memory: Toggle illustration</p>
                            <p>Turn on/off animation: Toggle animation</p>
                            <p>Page Fault: 'F' indicates a page fault in a frame</p>
                        </div>

                        <div className="flex justify-end">
                            <button
                                className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                                onClick={() => setShow(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
