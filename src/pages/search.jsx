
import SearchGridItem from "@/components/search/SearchGridItem";
import { SEARCH_GIGS_ROUTE } from "../utils/constants";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
function Search() {
  const router = useRouter();
  const { category, q } = router.query;
  const [gigs, setGigs] = useState(undefined);
  useEffect(() => {
    const getData = async () => {
      try {
        const {
          data: { gigs },
        } = await axios.get(
          `${SEARCH_GIGS_ROUTE}?searchTerm=${q}&category=${category}`
        );
        setGigs(gigs);
      } catch (err) {
        console.error(err);
      }
    };
    if (category || q) getData();
  }, [category, q]);
  return (
    <>
      {gigs && (
        <div className="py-10 px-24  dark:bg-gray-800 dark:text-gray-200">
          {q && (
            <h3 className="text-4xl mb-10 ">
              Results for <strong>{q}</strong>
            </h3>
          )}
        
          <div>
            <div className="my-4 ">
              <span className="text-[#73757c] font-medium  dark:text-gray-200 ">
                {gigs.length} services available
              </span>
            </div>
            <div className="grid grid-cols-4 ">
              {gigs.map((gig) => (
                <SearchGridItem gig={gig} key={gig.id} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Search;