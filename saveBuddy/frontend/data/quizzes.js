import VierStappen from "../assets/images/vier-stappen.svg";
import Reanimeren from "../assets/images/reanimeren.svg";
import Verslikking from "../assets/images/verslikking.svg";

export const quizzes = [
  {
    id: 1,
    slug: "quiz1",
    title: "Vier stappen in eerste hulp",
    Icon: VierStappen,
    image: require("../assets/images/vier-stappen-quiz.png"),
  },
  {
    id: 2,
    slug: "quiz2",
    title: "Reanimeren",
    Icon: Reanimeren,
    image: require("../assets/images/reanimatie-quiz.png"),
  },
  {
    id: 3,
    slug: "quiz3",
    title: "Verslikking",
    Icon: Verslikking,
    image: require("../assets/images/verslikking-quiz.png"),
  },
];