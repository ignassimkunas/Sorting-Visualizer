class Sorting {
    constructor(){
        this.array = [];
        this.newArrays = [];
        this.animating = false;
        for (let i = 0; i < $('a').length; i++){
            this.array.push(parseFloat($('a')[i].text));
        }
    }
    bubbleSort() {
        let newArrays = [], indices = [];
        var newArray = [...this.array];
        let len = newArray.length;
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len; j++) {
                if (newArray[j] > newArray[j + 1]) {
                    let tmp = newArray[j];
                    newArray[j] = newArray[j + 1];
                    newArray[j + 1] = tmp;
                    newArrays.push([...newArray]);
                }
            }
        }
        newArrays.unshift(this.array);
        for (let i = 0; i < newArrays.length - 1; i++){
            indices.push([...this.findDifferentElement(newArrays[i], newArrays[i + 1])]);
        }
        var count = 0;
        const loop = setInterval(()=>{
            this.switchPlaces(indices[count][0], indices[count][1]);
            count++;
            if (!indices[count]){
                clearInterval(loop);
            }
        }, 500);
    }
    switchPlaces(index1, index2) {
        if (index1 > index2){
            var temp = index2;
            index2 = index1;
            index1 = temp;
        }

        const clickedDiv = $($('.moveUp')[index1]);
        const otherDiv = $($('.moveUp')[index2]);
        const distanceBetweenDivs = index2 - index1;
        const distance = $(clickedDiv).outerHeight() * distanceBetweenDivs;

        if (otherDiv.length) {
            this.animating = true;
            $.when(clickedDiv.animate({
                top: distance
            }, 400),
            otherDiv.animate({
                top: -distance
            }, 400)).done(function () {
                otherDiv.css('top', '0px');
                clickedDiv.css('top', '0px');
                clickedDiv.insertAfter($($('.moveUp')[index2]));
                otherDiv.insertBefore($($('.moveUp')[index1]));
                this.animating = false;
            });
        }
        //return new Promise(resolve => setTimeout(resolve, 600));
    }

    findDifferentElement(oldArray, newArray){
        for (let i = 0; i < newArray.length; i++){
            if (oldArray[i] != newArray[i]){
                return [i, i+1];
            } 
        }
    }
}

const generateNumbers = () => {
    let array = [];
    for (let i = 0; i < $('a').length; i++){
        array.push(Math.floor(Math.random() * 100));
    }
    array.forEach((element, index)=>{
        $('a')[index].text = element;
    });
}

const start = () => {
    let sorting = new Sorting();
    sorting.bubbleSort();
}

//pirma surušiuot tada tik aranginimą daryt


