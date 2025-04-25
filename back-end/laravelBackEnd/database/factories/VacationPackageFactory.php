<?php

namespace Database\Factories;

use App\Models\VacationPackage;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\VacationPackage>
 */
class VacationPackageFactory extends Factory
{
    protected $model = VacationPackage::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'package_name' => $this->faker->word,
            'description' => $this->faker->sentence,
            'price' => $this->faker->randomFloat(2, 100, 1000),
            'vacation_length' => $this->faker->numberBetween(1, 14),
            'image_url' => $this->faker->imageUrl,
        ];
    }
}
