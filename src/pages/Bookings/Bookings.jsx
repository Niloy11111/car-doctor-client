import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import BookingRow from "./BookingRow";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import axios from "axios";

const Bookings = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const axiosSecure = UseAxiosSecure() ;

    // const url = `https://car-doctor-server-omega-rouge.vercel.app/bookings?email=${user?.email}`;
    const url = `/bookings?email=${user?.email}`;


    useEffect(() => {
        // fetch(url, {credentials : 'include'})
        //     .then(res => res.json())
        //     .then(data => setBookings(data))
        
        axiosSecure.get(url)
        .then(res => setBookings(res.data)) 
    }, [url, axiosSecure]);

    const handleDelete = id => {
        const proceed = confirm('Are You sure you want to delete');
        if (proceed) {
            axios.delete(`https://car-doctor-server-omega-rouge.vercel.app/bookings/${id}`)
            // fetch(`https://car-doctor-server-omega-rouge.vercel.app/bookings/${id}`, {
            //     method: 'DELETE'
            // })
                // .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.data.deletedCount > 0) {
                        alert('deleted successful');
                        const remaining = bookings.filter(booking => booking._id !== id);
                        setBookings(remaining);
                    }
                })
        }
    }

    const handleBookingConfirm = id => {
        // fetch(`https://car-doctor-server-omega-rouge.vercel.app/bookings/${id}`, {
        //     method: 'PUT',
        //     headers: {
        //         'content-type': 'application/json'
        //     },
        //     body: JSON.stringify({ status: 'confirm' })
        // })

        axios.put(`https://car-doctor-server-omega-rouge.vercel.app/bookings/${id}`, {status : 'confirm'})
            // .then(res => res.json())
            .then(data => {
                console.log(data.data);
                if (data.data.modifiedCount > 0) {
                    // update state
                    const remaining = bookings.filter(booking => booking._id !== id);
                    const updated = bookings.find(booking => booking._id === id);
                    updated.status = 'confirm'
                    const newBookings = [updated, ...remaining];
                    setBookings(newBookings);
                }
            })
    }

    return (
        <div>
            <h2 className="text-5xl">Your bookings: {bookings.length}</h2>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Image</th>
                            <th>Service</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map(booking => <BookingRow
                                key={booking._id}
                                booking={booking}
                                handleDelete={handleDelete}
                                handleBookingConfirm={handleBookingConfirm}
                            ></BookingRow>)
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default Bookings;