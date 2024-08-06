import Image from "next/image";

interface CardProps {
  img: string;
  title: string;
  amount: number;
  description: string;
  onPayment: (price:number, itemName:string)=>void;
}

export const CardCompo = ({ img, title, amount, description, onPayment }: CardProps) => {
  return (
    <main className="m-2 radious-10">
      <div
        className={`h-[300px] w-[250px] rounded-t-lg px-4 bg-gray-900 flex flex-col justify-center`}
      >
        <div
          className={`relative h-[130px] w-full bg-gradient-to-r from-purple-500 to-green-400`}
        >
          {img && <Image src={img} layout="fill"  alt={title} loading="lazy" />}
        </div>
        <h2 className={`text-2xl font-bold text-white text-start w-full mt-2`}>
          {title}
        </h2>
        <div className="px-1 w-full">
          <p className="text-sm text-white/60 mt-1 text-start w-full">
            {description}
          </p>
          <div className="flex items-end justify-start gap-x-2 my-2">
            <p className="text-sm text-white/70 text-start w-full">Price:</p>
            
            <p className="text-lg text-white font-bold w-full">{amount}</p>
          </div>
        </div>
      </div>
      <button className={`relative h-[15%] rounded-b-lg w-full bg-gradient-to-r from-purple-500 to-green-400`} onClick={()=>onPayment(amount, title)}>Buy</button>
    </main>
  );
};
