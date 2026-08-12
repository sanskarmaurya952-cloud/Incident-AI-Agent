import { FaRobot, FaBrain, FaCheckCircle } from "react-icons/fa";

function AnalysisModal({
  open,
  onClose,
  analysis,
  memoryUsed = false,
}) {
  if (!open || !analysis) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">

      <div className="bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl p-8 w-[750px] max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">

          <div className="flex items-center gap-3">
            <FaRobot className="text-cyan-400 text-3xl" />

            <h2 className="text-3xl font-bold">
              AI Incident Analysis
            </h2>
          </div>

          <button
            onClick={onClose}
            className="text-red-400 hover:text-red-500 text-xl"
          >
            ✕
          </button>

        </div>

        {/* Summary */}

        <div className="mb-6">
          <h3 className="font-semibold text-cyan-400 mb-2">
            Summary
          </h3>

          <p className="text-slate-300">
            {analysis.summary}
          </p>
        </div>

        {/* Root Cause */}

        <div className="mb-6">
          <h3 className="font-semibold text-cyan-400 mb-2">
            Root Cause
          </h3>

          <p className="text-slate-300">
            {analysis.root_cause}
          </p>
        </div>

        {/* Recommended */}

        <div className="mb-6">
          <h3 className="font-semibold text-cyan-400 mb-2">
            Recommended Actions
          </h3>

          <ul className="space-y-2">
            {analysis.recommended_action?.map((item, index) => (
              <li
                key={index}
                className="flex gap-2"
              >
                <FaCheckCircle className="text-green-400 mt-1" />

                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Prevention */}

        <div className="mb-6">
          <h3 className="font-semibold text-cyan-400 mb-2">
            Prevention
          </h3>

          <ul className="space-y-2">
            {analysis.prevention?.map((item, index) => (
              <li
                key={index}
                className="flex gap-2"
              >
                <FaCheckCircle className="text-green-400 mt-1" />

                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Cards */}

        <div className="grid grid-cols-2 gap-4 mt-8">

          <div className="bg-slate-800 rounded-xl p-5">

            <p className="text-slate-400">
              Confidence
            </p>

            <h2 className="text-3xl text-green-400 font-bold">
              {(analysis.confidence * 100).toFixed(0)}%
            </h2>

          </div>

          <div className="bg-slate-800 rounded-xl p-5">

            <div className="flex items-center gap-2">

              <FaBrain className="text-cyan-400" />

              <p className="text-slate-400">
                Hindsight Memory
              </p>

            </div>

            <h2 className="text-3xl font-bold text-cyan-400">
              {memoryUsed ? "YES" : "NO"}
            </h2>

          </div>

        </div>

        <button
          onClick={onClose}
          className="w-full mt-8 bg-cyan-500 hover:bg-cyan-600 transition rounded-lg py-3 font-semibold"
        >
          Close
        </button>

      </div>

    </div>
  );
}

export default AnalysisModal;