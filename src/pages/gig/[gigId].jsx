import React, { useEffect } from "react";
import Pricing from "../../components/gigs/Pricing";
import Details from "../../components/gigs/Details";
import { useRouter } from "next/router";
import axios from "axios";
import {
  CHECK_USER_ORDERED_GIG_ROUTE,
  GET_GIG_DATA,
} from "../../utils/constants";
import { useStateProvider } from "../../context/StateContext";
import { reducerCases } from "../../context/constants";

function GigPage() {
  const router = useRouter();
  const { gigId } = router.query;
  const [{ gigData, userInfo }, dispatch] = useStateProvider();
  useEffect(() => {
    dispatch({ type: reducerCases.SET_GIG_DATA, gigData: undefined });
  }, [dispatch]);
  useEffect(() => {
    const fetchGigData = async () => {
      try {
        const {
          data: { gig },
        } = await axios.get(`${GET_GIG_DATA}/${gigId}`);
        dispatch({ type: reducerCases.SET_GIG_DATA, gigData: gig });
      } catch (err) {
        console.log(err);
      }
    };
    if (gigId) fetchGigData();
  }, [gigId, dispatch]);

  useEffect(() => {
    const checkGigOrdered = async () => {
      const {
        data: { hasUserOrderedGig },
      } = await axios.get(`${CHECK_USER_ORDERED_GIG_ROUTE}/${gigId}`, {
        withCredentials: true,
      });
      dispatch({
        type: reducerCases.HAS_USER_ORDERED_GIG,
        hasOrdered: hasUserOrderedGig,
      });
    };
    if (userInfo) {
      checkGigOrdered();
    }
  }, [dispatch, gigId, userInfo]);

  return (
    <div className="grid grid-cols-3 px-32 gap-20 dark:bg-gray-800">
      <Details />
      <Pricing />
    </div>
  );
}

export default GigPage;
