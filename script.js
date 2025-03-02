function isValidColor(hex) {
    const regularHexExp = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
    return regularHexExp.test(hex);
}

function syncValues(source, target) {
    target.value = source.value;
}



const hoverArea1 = document.querySelector('#color1');
const hoverArea2 = document.querySelector('#color2');
const colorPicker1 = document.getElementById('picker1');
const colorPicker2 = document.getElementById('picker2');
const generate = document.getElementById('generate-btn');
const copyCode = document.getElementById('copyCode');
const mainsec = document.getElementById('container');
const degree = document.getElementById('degree');
const degText = document.getElementById('degree-text');

//hover over color tab
hoverArea1.addEventListener('mouseenter', () => {
    colorPicker1.classList.remove('hidden'); // Show the color picker
    colorPicker1.addEventListener('mouseenter', () =>{
        colorPicker1.classList.remove('hidden');
    })
    colorPicker1.addEventListener('mouseleave', () =>{
        colorPicker1.classList.add('hidden');
    })
});


hoverArea1.addEventListener('mouseleave', () => {
    colorPicker1.classList.add('hidden'); // Hide the color picker
});

hoverArea1.addEventListener('blur', () =>{
    const color = hoverArea1.value;
    if(!isValidColor(color)){
        hoverArea1.value = '#000000';
        hoverArea1.style.backgroundColor = hoverArea1.value; 
        syncValues(hoverArea1,colorPicker1);
    }
})

hoverArea2.addEventListener('mouseenter', () => {
    colorPicker2.classList.remove('hidden'); // Show the color picker
    colorPicker2.addEventListener('mouseenter', () =>{
        colorPicker2.classList.remove('hidden');
    })
    colorPicker2.addEventListener('mouseleave', () =>{
        colorPicker2.classList.add('hidden');
    })
});

hoverArea2.addEventListener('mouseleave', () => {
    colorPicker2.classList.add('hidden'); // Hide the color picker
});

hoverArea2.addEventListener('blur', () =>{
    const color = hoverArea2.value;
    if(!isValidColor(color)){
        hoverArea2.value = '#000000';
        hoverArea2.style.backgroundColor = hoverArea2.value; 
        syncValues(hoverArea2,colorPicker2);
    }
})

//choose degree of direction of the gradient
degree.addEventListener('input', () => {
    syncValues(degree,degText);
})
degText.addEventListener('input', () =>{
    syncValues(degText,degree);
})

degText.addEventListener('blur', () => {
    if(gradbtn.value == 'radial'){
        if(degText.value > 100){
            degText.value = 100;
        }
    }
    else{
        if(degText.value > 360){
            degText.value = (degText.value%360);
        }
    }
})

//choose color of the tab
colorPicker1.addEventListener('input', (e) => {
    const selectedColor1 = e.target.value;
    hoverArea1.value = selectedColor1; 
    hoverArea1.style.backgroundColor = hoverArea1.value; 
});

colorPicker2.addEventListener('input', (e) => {
    const selectedColor2 = e.target.value;
    hoverArea2.value = selectedColor2; 
    hoverArea2.style.backgroundColor = hoverArea2.value; 
});

hoverArea1.addEventListener('input', () => {
    hoverArea1.style.backgroundColor = hoverArea1.value; 
    syncValues(hoverArea1,colorPicker1);
});

hoverArea2.addEventListener('input', () => {
    hoverArea2.style.backgroundColor = hoverArea2.value; 
    syncValues(hoverArea2,colorPicker2);
});

//radial or linear
const gradbtn = document.getElementById('grad-btn');
gradbtn.addEventListener('click', () => {
    if(gradbtn.value == 'linear'){
        gradbtn.value = 'radial';
        gradbtn.innerHTML = 'Radial';
        degree.value = 50;
        degree.max = 100;
    }
    else{
        gradbtn.value = 'linear';
        gradbtn.innerHTML = 'Linear';
        degree.value = 90;
        degree.max = 360;
    }
    syncValues(degree,degText);
})

//click generate button
generate.addEventListener('click', () => {
    const selectedColor1 = hoverArea1.value;
    const selectedColor2 = hoverArea2.value;
    const gradDeg = degText.value;
    const gradvalue = gradbtn.value;
    if(gradvalue == 'linear'){
        mainsec.style.background = `${gradvalue}-gradient(${gradDeg}deg, ${selectedColor1}, ${selectedColor2})`;
        copyCode.innerHTML = `background: ${gradvalue}-gradient(${gradDeg}deg, ${selectedColor1}, ${selectedColor2});`;
    }
    else{
        mainsec.style.background = `${gradvalue}-gradient(circle at ${gradDeg}%, ${selectedColor1}, ${selectedColor2})`;
        copyCode.innerHTML = `background: ${gradvalue}-gradient(circle at ${gradDeg}%, ${selectedColor1}, ${selectedColor2});`;
    }
})

//copy the CSS code
const copyBtn = document.getElementById('copyBtn');
const tickIcon = document.getElementById('tickIcon');

copyBtn.addEventListener('click', () => {
    //clipboard API is used to copy code
    navigator.clipboard.writeText(copyCode.textContent).then(() => {
        tickIcon.classList.remove('hidden');
        copyBtn.classList.add('hidden');
        setTimeout(() => {
            tickIcon.classList.add('hidden');
            copyBtn.classList.remove('hidden')
        }, 2000);
    }, function(err){
        console.error("can't copy", err);
    });
});

