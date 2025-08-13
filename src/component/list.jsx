import React from "react";

const List = ({ algorithms, textProperty = "name", handleListChange, selectedAlgorithm }) => {
    return (
        <div className="flex justify-center mt-4">
            <ul className="bg-white rounded-lg shadow divide-y divide-gray-200 w-64">
                {algorithms.map((a) => (
                    <li key={a.name}>
                        <button
                            onClick={() => handleListChange(a)}
                            className={`w-full text-left px-4 py-2 transition-colors duration-200 ${
                                a.name === selectedAlgorithm.name
                                    ? "bg-blue-500 text-white"
                                    : "hover:bg-gray-100 text-gray-800"
                            }`}
                        >
                            {typeof a[textProperty] === "string" || typeof a[textProperty] === "number"
                                ? a[textProperty]
                                : JSON.stringify(a[textProperty])}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default List;
