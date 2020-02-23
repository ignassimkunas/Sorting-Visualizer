class Sorting {
    constructor(){
        this.array = [];
        this.newArrays = [];
        this.animating = false;
        this.sorted = false;
        for (let i = 0; i < $('.moveUp a').length; i++){
            this.array.push(parseFloat($('.moveUp a')[i].text));
        }
    }
    setWidthByValue(){
        let largestNumber = Math.max(...this.array), percentArray = [];
        this.array.forEach((element)=>{
            percentArray.push(element * 95 / largestNumber);
        });
        percentArray.forEach((element, index)=>{
            $($(".moveUp")[index]).width(element + "%");
        });
    }
    bubbleSort() {
        let newArrays = [], indices = [];
        var newArray = [...this.array];
        let len = newArray.length;
        if (!this.sorted){
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
            const findDifferentElement = (oldArray, newArray) =>{
                for (let i = 0; i < newArray.length; i++){
                    if (oldArray[i] != newArray[i]){
                        return [i, i+1];
                    } 
                }
            }
            for (let i = 0; i < newArrays.length - 1; i++){
                indices.push([...findDifferentElement(newArrays[i], newArrays[i + 1])]);
            }
            this.applyChanges(indices);
            this.sorted = true;
        }
        else {alert("Already sorted");}
    }
    selectionSort(){
        let newArrays = [], indices = [];
        var newArray = [...this.array];
        let len = newArray.length;
        if (!this.sorted){
            for (let i = 0; i < len; i++) {
                let min = i;
                for (let j = i + 1; j < len; j++) {
                    if (newArray[min] > newArray[j]) {
                        min = j;
                    }
                }
                if (min !== i) {
                    indices.push([min, i]);
                    let tmp = newArray[i];
                    newArray[i] = newArray[min];
                    newArray[min] = tmp;
                }
            }
            this.applyChanges(indices);
            this.sorted = true;
        }
        else {alert("Already sorted");}
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
        const distance = $(clickedDiv).outerHeight() * distanceBetweenDivs + 10;

        if (otherDiv.length) {
            this.animating = true;
            clickedDiv.css('background', '#7da9f0');
            otherDiv.css('background', '#7da9f0');
            $.when(clickedDiv.animate({
                top: distance
            }, 100),
            otherDiv.animate({
                top: -distance
            }, 100)).done(function () {
                otherDiv.css('top', '0px');
                clickedDiv.css('top', '0px');
                clickedDiv.insertAfter($($('.moveUp')[index2]));
                otherDiv.insertBefore($($('.moveUp')[index1]));
                this.animating = false;
                clickedDiv.css('background', 'white');
                otherDiv.css('background', 'white');
            });
        }   
    }
    applyChanges(indices){
        var count = 0;
        const loop = setInterval(()=>{
            this.switchPlaces(indices[count][0], indices[count][1]);
            count++;
            if (!indices[count]){
                clearInterval(loop);
            }
        }, 300);
    }
}
//TODO:
//padaryt, kad reversint butu galima
//matuot laika
const sorting = new Sorting();
sorting.setWidthByValue();

const generateNumbers = () => {
    let array = [];
    for (let i = 0; i < $('.moveUp a').length; i++){
        array.push(Math.floor(Math.random() * 100) + 1);
    }
    array.forEach((element, index)=>{
        $('.moveUp a')[index].text = element;
    });
    sorting.array = array;
    sorting.sorted = false;
    sorting.setWidthByValue();
}

$("#bubble-sort").on('click', ()=>{
    $("#title").html("Bubble Sort");
});

$("#selection-sort").on('click', ()=>{
    $("#title").html("Selection Sort");
});



const start = () => {
    switch($("#title").text()){
        case "Bubble Sort":
            sorting.bubbleSort();
            break;
        case "Selection Sort":
            sorting.selectionSort();
            break;
        default:
            alert("Please choose an algorithm to visualize");
    }
}