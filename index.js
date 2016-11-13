/*Created by Horizone on 09.11.2016.
*/

$(document).ready(function(){

    var list, animSteps = [];

    function getRandomNum (amount){
        var arr=[], a;
        for(var i =0; i < amount; i ++){
            a = Math.round((Math.random() * 100)+1);
            arr.push(a);
        }
        return arr;
    }

    function makeBlocks(elem){
        for(var i =0; i<list.length; i++){
            $(elem).append('<div class="block">'+list[i]+'</div>');
        }
    }


    var swap = function(list, i1, i2) {
        var blocks = $('.block-container').find('.block');
        var tmp = list[i1];
        list[i1] = list[i2];
        list[i2] = tmp;

        animSteps.push(function(){

            blocks.eq(i1).add(blocks.eq(i2)).addClass("highlight");
        },function(){
            var tmp = blocks.eq(i1).text();
            blocks.eq(i1).text(blocks.eq(i2).text());
            blocks.eq(i2).text(tmp);
            var dist = blocks.eq(i2).offset().left - blocks.eq(i1).offset().left;
            $.when(blocks.eq(i1).animate({
                left: dist}, 300), blocks.eq(i2).animate({
                left: -dist}, 300)).done(function () {
                blocks.eq(i1).css('left', '0px');
                blocks.eq(i2).css('left', '0px');});
           }, function(){
            blocks.eq(i1).add(blocks.eq(i2)).removeClass("highlight");
        });
    };
    var animation = function(){
        if (animSteps.length) {
            setTimeout(function(){
                animSteps.splice(0,1)[0]();
                animation(animSteps);
            }, 450);
        }
    };

// Collection of sorting algorithms
    var algorithms = {
        bubblesort: function(list) {
            for (var n = list.length; n > 1; --n) {
                for (var i = 0; i < n-1; ++i) {
                    if (list[i] > list[i+1]) {
                        swap(list, i, i+1);
                    }
                }
            }
        },
        selectionsort: function(arr){
            var minIdx, temp,
                len = arr.length;
            for(var i = 0; i < len; i++){
                minIdx = i;
                for(var j = i+1; j<len; j++){
                    if(arr[j]<arr[minIdx]){
                        minIdx = j;
                    }
                }
                swap(list, i, minIdx);
//temp = arr[i];
//arr[i] = arr[minIdx];
//arr[minIdx] = temp;
            }
            return arr;
        }
    }
    function clearUp(){
        $('.block-container').empty();
        nums=[];
    }
    function sorting(){
        $('.amount').on('change', function () {
            clearUp();
            var amount = parseFloat($(this).val());
            console.log(amount);
            list = getRandomNum (amount);
            console.log(list);
            makeBlocks($(".block-container"));
        });
        $('.start').on('click', function () {
            sortType = $('select :selected').text();
            console.log(sortType);
            if (sortType === 'Bubble sort') {
                algorithms.bubblesort(list);
                animation();
            } else if (sortType === 'Selection sort'){
                algorithms.selectionsort(list);
                animation();
            }
        });
        $('.clear').on('click', function () {
            clearUp();
            console.log(nums);
        });
    }
    sorting();



























    /*var amount, nums = [], sortType, sorted=[];

     function bubbleSort(arr){
     for(var j=arr.length; j>1 ; j--){
     for (var i=0; i < j-1; i++) {
     if (arr[i] > arr[i+1]) {
     var temp = arr[i];
     arr[i] = arr[i+1];
     arr[i+1] = temp;
     swapped = true;
     }
     }
     }
     return arr;
     }
     function selectionSort(arr){
     var minIdx, temp,
     len = arr.length;
     for(var i = 0; i < len; i++){
     minIdx = i;
     for(var j = i+1; j<len; j++){
     if(arr[j]<arr[minIdx]){
     minIdx = j;
     }
     }
     temp = arr[i];
     arr[i] = arr[minIdx];
     arr[minIdx] = temp;
     }
     return arr;
     }

     function getRandomNum (){
     var a = Math.round((Math.random() * 50)+1);
     nums.push(a);
     return nums;
     }

     function makeBlocks(elem, num){
     $(elem).append('<div class="block">'+getRandomNum ()+'</div>');
     }
     function sorting () {
     $('.amount').on('change', function () {
     amount = parseFloat($(this).val());
     for (var i = 0; i < amount; i++) {
     makeBlocks($('.block-container'), amount);
     }
     });
     $('.start').on('click', function () {
     sortType = $('select :selected').text();
     console.log(sortType);
     if (sortType = 'Bubble sort') {
     console.log(bubbleSort(nums));
     } else if (sortType = 'Selection sort') {
     console.log(selectionSort(nums));
     $('.result-container').text(nums);
     }
     });
     $('.clear').on('click', function () {
     $('.block-container').empty();
     nums=[];
     });
     };

     sorting();

     function sorting(){
     $('.amount').on('change', function () {
     amount = parseFloat($(this).val());
     for (var i = 0; i < amount; i++) {
     $('.unsorted').append('<span> '+getRandomNum ()+' </span>');
     }
     });
     $('.start').on('click', function () {
     sortType = $('select :selected').text();
     console.log(nums)
     if (sortType = 'Bubble sort') {
     bubbleSort(nums);
     console.log(nums);
     for(var i=0; i< nums.length; i++){
     $('.sorted').append('<span> '+nums[i]+' </span>');
     }
     } else if (sortType = 'Selection sort') {
     //console.log(selectionSort(nums));
     }

     });
     $('.clear').on('click', function () {
     $('.block-container').empty();
     nums=[];
     console.log(nums);
     });
     };
     sorting();*/


});
