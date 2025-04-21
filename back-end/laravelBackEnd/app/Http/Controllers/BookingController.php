<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    
public function index()
    {
        $bookings = Booking::all();
        return response()->json($bookings);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'vacation_package_id' => 'required|exists:vacation_packages,id',
            'booking_date' => 'required|date',
            'total_price' => 'required|numeric',
            'status' => 'required|string',
        ]);

        $booking = Booking::create($validatedData);
        return response()->json($booking, 201);
    }

    public function show($id)
    {
        $booking = Booking::findOrFail($id);
        return response()->json($booking);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
        'user_id' => 'required|exists:users,id',
        'vacation_package_id' => 'required|exists:vacation_packages,id',
        'booking_date' => 'required|date',
        'total_price' => 'required|numeric',
        'status' => 'required|string',
    ]);

        $booking = Booking::findOrFail($id);
        $booking->update($validatedData);

        return response()->json($booking);
    }

    public function destroy($id)
    {
        $booking = Booking::findOrFail($id);
        $booking->delete();

        return response()->json(null, 204);
    }
}
