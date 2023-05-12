import Dobrodosli from "./dobrodosli";
import Sidebar from "./sidebar"
import '../App.css'

export default function Main() {
    return (
      <>
        <div className="text-center">
            <Dobrodosli />
            <Sidebar />
        </div>
      </>
    );
  }