

const CourseCard = (props) => {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg  duration-300 hover:-translate-y-1 transition-all">
      <p className="text-3xl mb-3">{props.logo}</p>
      <p className="bg-pink-100 text-pink-700 text-sm px-3 py-1 rounded-md inline-block mb-3">
  {props.level}
</p>
      <h2 className="font-bold text-[#42213D] text-2xl ">{props.title}</h2>
      <p className="text-[#65545F] text-base mt-2 ">{props.description}</p>
      <p className="text-sm text-gray-500 mt-4">
  📚 {props.lessons} lessons
</p>
<button onClick={props.onExplore} className="mt-4 w-full rounded-lg bg-pink-600 px-4 py-2 font-semibold text-white hover:bg-pink-700 transition-colors">
  {props.isSelected ? "Course Selected ✓" : "Explore Course"}

</button>
  {props.isSelected && (
  <p className="mt-3 text-sm font-semibold text-pink-600">
    You selected: {props.title} ✓
  </p>
)}
      
    </div>
  )
}

export default CourseCard
