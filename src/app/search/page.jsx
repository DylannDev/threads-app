import ConnectedLayout from "@/components/ConnectedLayout/ConnectedLayout";
import React from "react";

export default function Search() {
  return (
    <ConnectedLayout>
      <div className="mt-10 md:w-[700px] mx-auto w-full">
        <form>
          <input type="search" placeholder="Rechercher" className="input " />
        </form>

        <div className="mt-32 text-center text-threads-gray-light">
          Recherchez des profils à découvrir
        </div>
      </div>
    </ConnectedLayout>
  );
}
