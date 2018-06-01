var questionIndex = 0;

var SITE = {
    //Add first row - add text box and dropdown
    addNewQuestion: function (cur_div, subquestion, level) {
        //Crete initial html
        var html = '<div style="border: 1px solid black; padding: 10px;overflow: scroll;height: 250px;"><br /><input name="question['+questionIndex+'][question]" type="text" placeholder="Write your question" required/> <select onchange="SITE.onSelect(this.value, this, false, '+level+')" name="question['+questionIndex+'][type]" required><option value="">Select</option><option value="1">Single Choice</option><option value="2">Multiline Text</option><option value="3">Multiple Choice</option></select></div>'

        //If clicked on sub question then show sub question with select box
        if(subquestion){

            var name = "question["+questionIndex+"][subquestion][question]";
            var type = "question["+questionIndex+"][subquestion][type]";

            //Create dynamic name for text box and select box
            if(level > 0){

                name = "question["+questionIndex+"]";
                type = "question["+questionIndex+"]";
                for (var i = 1; i <= level; i++) {
                    name += '[subquestion]';
                    type += '[subquestion]';
                }
                name += '[question]';
                type += '[type]';
            }

            var html = '<div style="border: 1px solid black; padding: 10px"><br /><input name="'+name+'" type="text" placeholder="Write your question" required/> <select onchange="SITE.onSelect(this.value, this, true, '+level+')" name="'+type+'" required><option value="">Select</option><option value="1">Single Choice</option><option value="2">Multiline Text</option><option value="3">Multiple Choice</option></select></div>'

        }
        $(cur_div).parent().append(html);
    },

    //Based on selected value of drop down, show text box with add sub question link,
    //show textarea and show 5 text box with add sub question link
    onSelect: function(type, div, subquestion, level){

        if(subquestion){
            var nextLevel = parseInt(level) + 1;
            var newSingelLIneName = "question["+questionIndex+"]";
            var newMultilineName = "question["+questionIndex+"]";
            var newMultichoiceName = "question["+questionIndex+"]";

            console.log(newSingelLIneName)
            //If level is greater than zero, then append sub question array to name of each element
            if(level > 0){
                for (var i = 1; i <= level; i++) {
                    newSingelLIneName += '[subquestion]';
                    newMultilineName += '[subquestion]';
                    newMultichoiceName += '[subquestion]';

                }
                newSingelLIneName += '[singleline]';
                newMultilineName += '[multiline]';
                newMultichoiceName += '[multichoice][]';

            }

            var input = '<div><br /><input type="text" name="'+newSingelLIneName+'" placeholder="Write your answer" required /><a class="add_sub_question" onclick="SITE.onAddSubQuestion(this,'+nextLevel+')">Add sub question</a></div>';
            var textArea = '<div><br /><textarea name="'+newMultilineName+'" placeholder="Write your answer"></textarea></div>';
            var inputs = '<div><br /> <a class="add_sub_question" onclick="SITE.onAddSubQuestion(this,'+nextLevel+')">Add sub question</a><br />';
            for (var i=1; i<=5; i++) {
                inputs += ' <input type="text" placeholder="Write your answer" name="'+newMultichoiceName+'">';
            }
            inputs += '</div>';
        }else{

            //Onchange of answer type first time show questions
            var input = '<div><br /><input type="text" name="question['+questionIndex+'][singleline]" placeholder="Write your answer" required /><a class="add_sub_question" onclick="SITE.onAddSubQuestion(this,1)">Add sub question</a></div>';
            var textArea = '<div><br /><textarea name="question['+questionIndex+'][multiline]" placeholder="Write your answer"></textarea></div>';
            var inputs = '<div><br /> <a class="add_sub_question" onclick="SITE.onAddSubQuestion(this, 1)">Add sub question</a><br />';
            for (var i=1; i<=5; i++) {
                inputs += ' <input type="text" placeholder="Write your answer" name="question['+questionIndex+'][multichoice]['+i+']">';
            }
            inputs += '</div>';
        }


        //Append text box
        if(type == 1){
            $(div).next('div').remove();
            $(div).closest('div').append(input);

        //Append text area
        }else if(type == 2){
            $(div).next('div').remove();
            $(div).closest('div').append(textArea)

        //Append multiple text box
        } else if (type == 3){
            $(div).next('div').remove();
            $(div).closest('div').append(inputs)

        //Remove div
        } else {
            $(div).next('div').remove();
        }

    },

    //Add sub question
    onAddSubQuestion:function (next_div, level) {
        //Call add new row function to add new question
        //pass the sub question status and level to maintain hierarchy
        $(next_div).parent().css('border','green').append(SITE.addNewQuestion(next_div, true, level));
        //Remove sub question link after appending new question
        $(next_div).remove();
    }
}

