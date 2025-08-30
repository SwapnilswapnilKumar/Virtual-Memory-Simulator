import React from "react";
import _ from "lodash";
import { motion } from "framer-motion";

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

    return (
        <div>
            <label className="font-bold text-xl bg-yellow-300">{algorithmLabel}:</label>
            <div className="overflow-auto mt-2">
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
                                        className="px-2 py-1 border border-gray-300 text-center"
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
                                        className="px-2 py-1 border border-gray-300 text-center"
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
