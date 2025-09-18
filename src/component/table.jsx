import React from "react";
import _ from "lodash";
import { motion } from "framer-motion";
import { useState } from "react";

const Table = ({
    referenceString,
    frameNumber,
    algorithmLabel,
    algorithm,
    colorMap,
    resetTurns,
    swapToggle,
    animationToggle
}) => {

    const [showDetails, setShowDetails] = useState(false);

    const { pageInMemArray, pageFaults, pageNotInMemArray } = algorithm(
        referenceString,
        frameNumber,
        resetTurns
    );

    const frameNumberArray = _.range(0, frameNumber, 1);

    const fadeRightVariant = {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0 }
    };

    const totalFaults = pageFaults.filter((p) => p === "F").length;
    const totalHits = pageFaults.length - totalFaults;
    const totalRequests = pageFaults.length;

    const faultRatio = (totalFaults / totalRequests).toFixed(2);
    const hitRatio = (totalHits / totalRequests).toFixed(2);


    return (
        <div>
            <div className="flex items-center gap-2">
                <label className="font-bold text-xl bg-yellow-300 px-2 py-1 rounded">
                    {algorithmLabel}:
                </label>
                <button
                    onClick={() => setShowDetails(true)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                >
                    Get Details
                </button>
            </div>

            {showDetails && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                        <h2 className="text-lg font-bold mb-4 text-center">{algorithmLabel} - Details</h2>
                        <p className="mb-2">Page Faults: <span className="font-semibold">{totalFaults}</span></p>
                        <p className="mb-2">Page Hits: <span className="font-semibold">{totalHits}</span></p>
                        <p className="mb-2">Fault Ratio: <span className="font-semibold">{faultRatio}</span></p>
                        <p className="mb-2">Hit Ratio: <span className="font-semibold">{hitRatio}</span></p>

                        <div className="flex justify-center mt-4">
                            <button
                                onClick={() => setShowDetails(false)}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="overflow-auto mb-10">
                <table className="min-w-full border border-gray-300 text-sm">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="px-2 py-1 border border-gray-300 text-center">Reference:</th>
                            {referenceString.map((r, idx) =>
                                animationToggle ? (
                                    <motion.th
                                        key={idx}
                                        className="px-2 py-1 border border-gray-300 text-center"
                                        initial="hidden"
                                        animate="visible"
                                        variants={fadeRightVariant}
                                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                                    >
                                        {r}
                                    </motion.th>
                                ) : (
                                    <th
                                        key={idx}
                                        className="px-2 py-1 border border-gray-300 text-center"
                                    >
                                        {r}
                                    </th>
                                )
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {frameNumberArray.map((f) => (
                            <tr key={`inMem-${f}`}>
                                <th className="px-2 py-1 border border-gray-300"></th>
                                {pageInMemArray.map((r, index) =>
                                    animationToggle ? (
                                        <motion.th
                                            key={`${index}-${f}`}
                                            className={`${colorMap.get(r[f])} px-2 py-1 border border-gray-300 text-center`}
                                            initial="hidden"
                                            animate="visible"
                                            variants={fadeRightVariant}
                                            transition={{ duration: 0.3, delay: index * 0.05 }}
                                        >
                                            {r[f]}
                                        </motion.th>
                                    ) : (
                                        <th
                                            key={`${index}-${f}`}
                                            className={`${colorMap.get(r[f])} px-2 py-1 border border-gray-300 text-center`}
                                        >
                                            {r[f]}
                                        </th>
                                    )
                                )}
                            </tr>
                        ))}
                        {swapToggle &&
                            frameNumberArray.map((f) => (
                                <tr key={`swap-${f}`} className="bg-gray-100">
                                    <th className="px-2 py-1 border border-gray-300"></th>
                                    {pageNotInMemArray.map((r, idx) =>
                                        animationToggle ? (
                                            <motion.th
                                                key={`${idx}-${f}`}
                                                className="px-2 py-1 border border-gray-300 text-center"
                                                initial="hidden"
                                                animate="visible"
                                                variants={fadeRightVariant}
                                                transition={{ duration: 0.3, delay: idx * 0.05 }}
                                            >
                                                {r[f]}
                                            </motion.th>
                                        ) : (
                                            <th
                                                key={`${idx}-${f}`}
                                                className="px-2 py-1 border border-gray-300 text-center"
                                            >
                                                {r[f]}
                                            </th>
                                        )
                                    )}
                                </tr>
                            ))}
                        <tr className="bg-gray-800 text-white">
                            <th className="px-2 py-1 border border-gray-300 text-center">Page Fault:</th>
                            {pageFaults.map((f, idx) =>
                                animationToggle ? (
                                    <motion.th
                                        key={idx}
                                        className={`px-2 py-1 border border-gray-300 text-center ${f === "F" ? "text-red-500" : f === "H" ? "text-green-500 text-lg font-bold" : ""
                                            }`}
                                        initial="hidden"
                                        animate="visible"
                                        variants={fadeRightVariant}
                                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                                    >
                                        {f}
                                    </motion.th>
                                ) : (
                                    <th
                                        key={idx}
                                        className={`px-2 py-1 border border-gray-300 text-center ${f === "F" ? "text-red-500" : f === "H" ? "text-green-500 text-lg font-bold" : ""
                                            }`}
                                    >
                                        {f}
                                    </th>
                                )
                            )}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;
