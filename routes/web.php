<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SiteCredentialsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NewArrivalController;
//use App\Http\Controllers\ContactUsController;
use App\Http\Controllers\ServiceCategoryController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\PartsController;
use App\Http\Controllers\PartFormController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\ComplaintController;
use App\Http\Controllers\AutoFinanceController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\CalculatorController;
use App\Http\Controllers\ContactUsController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CarBookingController;
use App\Http\Controllers\CarCareTipsController;
use App\Http\Controllers\ChooseController;
use App\Http\Controllers\ClientReviewController;
use App\Http\Controllers\ExpertTeamController;
use App\Http\Controllers\ToyotaSureController;
use App\Http\Controllers\ValueTimeController;

use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
       // 'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth','verified')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
   
    ////////Users
    Route::resource('users', UserController::class);

    // Route::middleware(['auth'])->group(function () {
    //     Route::resource('users', UserController::class);
    // });
    //////////Roles
    Route::resource('roles', RoleController::class);
/////////Permission
    Route::resource('permissions', PermissionController::class); 
    ///////Side Credentials Routes

    Route::get('/site-credentials', [SiteCredentialsController::class, 'index'])->name('site-credentials.index');
    Route::get('/site-credentials/create', [SiteCredentialsController::class, 'create'])->name('site-credentials.create');
    Route::post('/site-credentials', [SiteCredentialsController::class, 'store'])->name('site-credentials.store');
    Route::get('/site-credentials/{id}', [SiteCredentialsController::class, 'show'])->name('site-credentials.show');
    Route::get('/site-credentials/{id}/edit', [SiteCredentialsController::class, 'edit'])->name('site-credentials.edit');
    Route::put('/site-credentials/{id}', [SiteCredentialsController::class, 'update'])->name('site-credentials.update');
    Route::delete('/site-credentials/{id}', [SiteCredentialsController::class, 'destroy'])->name('site-credentials.destroy');
    
    // ///////////contact-us form
    // Route::post('/contact-us', [ContactUsController::class, 'send']);		
    
}); 
///////NewArrival Routes
Route::middleware(['auth', 'verified'])->group(function () {
      Route::resource('new-arrivals', NewArrivalController::class);
      Route::post('new-arrival', [NewArrivalController::class, 'update'])->name('new-arrival');
});

//////service-categories
Route::resource('service-categories', ServiceCategoryController::class);
Route::resource('services', ServiceController::class);

//////parts
Route::resource('parts', PartsController::class)->except(['show']);
Route::get('/part-form-submissions', [PartFormController::class, 'index'])->name('part-form-submissions.index');
Route::delete('/part-form-submissions/{id}', [PartFormController::class, 'destroy'])->name('part-form-submissions.destroy');

///////////////
// routes/web.php
Route::get('/appointments', [AppointmentController::class, 'index'])->name('appointments.index');
Route::delete('/appointments/{id}', [AppointmentController::class, 'destroy'])->name('appointments.destroy');
//Route::post('/appointments/send-email', [AppointmentController::class, 'sendAppointmentEmail'])->name('appointments.sendEmail');
//Route::post('/appointments/send-email', [AppointmentController::class, 'sendEmail']);
Route::post('/appointments/send-email', [AppointmentController::class, 'sendEmail'])->name('appointment.sendEmail');

Route::get('/complaints', [ComplaintController::class, 'index'])->name('complaints.index');
Route::delete('/complaints/{id}', [ComplaintController::class, 'destroy'])->name('complaints.destroy');

Route::get('/auto-finances', [AutoFinanceController::class, 'index'])->name('autoFinances.index');
Route::delete('/auto-finances/{id}', [AutoFinanceController::class, 'destroy'])->name('autoFinances.destroy');


Route::get('/contact-us-list', [ContactUsController::class, 'index'])->name('contactUs.index');
Route::delete('/contact-us/{id}', [ContactUsController::class, 'destroy'])->name('contactUs.destroy');
Route::post('/contact-us/send-email', [ContactUsController::class, 'sendEmail'])->name('contactUs.sendEmail');

//////home routes
// routes/web.php
//Route::get('/car-bookings', [CarBookingController::class, 'index'])->name('car-bookings.index');
//Route::resource('car-booking', CarBookingController::class);
// Route::get('/car-booking', [CarBookingController::class, 'index'])->name('car-bookings.index');
// Route::post('/car-booking', [CarBookingController::class, 'store'])->name('car-bookings.store');
Route::get('/car-bookings', [CarBookingController::class, 'index'])->name('car-bookings.index');
Route::get('/car-bookings/create', [CarBookingController::class, 'create'])->name('car-bookings.create');
Route::post('/car-bookings', [CarBookingController::class, 'store'])->name('car-bookings.store');
Route::get('/car-bookings/{id}/edit', [CarBookingController::class, 'edit'])->name('car-bookings.edit');
Route::post('/car-bookings/{id}/update', [CarBookingController::class, 'update'])->name('car-bookings.update');
//Route::put('/car-bookings/{id}', [CarBookingController::class, 'update'])->name('car-bookings.update');
Route::delete('/car-bookings/{id}', [CarBookingController::class, 'destroy'])->name('car-bookings.destroy');
//

