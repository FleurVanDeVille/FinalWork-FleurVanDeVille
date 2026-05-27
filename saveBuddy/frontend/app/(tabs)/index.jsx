import { ScrollView } from "react-native";
import { lessen } from "../../data/lessons";
import LessonCard from "../../components/LessonCard";

export default function Home() {
  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
      }}
    >
      {lessen.map((lesson) => (
        <LessonCard
          key={lesson.id}
          lesson={lesson}
          Image={lesson.Image}
        />
      ))}
    </ScrollView>
  );
}