<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Activitylog\Models\Activity;

class AuditController extends Controller
{
    public function index(Request $request)
    {
        // Obtener actividades con usuario causante (causer)
        $activities = Activity::with('causer')
            ->orderByDesc('created_at')
            ->paginate(15);

        // Retornar a la vista Inertia con paginación
        return Inertia::render('audit/index', [
            'activities' => $activities
        ]);
    }
}