//////////toyota sure

Route::get('/toyota_sure', [ToyotaSureController::class, 'index'])->name('toyota_sure.index');
Route::get('/toyota_sure/create', [ToyotaSureController::class, 'create'])->name('toyota_sure.create');
Route::post('/toyota_sure', [ToyotaSureController::class, 'store'])->name('toyota_sure.store');
Route::get('/toyota_sure/{id}/edit', [ToyotaSureController::class, 'edit'])->name('toyota_sure.edit');
Route::post('/toyota_sure/{id}', [ToyotaSureController::class, 'update'])->name('toyota_sure.update');
Route::delete('/toyota_sure/{id}', [ToyotaSureController::class, 'destroy'])->name('toyota_sure.destroy');

////////value time
Route::get('/value_time', [ValueTimeController::class, 'index'])->name('value_time.index');
Route::get('/value_time/create', [ValueTimeController::class, 'create'])->name('value_time.create');
Route::post('/value_time', [ValueTimeController::class, 'store'])->name('value_time.store');
Route::get('/value_time/{id}/edit', [ValueTimeController::class, 'edit'])->name('value_time.edit');
Route::post('/value_time/{id}', [ValueTimeController::class, 'update'])->name('value_time.update');
Route::delete('/value_time/{id}', [ValueTimeController::class, 'destroy'])->name('value_time.destroy');

////////client review
Route::get('/client_review', [ClientReviewController::class, 'index'])->name('client_review.index');
Route::get('/client_review/create', [ClientReviewController::class, 'create'])->name('client_review.create');
Route::post('/client_review', [ClientReviewController::class, 'store'])->name('client_review.store');
Route::get('/client_review/{id}/edit', [ClientReviewController::class, 'edit'])->name('client_review.edit');
Route::post('/client_review/{id}', [ClientReviewController::class, 'update'])->name('client_review.update');
Route::delete('/client_review/{id}', [ClientReviewController::class, 'destroy'])->name('client_review.destroy');

////////client review
Route::get('/choose', [ChooseController::class, 'index'])->name('choose.index');
Route::get('/choose/create', [ChooseController::class, 'create'])->name('choose.create');
Route::post('/choose', [ChooseController::class, 'store'])->name('choose.store');
Route::get('/choose/{id}/edit', [ChooseController::class, 'edit'])->name('choose.edit');
Route::post('/choose/{id}', [ChooseController::class, 'update'])->name('choose.update');
Route::delete('/choose/{id}', [ChooseController::class, 'destroy'])->name('choose.destroy');
////////car tips
Route::get('/car_care', [CarCareTipsController::class, 'index'])->name('car_care.index');
Route::get('/car_care/create', [CarCareTipsController::class, 'create'])->name('car_care.create');
Route::post('/car_care', [CarCareTipsController::class, 'store'])->name('car_care.store');
Route::get('/car_care/{id}/edit', [CarCareTipsController::class, 'edit'])->name('car_care.edit');
Route::post('/car_care/{id}', [CarCareTipsController::class, 'update'])->name('car_care.update');
Route::delete('/car_care/{id}', [CarCareTipsController::class, 'destroy'])->name('car_care.destroy');
////////team
Route::get('/team', [ExpertTeamController::class, 'index'])->name('team.index');
Route::get('/team/create', [ExpertTeamController::class, 'create'])->name('team.create');
Route::post('/team', [ExpertTeamController::class, 'store'])->name('team.store');
Route::get('/team/{id}/edit', [ExpertTeamController::class, 'edit'])->name('team.edit');
Route::post('/team/{id}', [ExpertTeamController::class, 'update'])->name('team.update');
Route::delete('/team/{id}', [ExpertTeamController::class, 'destroy'])->name('team.destroy');

////////Calculator
Route::get('/calculator', [CalculatorController::class, 'index'])->name('calculator.index');
Route::get('/calculator/create', [CalculatorController::class, 'create'])->name('calculator.create');
Route::post('/calculator', [CalculatorController::class, 'store'])->name('calculator.store');
Route::get('/calculator/{id}/edit', [CalculatorController::class, 'edit'])->name('calculator.edit');
Route::post('/calculator/{id}', [CalculatorController::class, 'update'])->name('calculator.update');
Route::delete('/calculator/{id}', [CalculatorController::class, 'destroy'])->name('calculator.destroy');

require __DIR__.'/auth.php';
