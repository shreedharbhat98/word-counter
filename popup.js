window.onload(function(){
    let countBtn = document.getElementById("count-button")
        countBtn.addEventListener('onclick', getData())
})


    function getData() {
        var inputVal = document.getElementById("input-val").value
        console.log(inputVal)
        // alert(inputVal)


    };
