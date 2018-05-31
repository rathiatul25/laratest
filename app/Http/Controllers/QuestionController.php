<?php

namespace App\Http\Controllers;

use App\NewCall;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Mockery\Exception;

class QuestionController extends Controller
{
    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     * Render add call form
     */
    public function addNewCall()
    {
        try {
            return view('question.add');
        } catch (Exception $exception) {
            echo $exception->getMessage();
        }
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     * Save call details
     */
    public function saveCall(Request $request)
    {
        try {
            $data = $request->all();
            $data = array_except($data, '_token');

            if (count($data) > 0) {

                //Create object of new_call table
                $newCall = new NewCall();

                //Serialize call details
                $newCall->call_detail = serialize($data);

                //Save the details
                if ($newCall->save()) {
                    //Redirect with success
                    return redirect()->to('/')->with('success', 'Call details saved successfully.');
                } else {
                    //Redirect with failure
                    return redirect()->to('/')->with('failure', 'Some error occurred. Please try again later.');
                }
            } else {
                return redirect()->to('/')->with('failure', 'Please enter question');
            }
        } catch (Exception $exception) {
            //Handle exception
            return redirect()->to('/')->with('failure', $exception->getMessage());
        }
    }
}
