<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SiteCredentialsController;
use App\Http\Controllers\NewArrivalController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\PartsController;
use App\Http\Controllers\PartFormController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\ComplaintController;
use App\Http\Controllers\AutoFinanceController;
use App\Http\Controllers\CalculatorController;
use App\Http\Controllers\ContactUsController;
use App\Http\Controllers\CarBookingController;
use App\Http\Controllers\CarCareTipsController;
use App\Http\Controllers\ChooseController;
use App\Http\Controllers\ClientReviewController;
use App\Http\Controllers\ExpertTeamController;
use App\Http\Controllers\ToyotaSureController;
use App\Http\Controllers\ValueTimeController;

//////////////site-credentials
Route::get('/site-credentials', [SiteCredentialsController::class, 'index'])->name('siteCredentials');
Route::post('/site-credentials', [SiteCredentialsController::class, 'store']);

///////////////new-arrivals
Route::get('/new-arrivals', [NewArrivalController::class, 'index'])->name('api.new-arrivals.index');
Route::get('/getHeroImages', [NewArrivalController::class, 'getHeroImages'])->name('getHeroImages');
// Route::post('new-arrivals', [NewArrivalController::class, 'update']);

////////services
Route::get('services', [ServiceController::class, 'getAllServices']);

/////parts api
Route::get('/parts', [PartsController::class, 'indexApi'])->name('parts.index.api');
Route::post('/submit-part-form', [PartFormController::class, 'store']);
//////online appointment
Route::post('/appointments', [AppointmentController::class, 'store']);
Route::post('/complaints', [ComplaintController::class, 'store']);

Route::post('/auto-finances', [AutoFinanceController::class, 'store']);

Route::post('/contact-us', [ContactUsController::class, 'store']);
Route::get('/carbooking', [CarBookingController::class, 'indexApi'])->name('carbooking.index.api');

Route::get('/toyotasure', [ToyotaSureController::class, 'indexApi'])->name('toyotasure.index.api');
Route::get('/valuetime', [ValueTimeController::class, 'indexApi'])->name('valuetime.index.api');
Route::get('/clientreview', [ClientReviewController::class, 'indexApi'])->name('clientreview.index.api');
Route::get('/choose', [ChooseController::class, 'indexApi'])->name('choose.index.api');
Route::get('/caretips', [CarCareTipsController::class, 'indexApi'])->name('caretips.index.api');
Route::get('/team', [ExpertTeamController::class, 'indexApi'])->name('team.index.api');
Route::get('/calculator', [CalculatorController::class, 'indexApi'])->name('calculator.index.api');
