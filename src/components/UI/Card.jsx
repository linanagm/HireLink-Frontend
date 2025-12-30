
import starImage from '../../assets/images/shotting-star.svg'

export default function Card({ title, text }) {
  return (
    <div className="flex gap-6 bg-white p-6 ">
        <div className='w-1/12 h-1/12 p-3 px-3 bg-white  rounded-full shadow-md shadow-slate-300 '>
            <img src={starImage} className=' w-full h-full'/>
        </div>
        <div>
            <h3 className="font-semibold mb-2">{title}</h3>
            <p className="text-sm text-gray-600">{text}</p>
        </div>
      
    </div>
  );
}

