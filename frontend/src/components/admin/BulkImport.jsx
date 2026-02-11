import { useState } from "react";
import {
  importFromJSON,
  importFromCSV,
  readFileContent,
} from "../services/bulkImportService";
import {
  Upload,
  FileJson,
  FileSpreadsheet,
  X,
  AlertCircle,
  CheckCircle,
  Copy,
} from "lucide-react";
import React from 'react';


const BulkImport = ({ onClose, onSuccess }) => {
  const [importType, setImportType] = useState("json");
  const [fileContent, setFileContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

const handleFileUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  try {
    setError("");
    const content = await readFileContent(file);

    // If JSON file, validate it
    if (importType === "json") {
      JSON.parse(content); // Validate JSON
    }

    setFileContent(content);
  } catch (err) {
    setError(`Failed to read file: ${err.message}`);
  }
};

  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData("text");
    setFileContent(pastedData);
  };

  const handleImport = async () => {
    if (!fileContent.trim()) {
      setError("Please provide data to import");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      let response;

      if (importType === "json") {
        const jsonData = JSON.parse(fileContent);
        const dataArray = Array.isArray(jsonData) ? jsonData : [jsonData];
        response = await importFromJSON(dataArray);
      } else if (importType === "csv") {
        response = await importFromCSV(fileContent);
      }

      setResult(response);

      if (response.success > 0) {
        setTimeout(() => {
          onSuccess();
        }, 2000);
      }
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Failed to import data. Please check the format.",
      );
    } finally {
      setLoading(false);
    }
  };

  const sampleJSON = `[
  {
    "name": "Eminem",
    "bio": "Marshall Bruce Mathers III, known professionally as Eminem...",
    "lyricism": "A+",
    "flow": "A+",
    "creativity": "A",
    "rhythm": "A",
    "longevity": "A+",
    "impact": "A+",
    "delivery": "A+",
    "storytelling": "A+",
    "overallTier": "S",
    "badges": ["Dictionary", "Lyrical Assassin", "Rap God"],
    "profileImageUrl": "https://example.com/eminem.jpg",
    "active": true
  },
  {
    "name": "Kendrick Lamar",
    "bio": "Kendrick Lamar Duckworth is an American rapper...",
    "lyricism": "A+",
    "flow": "A",
    "creativity": "A+",
    "rhythm": "A",
    "longevity": "A",
    "impact": "A+",
    "delivery": "A",
    "storytelling": "A+",
    "overallTier": "S",
    "badges": ["Storyteller", "Conscious King", "Pulitzer Winner"],
    "profileImageUrl": "https://example.com/kendrick.jpg",
    "active": true
  }
]`;

  const sampleCSV = `name,bio,lyricism,flow,creativity,rhythm,longevity,impact,delivery,storytelling,overallTier,badges,profileImageUrl
                    Eminem,Marshall Bruce Mathers III...,A+,A+,A,A,A+,A+,A+,A+,S,Dictionary;Lyrical Assassin;Rap God,https://example.com/eminem.jpg
                    Kendrick Lamar,Kendrick Lamar Duckworth...,A+,A,A+,A,A,A+,A,A+,S,Storyteller;Conscious King;Pulitzer Winner,https://example.com/kendrick.jpg
                    Tech N9ne,Aaron Dontez Yates...,A,A+,A,A+,A,B+,A+,B+,A,Chopper;Independent King;Speed Demon,https://example.com/tech.jpg`;

  const copySample = () => {
    const sample = importType === "json" ? sampleJSON : sampleCSV;
    navigator.clipboard.writeText(sample);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-gray-900 rounded-2xl max-w-6xl w-full border border-gray-800 my-8">
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Upload className="w-6 h-6" />
              Bulk Import Artists
            </h2>
            <p className="text-gray-400 mt-1">
              Upload JSON, CSV, or Excel files to quickly add multiple artists
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <div className="p-6">
          {/* Import Type Selector */}
          <div className="mb-6">
            <label className="block text-gray-400 mb-3 font-semibold">
              Import Format
            </label>
            <div className="flex gap-4">
              <button
                onClick={() => setImportType("json")}
                className={`flex-1 p-4 rounded-xl border-2 transition ${
                  importType === "json"
                    ? "border-yellow-500 bg-yellow-500/10"
                    : "border-gray-700 bg-gray-800 hover:border-gray-600"
                }`}
              >
                <FileJson className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                <div className="text-white font-bold">JSON</div>
                <div className="text-gray-400 text-sm">Paste JSON array</div>
              </button>

              <button
                onClick={() => setImportType("csv")}
                className={`flex-1 p-4 rounded-xl border-2 transition ${
                  importType === "csv"
                    ? "border-yellow-500 bg-yellow-500/10"
                    : "border-gray-700 bg-gray-800 hover:border-gray-600"
                }`}
              >
                <FileSpreadsheet className="w-8 h-8 mx-auto mb-2 text-green-500" />
                <div className="text-white font-bold">CSV / Excel</div>
                <div className="text-gray-400 text-sm">Upload or paste CSV</div>
              </button>
            </div>
          </div>

          {/* File Upload */}
          <div className="mb-6">
            <label className="block text-gray-400 mb-3 font-semibold">
              Upload File (Optional)
            </label>
            <input
              type="file"
              accept={importType === "json" ? ".json" : ".csv,.xlsx,.xls"}
              onChange={handleFileUpload}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-yellow-500 file:text-black file:font-semibold hover:file:bg-yellow-400"
            />
          </div>

          {/* Paste Area */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-gray-400 font-semibold">
                Or Paste Data Here
              </label>
              <button
                onClick={copySample}
                className="flex items-center gap-2 px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm text-gray-300 transition"
              >
                <Copy className="w-4 h-4" />
                Copy Sample
              </button>
            </div>
            <textarea
              value={fileContent}
              onChange={(e) => setFileContent(e.target.value)}
              onPaste={handlePaste}
              rows="12"
              placeholder={`Paste your ${importType.toUpperCase()} data here...`}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-yellow-500"
            />
          </div>

          {/* Sample Format */}
          <div className="mb-6 bg-gray-800 rounded-xl p-4 border border-gray-700">
            <h3 className="text-white font-bold mb-2">Sample Format:</h3>
            <pre className="text-gray-300 text-xs overflow-x-auto">
              {importType === "json" ? sampleJSON : sampleCSV}
            </pre>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>{error}</div>
            </div>
          )}

          {/* Result Display */}
          {result && (
            <div
              className={`mb-6 px-4 py-3 rounded-lg flex items-start gap-3 ${
                result.errors > 0
                  ? "bg-yellow-500/10 border border-yellow-500 text-yellow-500"
                  : "bg-green-500/10 border border-green-500 text-green-500"
              }`}
            >
              <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-bold mb-1">Import Complete!</div>
                <div className="text-sm">
                  Successfully imported: {result.success} artists
                  {result.errors > 0 && ` | Failed: ${result.errors} rows`}
                </div>
                {result.errorDetails && result.errorDetails.length > 0 && (
                  <details className="mt-2">
                    <summary className="cursor-pointer text-sm font-semibold">
                      View Errors
                    </summary>
                    <ul className="mt-2 text-xs space-y-1">
                      {result.errorDetails.map((err, idx) => (
                        <li key={idx}>• {err}</li>
                      ))}
                    </ul>
                  </details>
                )}
              </div>
            </div>
          )}

          {/* Format Notes */}
          <div className="mb-6 bg-blue-500/10 border border-blue-500 text-blue-400 px-4 py-3 rounded-lg text-sm">
            <strong>Note:</strong>{" "}
            {importType === "json"
              ? 'Badges should be an array of strings. All fields except "name" and "overallTier" are optional.'
              : "Use semicolons (;) to separate multiple badges. Headers must match the sample format."}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleImport}
              disabled={loading || !fileContent.trim()}
              className="flex-1 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  Importing...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  Import Artists
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkImport;
