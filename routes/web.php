<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
//Route to show add new call form
Route::get('/', 'QuestionController@addNewCall');
//Route to save call details
Route::post('save-call', 'QuestionController@saveCall');