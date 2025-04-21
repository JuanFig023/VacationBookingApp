<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\VacationPackage;
use Illuminate\Http\Request;


class VacationPackageController extends Controller
{
    public function index()
    {
        $vacationPackages = VacationPackage::all();
        return response()->json($vacationPackages);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
        'package_name' => 'required|string|max:255',
        'description' => 'required|string',
        'price' => 'required|numeric',
        'vacation_length' => 'required|integer',
        'image_url' => 'required|url',
        ]);

        $vacationPackage = VacationPackage::create($validatedData);
        return response()->json($vacationPackage, 201);
    }

    public function show($id)
    {
        $vacationPackage = VacationPackage::findOrFail($id);
        return response()->json($vacationPackage);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
        'package_name' => 'required|string|max:255',
        'description' => 'required|string',
        'price' => 'required|numeric',
        'vacation_length' => 'required|integer',
        'image_url' => 'required|url',
    ]);

        $vacationPackage = VacationPackage::findOrFail($id);
        $vacationPackage->update($validatedData);

        return response()->json($vacationPackage);
    }

    public function destroy($id)
    {
        $vacationPackage = VacationPackage::findOrFail($id);
        $vacationPackage->delete();

        return response()->json(null, 204);
    }
}
