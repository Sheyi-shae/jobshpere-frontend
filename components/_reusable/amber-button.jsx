

//reusable/amber-button.jsx
import { Button } from "@/components/ui/button";


export default function AmberButton({ name,isPending,isPendingName, type }) {
  return (
    <>
    {isPending ? (
       <Button disabled={isPending} className="w-full flex  bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold py-3">
               {/* loading arc spinner */}
               <span className="animate-spin rounded-full h-6 w-6 border-b-2 border-slate-900 mr-2"/>
                {isPendingName || "Loading..."}
              </Button>
    ) : (
      <Button type={type} className="w-full  bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold py-3">
        {name}
      </Button>
    )}
    
    </>
   
  );
}

export  function BlueButton({ name,isPending,isPendingName, type }) {
  return (
    <>
    {isPending ? (
       <Button disabled={isPending} type={type} className=" bg-blue-950 hover:bg-blue-900 text-slate-50 font-semibold py-3">
               {/* loading arc spinner */}
               <span className="animate-spin rounded-full h-6 w-6 border-b-2 border-slate-900 mr-2"/>
                {isPendingName || "Loading..."}
              </Button>
    ) : (
      <Button type={type} className=" bg-blue-950 hover:bg-blue-900 text-slate-50 font-semibold py-3">
        {name}
      </Button>
    )}
    
    </>
   
  );
}