@extends('layouts.app')
@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading">ADD NEW CALL</div>
                    @include('layouts.message')
                    {!! Form::open(['url' => URL::to('save-call'), 'method' => 'POST', 'data-parsley-validate']) !!}
                    <div style="min-height: 290px;overflow: scroll;">
                        <a href="javascript:void(0);" class="btn btn-primary" id="btn_add_row">+ Add New Question</a>
                    </div>

                    <div class="text-left">
                        <button type="submit" class="btn btn-primary">Save</button>
                        <a class="btn btn-primary" href='{{url("/")}}'>Cancel</a>
                    </div>
                    {!! Form::close() !!}
                </div>
            </div>
        </div>
    </div>
@endsection
@section('javascript')
    <script type="text/javascript">
        $(document).ready(function(){
            //Add new question
            $('#btn_add_row').on("click", function() {
                questionIndex = questionIndex + 1;
                //Call function addNewQuestion to add question and sub question
                //pass the this, sub question and level to the function
                SITE.addNewQuestion(this, false, 0);
            });
        });
    </script>
@endsection
