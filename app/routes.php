<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', function () {
    Log::info('Index requested');

    return \Response::json(
        array(
                'error'   => 0,
                'message' => "Hello World",
                'data'    => null
        ),
        200
    );
});
