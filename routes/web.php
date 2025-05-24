<?php

use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Inertia\Inertia;
use Illuminate\Http\Request;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
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



route::prefix('dashboard')->group(function(){
    route::get('contacts', [ContactController::class,'index'])->name('contact.index');
    route::get('contacts/create', [ContactController::class,'create'])->name('contacts.create');
});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
