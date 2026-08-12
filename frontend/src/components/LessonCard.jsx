function LessonCard({ lesson }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-5">

      <h2 className="text-xl font-bold text-cyan-400">
        {lesson.incident_title}
      </h2>

      <div className="mt-4 space-y-3">

        <div>
          <p className="font-semibold text-yellow-400">
            AI Prediction
          </p>

          <p>{lesson.ai_prediction}</p>
        </div>

        <div>
          <p className="font-semibold text-green-400">
            Actual Resolution
          </p>

          <p>{lesson.actual_resolution}</p>
        </div>

        <div>
          <p className="font-semibold text-blue-400">
            Lesson Learned
          </p>

          <p>{lesson.lesson_learned}</p>
        </div>

        <div>
          <p className="font-semibold text-red-400">
            Prevention
          </p>

          <p>{lesson.prevention}</p>
        </div>

      </div>

    </div>
  );
}

export default LessonCard;