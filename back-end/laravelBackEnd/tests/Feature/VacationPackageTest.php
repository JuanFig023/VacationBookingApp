<?php
use App\Models\VacationPackage;
use Illuminate\Foundation\Testing\RefreshDatabase;
use function Pest\Laravel\{get, post, put, delete};

uses(RefreshDatabase::class);

it('can list vacation packages', function () {
    VacationPackage::factory()->count(3)->create();
    get('/api/vacationpackages')
    ->assertStatus(200)
    ->assertJsonCount(3);
});

it('can create a vacation package', function () {
    $data = [
    'package_name' => 'Summer Getaway',
    'description' => 'Enjoy a summer vacation with all amenities.',
    'price' => 999.99,
    'vacation_length' => 7,
    'image_url' => 'http://example.com/image.jpg',
];

post('/api/vacationpackages', $data)
    ->assertStatus(201)
    ->assertJsonFragment($data);
});

it('can show a vacation package', function () {
    $vacationPackage = VacationPackage::factory()->create();
    get("/api/vacationpackages/{$vacationPackage->id}")
    ->assertStatus(200)
    ->assertJsonFragment([
    'package_name' => $vacationPackage->package_name,
    ]);
});

it('can update a vacation package', function () {
    $vacationPackage = VacationPackage::factory()->create();

    $data = [
    'package_name' => 'Updated Package',
    'description' => 'Updated description.',
    'price' => 1099.99,
    'vacation_length' => 10,
    'image_url' => 'http://example.com/updated_image.jpg',
];

put("/api/vacationpackages/{$vacationPackage->id}", $data)
    ->assertStatus(200)
    ->assertJsonFragment($data);
});

it('can delete a vacation package', function () {
    $vacationPackage = VacationPackage::factory()->create();

    delete("/api/vacationpackages/{$vacationPackage->id}")
    ->assertStatus(204);

    get("/api/vacationpackages/{$vacationPackage->id}")
    ->assertStatus(404);
});
