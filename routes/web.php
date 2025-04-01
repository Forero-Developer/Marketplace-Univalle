<?php

use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

route::prefix('dashboard')->group(function(){
    route::get('contacts', [ContactController::class,'index'])->name('contact.index');
    route::get('contacts/create', [ContactController::class,'create'])->name('contacts.create');
});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
