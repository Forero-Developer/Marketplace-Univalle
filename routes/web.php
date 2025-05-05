<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Inertia\Inertia;
use Illuminate\Http\Request;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Rutas protegidas para usuarios autenticados y verificados
//Route::middleware(['auth', 'verified'])->group(function () {
Route::middleware(['auth'])->group(function () {
    // Dashboard con lista de productos
    Route::get('/dashboard', [ProductController::class, 'index'])->name('dashboard');

    // Vista para crear producto (formulario)
    Route::get('/products/create', function () {
        return Inertia::render('CreateProduct'); // Asegúrate que CreateProduct.jsx existe
    })->name('products.create');

    // Guardar producto en la base de datos
    Route::post('/products', [ProductController::class, 'store'])->name('products.store');

    Route::delete('/products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');

    
    Route::get('/api/products/load-more', [ProductController::class, 'loadMore']);

});

Route::get('/verify-email', function () {
    return Inertia::render('auth/verifyEmail'); // Página de verificación
})->middleware('auth')->name('verification.notice');

// Endpoint para reenviar el correo de verificación
Route::post('/email/verification-notification', function () {
    request()->user()->sendEmailVerificationNotification();
    return back()->with('status', 'verification-link-sent');
})->middleware(['auth', 'throttle:6,1'])->name('verification.send');

Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();
    return redirect('/dashboard');
})->middleware(['auth', 'signed'])->name('verification.verify');


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
