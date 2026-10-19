const LessonCard = (props) => {
  return (
    <div className="rounded-2xl border border-pink-200 bg-white p-5">
      <h2 className="text-xl font-bold text-[#42213D]">
        {props.title}
      </h2>

      <p className="mt-3 text-[#65545F]">
        {props.description}
      </p>
    </div>
  );
};

export default LessonCard;