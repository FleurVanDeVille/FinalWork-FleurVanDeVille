import ConnectExercise from "./ConnectExercise.jsx";
import DragDropCaseExercise from "./DragDropCaseExercise.jsx";
import DropdownExercise from "./DropdownExercise.jsx";
import InteractiveExercise from "./InteractiveExercise.jsx";
import MultipleChoiceExercise from "./MultipleChoiceExercise.jsx";
import OrderExercise from "./OrderExercise.jsx";
import SwipeExercise from "./SwipeExercise.jsx";
import TextInputExercise from "./TextInputExercise.jsx";

export default function ExerciseRenderer({
	exercise,
	selectedAnswer,
	setSelectedAnswer,
	orderAnswer,
	setOrderAnswer,
	connectAnswers,
	setConnectAnswers,
	textAnswer,
	setTextAnswer,
	dropdownAnswers,
	setDropdownAnswers,
	swipeCorrect,
	setSwipeCorrect,
	dragDropCorrectItems,
	setDragDropCorrectItems,
}) {
	switch (exercise.type) {
		case "drag-drop-koffer":
			return (
				<DragDropCaseExercise
					exercise={exercise}
					correctItems={dragDropCorrectItems}
					setCorrectItems={setDragDropCorrectItems}
				/>
			);

		case "meerkeuzevragen":
			return (
				<MultipleChoiceExercise
					exercise={exercise}
					selectedAnswer={selectedAnswer}
					setSelectedAnswer={setSelectedAnswer}
				/>
			);

		case "volgorde-oefening":
			return (
				<OrderExercise
					exercise={exercise}
					orderAnswer={orderAnswer}
					setOrderAnswer={setOrderAnswer}
				/>
			);

		case "tekst-input":
			return (
				<TextInputExercise
					exercise={exercise}
					textAnswer={textAnswer}
					setTextAnswer={setTextAnswer}
				/>
			);

		case "sleepoefeningen":
			return <DragDropExercise exercise={exercise} />;

		case "dropdown-oefening":
			return (
				<DropdownExercise
					exercise={exercise}
					dropdownAnswers={dropdownAnswers}
					setDropdownAnswers={setDropdownAnswers}
				/>
			);
		case "verbind-oefening":
			return (
				<ConnectExercise
					exercise={exercise}
					connectAnswers={connectAnswers}
					setConnectAnswers={setConnectAnswers}
				/>
			);

		case "interactieve-oefening":
			return <InteractiveExercise exercise={exercise} />;

		case "swipe-oefening":
			return (
				<SwipeExercise exercise={exercise} setSwipeCorrect={setSwipeCorrect} />
			);

		case "tekstinvoer-oefening":
			return <TextInputExercise exercise={exercise} />;

		default:
			return null;
	}
}
