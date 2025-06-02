<?php

use App\Http\Controllers\ChatController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ProductController;
use App\Http\Middleware\AdminMiddleware;
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

    Route::get('/mis-productos', [ProductController::class, 'misProductos'])->name('misProductos.index');

    // Vista para editar producto
    Route::put('/products/{product}', [ProductController::class, 'update'])->name('products.update');
    Route::get('/products/{product}/edit', [ProductController::class, 'edit'])->name('products.edit');
    // Rutas del chat
    Route::get('/chat/start/{userId}', [ChatController::class, 'getOrCreateConversation'])->name('chat.start');
    Route::get('/chat/{id}', [ChatController::class, 'show'])->name('chat.show');
    Route::post('/chat/{id}/send', [ChatController::class, 'sendMessage'])->name('chat.send');

    Route::get('/conversations', [ConversationController::class, 'index'])->name('conversations.index');
    Route::get('/conversations/{conversation}', [ConversationController::class, 'show'])->name('conversations.show');

    // Ruta para guardar el mensaje
    Route::post('/messages/{conversationId}', [MessageController::class, 'store'])->name('messages.store');

    Route::post('/conversations/start/{product}', [ConversationController::class, 'start'])->name('conversations.start');

    
    Route::get('/api/products/load-more', [ProductController::class, 'loadMore']);
     // Rutas para favoritos
    Route::post('/favorites/toggle/{product}', [FavoriteController::class, 'toggle'])->name('favorites.toggle');
    Route::get('/favoritos', [FavoriteController::class, 'index'])->name('favorites.index');

});

Route::middleware(['auth', AdminMiddleware::class])->prefix('admin')->group(function () {
    Route::get('/products', [ProductController::class, 'adminIndex'])->name('admin.products.index');
    Route::get('/products/{product}/edit', [ProductController::class, 'edit'])->name('admin.products.edit');
    Route::put('/products/{product}', [ProductController::class, 'update'])->name('admin.products.update');
    Route::delete('/products/{product}', [ProductController::class, 'destroy'])->name('admin.products.destroy');
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
