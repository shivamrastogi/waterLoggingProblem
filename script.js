function liquidStorage(blocks) {
    var maxHeight = blocks.reduce(function(acc, val){
        return (acc < val) ? val : acc;
    }, 0);
    generateInput(maxHeight, blocks);
    waterlogged = calculateWaterLogged(blocks);
    generateOutput(maxHeight, waterlogged, blocks);
}

function generateInput(maxHeight, blocks) {
    var ele = getElem('input'),
        row = maxHeight + 1,
        col = blocks.length;

        var html = '<p>Input</p><table><tbody>';
        for (var i = 0; i < row; i++){
            html += '<tr>';
            for (var j = 0; j < col; j++){
                if((row - i) <= blocks[j])
                    html += '<td class="cells yellow"></td>';
                else
                    html += '<td class="cells"></td>';
            }
            html += '</tr>';
        }
        html += '</tbody></table>';
        ele.innerHTML =  html;
}

function getElem(id) {
    return document.getElementById(id);
}

function calculateWaterLogged(blocks){
    var maxi =  0, maxLeft = [];
    for(var i = 0; i < blocks.length; i++) {
        maxLeft.push(maxi);
        if(maxi < blocks[i]){
            maxi = blocks[i];
        }
    }

    var maxi =  0, maxRight = [];
    for(var i = blocks.length - 1; i >= 0; i--) {
        maxRight.unshift(maxi);
        if(maxi < blocks[i]){
            maxi = blocks[i];
        }
    }

    var mini =  0, waterlogged = [];
    for(var i = 0; i < blocks.length; i++) {
        mini = Math.min(maxLeft[i], maxRight[i]);
        if(mini - blocks[i] > 0){
            waterlogged.push(mini - blocks[i]);
        } else {
            waterlogged.push(0);
        }
    }

    return waterlogged;

}

function generateOutput(maxHeight, waterlogged, blocks) {
    var ele = getElem('output'),
        row = maxHeight + 1,
        col = blocks.length,
        units = 0;

        var html = '<p>Output</p><p id="units"></p><table><tbody>';
        for (var i = 0; i < row; i++){
            html += '<tr>';
            for (var j = 0; j < col; j++){
                if((row - i) <= (blocks[j] + waterlogged[j]) && (row - i) > (blocks[j])){
                    html += '<td class="cells blue"></td>';
                    units++;
                }
                else
                    html += '<td class="cells"></td>';
            }
            html += '</tr>';
        }
        html += '</tbody></table>';
        ele.innerHTML =  html;
    
        ele = getElem('units');
        ele.innerHTML = units + ' Units';
}

function getInput(){
    var ele = getElem('inputText');
    var blocks = ele.value.split(',');
    liquidStorage(blocks.map(function(val){ return isNaN(parseInt(val,10)) ? 0: parseInt(val,10)}));
}