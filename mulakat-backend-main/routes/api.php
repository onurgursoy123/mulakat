<?php

use App\Http\Controllers\BankController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'banks'], function () {
    Route::get('/', [BankController::class, 'index']);
    Route::get('/{bank}', [BankController::class, 'show']);
    Route::post('/', [BankController::class, 'store']);
    Route::put('/{bank}', [BankController::class, 'update']);
    Route::delete('/{bank}', [BankController::class, 'destroy']);
});

Route::group(['prefix' => 'accounts'], function () {
    Route::get('/', [AccountTypeController::class, 'index']);
    Route::get('/{account}', [AccountTypeController::class, 'show']);
    Route::post('/', [AccountTypeController::class, 'store']);
    Route::put('/{account}', [AccountTypeController::class, 'update']);
    Route::delete('/{account}', [AccountTypeController::class, 'destroy']);
});


