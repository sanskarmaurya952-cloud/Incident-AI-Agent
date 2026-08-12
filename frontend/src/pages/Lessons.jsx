import { useEffect, useState } from "react";

import LessonCard from "../components/LessonCard";

import {
  getAllLessons,
} from "../api/lessonApi";

function Lessons() {

  const [lessons, setLessons] = useState([]);

  const loadLessons = async () => {

    const data = await getAllLessons();

    setLessons(data);

  };

  useEffect(() => {

    loadLessons();

  }, []);

  return (

    <div>

      <h1 className="text-3xl font-bold mb-8">
        Lessons Learned
      </h1>

      {

        lessons.map((lesson) => (

          <LessonCard
            key={lesson.id}
            lesson={lesson}
          />

        ))

      }

    </div>

  );

}

export default Lessons;