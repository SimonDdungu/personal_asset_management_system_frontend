import Image from "next/image";
import Physical_AssetForm from "../views/physical_assets/features/Physical_AssetForm";
import ElectronicsView from "../views/physical_assets/Electronics/ElectronicsView";
import RealEstateView from "../views/physical_assets/Real_Estate/RealEstateView";

export default function Home() {
  return (
    <div >
     <RealEstateView />
    </div>
  );
}
