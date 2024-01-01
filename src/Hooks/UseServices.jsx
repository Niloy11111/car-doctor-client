import { useEffect, useState } from "react";
import { axiosSecure } from "./UseAxiosSecure";


const UseServices = (asc, search) => {
  const [services, setServices] = useState([]) ;

   useEffect(() => {
    axiosSecure(`services?sort=${asc?'asc':'desc'}&search=${search}`)
   .then(res => setServices(res.data) )
   }, [asc, search])

  return services
};

export default UseServices;